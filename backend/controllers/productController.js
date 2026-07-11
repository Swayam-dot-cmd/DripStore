const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');
const {
    getCache,
    setCache,
    deleteCache,
} = require("../utils/cache");

// const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const getProducts = async (req, res) => {
    try {

        // Check Redis first
        const cachedProducts = await getCache("products");

        if (cachedProducts) {
            console.log("✅ Products served from Redis");

            return res.json(cachedProducts);
        }

        console.log("📦 Products fetched from MongoDB");

        const products = await Product.find({});

        // Cache for 10 minutes
        await setCache("products", products, 600);

        res.json(products);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const getProductById = async (req, res) => {
  try {

    const cacheKey = `product:${req.params.id}`;

    // Check Redis first
    const cachedProduct = await getCache(cacheKey);

    if (cachedProduct) {
      console.log("✅ Product served from Redis");

      return res.json(cachedProduct);
    }

    console.log("📦 Product fetched from MongoDB");

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Store in Redis
    await setCache(cacheKey, product, 600);

    res.json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }
    const product = new Product({
      name, description, price, category, stock, imageUrl
    });
    const createdProduct = await product.save();
    await deleteCache("products");
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  console.log("===== UPDATE PRODUCT API HIT =====");
  try {
    const { name, description, price, category, stock } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.stock = stock || product.stock;

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        product.imageUrl = result.secure_url;
      }
      const updatedProduct = await product.save();
      await deleteCache("products");
      await deleteCache(`product:${product._id}`);
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      // await product.deleteOne();
      // res.json({ message: 'Product removed' });
      const productId = product._id;

      await product.deleteOne();

      await deleteCache("products");
      await deleteCache(`product:${productId}`);

      res.json({
        message: "Product removed",
      });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };

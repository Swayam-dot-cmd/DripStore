# ShopNest

A full-stack e-commerce web application built using the MERN stack. It provides secure user authentication, product management, online payments, and an admin dashboard.

## Features

* User registration and login using JWT authentication
* Role-based authorization (Admin/User)
* Browse and search products
* Shopping cart functionality
* Secure online payments with Razorpay
* Order management
* Admin dashboard for managing products and orders
* Image upload using Cloudinary
* Email notifications using Nodemailer

## Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Razorpay
* Cloudinary
* Nodemailer

## Installation

### Clone the repository

```bash
git clone https://github.com/Swayam-dot-cmd/DripStore.git
cd DripStore
```

### Install dependencies

For the backend:

```bash
cd backend
npm install
```

For the frontend:

```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env` file in the backend directory and configure the required variables such as:

```env
PORT=
MONGO_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
SMTP_EMAIL=
SMTP_PASSWORD=
```

### Run the project

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm start
```

## Project Structure

```
DripStore/
├── frontend/
├── backend/
├── README.md
```

## License

This project is for learning and educational purposes.

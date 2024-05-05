# Ecommerce API Installation Guide

Welcome to the Ecommerce API! This guide will help you set up the API on your local machine or server.

## Installation Steps

1. **Firstly, Clone the Repository**: 
   ```bash
   git clone https://github.com/MShahryarSaeed/MERN-Ecommerce-Backend.git

2. **Install Dependencies:**
   ```bash
   cd mern-ecommerce-backend
   npm install

3. **Create a .env file in the root directory inside (mern-ecommerce-backend)  and add the following environment variables:**

```bash
PORT= # Port on which the server will run

MONGO=mongodb://localhost/ecommerce   # MongoDB connection URI

MONGO_URL=mongodb://localhost/ecommerce   # MongoDB connection URI

JWT_SECRET=# Secret key for JWT authentication

STRIPE_SECRET_KEY=your_stripe_secret_key_here   # Stripe secret key for payment processing

ENDPOINTSECRET=your_stripe_secret_key_here   # Stripe secret key for payment processing

CLOUDINARY_CLOUD_NAME=...

CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET_KEY=...
```

4. **Run the Server:**
```bash
   npm start

```
## API Host URL
``` bash
https://mern-ecommerce-backend-one.vercel.app
```

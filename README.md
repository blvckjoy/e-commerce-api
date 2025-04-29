# E-Commerce API

A robust RESTful API for an e-commerce platform built with Node.js, Express, and MongoDB. This API provides endpoints for user management, product management, and product reviews.

## Features

-  User Authentication and Authorization

   -  User registration and login
   -  Role-based access control (Admin and Basic users)
   -  JWT-based authentication

-  Product Management

   -  Create, read, update, and delete products
   -  Product attributes including name, category, price, stock
   -  Support for product attributes like brand, color, and battery life

-  Review System
   -  Add product reviews with ratings and comments
   -  View product reviews
   -  User-specific reviews

## Prerequisites

-  Node.js (v14 or higher)
-  MongoDB
-  npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/blvckjoy/e-commerce-api.git
cd e-commerce-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_TOKEN=your_jwt_secret_key
PORT=PORT
```

4. Start the server:

```bash
npm start
```

The server will start running on `http://localhost:${PORT}`

## API Endpoints

### User Endpoints

-  `POST /api/users/register` - Register a new user
-  `POST /api/users/login` - Login user
-  `GET /api/users` - Get all users (Admin only)

### Product Endpoints

-  `POST /api/products` - Create a new product (Admin only)
-  `GET /api/products` - Get all products
-  `GET /api/products/:productId` - Get a single product
-  `PATCH /api/products/:productId` - Update a product (Admin only)
-  `DELETE /api/products/:productId` - Delete a product (Admin only)

### Review Endpoints

-  `POST /api/products/:id/reviews` - Add a product review (Basic users only)
-  `GET /api/products/:id/reviews` - Get product reviews

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header for protected routes:

```
Authorization: Bearer your_jwt_token
```

## Role-Based Access Control

-  **Admin**: Full access to all endpoints
-  **Basic**: Can view products and add reviews

## Error Handling

The API includes comprehensive error handling for:

-  Invalid requests
-  Authentication failures
-  Authorization failures
-  Resource not found
-  Server errors

## Dependencies

-  express: Web framework
-  mongoose: MongoDB object modeling
-  bcrypt: Password hashing
-  jsonwebtoken: JWT authentication
-  dotenv: Environment variable management
-  joi: Request validation
-  nodemon: Development server

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

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

-  Integration Tests

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

## Integration Tests

To run the integration tests for the E-commerce Platform RESTful API, execute the following command from the root of the project

```bash
npm test
```

## Integration Tests Results

```
 PASS  __tests__/app.integration.test.js
  E-Commerce API Integration Test
    Authentication
      ✓ should register an admin user successfully (121 ms)
      ✓ should register a basic user successfully (70 ms)
      ✓ should login an admin user & receive a token (65 ms)
      ✓ should login a basic user & receive a token (64 ms)
      ✓ should get all users (9 ms)
    Product Management
      ✓ should allow admin user to create a new product successfully (12 ms)
      ✓ should not allow basic user to create a new product (8 ms)
      ✓ should get all products (6 ms)
      ✓ should get a specific product by ID (12 ms)
      ✓ should allow admin user to update a product successfully (14 ms)
      ✓ should allow basic user to add a review to a product successfully (12 ms)
      ✓ should get all reviews for a product (16 ms)
      ✓ should allow admin user to delete a product successfully (8 ms)

Test Suites: 1 passed, 1 total
Tests:       13 passed, 13 total
Snapshots:   0 total
Time:        1.417 s, estimated 2 s
Ran all test suites.
```

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

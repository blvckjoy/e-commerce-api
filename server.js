require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

console.log("Starting server...");

// Add unhandled promise rejection handler
process.on("unhandledRejection", (error) => {
   console.error("Unhandled Promise Rejection:", error);
});

app.use(express.json());

app.get("/", (req, res) => {
   res.send("WELCOME TO E-COMMERCE API");
});

// More detailed MongoDB connection logging
console.log("Attempting to connect to MongoDB...");
mongoose
   .connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
   })
   .then(() => {
      console.log("Connected to Database");
      // Only start the server after successful DB connection
      app.listen(process.env.PORT, () => {
         console.log(`Listening on port ${process.env.PORT}`);
      }).on("error", (err) => {
         console.error("Error starting server:", err);
      });
   })
   .catch((error) => {
      console.error("MongoDB Connection error:", error);
      process.exit(1);
   });

const userRouter = require("./src/routes/user");
const productRouter = require("./src/routes/product");

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

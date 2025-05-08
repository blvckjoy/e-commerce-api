require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
   res.send("WELCOME TO E-COMMERCE API");
});

const userRouter = require("./src/routes/user");
const productRouter = require("./src/routes/product");

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

// Connect to MongoDB only when not in test environment
if (process.env.NODE_ENV !== "test") {
   mongoose
      .connect(process.env.MONGODB_URI, {
         serverSelectionTimeoutMS: 5000,
      })
      .then(() => console.log("Connected to Database"))
      .catch((error) => console.error("Connection error", error));
}

// Only start the server if this file is run directly
if (require.main === module) {
   app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
   });
}

module.exports = app;

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

console.log("Starting server...");

app.use(express.json());

app.get("/", (req, res) => {
   res.send("WELCOME TO E-COMMERCE API");
});

mongoose
   .connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
   })
   .then(() => console.log("Connected to Database"))
   .catch((error) => console.error("Connection error", error));

const userRouter = require("./src/routes/user");
const productRouter = require("./src/routes/product");

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.listen(process.env.PORT, () => {
   console.log(`Listening on port ${process.env.PORT}`);
});

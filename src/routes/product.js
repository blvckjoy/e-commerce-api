const express = require("express");
const productRouter = express.Router();
const Product = require("../models/product");

// Get all products
productRouter.get("/", async (req, res) => {
   try {
      const products = await Product.find();
      res.json(products);
   } catch (error) {
      console.error("Error getting all products:", error);
      res.status(500).json({ message: "Internal Server Error" });
   }
});

// Create a product
productRouter.post("/", async (req, res) => {
   try {
      const {
         name,
         category,
         price,
         stock,
         attributes,
         related_products,
         reviews,
      } = req.body;

      let product = await Product.findOne({ name });
      if (product)
         return res.status(400).json({ message: "Product already exists" });

      product = new Product({ ...req.body });
      await product.save();

      res.status(201).json({
         message: "Product created successfully",
         product,
      });
   } catch (error) {
      console.error("Error creating a new product:", error);
      res.status(500).json({ message: "Internal Server Error" });
   }
});

// get a single product
productRouter.get("/:id", async (req, res) => {
   try {
      const product = await Product.findById(req.params.id);
      if (!product)
         return res.status(404).json({ message: "Product not found" });

      res.status(200).json(product);
   } catch (error) {
      console.error("Error getting a product:", error);
      res.status(500).json({ message: "Internal Server Error" });
   }
});

module.exports = productRouter;

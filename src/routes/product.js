const express = require("express");
const productRouter = express.Router();
const Product = require("../models/product");

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

module.exports = productRouter;

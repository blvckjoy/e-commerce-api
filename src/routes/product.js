const express = require("express");
const productRouter = express.Router();
const Product = require("../models/product");
const authMiddleware = require("../middlewares/auth");
const { authRole } = require("../middlewares/authRole");

// Create a product
productRouter.post("/", authMiddleware, authRole("admin"), async (req, res) => {
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

// Get a single product
productRouter.get("/:productId", async (req, res) => {
   try {
      const product = await Product.findById(req.params.productId);
      if (!product)
         return res.status(404).json({ message: "Product not found" });

      res.status(200).json(product);
   } catch (error) {
      console.error("Error getting a product:", error);
      res.status(500).json({ message: "Internal Server Error" });
   }
});

// Update a product
productRouter.patch(
   "/:productId",
   authMiddleware,
   authRole("admin"),
   async (req, res) => {
      try {
         const product = await Product.findById(req.params.productId);
         if (!product)
            return res.status(404).json({ message: "Product not found" });

         const { name, category, price, stock, attributes, related_products } =
            req.body;

         const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            { ...req.body },
            { new: true }
         );

         res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct,
         });
      } catch (error) {
         console.error("Error updating product:", error);
         res.status(500).json({ message: "Internal Server Error" });
      }
   }
);

// Delete a product
productRouter.delete(
   "/:productId",
   authMiddleware,
   authRole("admin"),
   async (req, res) => {
      try {
         const product = await Product.findById(req.params.productId);
         if (!product)
            return res.status(404).json({ message: "Product not found" });

         await Product.findByIdAndDelete(req.params.productId);

         res.status(200).json({ message: "Product deleted successfully" });
      } catch (error) {
         console.error("Error deleting a product:", error);
         res.status(500).json({ message: "Internal Server Error" });
      }
   }
);

// Add product review
productRouter.post(
   "/:id/reviews",
   authMiddleware,
   authRole("basic"),
   async (req, res) => {
      try {
         const product = await Product.findById(req.params.id);
         if (!product)
            return res.status(404).json({ message: "Product not found" });

         const userId = req.user.id;
         const { rating, comment } = req.body;
         if (!comment)
            return res.status(400).json({ message: "Review cannot be empty" });

         product.reviews.push({
            user: userId,
            rating: rating,
            comment: comment,
         });
         await product.save();

         res.status(200).json({ message: "Review added" });
      } catch (error) {
         console.error("Error adding a review:", error);
         res.status(500).json({ message: "Internal Server Error" });
      }
   }
);

// Get product reviews
productRouter.get(
   "/:id/reviews",
   authMiddleware,
   authRole("admin"),
   async (req, res) => {
      try {
         const product = await Product.findById(req.params.id);
         if (!product)
            return res.status(404).json({ message: "Product not found" });

         await product.populate("reviews.user", "username");

         res.status(200).json({ reviews: product.reviews || [] });
      } catch (error) {
         console.error("Error getting reviews:", error);
         res.status(500).json({ message: "Internal Server Error" });
      }
   }
);

module.exports = productRouter;

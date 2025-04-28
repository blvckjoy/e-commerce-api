const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         require: true,
      },
      category: {
         type: String,
         require: true,
      },
      price: {
         type: Number,
         require: true,
      },
      stock: {
         type: Number,
         require: true,
         default: 1,
      },
      attributes: {
         brand: {
            type: String,
         },
         color: [{ type: String }],
         battery_life: {
            type: String,
         },
      },
      reviews: [
         {
            user: {
               type: mongoose.Types.ObjectId,
               ref: "User",
            },
            rating: {
               type: Number,
            },
            comment: {
               type: String,
            },
         },
      ],
      related_products: [{ type: String }],
   },
   { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

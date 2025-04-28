const { string } = require("joi");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         require: true,
         unique: true,
      },
      email: {
         type: String,
         require: true,
      },
      password: {
         type: String,
         require: true,
      },
      role: {
         type: String,
         enum: ["admin", "basic"],
         default: "basic",
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

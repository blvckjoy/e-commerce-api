const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateUser } = require("../validators/userValidation");

// Register a user
userRouter.post("/register", async (req, res) => {
   try {
      const { error } = validateUser(req.body);
      if (error) return res.status(400).json(error.details[0].message);

      const { username, email, password } = req.body;
      const existingUser = await User.findOne({
         $or: [{ email }, { username }],
      });
      if (existingUser)
         return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
         username,
         email,
         password: hashedPassword,
      });
      await user.save();

      res.status(201).json({ message: "User created successfully", user });
   } catch (error) {
      console.error("Error creating a new user:", error);
      res.status(500).json({ message: "Internal Server Error" });
   }
});

// Get all users
userRouter.get("/", async (req, res) => {
   try {
      const users = await User.find();
      res.json(users);
   } catch (error) {
      console.error("Error getting all users:", error);
      res.status(500).json({ message: "Internal Server Error" });
   }
});

module.exports = userRouter;

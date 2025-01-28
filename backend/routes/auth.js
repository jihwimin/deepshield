const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// Password validation function
const isValidPassword = (password) => {
  return /^(?=.*[A-Z]).{8,}$/.test(password);
};

router.get("/test", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({ message: "Auth API is working!" });
});


// REGISTER USER
router.post("/register", async (req, res) => {
  const { username, password, nickname } = req.body;

  // Check if username is unique
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: "Username is already taken" });
  }

  // Validate password
  if (!isValidPassword(password)) {
    return res.status(400).json({ error: "Password must be at least 8 characters long and contain at least one uppercase letter" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ username, password: hashedPassword, nickname });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, nickname: user.nickname });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});



module.exports = router;

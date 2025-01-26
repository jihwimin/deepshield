const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.cjs");
const dotenv = require("dotenv");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

console.log("Routes loaded: /api/chatbot");

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/chatbot", require("./routes/chatbot"));
app.use("/api/forum", require("./routes/forum"));
app.use("/api/mental-care", require("./routes/mentalCare"));



// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

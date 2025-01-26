const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

console.log("Routes loaded: /api/chatbot");

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/chatbot", require("./routes/chatbot"));
app.use("/api/forum", require("./routes/forum"));
app.use("/api/mental-care", require("./routes/mentalCare"));



// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

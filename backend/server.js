const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
const path = require("path");
require("dotenv").config();
// Serve frontend static files in production
const frontendPath = path.join(__dirname, "../frontend/build");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

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
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/chatbot", require("./routes/chatbot.js"));
app.use("/api/forum", require("./routes/forum.js"));
app.use("/api/mental-care", require("./routes/mentalCare.js"));



// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

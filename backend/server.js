const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
const path = require("path");

require("dotenv").config();

const app = express(); 

// Middleware
//app.use(cors());
//app.use(cors({ origin: "*" })); // temp fix
const corsOptions = {
  origin: ["https://deepshield-production.up.railway.app", "http://localhost:3000"],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
connectDB();

console.log("Routes loaded: /api/chatbot");

// API Routes
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/chatbot", require("./routes/chatbot.js"));
app.use("/api/forum", require("./routes/forum.js"));
app.use("/api/mental-care", require("./routes/mentalCare.js"));

app.get("/api/health", (req, res) => {
  res.json({ message: "API is working correctly" });
});

// ✅ Serve frontend **AFTER API routes**
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/build");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

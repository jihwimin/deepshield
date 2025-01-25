const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Chat history memory
const chatHistory = new Map();

// Function to generate messages array with history
const getChatHistory = (userId, userMessage) => {
  if (!chatHistory.has(userId)) {
    chatHistory.set(userId, []);
  }
  const history = chatHistory.get(userId);
  
  // Keep only last 5 messages for context
  if (history.length > 5) {
    history.shift();
  }

  // Add new user message
  history.push({ role: "user", content: userMessage });

  return history;
};

// Chatbot API Route
router.post("/chat", async (req, res) => {
  const { userId, message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const history = getChatHistory(userId, message);

    const response = await axios.post(
      "https://api.groq.com/v1/chat/completions",
      {
        model: "mixtral-8x7b-32768",
        messages: [
          { role: "system", content: "You are a friendly and empathetic chatbot providing psychological counseling. Your goal is to comfort victims and suggest therapy options if needed." },
          ...history,
          { role: "assistant", content: "Would you like recommendations for therapy centers near you?" }
        ],
      },
      { headers: { Authorization: `Bearer ${GROQ_API_KEY}` } }
    );

    // Get AI response
    const aiResponse = response.data.choices[0].message.content;

    // Store AI response in history
    history.push({ role: "assistant", content: aiResponse });

    res.json({ reply: aiResponse });
  } catch (error) {
    console.error("Error with Groq Cloud API:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to communicate with chatbot" });
  }
});

module.exports = router;

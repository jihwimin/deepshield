const express = require("express");
const Groq = require("groq-sdk");
require("dotenv").config();

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/chat", async (req, res) => {
  const { userId, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    console.log("🔹 Received Message:", message);
    
    const completion = await groq.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: `You are a friendly and empathetic psychological counseling chatbot. 
          - Your goal is to **support users emotionally** and **build a safe conversation space**.
          - If the user expresses distress, sadness, or struggles, respond warmly and **naturally ask** if they would like assistance in finding therapy options.
          - Do **not force** therapy recommendations. Instead, let the user guide the conversation.
          - Keep your responses short and easy to understand.
          - Always be **gentle and reassuring** in tone.` 
        },
        { role: "user", content: message },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const botResponse = completion.choices[0].message.content;
    res.json({ reply: botResponse });

  } catch (error) {
    console.error("❌ Error with Groq API:", error.message);
    res.status(500).json({ error: "Failed to communicate with chatbot" });
  }
});

module.exports = router;

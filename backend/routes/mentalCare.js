const express = require("express");
const { TextToSpeechClient } = require("@google-cloud/text-to-speech");
const OpenAI = require("openai");
const router = express.Router();
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const ttsClient = new TextToSpeechClient();

// Handle voice chat
router.post("/voice-chat", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text input is required." });
    }

    console.log("User input:", text);

    // Get AI response from OpenAI
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", 
        content: `You are a friendly and empathetic psychological counseling chatbot. 
        - Your goal is to **support users emotionally** and **build a safe conversation space**.
        - If the user expresses distress, sadness, or struggles, respond warmly and **naturally ask** if they would like assistance in finding therapy options.
        - Do **not force** therapy recommendations. Instead, let the user guide the conversation.
        - Keep your responses short and easy to understand.
        - Always be **gentle and reassuring** in tone.
        - If a user asks something unrelated to mental health support, politely state that it is beyond your scope and refrain from providing misinformation.` 
    },
                 { role: "user", content: text }],
      max_tokens: 100,
    });

    const aiText = aiResponse.choices[0].message.content || "I'm here for you. Please speak again.";
    console.log("AI response:", aiText);

    // Convert AI response to speech using Google Cloud TTS
    const request = {
      input: { text: aiText },
      voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
      audioConfig: { audioEncoding: "MP3" },
    };

    const [response] = await ttsClient.synthesizeSpeech(request);
    const audioBuffer = response.audioContent;

    res.json({ text: aiText, audioUrl: `data:audio/mp3;base64,${audioBuffer.toString("base64")}` });
  } catch (error) {
    console.error("❌ Error processing voice chat:", error);
    res.status(500).json({ error: "AI service is not responding. Please try again." });
  }
});

module.exports = router;

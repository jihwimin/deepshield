import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import API_BASE_URL from "../config";

const TalkingMentalCare = () => {
  const [messages, setMessages] = useState([
    { text: "Hello, I'm here to support you. How are you feeling today?", sender: "bot" }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const audioRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll chat to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-play AI-generated voice response
  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play().catch((error) => console.error("Audio play failed:", error));
    }
  }, [audioUrl]);

  const handleStartListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true, language: "en-US" }); // ✅ Force English Only
  };

  const handleStopListening = async () => {
    setIsListening(false);
    SpeechRecognition.stopListening();

    if (!transcript.trim()) return;

    // Display user message
    setMessages((prev) => [...prev, { text: transcript, sender: "user" }]);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/mental-care/voice-chat`, { text: transcript });

      const botReply = { text: res.data.text || "I'm here for you. Please speak again.", sender: "bot" };

      // Update chat messages
      setMessages((prev) => [...prev, botReply]);

      // Set AI-generated voice response
      if (res.data.audioUrl) {
        setAudioUrl(res.data.audioUrl);
      }
    } catch (error) {
      console.error("Error processing voice chat:", error);
      alert("AI is not responding. Please try again.");
    }

    resetTranscript(); // Clear transcript for next message
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>🧠 Talking Mental Care</h2>

      {/* Chat Display */}
      <div
        ref={chatContainerRef}
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
          height: "300px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "bot" ? "left" : "right",
              backgroundColor: msg.sender === "bot" ? "#e0f7fa" : "#dcf8c6",
              padding: "10px",
              borderRadius: "15px",
              margin: "5px",
              alignSelf: msg.sender === "bot" ? "flex-start" : "flex-end",
              maxWidth: "75%",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <strong>{msg.sender === "bot" ? "AI" : "You"}:</strong> {msg.text}
          </div>
        ))}
      </div>

      {/* Voice Control Buttons */}
      <div style={{ marginTop: "15px", display: "flex", justifyContent: "center" }}>
        {!isListening ? (
          <button
            onClick={handleStartListening}
            style={{
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            🎤 Start Talking
          </button>
        ) : (
          <button
            onClick={handleStopListening}
            style={{
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            ⏹ Stop & Send
          </button>
        )}
      </div>

      {/* Hidden Audio Element for Auto-Playing AI Responses */}
      <audio ref={audioRef} />
    </div>
  );
};

export default TalkingMentalCare;

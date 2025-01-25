import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import ChatMessage from "../components/ChatMessage";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm here to support you. How are you feeling today?", sender: "bot" }
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { text: userInput, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setUserInput("");

    try {
      const res = await axios.post(`${API_BASE_URL}/api/chatbot/chat`, {
        userId: "anonymous_user",
        message: userInput,
      });

      const botReply = { text: res.data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "I'm having trouble connecting. Try again later.", sender: "bot" }]);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "80vh", padding: "20px" }}>
      <h2>Psychological Support Chat</h2>
      <div style={{
        flexGrow: 1, overflowY: "auto", display: "flex", flexDirection: "column",
        border: "1px solid #ccc", padding: "10px", borderRadius: "10px", backgroundColor: "#f9f9f9"
      }}>
        {messages.map((msg, index) => (
          <ChatMessage key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;

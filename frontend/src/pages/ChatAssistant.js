import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";
import ChatMessage from "../components/ChatMessage";
import "../styles/ChatAssistant.css"; // Ensure this CSS file is imported
import logo from "../assets/deepshield-logo.png";
import Footer from "../components/Footer";

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    { text: "Hello, I'm here to support you. How are you feeling today?", sender: "bot" }
  ]);
  const [userInput, setUserInput] = useState("");

  // Function to send a message
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

  // Function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents accidental new lines
      handleSendMessage();
    }
  };

  return (
    <div className="main-container">
      {/* Header */}
     <header className="header">
       <img src={logo} alt="DeepShield Logo" className="header-logo" />
       <h1 className="header-title" style={{ fontWeight: "normal", marginRight: "-50px"}}>
         <Link to="/dashboard" className="logo-link">
         <span className="deep">D</span><span className="black">eep</span>
         <span className="shield">S</span><span className="black">hield</span>
         </Link>
       </h1>
       <div className="auth-links-container" style={{ marginRight: "50px" }}>
         <div className="auth-links">
           <Link to="/login">login</Link>
           <span> / </span>
           <Link to="/signup">sign up</Link>
         </div>
       </div>
     </header>


    


     {/* Navigation Bar */}
     <nav className="nav-bar">
       <h1 className="nav-title">
         <Link to="/dashboard" className="logo-link">
           <span className="deep">D</span><span className="white">eep</span>
           <span className="shield">S</span><span className="white">hield</span>
         </Link>
       </h1>
       <div className="auth-links-container" style={{ marginRight: "100px" }}>
         <div className="nav-links">
           <Link to="/report">Report a Deepfake</Link>
           <Link to="/assistant">Get Mental Support</Link>
           <Link to="/community">Join the Community</Link>
           <Link to="/about-us">About Us</Link>
         </div>
       </div>
     </nav>


      {/* AI Chat Assistant */}
      <div className="chat-container">
        {/* Chat Header */}
        <div className="chat-header">AI Chat Assistant</div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <ChatMessage key={index} text={msg.text} sender={msg.sender} />
          ))}
        </div>

        {/* Input Area */}
        <div className="chat-input">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter your response here."
          />
          <button onClick={handleSendMessage} className="send-btn">➤</button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ChatAssistant;

import React from "react";
import "../styles/ChatAssistant.css"; 

const ChatMessage = ({ text, sender }) => {
  return (
    <div className={`message ${sender}`}>
      {sender === "bot" && <div className="message-avatar">AI</div>}
      <div className="message-text">{text}</div>
    </div>
  );
};

export default ChatMessage;

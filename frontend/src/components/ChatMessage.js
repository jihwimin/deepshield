const ChatMessage = ({ text, sender }) => {
    return (
      <div style={{
        backgroundColor: sender === "bot" ? "#e3f2fd" : "#bbdefb",
        padding: "10px",
        margin: "5px",
        borderRadius: "10px",
        maxWidth: "80%",
        alignSelf: sender === "bot" ? "flex-start" : "flex-end"
      }}>
        {text}
      </div>
    );
  };
  
  export default ChatMessage;
  
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Link } from "react-router-dom";
import "../styles/VoiceAssistant.css"; // Ensure this CSS file is imported
import logo from "../assets/deepshield-logo.png";
import micIcon from "../icons/microphone-icon.png"; // Ensure this icon is in assets
import Footer from "../components/Footer";
import API_BASE_URL from "../config";

const VoiceAssistant = () => {
  const [messages, setMessages] = useState([
    { text: "Hello, I'm here to support you. How are you feeling today?", sender: "bot" }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const audioRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    SpeechRecognition.startListening({ continuous: true, language: "en-US" }); 
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
    <div className={`main-container ${isScrolled ? "scrolled" : ""}`}>
      {/* Header */}
      {/* Header (Disappears on Scroll) */}
      <header className={`header ${isScrolled ? "hidden" : ""}`}>
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

      {/* Navigation Bar (Fixed) */}
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

      {/* Voice Assistant Section */}
      <div className="voice-container">
        <div className="voice-header">AI Voice Assistant</div>

        {/* Chat Messages */}
        <div className="voice-messages" ref={chatContainerRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`voice-message ${msg.sender}`}>
              <div className="voice-avatar">{msg.sender === "bot" ? "AI" : "U"}</div>
              <div className="voice-text">{msg.text}</div>
            </div>
          ))}
        </div>

        {/* Microphone Button */}
        <div className="mic-box">
          <button className={`mic-btn ${isListening ? "listening" : ""}`} onClick={isListening ? handleStopListening : handleStartListening}>
            <img src={micIcon} alt="Microphone Icon" className="mic-icon" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VoiceAssistant;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Assistant.css"; // Ensure this CSS file is imported
import logo from "../assets/deepshield-logo.png";
import Footer from "../components/Footer";

const Assistant = () => {
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


      {/* Main Content */}
      <div className="assistant-container">
        <h2 className="assistant-title">Select a mode</h2>

        <div className="assistant-options">
          <Link to="/assistant/chat-assistant" className="assistant-box">
            <p>AI Chat Assistant</p>
          </Link>
          <Link to="/assistant/voice-assistant" className="assistant-box">
            <p>AI Voice Assistant</p>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Assistant;

import React from "react";
import { Link } from "react-router-dom";
import "../styles/GatheringGuide.css"; // Ensure you create this CSS file
import logo from "../assets/deepshield-logo.png";
import Footer from "../components/Footer";
// Import icons
import videoIcon from "../icons/picture-icon.png";
import urlIcon from "../icons/link-icon.png";
import screenshotIcon from "../icons/camera-icon.png";
import clockIcon from "../icons/clock-icon.png";
import userIcon from "../icons/id-icon.png";
import commentsIcon from "../icons/chat-icon.png";
import { useState, useEffect } from "react";

const GatheringGuide = () => {

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

      {/* Gathering Guide Title */}
      <div className="gathering-guide-container">
        <h1 className="gathering-guide-title">Evidence Gathering Guide</h1>
      </div>

      {/* Evidence Gathering Section */}
      <div className="evidence-container">
        <p className="evidence-description">
          Before submitting a report, make sure you have gathered the following materials:
        </p>
        
        <div className="evidence-grid">
          {/* Evidence Boxes */}
          <div className="evidence-box">
            <img src={videoIcon} alt="Video Icon" className="evidence-icon" />
            <h3>Original Video / Image File</h3>
            <p>Download and save the deepfake file in its original format.</p>
          </div>

          <div className="evidence-box">
            <img src={urlIcon} alt="URL Icon" className="evidence-icon" />
            <h3>Webpage URL</h3>
            <p>Copy and store the link where the deepfake content was posted.</p>
          </div>

          <div className="evidence-box">
            <img src={screenshotIcon} alt="Screenshot Icon" className="evidence-icon" />
            <h3>Screenshots</h3>
            <p>Capture the deepfake video, image, or post as proof.</p>
          </div>

          <div className="evidence-box">
            <img src={clockIcon} alt="Clock Icon" className="evidence-icon" />
            <h3>Upload Date & Time</h3>
            <p>Record when the content was posted.</p>
          </div>

          <div className="evidence-box">
            <img src={userIcon} alt="User Icon" className="evidence-icon" />
            <h3>Uploader Information</h3>
            <p>If possible, save the username, account link, and other identifying details of the perpetrator.</p>
          </div>

          <div className="evidence-box">
            <img src={commentsIcon} alt="Comments Icon" className="evidence-icon" />
            <h3>Comments & Engagement Data</h3>
            <p>Preserve related comments, likes, and shares to demonstrate the impact of the content.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GatheringGuide;

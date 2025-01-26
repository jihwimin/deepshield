import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/deepshield-logo.png";
import "../styles/MainPage.css";
import Footer from "../components/Footer";
import speakerIcon from "../icons/report-icon.png";
import heartIcon from "../icons/heart-icon.png";
import communityIcon from "../icons/community-icon.png";
import "../styles/AboutSection.css";
import AboutSection from "../components/AboutSection";


const Dashboard = () => {
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
            <Link to="/support">Get Mental Support</Link>
            <Link to="/forum">Join the Community</Link>
            <Link to="/about">About Us</Link>
          </div>
        </div>
      </nav>


      {/* Hero Section */}
      <header className="hero">
        <h1>You're Not Alone.<br />We Are Here to Help</h1>
        <p>
          Deepfake abuse is real, but so is the support available for you. Whether
          you need guidance, mental care, or a community that understands—
          you're in the right place.
        </p>
      </header>


      <section className="info-section">
        <div className="info-card">
          <h2>What is Deepfake?</h2>
          <div className="underline"></div>
          <p>
            Deepfake technology uses artificial intelligence (AI) to manipulate or generate 
            hyper-realistic images, videos, and audio recordings. By leveraging machine 
            learning techniques, deepfakes can create deceptive media where individuals appear 
            to say or do things they never did. Initially developed for entertainment and AI 
            research, deepfakes have now become a tool for misinformation, fraud, and exploitation.
          </p>
        </div>
      </section>

      <section className="info-section">
        <div className="info-card black-bg">
          <h2>Why Are More Victims Emerging?</h2>
          <p>
            Deepfakes are increasing because AI tools are widely available, making it easier than 
            ever to manipulate images and videos. Weak laws and slow regulations mean that many 
            perpetrators face no consequences, leaving victims struggling to remove harmful content. 
            Social media accelerates the spread, making it nearly impossible to control once a 
            deepfake goes viral.
          </p>
        </div>
      </section>


      {/* Action Section */}
      <section className="action-section">
        <h2>How DeepShield Helps You Fight Back</h2>
        <p>
          You don't have to go through this alone. DeepShield is here to help you 
          take action, find support, and regain control.
        </p>
      </section>

      <section className="action-cards">
      <div className="card-container">
        {/* Card 1 */}
        <div className="card">
          <img src={speakerIcon} alt="Report a Deepfake" className="card-icon" />
          <div className="card-content">
            <Link to="/report" className="card-title">Report a Deepfake</Link>
            <p>Learn how to remove harmful deepfake content and take legal action.</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card">
          <img src={heartIcon} alt="Get Mental Support" className="card-icon" />
          <div className="card-content">
            <Link to="/support" className="card-title">Get Mental Support</Link>
            <p>Our AI chatbot provides emotional support and guides you to helpful resources.</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card">
          <img src={communityIcon} alt="Join the Community" className="card-icon" />
          <div className="card-content">
            <Link to="/forum" className="card-title">Join the Community</Link>
            <p>Talk to others who understand and find support in a safe space.</p>
          </div>
        </div>
      </div>
    </section>


      <AboutSection />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;

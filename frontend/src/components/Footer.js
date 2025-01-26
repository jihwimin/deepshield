import { Link } from "react-router-dom";
import logo from "../assets/deepshield-logo.png"; // Adjust the path if needed
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Section - Main Message */}
      <div className="footer-message">
        <h2>It's not your fault</h2>
      </div>

      {/* Main Footer Content */}
      <div className="footer-container">
        {/* Left Section - Logo & Branding */}
        <div className="footer-brand">
          <img src={logo} alt="DeepShield Logo" className="footer-logo" />
          <h1 className="footer-title">
            <span className="deep">D</span><span className="white">eep</span>
            <span className="shield">S</span><span className="white">hield</span>
          </h1>
        </div>

        {/* Right Section - Links */}
        <div className="footer-links">
          <div className="footer-column">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/resources">Resources & Legal Help</Link>
          </div>
          <div className="footer-column">
            <Link to="/report">Report a Deepfake</Link>
            <Link to="/assistant">Get Mental Support</Link>
            <Link to="/community">Join the Community</Link>
            <Link to="/about-us">About Us</Link>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>© 2025 DeepShield. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

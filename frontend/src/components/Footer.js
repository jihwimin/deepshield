import { Link } from "react-router-dom";
import logo from "../assets/deepshield-logo.png"; // Ensure the path is correct
import "../styles/Footer.css"; // ✅ Now imports Footer.css

const Footer = () => {
  return (
    <footer className="footer">
      {/* Brand Section */}
      <div className="footer-brand">
        <img src={logo} alt="DeepShield Logo" className="footer-logo" />
        <span>DeepShield</span>
      </div>

      {/* Tagline */}
      <p className="footer-tagline">It’s not your fault</p>

      {/* Footer Links */}
      <div className="footer-links">
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
        <Link to="/resources">Resources & Legal Help</Link>
      </div>

      <div className="footer-links">
        <Link to="/report">Report a Deepfake</Link>
        <Link to="/support">Get Mental Support</Link>
        <Link to="/community">Join the Community</Link>
        <Link to="/about">About Us</Link>
      </div>

      {/* Copyright */}
      <p className="copyright">© 2025 DeepShield. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;

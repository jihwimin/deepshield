import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/IndiaReport.css"; // Ensure this CSS file is imported
import logo from "../assets/deepshield-logo.png";
import Footer from "../components/Footer";

const IndiaReport = () => {
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
          <img src={logo} alt="DeepShield Logo" className="header-logo"/>
          <h1 className="header-title" style={{fontWeight: "normal", marginRight: "-50px"}}>
            <Link to="/dashboard" className="logo-link">
              <span className="deep">D</span><span className="black">eep</span>
              <span className="shield">S</span><span className="black">hield</span>
            </Link>
          </h1>
          <div className="auth-links-container" style={{marginRight: "50px"}}>
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
          <div className="auth-links-container" style={{marginRight: "100px"}}>
            <div className="nav-links">
              <Link to="/report">Report a Deepfake</Link>
              <Link to="/assistant">Get Mental Support</Link>
              <Link to="/community">Join the Community</Link>
              <Link to="/about-us">About Us</Link>
            </div>
          </div>
        </nav>


        {/* Main Content */}
        <div className="report-content">
          <h1 className="report-title">🇮🇳 India 🇮🇳</h1>

          <div className="report-box">
            <p>
              <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">
                Crime Report Portal
              </a>
            </p>
            <ul>
              <li>Select 'Report Other Cyber Crimes', and follow the instructions to report a case.</li>
            </ul>

            <p><strong>Police Office</strong></p>
            <ul>
              <li>Visit a nearby police station to report the cybercrime department of the case and submit an official
                First Information Report (FIR).
              </li>
            </ul>

            <p><strong>Report on Social Media</strong></p>
            <ul>
              <li>Find the 'Report' button on social media and report as inappropriate content.</li>
            </ul>

            <p>
              <a href="http://www.ncw.nic.in/" target="_blank" rel="noopener noreferrer">
                National Commission for Women
              </a>
            </p>
            <ul>
              <li>In the case of deepfake crimes against women, additional reports can be made to the NCW.</li>
            </ul>

            <p>
              <a href="https://www.cyberpeace.org/" target="_blank" rel="noopener noreferrer">
                Cyber Peace Foundation
              </a>
            </p>
            <ul>
              <li>Cyber Peace Foundation is a non-profit organization that provides cybercrime prevention and victim
                support, and can receive counseling and support for deepfake damage.
              </li>
            </ul>

          </div>
        </div>

        {/* Footer */}
        <Footer/>
      </div>
  );
};

export default IndiaReport;

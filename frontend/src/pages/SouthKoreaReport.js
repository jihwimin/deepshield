import { Link } from "react-router-dom";
import "../styles/SouthKoreaReport.css"; // Ensure this CSS file is imported
import logo from "../assets/deepshield-logo.png";
import Footer from "../components/Footer";

const SouthKoreaReport = () => {
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


      {/* Main Content */}
      <div className="report-content">
        <h1 className="report-title">🇰🇷 South Korea 🇰🇷</h1>

        <div className="report-box">
          <p>
            <a href="https://www.kocsc.or.kr" target="_blank" rel="noopener noreferrer">
              Korea Communications Standards Commission
            </a>
          </p>
          <ul>
            <li>Click on '불법정보 신고' to report deepfake related cases. </li>
          </ul>

          <p>
            <a href="https://cyberbureau.police.go.kr" target="_blank" rel="noopener noreferrer">
              Cyber Investigation Bureau of the National Police Agency
            </a>
          </p>
          <ul>
            <li>Select '사이버범죄 신고' and follow the steps to submit the evidence. </li>
          </ul>

          <p><strong>Report on Social Media</strong></p>
          <ul>
            <li>Find the 'Report' button on social media and report as inappropriate content.</li>
          </ul>

          <p>
            <a href="https://www.women1366.kr" target="_blank" rel="noopener noreferrer">
              Digital Sexual Crime Victims Support Center
            </a>
          </p>
          <ul>
            <li>It provides counseling and support for victims of digital sex crimes, and can get help for deepfake damage.</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SouthKoreaReport;

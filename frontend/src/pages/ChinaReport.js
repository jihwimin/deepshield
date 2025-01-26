import { Link } from "react-router-dom";
import "../styles/ChinaReport.css"; // Ensure this CSS file is imported
import logo from "../assets/deepshield-logo.png";
import Footer from "../components/Footer";

const ChinaReport = () => {
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
        <h1 className="report-title">🇨🇳 China 🇨🇳</h1>

        <div className="report-box">
          <p>
            <a href="https://www.12377.cn" target="_blank" rel="noopener noreferrer">
              Internet Illegal and Hazardous Information Reporting Center
            </a>
          </p>
          <ul>
            <li>Select '举报入口', and follow the instructions to report a case.</li>
          </ul>

          <p><strong>Cybersecurity Division, Regional Public Security Bureau</strong></p>
          <ul>
            <li>Visit or contact the cyber security department of your local public security bureau to report the
              damage.
            </li>
          </ul>

          <p><strong>Report on Social Media</strong></p>
          <ul>
            <li>Find the 'Report' button on social media and report as inappropriate content.</li>
          </ul>

          <p>
            <a href="http://www.cyberpolice.cn" target="_blank" rel="noopener noreferrer">
              Cybersecurity Bureau of the Public Security Department in China
            </a>
          </p>
          <ul>
            <li>It provides reports and consultations on cybercrime, and can report deepfake-related damage.</li>
          </ul>

          <p>
            <a href="https://www.cnnic.cn" target="_blank" rel="noopener noreferrer">
              China Internet Network Information Center(CNNIC)
            </a>
          </p>
          <ul>
            <li>CNNIC is responsible for Internet-related policies and regulations, and provides information on deepfake-related issues.</li>
          </ul>

        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default ChinaReport;

import { Link } from "react-router-dom";
import "../styles/SingaporeReport.css"; // Ensure this CSS file is imported
import logo from "../assets/deepshield-logo.png";
import Footer from "../components/Footer";

const SingaporeReport = () => {
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
        <h1 className="report-title">🇸🇬 Singapore 🇸🇬</h1>

        <div className="report-box">
          <p>
            <a href="https://www.police.gov.sg/iwitness" target="_blank" rel="noopener noreferrer">
              Singapore Police Force
            </a>
          </p>
          <ul>
            <li>Use ‘iWitness’ portal to submit your evidences related to your case. </li>
          </ul>

          <p>
            <a href="https://www.csa.gov.sg" target="_blank" rel="noopener noreferrer">
              Cyber Security Agency
            </a>
          </p>
          <ul>
            <li>You can use this website to report cyber threat. </li>
          </ul>

          <p><strong>Report on Social Media</strong></p>
          <ul>
            <li>Find the 'Report' button on social media and report as inappropriate content.</li>
          </ul>

          <p>
            <a href="https://www.imda.gov.sg" target="_blank" rel="noopener noreferrer">
              Infocomm Media Development Authority(IMDA)
            </a>
          </p>
          <ul>
            <li>IMDA is responsible for regulating media content and can receive reports of inappropriate deepfake content.</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SingaporeReport;

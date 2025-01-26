import { Link } from "react-router-dom";
import "../styles/Report.css"; // Ensure this CSS file is imported
import logo from "../assets/deepshield-logo.png";
import Footer from "../components/Footer";

const Report = () => {
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


      {/* Report Section */}
      <div className="report-container">
        {/* Information Text */}
        <p className="report-info">
          Before reporting, please collect all possible evidence such as screenshots, URLs,  
          upload dates and times of such deepfake content and keep it safe.  
          The procedures and laws of each country may be different,  
          so please consult your local legal professional for the most appropriate response.
        </p>

        {/* Evidence Gathering Guide Button */}
        <Link to="/gathering-guide" className="gathering-btn">More Evidence Gathering Guide</Link>

        {/* Select Country Section */}
        <h2 className="report-title">Select Your Country</h2>

        <div className="country-buttons">
          <Link to="/report/united-states" className="country-btn">🇺🇸 United States 🇺🇸</Link>
          <Link to="/report/india" className="country-btn">🇮🇳 India 🇮🇳</Link>
          <Link to="/report/china" className="country-btn">🇨🇳 China 🇨🇳</Link>
          <Link to="/report/singapore" className="country-btn">🇸🇬 Singapore 🇸🇬</Link>
          <Link to="/report/south-korea" className="country-btn">🇰🇷 South Korea 🇰🇷</Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Report;

import React from "react";
import "../styles/AboutUs.css";
import FounderOne from "../assets/foundertwo.png"; // Replace with the actual image path
import FounderTwo from "../assets/founderone.png"; // Replace with the actual image path
import Footer from "../components/Footer";
import logo from "../assets/deepshield-logo.png";
import {Link} from "react-router-dom";
import "../styles/Login.css";

const AboutUs = () => {
  return (
    <div className="about-container">

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
        <div className="auth-links-container" style={{ marginRight: "-623.5px" }}>
          <Link to="/dashboard" className="logo-link">
            <span className="deep">D</span><span className="white">eep</span>
            <span className="shield">S</span><span className="white">hield</span>
          </Link>
        </div>
       </h1>
       <div className="auth-links-container" style={{ marginRight: "-150px" }}>
         <div className="nav-links">
           <Link to="/report">Report a Deepfake</Link>
           <Link to="/assistant">Get Mental Support</Link>
           <Link to="/community">Join the Community</Link>
           <Link to="/about-us">About Us</Link>
         </div>
       </div>
     </nav>

      <h1 className="about-title">About Us</h1>

      <div className="profile-container">
        {/* Jiin Min's Profile */}
        <div className="profile-card">
          <img src={FounderOne} alt="Jiin Min" className="profile-img" />
          <div className="profile-text">
            <h2>Jiin Min</h2>
            <h3>Data Science<br />Junior</h3>
            <p>
              My younger sister became a victim of a deepfake and wanted to
              report it, but since she was overseas, I went to the police
              station on her behalf. However, the police told me that
              internet-related issues like this are handled by a different
              department and that I would need to call them to file a report.
              After that, the case would have to go through a lawsuit and
              proceed to trial.
              <br /><br />
              The process was so complicated that we gave up on reporting it
              altogether. While the severity of deepfake crimes is frequently
              highlighted in the news, there seem to be no concrete solutions to
              address them. That’s why my sister and I decided to create this
              website.
            </p>
          </div>
        </div>

        {/* Jihwi Min's Profile */}
        <div className="profile-card">
          <img src={FounderTwo} alt="Jihwi Min" className="profile-img" />
          <div className="profile-text">
            <h2>Jihwi Min</h2>
            <h3>Computer Science, Data Science, AI<br />Sophomore</h3>
            <p>
              One ordinary day, I received a DM on Instagram from an anonymous
              man. He claimed to have seen my photos on an illegal website and
              asked if I knew about it. He also knew that I had attended an
              international school in Vietnam in my early teens, even though I
              had never shared that information online. Terrified, I responded.
              <br /><br />
              For days, I lived in fear. Just as I tried to move on, he
              messaged again—another photo had surfaced. When I told him to stop
              contacting me, he sent a deepfake of my face and threatened me.
              <br /><br />
              Desperate, I asked my sister to report it, but the process was so
              complicated that we gave up. If this website had existed back
              then, I could have taken action and received the mental care I
              needed to recover.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;

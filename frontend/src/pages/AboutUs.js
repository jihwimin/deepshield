import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/AboutUs.css"; // Ensure this CSS file is imported
import logo from "../assets/deepshield-logo.png";
import Footer from "../components/Footer";
import FounderOne from "../assets/founderone.png";
import FounderTwo from "../assets/foundertwo.png";

const AboutUs = () => {
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


        <h1 className="about-title">About Us</h1>

        <div className="profile-container">
          {/* Jiin Min's Profile */}
          <div className="profile-card">
            <img src={FounderTwo} alt="Jiin Min" className="profile-img"/>
            <div className="profile-text">
              <h2>Jiin Min</h2>
              <h3>Data Science<br/>Junior</h3>
              <p>
                My younger sister became a victim of a deepfake and wanted to
                report it, but since she was overseas, I went to the police
                station on her behalf. However, the police told me that
                internet-related issues like this are handled by a different
                department and that I would need to call them to file a report.
                After that, the case would have to go through a lawsuit and
                proceed to trial.
                <br/><br/>
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
            <img src={FounderOne} alt="Jihwi Min" className="profile-img"/>
            <div className="profile-text">
              <h2>Jihwi Min</h2>
              <h3>Computer Science, Data Science, AI<br/>Sophomore</h3>
              <p>
                One ordinary day, I received a DM on Instagram from an anonymous
                man. He claimed to have seen my photos on an illegal website and
                asked if I knew about it. He also knew that I had attended an
                international school in Vietnam in my early teens, even though I
                had never shared that information online. Terrified, I responded.
                <br/><br/>
                For days, I lived in fear. Just as I tried to move on, he
                messaged again—another photo had surfaced. When I told him to stop
                contacting me, he sent a deepfake of my face and threatened me.
                <br/><br/>
                Desperate, I asked my sister to report it, but the process was so
                complicated that we gave up. If this website had existed back
                then, I could have taken action and received the mental care I
                needed to recover.
              </p>
            </div>
          </div>
        </div>
        {/* Footer */}
        <Footer/>
      </div>
  );
};

export default AboutUs;

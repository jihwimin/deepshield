import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";
import "../styles/Login.css";
import logo from "../assets/deepshield-logo.png";
import Footer from "../components/Footer";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nickname: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, formData);
      alert("Registration successful!");
      navigate("/login"); // Redirect to login page after registration
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed. Please try again.");
    }
  };

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


        {/* Sign-up Section */}
        <div className="login-container">
          <div className="login-box">
            {/* Logo */}
            <div className="login-logo">
              <img src={logo} alt="DeepShield Logo"/>
              <h1>
                <Link to="/dashboard" className="logo-link">
                  <span className="deep">D</span><span className="black">eep</span>
                  <span className="shield">S</span><span className="black">hield</span>
                </Link>
              </h1>
            </div>

            {/* Sign-up Form */}
            <form className="login-form" onSubmit={handleSubmit}>
              {/* Username Field */}
              <div className="input-group">
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={handleChange}
                    required
                />
                <span className="clear-btn">&times;</span>
              </div>

              {/* Password Field */}
              <div className="input-group">
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={handleChange}
                    required
                />
                <span className="clear-btn">&times;</span>
              </div>

              {/* Nickname Field */}
              <div className="input-group">
                <input
                    type="text"
                    name="nickname"
                    placeholder="nickname"
                    onChange={handleChange}
                    required
                />
                <span className="clear-btn">&times;</span>
              </div>

              {/* Login Link */}
              <Link to="/login" className="signup-link">Already have an account? Log in</Link>

              {/* Sign-up Button */}
              <button type="submit" className="login-btn">Sign Up</button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <Footer/>
      </div>
  );
};

export default Register;

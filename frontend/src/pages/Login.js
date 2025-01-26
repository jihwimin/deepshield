import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";
import AuthContext from "../context/AuthContext";
import "../styles/Login.css";
import logo from "../assets/deepshield-logo.png";
import Footer from "../components/Footer";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);
      login(res.data.nickname, res.data.token);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

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
            <Link to="/signup">sign in</Link>
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
            <Link to="/support">Get Mental Support</Link>
            <Link to="/forum">Join the Community</Link>
            <Link to="/about">About Us</Link>
          </div>
        </div>
      </nav>

      {/* Login Section */}
      <div className="login-container">
        <div className="login-box">
          {/* Logo */}
          <div className="login-logo">
            <img src={logo} alt="DeepShield Logo" />
            <h1>
              <span className="deep">D</span><span className="black">eep</span>
              <span className="shield">S</span><span className="black">hield</span>
            </h1>
          </div>

          {/* Login Form */}
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

            {/* Signup Link */}
            <Link to="/signup" className="signup-link">need to sign up?</Link>

            {/* Login Button */}
            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

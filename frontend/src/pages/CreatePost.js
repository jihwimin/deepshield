import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "../styles/CreatePost.css"; // Ensure this CSS file exists
import logo from "../assets/deepshield-logo.png";
import Footer from "../components/Footer";

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: "", content: "", category: "General" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("You must be logged in to create a post.");
        return;
      }

      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        category: formData.category,
        author: user.nickname, // Use nickname, not username
      };

      if (!postData.title || !postData.content || !postData.category) {
        alert("All fields are required.");
        return;
      }

      await axios.post(`${API_BASE_URL}/api/forum/posts`, postData);

      alert("Post created successfully!");
      navigate("/community"); // Redirect to the community page
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post. Please try again.");
    }
  };

  return (
    <div className={`main-container ${isScrolled ? "scrolled" : ""}`}>
     {/* Header */}
     {/* Header (Disappears on Scroll) */}
     <header className={`header ${isScrolled ? "hidden" : ""}`}>
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


     {/* Navigation Bar (Fixed) */}
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
      {/* Create Post Box */}
      <div className="post-container">
        <h2 className="post-title">Create a New Post</h2>
        <form className="post-form" onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
          <textarea name="content" placeholder="Write your post..." onChange={handleChange} required />
          <button type="submit">Post</button>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CreatePost;

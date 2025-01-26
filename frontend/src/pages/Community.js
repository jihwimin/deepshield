import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { Link } from "react-router-dom";
import "../styles/Community.css"; // Make sure this CSS file exists
import logo from "../assets/deepshield-logo.png";
import Footer from "../components/Footer";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("All");
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


 useEffect(() => {
    axios.get(`${API_BASE_URL}/api/forum/posts`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  // Ensure category names are formatted properly for comparison
  const filteredPosts = posts.filter((post) => {
    if (filter === "All") return true;
    return post.category?.toLowerCase() === filter.toLowerCase(); // ✅ Ensures case-insensitive match
  });

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

      {/* Community Section */}
      <h1 className="community-title">Join the Community</h1>

      {/* Filter Buttons */}
        <div className="filter-buttons">
        <button className={filter === "All" ? "active" : ""} onClick={() => setFilter("All")}>
            All Posts
        </button>
        <Link to="/create-post">
            <button>Upload My Experience</button>
        </Link>
        </div>



      {/* Forum Box */}
      <div className="forum-box">
        {filteredPosts.length > 0 ? (
          <>
            <div className="forum-column">
              {filteredPosts.slice(0, Math.ceil(filteredPosts.length / 2)).map((post) => (
                <Link key={post._id} to={`/posts/${post._id}`} className="forum-post">
                  {post.title}
                </Link>
              ))}
            </div>

            <div className="divider"></div>

            <div className="forum-column">
              {filteredPosts.slice(Math.ceil(filteredPosts.length / 2)).map((post) => (
                <Link key={post._id} to={`/posts/${post._id}`} className="forum-post">
                  {post.title}
                </Link>
              ))}
            </div>
          </>
        ) : (
          <p className="no-posts-message">No posts available in this category.</p>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Community;

import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { Link } from "react-router-dom";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("All"); // Default: Show all categories

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/forum/posts`).then((res) => setPosts(res.data));
  }, []);

  // ✅ Filter Posts Based on Category Selection
  const filteredPosts = filter === "All" ? posts : posts.filter(post => post.category === filter);

  return (
    <div>
      <h2>Community Forum</h2>
      <Link to="/create-post"><button>Create a Post</button></Link>

      {/* ✅ Category Filter Buttons */}
      <div style={{ margin: "15px 0" }}>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Seeking Advice")}>Seeking Advice</button>
        <button onClick={() => setFilter("Success Story")}>Success Story</button>
        <button onClick={() => setFilter("General")}>General</button>
      </div>

      {filteredPosts.length === 0 ? (
        <p>No posts available in this category.</p>
      ) : (
        filteredPosts.map((post) => (
          <div key={post._id}>
            <h3><Link to={`/posts/${post._id}`}>{post.title}</Link></h3>
            <p>{post.content.substring(0, 100)}...</p>
            <p><strong>Category:</strong> {post.category}</p>
            <p><strong>By:</strong> {post.author}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Forum;

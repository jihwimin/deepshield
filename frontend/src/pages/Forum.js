import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { Link } from "react-router-dom";

const Forum = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/forum/posts`).then((res) => setPosts(res.data));
  }, []);

  return (
    <div>
      <h2>Community Forum</h2>
      <Link to="/create-post">Create a Post</Link>
      {posts.map((post) => (
        <div key={post._id}>
          <h3><Link to={`/posts/${post._id}`}>{post.title}</Link></h3>
          <p>{post.content.substring(0, 100)}...</p>
          <p><strong>By:</strong> {post.author}</p>
        </div>
      ))}
    </div>
  );
};

export default Forum;

import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user
      if (!user) {
        alert("You must be logged in to create a post.");
        return;
      }

      await axios.post(`${API_BASE_URL}/api/forum/posts`, {
        ...formData,
        author: user.nickname, // Store nickname instead of username
      });

      alert("Post created successfully!");
      navigate("/forum"); // Redirect to forum page
    } catch (error) {
      alert("Error creating post. Please try again.");
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="content" placeholder="Write your post..." onChange={handleChange} required />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;

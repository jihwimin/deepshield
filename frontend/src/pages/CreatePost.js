import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: "", content: "", category: "General" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
  
      // ✅ FIX: Remove 'res' variable since we don't use it
      await axios.post(`${API_BASE_URL}/api/forum/posts`, postData);
  
      alert("Post created successfully!");
      navigate("/forum");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post. Please try again.");
    }
  };
  

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="content" placeholder="Write your post..." onChange={handleChange} required />
        <select name="category" onChange={handleChange}>
          <option value="Seeking Advice">Seeking Advice</option>
          <option value="Success Story">Success Story</option>
          <option value="General">General</option>
        </select>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "", nickname: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      if (err.response) {
        alert(err.response.data.error || "An error occurred. Please try again.");
      } else {
        alert("Server is not responding. Check your backend.");
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="nickname" placeholder="Nickname" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

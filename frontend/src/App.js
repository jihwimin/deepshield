import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Forum from "./pages/Forum";  // Import Forum
import PostDetail from "./pages/PostDetail";  // Import Single Post Page
import CreatePost from "./pages/CreatePost";
import { AuthProvider } from "./context/AuthContext";
import Chatbot from "./pages/Chatbot";
import TalkingMentalCare from "./pages/TalkingMentalCare";
import AboutUs from "./pages/AboutUs"; // Ensure the correct path


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Make Home Page the Dashboard */}
          <Route path="/" element={<ProtectedRoute component={Dashboard} />} />
          <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
          <Route path="/forum" element={<Forum />} /> 
          <Route path="/create-post" element={<CreatePost />} /> 
          <Route path="/posts/:id" element={<PostDetail />} /> 
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/talking-mental-care" element={<TalkingMentalCare />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const ProtectedRoute = ({ component: Component }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  return storedUser ? <Component /> : <Navigate to="/login" />;
};



export default App;

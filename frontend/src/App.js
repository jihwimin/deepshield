import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";  // Import Forum
import PostDetail from "./pages/PostDetail";  // Import Single Post Page
import CreatePost from "./pages/CreatePost";
import { AuthProvider } from "./context/AuthContext";
import Chatbot from "./pages/ChatAssistant";
import TalkingMentalCare from "./pages/VoiceAssistant";
import AboutUs from "./pages/AboutUs"; // Ensure the correct path
import Report from "./pages/Report";
import UnitedStatesReport from "./pages/UnitedStatesReport";
import IndiaReport from "./pages/IndiaReport";
import ChinaReport from "./pages/ChinaReport";
import SingaporeReport from "./pages/SingaporeReport";
import SouthKoreaReport from "./pages/SouthKoreaReport";
import Assistant from "./pages/Assistant";
import Guide from "./pages/GatheringGuide";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/" element={<ProtectedRoute component={Dashboard} />} />
          <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
          <Route path="/community" element={<Community />} /> 
          <Route path="/create-post" element={<CreatePost />} /> 
          <Route path="/posts/:id" element={<PostDetail />} /> 
          <Route path="/assistant/chat-assistant" element={<Chatbot />} />
          <Route path="/assistant/voice-assistant" element={<TalkingMentalCare />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/report" element = {<Report />} />
          <Route path="/report/united-states" element = {<UnitedStatesReport />} />
          <Route path="/report/india" element = {<IndiaReport />} />
          <Route path="/report/china" element = {<ChinaReport />} />
          <Route path="/report/singapore" element = {<SingaporeReport />} />
          <Route path="/report/south-korea" element = {<SouthKoreaReport />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/gathering-guide" element={<Guide />} />
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

import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>
      
      {/* Other Dashboard Buttons */}
      <Link to="/forum"><button>📝 Community Forum</button></Link>
      <Link to="/chatbot"><button>💬 Chat with AI</button></Link>
      
      {/* ✅ Add Button for Talking Mental Care */}
      <Link to="/talking-mental-care">
        <button style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px", borderRadius: "5px", marginTop: "10px" }}>
          🎤 Talking Mental Care
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;

import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav>
      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <span>Welcome, {user.nickname}!</span>
          <Link to="/chatbot">Chatbot</Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>

        </>
      )}
    </nav>
  );
};

export default Navbar;

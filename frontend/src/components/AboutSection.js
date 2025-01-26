import { Link } from "react-router-dom";
import founderOne from "../assets/founderone.png";
import founderTwo from "../assets/foundertwo.png";
import "../styles/AboutSection.css"; // Ensure this CSS file is imported

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        {/* Founder Images */}
        <div className="founders">
          <img src={founderOne} alt="Founder One" className="founder-img" />
          <img src={founderTwo} alt="Founder Two" className="founder-img" />
        </div>

        {/* About Text */}
        <div className="about-text">
          <p>
            DeepShield was created by two sisters determined to fight deepfake crimes. After
            the younger sister became a victim herself, we realized how difficult it was to
            find help and take action. Our mission is to empower victims with the tools,
            support, and community they need to reclaim control and seek justice.
          </p>

          {/* About Us Button */}
          <Link to="/about" className="about-btn">About Us</Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

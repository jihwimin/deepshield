import React from "react";
import "../styles/AboutUs.css";
import FounderOne from "../assets/foundertwo.png"; // Replace with the actual image path
import FounderTwo from "../assets/founderone.png"; // Replace with the actual image path

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>

      <div className="profile-container">
        {/* Jiin Min's Profile */}
        <div className="profile-card">
          <img src={FounderOne} alt="Jiin Min" className="profile-img" />
          <div className="profile-text">
            <h2>Jiin Min</h2>
            <h3>Data Science<br />Junior</h3>
            <p>
              My younger sister became a victim of a deepfake and wanted to
              report it, but since she was overseas, I went to the police
              station on her behalf. However, the police told me that
              internet-related issues like this are handled by a different
              department and that I would need to call them to file a report.
              After that, the case would have to go through a lawsuit and
              proceed to trial.
              <br /><br />
              The process was so complicated that we gave up on reporting it
              altogether. While the severity of deepfake crimes is frequently
              highlighted in the news, there seem to be no concrete solutions to
              address them. That’s why my sister and I decided to create this
              website.
            </p>
          </div>
        </div>

        {/* Jihwi Min's Profile */}
        <div className="profile-card">
          <img src={FounderTwo} alt="Jihwi Min" className="profile-img" />
          <div className="profile-text">
            <h2>Jihwi Min</h2>
            <h3>Computer Science, Data Science, AI<br />Sophomore</h3>
            <p>
              One ordinary day, I received a DM on Instagram from an anonymous
              man. He claimed to have seen my photos on an illegal website and
              asked if I knew about it. He also knew that I had attended an
              international school in Vietnam in my early teens, even though I
              had never shared that information online. Terrified, I responded.
              <br /><br />
              For days, I lived in fear. Just as I tried to move on, he
              messaged again—another photo had surfaced. When I told him to stop
              contacting me, he sent a deepfake of my face and threatened me.
              <br /><br />
              Desperate, I asked my sister to report it, but the process was so
              complicated that we gave up. If this website had existed back
              then, I could have taken action and received the mental care I
              needed to recover.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

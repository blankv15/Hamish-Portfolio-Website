import React from "react";
// 1. IMPORT YOUR IMAGE
// Make sure to place your image file in your project (e.g., in the src/assets folder)
// and update the path below accordingly.
import profileImage from "../assets/profile.png"; // <-- UPDATE THIS PATH

import "./About.css";

function About() {
  return (
    <div className="about-contact-section" id="about">
      <div className="about-contact-grid">
        {/* --- Left Column: About Me (This part is unchanged) --- */}
        <div className="about-me-content">

          <p>
            As a <span>full-stack developer</span>, I bring a unique perspective shaped by
            years of experience in <span>technical customer support</span> and business. This
            background gives me a practical, first-hand understanding of the
            relationship between User Experience, Design, and business goals.
          </p>
          <p>
            My experience ranges from building lead generation websites to, more
            recently, developing AI-powered tools for workflow automation.
            Working on both personal projects and with business owners has given
            me a deep, practical understanding of user intent.
          </p>
          <p>
            As a lifelong learner, my curiosity doesn't stop when the workday
            ends. I'm constantly diving into personal projects that allow me to
            experiment with new technologies and expand my skill set. To stay
            balanced, I'm a dedicated gym-goer and find that the discipline of
            weightlifting complements the mental focus of coding. When I'm ready
            to unwind, I enjoy getting hands on in the kitchen and cooking some
            good food.
          </p>
        </div>

        {/* --- Right Column: Replaced with an Image --- */}
        <div className="about-image-container">
          <img 
            src={profileImage} 
            alt="A portrait of Hamish Chhagan" 
            className="about-image" 
          />
        </div>
        
      </div>
    </div>
  );
}

export default About;
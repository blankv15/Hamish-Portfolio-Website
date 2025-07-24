import React, { useState } from "react";
import "./About.css";

function About() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="about-section">
      <div className="about-grid">
        <div className="about-image-container">
          <img
            src={`${API_URL}/images/profile/profile2.png`}
            alt="A portrait of Hamish Chhagan"
            className="about-image"
          />
        </div>

        <div className="about-me-content">
          <p>
            A full-stack developer, I bring a unique perspective
            shaped by years of experience in and business. This
            background gives me a practical, first-hand understanding of the
            relationship between User Experience, Design, and business goals.
          </p>
          <br/>

          <div className={`collapsible-text ${isExpanded ? "expanded" : ""}`}>
            <p>
              My experience ranges from building lead generation websites to, more
              recently, developing AI-powered tools for workflow automation.
              Working on both personal projects and with business owners has given
              me a deep, practical understanding of user intent.
            </p>
                      <br/>

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
          
          {/* A single button that toggles the text and changes its label */}
          <button onClick={toggleReadMore} className="read-more-button">
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;

import React, { useState } from "react";
import "./About.css";

function About() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="about-contact-section" id="about">
      <div className="about-contact-grid">
        {/* The image container is now first in the code for easier mobile ordering */}
        <div className="about-image-container">
          <img
            src={`${API_URL}/images/profile/profile.png`}
            alt="A portrait of Hamish Chhagan"
            className="about-image"
          />
        </div>

        <div className="about-me-content">
          {/* This new wrapper helps manage the collapsed state and the overlay */}
          <div className={`text-wrapper ${isExpanded ? "expanded" : ""}`}>
            <p>
              As a <span>full-stack developer</span>, I bring a unique perspective
              shaped by years of experience in{" "}
              <span>technical customer support</span> and business. This
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
          
          {/* The button is now positioned with CSS relative to the text wrapper */}
          {!isExpanded && (
            <button onClick={toggleReadMore} className="read-more-button">
              Read More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default About;

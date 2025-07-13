import React from "react";
import GetInTouchSimple from "./GetInTouchSimple"; // Assuming this is your form component
import "./AboutAndContact.css"; // The new stylesheet

function AboutAndContact() {
  return (
    <div className="about-contact-section" id="about">
      <div className="about-contact-grid">
        {/* --- Left Column: About Me --- */}
        <div className="about-me-content">
          <h2 className="section-title">
            Who is <span>Hamish Chhagan</span>.
          </h2>
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

        {/* --- Right Column: Contact Form --- */}
        <div className="contact-form-container">
          <h3 className="form-title">Let's Connect</h3>
          <p className="form-intro">
            Have a project in mind or just want to say hello? Drop me a line.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutAndContact;

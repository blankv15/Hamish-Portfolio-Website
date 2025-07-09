import React from 'react';
import GetInTouchSimple from './GetInTouchSimple'; // Assuming this is your form component
import './AboutAndContact.css'; // The new stylesheet

function AboutAndContact() {
  return (
    <div className="about-contact-section" id="about">
      <div className="about-contact-grid">
        {/* --- Left Column: About Me --- */}
        <div className="about-me-content">
          <h2 className="section-title">About Me</h2>
          <p>
            I'm a passionate Full-Stack Developer based in Auckland, New Zealand, with a knack for building elegant and effective digital solutions. My journey in tech is driven by a love for problem-solving and a desire to create seamless user experiences.
          </p>
          <p>
            From crafting responsive front-end interfaces to architecting robust back-end systems, I enjoy working across the entire stack. When I'm not coding, you can find me exploring new technologies or enjoying the great outdoors.
          </p>
        </div>

        {/* --- Right Column: Contact Form --- */}
        <div className="contact-form-container">
           <h3 className="form-title">Let's Connect</h3>
           <p className="form-intro">
             Have a project in mind or just want to say hello? Drop me a line.
           </p>
           <GetInTouchSimple />
        </div>
      </div>
    </div>
  );
}

export default AboutAndContact;

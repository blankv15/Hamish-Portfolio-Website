import React from 'react';
import './Hero.css'; // The stylesheet for our hero component
import heroImage from '../assets/hero.png'; // Make sure this path is correct for your new image

const Hero = () => {
  return (
    <section className="hero-container">
      {/* The main content area, centered in the viewport */}
      <div className="hero-content">
        {/* The intro text and SVG arrow have been removed. 
            We now only need the single image. */}
        <img 
          src={heroImage} 
          alt="Hamish Chhagan with an arrow pointing towards him" 
          className="hero-profile-image" 
        >
        </img>
      </div>

      {/* The footer text, positioned at the bottom of the viewport */}
      <footer className="hero-footer">
        <p>
          Welcome to the website, he's a <span className="highlight-text">Fullstack Developer</span>, check out my thing.
        </p>
      </footer>
    </section>
  );
};

export default Hero;

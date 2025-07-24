import React from 'react';
import './Hero.css';

const API_URL = import.meta.env.VITE_API_URL;

function Hero() {
  return (
    <section className="hero">
      <img src={`${API_URL}/images/hero/hero9.png`} alt="Hamish Chhagan" />
      <h1 className="heroText">
        Welcome to my Website,{" "}
        <span className="name">I'm a FullStack Developer</span>.
      </h1>
    </section>
  );
}

export default Hero;

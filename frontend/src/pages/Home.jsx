import React from 'react';
import './Home.css'; 
import Hero from '../components/Hero';
import ProjectSection from '../components/ProjectSection';
import TabSection from '../components/TabSection';
import About from '../components/About';
import ContactSection from '../components/ContactSection';
import { useScrollToSection } from '../hooks/useScrollToSection';

const Home = () => {
  const { projects, skills, about, contact } = useScrollToSection();

  return (
    <main>
      <Hero />

      {/* The missing section titles are now restored */}
      <section ref={projects} id="projects" className="content-section">
        <h2 className="section-title">
           My <span>Projects</span>
        </h2>
        <ProjectSection />
      </section>

      <section ref={skills} id="skills" className="content-section">
        <h2 className="section-title">
          My <span>Skills</span>
        </h2>
        <TabSection />
      </section>

      <section ref={about} id="about" className="content-section">
        <h2 className="section-title">
          Who is <span>Hamish Chhagan</span>?
        </h2>
        <About />
      </section>
      
      <section ref={contact} id="contact" className="content-section">
         <ContactSection />
      </section>
    </main>
  );
};

export default Home;
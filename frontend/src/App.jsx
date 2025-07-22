import React, { useState } from "react";
import { Modal } from "@mantine/core";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import ProjectSection from "./components/ProjectSection"; 
import TabSection from "./components/TabSection";
import ProjectDetailPage from "./components/ProjectDetailPage";
import Stopwatch from "./components/Stopwatch";
import ToDoList from "./components/ToDoList";
import About from "./components/About";
import ContactSection from "./components/ContactSection";

import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

function App() {
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setModalOpened(true);
  };

  const componentMap = {
    Stopwatch: Stopwatch,
    ToDoList: ToDoList,
  };

  const ComponentToEmbed = selectedProject
    ? componentMap[selectedProject.embeddedComponent]
    : null;

  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <main>
        <section className="hero">
          <img src={`${API_URL}/images/hero/hero5.png`} alt="Hamish Chhagan" />
          <h1 className="heroText">
            Welcome to my Website,{" "}
            <span className="name">I'm a FullStack Developer</span>.
          </h1>
        </section>

        <section id="projects" className="content-section">
          <h2 className="section-title">Featured Projects</h2>
          <ProjectSection onProjectClick={handleOpenModal} />
        </section>

        <section id="skills" className="content-section">
          <h2 className="section-title">
            My <span>Skills</span>.
          </h2>
          <TabSection />
        </section>

        <section id="about" className="content-section">
          <h2 className="section-title">
            Who is <span>Hamish Chhagan</span>.
          </h2>
          <About />
        </section>
        
        <section id="contact" className="content-section">
           <ContactSection />
        </section>

        <Modal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          title={selectedProject?.title || ""}
          size="xl"
          centered
          // FIX: Give the modal a higher z-index than the navbar
          zIndex={2000}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
        >
          {selectedProject && (
            <ProjectDetailPage
              project={selectedProject}
              EmbeddedComponent={ComponentToEmbed}
            />
          )}
        </Modal>
      </main>
    </GoogleReCaptchaProvider>
  );
}

export default App;

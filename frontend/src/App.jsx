import React, { useState } from "react";
import { Modal } from "@mantine/core";

// Import the new ProjectSection component
import ProjectSection from "./components/ProjectSection"; 

import TabSection from "./components/TabSection";
import ProjectDetailPage from "./components/ProjectDetailPage";
import Stopwatch from "./components/Stopwatch";
import ToDoList from "./components/ToDoList";
import About from "./components/About";
import ContactSection from "./components/ContactSection";

import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

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
    // It's best practice to wrap the entire app in the provider
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
          {/* Use the new, self-contained component here */}
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
  );
}

export default App;

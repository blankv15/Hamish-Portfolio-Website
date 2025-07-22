import React, { useState } from "react";
import { Modal, Loader, Alert, Center } from "@mantine/core";
import { IconAlertCircle } from '@tabler/icons-react';

import useFetch from "./hooks/useFetch"; 
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import TabSection from "./components/TabSection";
import MantineCard from "./components/MantineCard";
import ProjectDetailPage from "./components/ProjectDetailPage";
import Stopwatch from "./components/Stopwatch";
import ToDoList from "./components/ToDoList";
import About from "./components/About";
import ContactSection from "./components/ContactSection";

import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

function ProjectGrid({ onProjectClick }) {
  // FIX: Added a forward slash to the API endpoint
  const { data: projectsData, loading, error } = useFetch(`${API_URL}/api/projects`);

  if (loading) {
    return <Center style={{ minHeight: '300px' }}><Loader size="xl" /></Center>;
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size="1rem" />} title="Error!" color="red">
        Failed to load project data: {error}
      </Alert>
    );
  }

  return (
    <div className="featured-grid">
      {projectsData && projectsData.map((project) => (
        <div
          key={project.id}
          className="featured-grid-item"
          onClick={() => onProjectClick(project)}
          style={{ cursor: "pointer" }}
        >
          <MantineCard
            title={project.title}
            imageUrl={`${API_URL}${project.images[0]}`}
            badgeText={project.technologies[0]}
            description={project.summary}
            buttonText="Learn More"
          />
        </div>
      ))}
    </div>
  );
}


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
    // Wrap the entire app in the reCAPTCHA provider
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
          <ProjectGrid onProjectClick={handleOpenModal} />
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
            <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>

        <section id="contact" className="content-section">
           <ContactSection />
        </section>
    </GoogleReCaptchaProvider>

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

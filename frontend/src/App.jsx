import React, { useState } from "react";
import { Modal, Loader, Alert } from "@mantine/core";
import { IconAlertCircle } from '@tabler/icons-react';

import useFetch from "./hooks/useFetch"; 
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import TabSection from "./components/TabSection";
import ProjectDetailPage from "./components/ProjectDetailPage";
import Stopwatch from "./components/Stopwatch";
import ToDoList from "./components/ToDoList";
import About from "./components/About";
import ProjectCard from "./components/ProjectCard";

import "./App.css";
import ContactSection from "./components/ContactSection";

const API_URL = import.meta.env.VITE_API_URL;
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;



function ProjectGrid({ onProjectClick }) {
  const { data: projectsData, loading, error } = useFetch(`${API_URL}/api/projects`);

  if (loading) {
    return <Loader size="xl" />;
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
          <Mantinecard
            title={project.title}
            imageUrl={`${API_URL}${project.images[0]}`}
            badgeText={project.technologies[0]}
            description={project.summary}
            buttonText={project.buttonText}
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
    <>
      <div className="hero">
        <img src={`${API_URL}/images/hero/hero.png`} alt="Hamish Chhagan" />
        <h1 className="heroText">
          Welcome to my Website,{" "}
          <span className="name">I'm a FullStack Developer</span>. Check out my thing.
        </h1>
      </div>

      <div className="featured-projects" id="projects">
        <h2>Featured Projects</h2>
        <ProjectGrid onProjectClick={handleOpenModal} />
      </div>

      <div className="skills" id="skills">
        <h2>
          My <span>Skills</span>.
        </h2>
        <TabSection />
      </div>

      <div className="about">
        <h2>
          Who is <span>Hamish Chhagan</span>.
        </h2>
        <About />
      </div>
      <GoogleReCaptchaProvider>

        <ContactSection />

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
    </>
  );
}

export default App;

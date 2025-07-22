import React, { useState } from "react";
import { Modal, Loader, Alert, Title, Text } from "@mantine/core";
import { IconAlertCircle } from '@tabler/icons-react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import useFetch from "./hooks/useFetch"; 

import TabSection from "./components/TabSection";
import ProjectDetailPage from "./components/ProjectDetailPage";
import Stopwatch from "./components/Stopwatch";
import ToDoList from "./components/ToDoList";
import About from "./components/About";
import ProjectCard from "./components/ProjectCard";
import ContactSection from "./components/ContactSection";

import "./App.css";

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
          <ProjectCard
            title={project.title}
            imageUrl={`${API_URL}${project.images[0]}`}
            badgeText={project.technologies[0]}
            description={project.summary}
            buttonText={project.buttonText || "Learn More"}
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

  if (!RECAPTCHA_SITE_KEY) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <Title order={3}>Configuration Error</Title>
        <Text>VITE_RECAPTCHA_SITE_KEY is missing. Please check your environment variables.</Text>
      </div>
    );
  }

  return (
   
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <div className="hero">
        <img src={`${API_URL}/images/hero/hero.png`} alt="Hamish Chhagan" />
        <h1 className="heroText">
          Welcome to my Website,{" "}
          <span className="name">I'm a FullStack Developer</span>.
        </h1>
      </div>

      <div className="featured-projects" id="projects">
        <h2>Featured Projects</h2>
        <ProjectGrid onProjectClick={handleOpenModal} />
      </div>

      <div className="skills" id="skills">
        <h2>
          <span>Skills</span>.
        </h2>
        <TabSection />
      </div>

      <div className="about">
        <h2>
          Who is <span>Hamish Chhagan</span>.
        </h2>
        <About />
      </div>
      
      <ContactSection />

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
    </GoogleReCaptchaProvider>
  );
}

export default App;

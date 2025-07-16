import React, { useState } from "react";
import { Modal, Loader, Alert } from "@mantine/core";
import { IconAlertCircle } from '@tabler/icons-react';

// Helper hook for fetching data
import useFetch from "./hooks/useFetch"; 

// Import components
import TabSection from "./components/TabSection";
import MantineCard from "./components/MantineCard";
import GetInTouchSimple from "./components/GetInTouchSimple";
import ProjectDetailPage from "./components/ProjectDetailPage";
import Stopwatch from "./components/Stopwatch";
import ToDoList from "./components/ToDoList";
import About from "./components/About";

// Import styles
import "./App.css";

// Define the base URL of your Express server
const API_URL = import.meta.env.VITE_API_URL;

// --- Helper Component for Rendering Projects ---
// This component encapsulates all the logic for fetching and displaying projects.
function ProjectGrid({ onProjectClick }) {
  const { data: projectsData, loading, error } = useFetch(`${API_URL}data/projectsData.json`);

  // 1. If loading, return ONLY the loader.
  if (loading) {
    return <Loader size="xl" />;
  }

  // 2. If there's an error, return ONLY the error alert.
  if (error) {
    return (
      <Alert icon={<IconAlertCircle size="1rem" />} title="Error!" color="red">
        Failed to load project data: {error}
      </Alert>
    );
  }

  // 3. If everything is successful, return ONLY the grid of projects.
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
  // State for the modal
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setModalOpened(true);
  };

  // Map component names from JSON to actual imported components
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
        <img src={`${API_URL}/images/hero/hero3.png`} alt="Hamish Chhagan" />
        <h1 className="heroText">
          Welcome to my Website,{" "}
          <span className="name">I'm a FullStack Developer</span>. Check out my things
        </h1>
      </div>

      <div className="featured-projects" id="projects">
        <h2>Featured Projects</h2>
        {/* Use the new, self-contained ProjectGrid component */}
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

      <div id="contact" className="contact">
        <GetInTouchSimple />
      </div>

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

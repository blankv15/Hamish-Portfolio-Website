import profilePic from "../src/assets/profile.png";
import { Card, SimpleGrid, Group ,Modal} from "@mantine/core";
import React, { useState } from "react";
import DisplayCard from "./components/DisplayCard";
import SomeData from "./assets/data/someData.json";
import TabSection from "./components/TabSection";
import TechBadge from "./components/TechBadge";
import MantineCard from "./components/ManTineCard";
import "./App.css";
import GetInTouchSimple from "./components/GetInTouchSimple";
import { projectsData } from "./assets/data/projectsData"; // Your centralized data
import { Link } from "react-router";
import ProjectDetailPage from "./components/ProjectDetailPage";

function App() {
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Function to open the modal and set the project data
  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setModalOpened(true);
  };
  return (
    <>
      <div className="hero">
        <img src={profilePic} />
        <h1 className="heroText">
          Hey, I'm <span className="name">Hamish Chhagan.</span> Here you can
          find my latest work & projects I'm working on at the moment.
        </h1>
      </div>
      <div className="featured-projects">
        <h2>Featured Projects</h2>
        {/* This grid is now dynamically generated from your projectsData file */}
        <div className="featured-grid">
          {projectsData.map((project) => (
            // When a grid item is clicked, it will open the modal with that project's data
            <div
              key={project.id}
              className="featured-grid-item"
              onClick={() => handleOpenModal(project)}
              style={{ cursor: "pointer" }}
            >
              <MantineCard
                title={project.title}
                imageUrl={project.images[0]} // Use the first image for the card
                badgeText={project.technologies[0]} // Use the first tech as a badge
                description={project.summary}
                // The button is now just for show, as the whole card is clickable
                buttonText="Learn More"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="skills">
        <h2>My Skills</h2>
        <TabSection />
      </div>
      <div className="contact-form">
        <h2>Get In Touch</h2>

        <div className="contact-grid">
          <div className="contact-text">
            <h6>
              Whether you're a potential client, a fellow creative, or just
              Browse, I'd be happy to connect. Drop me a line, and let's start a
              conversation.
            </h6>
          </div>

          <div className="form-box">
            <GetInTouchSimple />
          </div>
        </div>
      </div>



      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={selectedProject?.title || ''}
        size="xl"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        {/* The ProjectDetailPage is rendered inside the modal only when a project is selected */}
        {selectedProject && <ProjectDetailPage project={selectedProject} />}
      </Modal>
    
    </>
  );
}

export default App;

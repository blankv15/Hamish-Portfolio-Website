import React, { useState } from "react";
import { Modal } from "@mantine/core";

import TabSection from "./components/TabSection";
import MantineCard from "./components/MantineCard";
import GetInTouchSimple from "./components/GetInTouchSimple";
import ProjectDetailPage from "./components/ProjectDetailPage";
import Stopwatch from './components/Stopwatch';
import ToDoList from "./components/ToDoList";

import { projectsData } from "./assets/data/projectsData";
import profilePic from "../src/assets/profile.png";
import "./App.css";

function App() {
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setModalOpened(true);
  };

  const componentMap = {
    Stopwatch: Stopwatch,
    ToDoList: ToDoList
    
  };


  const ComponentToEmbed = selectedProject ? componentMap[selectedProject.embeddedComponent] : null;

  return (
    <>
      <div className="hero">
        <img src={profilePic} alt="Hamish Chhagan" />
        <h1 className="heroText">
          Hey, I'm <span className="name">Hamish Chhagan.</span> Here you can
          find my latest work & projects I'm working on at the moment.
        </h1>
      </div>
      <div className="featured-projects">
        <h2>Featured Projects</h2>
        <div className="featured-grid">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="featured-grid-item"
              onClick={() => handleOpenModal(project)}
              style={{ cursor: "pointer" }}
            >
              <MantineCard
                title={project.title}
                imageUrl={project.images[0]}
                badgeText={project.technologies[0]}
                description={project.summary}
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
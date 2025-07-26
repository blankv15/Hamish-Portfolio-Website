import React from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Modal, Loader, Center } from '@mantine/core';

import Hero from './components/Hero';
import ProjectSection from './components/ProjectSection';
import TabSection from './components/TabSection';
import ProjectDetailPage from './components/ProjectDetailPage';
import About from './components/About';
import ContactSection from './components/ContactSection';
import useFetch from './hooks/useFetch';

// Import the interactive components
import Stopwatch from './components/Stopwatch';
import ToDoList from './components/ToDoList';

import './App.css';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const API_URL = import.meta.env.VITE_API_URL;

// Corrected: The keys now match the 'component' field in your project data
const componentMap = {
  'Stopwatch': Stopwatch,
  'ToDoList': ToDoList,
};

const MainPageLayout = () => (
  <main>
    <Hero />
    <section id="projects" className="content-section">
      <h2 className="section-title">
        My <span>Projects</span>
      </h2>
      <ProjectSection />
    </section>
    <section id="skills" className="content-section">
      <h2 className="section-title">
        My <span>Skills</span>
      </h2>
      <TabSection />
    </section>
    <section id="about" className="content-section">
      <h2 className="section-title">
        Who is <span>Hamish Chhagan</span>?
      </h2>
      <About />
    </section>
    <section id="contact" className="content-section">
      <ContactSection />
    </section>
  </main>
);

const ProjectModal = () => {
  const navigate = useNavigate();
  const match = useMatch('/project/:id');
  const projectId = match?.params.id;

  const { data: projects } = useFetch(`${API_URL}/api/projects`);
  const project = projects?.find(p => p.id === projectId);

  // Corrected: The lookup now uses 'project.component' instead of 'project.id'
  const EmbeddedComponent = project ? componentMap[project.embeddedComponent] : null;

  const handleClose = () => {
    navigate('/');
  };

  return (
    <Modal
      opened={!!match}
      onClose={handleClose}
      size="xl"
      centered
      zIndex={2000}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      title={project?.title || ''}
      styles={{
        header: { backgroundColor: 'var(--background-light)', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)' },
        body: { backgroundColor: 'var(--background-light)', padding: '0' },
        title: { color: 'var(--text-primary)', fontWeight: '700', fontSize: '1.5rem' },
        close: { color: 'var(--text-primary)', '&:hover': { backgroundColor: 'var(--background-card)' } },
      }}
    >
      {project ? (
        <ProjectDetailPage project={project} EmbeddedComponent={EmbeddedComponent} />
      ) : (
        <Center style={{ height: '50vh' }}><Loader /></Center>
      )}
    </Modal>
  );
};

function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <MainPageLayout />
      <ProjectModal />
    </GoogleReCaptchaProvider>
  );
}

export default App;
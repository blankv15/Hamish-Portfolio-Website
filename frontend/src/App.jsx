import React from 'react';
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Modal, Loader, Center } from '@mantine/core';

// Import your new Home component
import Home from './pages/Home'; 
import ProjectDetailPage from './components/ProjectDetailPage';
import useFetch from './hooks/useFetch';

import Stopwatch from './components/Stopwatch';
import ToDoList from './components/ToDoList';

import './App.css';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const API_URL = import.meta.env.VITE_API_URL;

const componentMap = {
  'Stopwatch': Stopwatch,
  'ToDoList': ToDoList,
};

const ProjectModal = () => {
    // ... (This component remains unchanged from our previous steps)
  const navigate = useNavigate();
  const match = useMatch('/project/:id');
  const projectId = match?.params.id;

  const { data: projects } = useFetch(`${API_URL}/api/projects`);
  const project = projects?.find(p => p.id === projectId);

  const EmbeddedComponent = project ? componentMap[project.component] : null;

  const handleClose = () => {
    navigate(-1); // Go back to the previous page
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
      {/* Define the routes for your application */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Home />} />
        <Route path="/skills/:tabValue" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/contact" element={<Home />} />
      </Routes>
      
      {/* The ProjectModal is still rendered here to appear over any page */}
      <ProjectModal />
    </GoogleReCaptchaProvider>
  );
}

export default App;
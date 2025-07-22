import React, { useState } from 'react';
import { Loader, Alert, Center, Button, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconAlertCircle } from '@tabler/icons-react';
import useFetch from '../hooks/useFetch';
import MantineCard from './MantineCard';
import './ProjectSection.css';

const API_URL = import.meta.env.VITE_API_URL;

function ProjectSection({ onProjectClick }) {
  const { data: projectsData, loading, error } = useFetch(`${API_URL}/api/projects`);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (loading) {
    return <Center style={{ minHeight: '300px' }}><Loader size="xl" /></Center>;
  }

  if (error) {
    return <Alert icon={<IconAlertCircle size="1rem" />} title="Error!" color="red">Failed to load project data: {error}</Alert>;
  }

  // FIX: Add a check to ensure projectsData is not null or empty before rendering.
  // This prevents the "Cannot read properties of null" error.
  if (!projectsData) {
    return <Center><Text>No projects to display.</Text></Center>;
  }

  // On mobile, show only 3 projects unless expanded. On desktop, show all.
  const projectsToShow = isMobile && !isExpanded ? projectsData.slice(0, 3) : projectsData;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="featured-grid">
        {projectsToShow.map((project) => (
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
      
      {/* This button only appears on mobile if there are more than 3 projects */}
      {isMobile && projectsData.length > 3 && (
        <Center mt="xl">
          <button onClick={toggleExpanded} className="view-more-button">
            {isExpanded ? 'View Less' : 'View More'}
          </button>
        </Center>
      )}
    </>
  );
}

export default ProjectSection;

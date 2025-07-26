import React, { useState, useRef } from 'react';
import { Loader, Alert, Center, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconAlertCircle } from '@tabler/icons-react';
import useFetch from '../hooks/useFetch';
import ProjectCard from './ProjectCard';
import './ProjectSection.css';
import { Link } from 'react-router-dom'; // Import Link

const API_URL = import.meta.env.VITE_API_URL;

function ProjectSection() {
  const { data: projectsData, loading, error } = useFetch(`${API_URL}/api/projects`);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const buttonRef = useRef(null);

  if (loading) {
    return <Center style={{ minHeight: '300px' }}><Loader size="xl" /></Center>;
  }

  if (error) {
    return <Alert icon={<IconAlertCircle size="1rem" />} title="Error!" color="red">Failed to load project data: {error}</Alert>;
  }

  if (!projectsData) {
    return <Center><Text>No projects to display.</Text></Center>;
  }

  const projectsToShow = isMobile && !isExpanded ? projectsData.slice(0, 3) : projectsData;

  const toggleExpanded = () => {
    if (isExpanded && buttonRef.current) {
      setTimeout(() => {
        buttonRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className="featured-grid">
        {projectsToShow.map((project) => (
          // Each card links to a unique URL for the project
          <Link key={project.id} to={`/project/${project.id}`} className="featured-grid-item" style={{ textDecoration: 'none' }}>
            <ProjectCard
              title={project.title}
              imageUrl={`${API_URL}${project.images[0]}`}
              badgeText={project.technologies[0]}
              description={project.summary}
              buttonText="Learn More"
            />
          </Link>
        ))}
      </div>

      {isMobile && projectsData.length > 3 && (
        <Center mt="xl" ref={buttonRef}>
          <button onClick={toggleExpanded} className="view-more-button">
            {isExpanded ? 'View Less' : 'View More'}
          </button>
        </Center>
      )}
    </div>
  );
}

export default ProjectSection;
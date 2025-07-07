import React, { useState } from 'react';

// --- Reusable Badge Component ---
const TechBadge = ({ techName }) => (
  <span style={{
    backgroundColor: '#e0e0e0',
    color: '#333',
    padding: '4px 12px',
    margin: '4px',
    borderRadius: '16px',
    fontSize: '14px',
    display: 'inline-block',
    fontWeight: '500'
  }}>
    {techName}
  </span>
);

// --- Image Carousel Component ---
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const goToSlide = (slideIndex) => {
      setCurrentIndex(slideIndex);
  }

  const carouselStyles = {
    height: '500px',
    position: 'relative',
    margin: '2rem 0',
  };

  const slideStyles = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${images[currentIndex]})`,
    transition: 'background-image 0.5s ease-in-out',
  };

  const arrowStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '45px',
    color: 'white',
    zIndex: 1,
    cursor: 'pointer',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none'
  };
  
  const dotsContainerStyles = {
      display: 'flex',
      justifyContent: 'center',
      position: 'absolute',
      bottom: '20px',
      width: '100%'
  }
  
  const dotStyles = {
      margin: '0 5px',
      cursor: 'pointer',
      fontSize: '12px',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.5)'
  }

  return (
    <div style={carouselStyles}>
      <div style={{ ...arrowStyles, left: '15px' }} onClick={goToPrevious}>‹</div>
      <div style={{ ...arrowStyles, right: '15px' }} onClick={goToNext}>›</div>
      <div style={slideStyles}></div>
      <div style={dotsContainerStyles}>
          {images.map((slide, slideIndex) => (
              <div key={slideIndex} style={{...dotStyles, backgroundColor: currentIndex === slideIndex ? '#fff' : 'rgba(255, 255, 255, 0.5)'}} onClick={() => goToSlide(slideIndex)}></div>
          ))}
      </div>
    </div>
  );
};


// --- Main Project Detail Page Component ---
const ProjectDetailPage = () => {
  // In a real app, you would use the `id` to fetch data for the specific project.
  // Example: const { projectId } = useParams();
  // const project = fetchProjectById(projectId);

  // For this template, we'll use mock data with multiple images.
  const project = {
    title: 'Interactive Data Dashboard',
    images: [
        'https://placehold.co/1200x800/2c265a/white?text=Dashboard+View',
        'https://placehold.co/1200x800/4d476c/white?text=Analytics+Page',
        'https://placehold.co/1200x800/6d6a7d/white?text=User+Profile'
    ],
    description: 'This project is a full-stack web application designed to visualize complex datasets in real-time. It features a dynamic and responsive user interface built with React, allowing users to filter, sort, and explore data through interactive charts and graphs. The backend is powered by Node.js and Express, providing a robust API that serves data from a PostgreSQL database. The application is fully containerized with Docker and deployed on AWS for scalability and reliability.',
    technologies: ['React', 'D3.js', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'AWS'],
    githubUrl: 'https://github.com/your-username/your-repo',
    liveUrl: 'https://your-live-project-url.com' // Optional live site link
  };

  const containerStyles = {
    maxWidth: '900px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#f0f0f0',
    fontFamily: '"Questrial", sans-serif',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  };

  const titleStyles = {
    fontSize: 'clamp(2rem, 5vw, 2.75rem)',
    marginBottom: '1rem',
    borderBottom: '2px solid #1c7ed6',
    paddingBottom: '0.5rem',
    color: 'white'
  };

  const descriptionStyles = {
    fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
    lineHeight: '1.7',
    marginBottom: '2rem'
  };

  const techSectionStyles = {
    marginBottom: '2.5rem'
  };
  
  const techHeaderStyles = {
      fontSize: '1.5rem',
      marginBottom: '1rem',
      color: 'white'
  }

  const linkButtonStyles = {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#1c7ed6',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    marginRight: '1rem'
  };

  // Responsive styles for the carousel container
  const responsiveCarouselStyles = {
      '@media (max-width: 768px)': {
        height: '300px',
      },
      '@media (max-width: 480px)': {
        height: '250px',
        margin: '1.5rem -1rem' // Allow it to bleed to the edges on mobile
      }
  };

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>{project.title}</h1>

      {/* Integrate the Carousel */}
      {project.images && project.images.length > 0 && (
        <div style={responsiveCarouselStyles}>
            <ImageCarousel images={project.images} />
        </div>
      )}
      
      <p style={descriptionStyles}>
        {project.description}
      </p>

      <div style={techSectionStyles}>
        <h3 style={techHeaderStyles}>Technologies Used</h3>
        <div>
          {project.technologies.map(tech => (
            <TechBadge key={tech} techName={tech} />
          ))}
        </div>
      </div>

      <div>
        <a 
          href={project.githubUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          style={linkButtonStyles}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#155a9a'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#1c7ed6'}
        >
          View on GitHub
        </a>
        {project.liveUrl && (
           <a 
             href={project.liveUrl} 
             target="_blank" 
             rel="noopener noreferrer"
             style={{...linkButtonStyles, backgroundColor: '#555'}}
             onMouseOver={e => e.currentTarget.style.backgroundColor = '#333'}
             onMouseOut={e => e.currentTarget.style.backgroundColor = '#555'}
           >
             View Live Site
           </a>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;

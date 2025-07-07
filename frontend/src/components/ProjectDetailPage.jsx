import React, { useState } from 'react';
import './ProjectDetailPage.css'; // Import the new CSS file

// --- Reusable Badge Component ---
// This could also be moved to its own file if desired.
const TechBadge = ({ techName }) => (
  <span className="pdp-tech-badge">{techName}</span>
);

// --- Image Carousel Component (Now using CSS classes) ---
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

  return (
    <div className="pdp-carousel">
      {images.length > 1 && (
        <>
          <div className="pdp-carousel-arrow left" onClick={goToPrevious}>‹</div>
          <div className="pdp-carousel-arrow right" onClick={goToNext}>›</div>
        </>
      )}
      <div 
        className="pdp-carousel-slide" 
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>
      <div className="pdp-dots-container">
          {images.length > 1 && images.map((_, slideIndex) => (
              <div 
                key={slideIndex} 
                className={`pdp-dot ${currentIndex === slideIndex ? 'active' : ''}`}
                onClick={() => goToSlide(slideIndex)}
              ></div>
          ))}
      </div>
    </div>
  );
};


// --- Main Project Detail Page Component ---
// It now accepts a `project` object as a prop.
const ProjectDetailPage = ({ project }) => {
    console.log(project[0])
  
  // If no project data is passed, don't render anything.
  if (!project) {
    return null;
  }

  return (
    // All inline styles have been replaced with CSS classes.
    <div className="pdp-container">
      <h1 className="pdp-title">{project.title}</h1>

      {project.images && project.images.length > 0 && (
        <ImageCarousel images={project.images} />
      )}
      
      <p className="pdp-description">
        {project.description}
      </p>

      <div className="pdp-tech-section">
        <h3 className="pdp-tech-header">Technologies Used</h3>
        <div>
          {project.technologies.map(tech => (
            <TechBadge key={tech} techName={tech} />
          ))}
        </div>
      </div>

      <div className="pdp-links-section">
        <a 
          href={project.githubUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="pdp-link-button github"
        >
          View on GitHub
        </a>
        {project.liveUrl && (
           <a 
             href={project.liveUrl} 
             target="_blank" 
             rel="noopener noreferrer"
             className="pdp-link-button live"
           >
             View Live Site
           </a>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;

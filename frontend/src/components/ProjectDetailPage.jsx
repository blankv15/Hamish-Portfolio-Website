import React, { useState } from "react";
import "./ProjectDetailPage.css";

const TechBadge = ({ techName }) => (
  <span className="pdp-tech-badge">{techName}</span>
);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
  };

  // Handle case where images might not be loaded yet
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="pdp-carousel">
      {images.length > 1 && (
        <>
          <div className="pdp-carousel-arrow left" onClick={goToPrevious}>
            ‹
          </div>
          <div className="pdp-carousel-arrow right" onClick={goToNext}>
            ›
          </div>
        </>
      )}
      <div
        className="pdp-carousel-slide"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>
      <div className="pdp-dots-container">
        {images.length > 1 &&
          images.map((_, slideIndex) => (
            <div
              key={slideIndex}
              className={`pdp-dot ${
                currentIndex === slideIndex ? "active" : ""
              }`}
              onClick={() => goToSlide(slideIndex)}
            ></div>
          ))}
      </div>
    </div>
  );
};

const ProjectDetailPage = ({ project, EmbeddedComponent }) => {
  if (!project) {
    return null;
  }

  // Transform the relative image paths into full, absolute URLs
  const fullImageUrls = project.images 
    ? project.images.map(imagePath => `${API_URL}${imagePath}`)
    : [];

  const hasLinks = project.githubUrl || project.liveUrl;

  return (
    <div className="pdp-container">
      <h1 className="pdp-title">{project.title}</h1>

      {/* Pass the new array with full URLs to the ImageCarousel */}
      {project.images && project.images.length > 0 && (
        <ImageCarousel images={fullImageUrls} />
      )}

      {EmbeddedComponent && (
        <div className="pdp-embedded-component-container">
          <EmbeddedComponent />
        </div>
      )}

      <div className="pdp-tech-section">
        <div className="pdp-tech-badge-container">
          {project.technologies.map((tech) => (
            <TechBadge key={tech} techName={tech} />
          ))}
        </div>
      </div>
<div className="description" dangerouslySetInnerHTML={{ __html: project.description }} />

      {hasLinks && (
        <div className="pdp-links-section">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pdp-link-button github"
            >
              View on GitHub
            </a>
          )}
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
      )}
    </div>
  );
};

export default ProjectDetailPage;

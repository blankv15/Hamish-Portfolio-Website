import React from 'react';
import { Grid, Button, Group } from '@mantine/core';
import './TabSection.css'; // Make sure this CSS file is imported

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// A simple, reusable badge component
const SkillBadge = ({ skill }) => (
  <span className="skill-badge">{skill}</span>
);

// The restyled TabPanelContent component
function TabPanelContent({ tab, onBack, onNext }) {
  const { image, title, description, points, tech } = tab;

  // Construct the full image URL by prepending the API_URL
  const fullImageUrl = `${API_URL}${image}`;

  return (
    <div className="tab-panel-container">
      <Grid grow align="stretch">
        {/* Image Column */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <div className="tab-image-container">
            <img src={fullImageUrl} alt={title} className="tab-image" />
          </div>
        </Grid.Col>

        {/* Content Column */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <div className="tab-content-container">
            <div className="tab-header">
              <h3 className="tab-title">{title}</h3>
            </div>

            <p className="tab-description">{description}</p>
            
            <div className="points-list">
              {points.map((point, index) => (
                <div key={index} className="point-item">
                  <span className="point-icon">✓</span>
                  <p className="point-text">{point}</p>
                </div>
              ))}
            </div>

            {/* Footer section to align skills and buttons */}
            <div className="tab-footer">
              <div className="skills-section">
                <h4 className="skills-title">Related Skills</h4>
                <div className="skills-badge-container">
                  {tech.map((skill, index) => (
                    <SkillBadge key={index} skill={skill} />
                  ))}
                </div>
              </div>
              {/* Buttons now use icons and have a new class for styling */}
              <Group className="tab-navigation-buttons" gap="xs">
                <Button color="#6356c2" onClick={onBack}  className="nav-arrow-button">
                  Back
                </Button>
                <Button onClick={onNext} color='#2c265a' className="nav-arrow-button">
                  Next
                </Button>
              </Group>
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
}
export default TabPanelContent;

// You would typically export the main component of the file, 
// but since this is a snippet, we are showing the component you asked for.
// In your TabSection.js file, you would just define this component without exporting it.

import React from 'react';
import { Grid, Button, Group, Flex } from '@mantine/core';
import './TabSection.css'; // Import the new stylesheet

// A simple, reusable badge component
const SkillBadge = ({ skill }) => (
  <span className="skill-badge">{skill}</span>
);

// The restyled TabPanelContent component
function TabPanelContent({ tab, onBack, onNext }) {
  const { image, title, description, points, tech } = tab;

  return (
    <div className="tab-panel-container">
      <Grid grow align="stretch">
        {/* Image Column */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <div className="tab-image-container">
            <img src={image} alt={title} className="tab-image" />
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
                <Button variant="default" onClick={onBack} className="nav-arrow-button">
                  ‹
                </Button>
                <Button onClick={onNext} className="nav-arrow-button">
                  ›
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

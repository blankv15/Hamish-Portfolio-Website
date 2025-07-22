import React from 'react';
import { Grid, Button, Group } from '@mantine/core';
import './TabSection.css'; 

const API_URL = import.meta.env.VITE_API_URL;

const SkillBadge = ({ skill }) => (
  <span className="skill-badge">{skill}</span>
);

function TabPanelContent({ tab, onBack, onNext }) {
  const { image, title, description, points, tech } = tab;

  const fullImageUrl = `${API_URL}${image}`;

  return (
    <div className="tab-panel-container">
      <Grid grow align="stretch">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <div className="tab-image-container">
            <img src={fullImageUrl} alt={title} className="tab-image" />
          </div>
        </Grid.Col>

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

            <div className="tab-footer">
              <div className="skills-section">
                <h4 className="skills-title">Related Skills</h4>
                <div className="skills-badge-container">
                  {tech.map((skill, index) => (
                    <SkillBadge key={index} skill={skill} />
                  ))}
                </div>
              </div>
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

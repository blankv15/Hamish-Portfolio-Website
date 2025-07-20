import React, { useState, useEffect } from 'react';
import { Tabs, Loader, Alert, Center, Grid, Button, Group, Select } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconAlertCircle, IconSelector } from '@tabler/icons-react';
import useFetch from '../hooks/useFetch'; 
import './TabSection.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// --- Reusable Child Components ---

const SkillBadge = ({ skill }) => (
  <span className="skill-badge">{skill}</span>
);

const TabPanelContent = ({ tab, onBack, onNext }) => {
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
                <Button color="#6356c2" onClick={onBack} className="nav-arrow-button">
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
};


// --- Main TabSection Component ---

function TabSection() {
  const { data: tabData, loading, error } = useFetch(`${API_URL}api/tabs`);
  const [activeTab, setActiveTab] = useState(null);

  // Hook to detect if the screen is mobile-sized
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (tabData && tabData.length > 0) {
      setActiveTab(tabData[0].value); 
    }
  }, [tabData]);

  if (loading) {
    return <Center style={{ height: 300 }}><Loader /></Center>;
  }

  if (error) {
    return <Alert icon={<IconAlertCircle size="1rem" />} title="Error!" color="red">Failed to load skills data: {error}</Alert>;
  }

  if (!tabData || !activeTab) {
    return null;
  }

  const handleBack = () => {
    const currentIndex = tabData.findIndex((tab) => tab.value === activeTab);
    const prevIndex = (currentIndex - 1 + tabData.length) % tabData.length;
    setActiveTab(tabData[prevIndex].value);
  };

  const handleNext = () => {
    const currentIndex = tabData.findIndex((tab) => tab.value === activeTab);
    const nextIndex = (currentIndex + 1) % tabData.length;
    setActiveTab(tabData[nextIndex].value);
  };

  // Prepare data for the Select component
  const selectData = tabData.map(tab => ({ value: tab.value, label: tab.label }));

  return (
    <Tabs 
      className="custom-tabs-container" 
      value={activeTab} 
      onChange={setActiveTab} 
    >
      {/* Conditionally render either Tabs or Select based on screen size */}
      {isMobile ? (
        <Select
          className="mobile-tabs-select"
          data={selectData}
          value={activeTab}
          onChange={setActiveTab}
          rightSection={<IconSelector size={14} />}
        />
      ) : (
        <Tabs.List className="custom-tabs-list">
          {tabData.map((tab) => (
            <Tabs.Tab className="custom-tab" key={tab.value} value={tab.value} data-active={activeTab === tab.value}>
              <span>{tab.label}</span>
            </Tabs.Tab>
          ))}
        </Tabs.List>
      )}

      {tabData.map((tab) => (
        <Tabs.Panel className='custom-tab-panel' key={tab.value} value={tab.value} pt="xs">
          <TabPanelContent
            tab={tab}
            onBack={handleBack}
            onNext={handleNext}
          />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}

export default TabSection;

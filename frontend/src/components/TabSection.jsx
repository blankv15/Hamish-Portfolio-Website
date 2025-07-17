import React, { useState, useEffect } from 'react';
import { Tabs, Loader, Alert, Center, Grid, Button, Group } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import useFetch from '../hooks/useFetch'; 
import './TabSection.css';
import TabPanelContent from './TabPanelContent';


// --- Reusable Child Components ---

const SkillBadge = ({ skill }) => (
  <span className="skill-badge">{skill}</span>
);




// --- Main TabSection Component ---

function TabSection() {
  const API_URL = import.meta.env.VITE_API_URL;

  // Corrected fetch URL to use the API endpoint
  const { data: tabData, loading, error } = useFetch(`${API_URL}api/tabs`);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    if (tabData && tabData.length > 0) {
      setActiveTab(tabData[0].value); 
    }
  }, [tabData]);

  if (loading) {
    return (
      <Center style={{ height: 300 }}>
        <Loader />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size="1rem" />} title="Error!" color="red">
        Failed to load skills data: {error}
      </Alert>
    );
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

  return (
    <Tabs 
      className="custom-tabs-container" 
      value={activeTab} 
      onChange={setActiveTab} 
    >
      <Tabs.List className="custom-tabs-list">
        {tabData.map((tab) => (
          <Tabs.Tab className="custom-tab" key={tab.value} value={tab.value} data-active={activeTab === tab.value}>
            <span>{tab.label}</span>
          </Tabs.Tab>
        ))}
      </Tabs.List>

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

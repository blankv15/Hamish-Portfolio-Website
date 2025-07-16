import React, { useState, useEffect } from 'react';
import { Tabs, Loader, Alert, Center } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import TabPanelContent from './TabPanelContent';
import useFetch from '../hooks/useFetch'; 
import './TabSection.css';

const API_URL = import.meta.env.VITE_API_URL;

function TabSection() {
  const { data: tabData, loading, error } = useFetch(`${API_URL}/data/tabData.json`);
  
  // FIX 1: Initialize `activeTab` to `null`.
  // We can't know the first tab's value until the data has loaded.
  const [activeTab, setActiveTab] = useState(null);

  // FIX 2: Use the `useEffect` hook to safely set the initial tab.
  // This effect will ONLY run when `tabData` has a value (i.e., after loading).
  useEffect(() => {
    // Check if tabData is available and not empty
    if (tabData && tabData.length > 0) {
      // Now it's safe to access tabData[0]
      setActiveTab(tabData[0].value); 
    }
  }, [tabData]); // The dependency array ensures this runs only when `tabData` changes.

  // FIX 3: Handle the loading state before trying to render the tabs.
  // This shows a spinner to the user and prevents the code below from running.
  if (loading) {
    return (
      <Center style={{ height: 300 }}>
        <Loader />
      </Center>
    );
  }

  // FIX 4: Handle any potential errors during the fetch.
  if (error) {
    return (
      <Alert icon={<IconAlertCircle size="1rem" />} title="Error!" color="red">
        Failed to load tab data: {error}
      </Alert>
    );
  }

  // FIX 5: Prevent rendering if data is empty or the active tab isn't set yet.
  // This is a final safeguard against rendering errors.
  if (!tabData || !activeTab) {
    return null; // Render nothing if there's no data
  }

  // The rest of your logic can now safely assume `tabData` and `activeTab` exist.
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
      variant="gallery" 
      radius="md"
    >
      <Tabs.List className="custom-tabs-list">
        {tabData.map((tab) => (
          <Tabs.Tab className="custom-tab" key={tab.value} value={tab.value}>
            <span>{tab.label}</span>
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {tabData.map((tab, index) => (
        <Tabs.Panel className='custom-tab-panel' key={tab.value} value={tab.value} pt="xs">
          <TabPanelContent
            tab={tab}
            onBack={handleBack}
            onNext={handleNext}
            isFirstTab={index === 0}
            isLastTab={index === tabData.length - 1}
          />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}

export default TabSection;

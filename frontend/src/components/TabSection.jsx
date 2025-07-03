import React from 'react';
import { Tabs, Loader } from '@mantine/core'; // Added Loader for a better UX
import TabPanelContent from './TabPanelContent';
import tabData from '../assets/data/tabData.json';
import { useState } from "react";
import './TabSection.css'


function TabSection() {
  const [activeTab, setActiveTab] = useState(tabData[0].value);

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
    <Tabs className="custom-tabs-container" value={activeTab} onChange={setActiveTab} variant="gallery" radius="md"  defaultValue="first">
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

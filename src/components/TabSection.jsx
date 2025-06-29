import React from 'react';
import { Tabs, Loader } from '@mantine/core'; // Added Loader for a better UX
import TabPanelContent from './TabPanelContent';
import tabData from '../assets/data/tabData.json';
import { useState } from "react";


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
    <Tabs value={activeTab} onChange={setActiveTab} variant="pills" radius="md">
      <Tabs.List>
        {tabData.map((tab) => (
          <Tabs.Tab key={tab.value} value={tab.value}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {tabData.map((tab, index) => (
        <Tabs.Panel key={tab.value} value={tab.value} pt="xs">
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

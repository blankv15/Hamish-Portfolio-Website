import React, { useEffect, useRef } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';
import { Tabs, Loader, Alert, Center, Grid, Button, Group, Select } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconAlertCircle, IconSelector } from '@tabler/icons-react';
import useFetch from '../hooks/useFetch';
import './TabSection.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

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
                                <Button onClick={onBack} className="nav-arrow-button back">
                                    Back
                                </Button>
                                <Button onClick={onNext} className="nav-arrow-button next">
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


function TabSection() {
    const { data: tabData, loading, error } = useFetch(`${API_URL}/api/tabs`);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const sectionRef = useRef(null);
    const navigate = useNavigate();
    const match = useMatch('/skills/:tabValue');
    const activeTabValue = match?.params.tabValue || (tabData?.[0]?.value);

    useEffect(() => {
        if (match && sectionRef.current) {
            setTimeout(() => {
                sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [match]);

    if (loading) return <Center style={{ height: 300 }}><Loader /></Center>;
    if (error) return <Alert icon={<IconAlertCircle size="1rem" />} title="Error!" color="red">Failed to load skills data: {error}</Alert>;
    if (!tabData || !activeTabValue) return null;

    const handleTabChange = (newTabValue) => {
        if (newTabValue) navigate(`/skills/${newTabValue}`);
    };

    const handleBack = () => {
        const currentIndex = tabData.findIndex((tab) => tab.value === activeTabValue);
        const prevIndex = (currentIndex - 1 + tabData.length) % tabData.length;
        handleTabChange(tabData[prevIndex].value);
    };

    const handleNext = () => {
        const currentIndex = tabData.findIndex((tab) => tab.value === activeTabValue);
        const nextIndex = (currentIndex + 1) % tabData.length;
        handleTabChange(tabData[nextIndex].value);
    };

    const selectData = tabData.map(tab => ({ value: tab.value, label: tab.label }));
    const activeTabData = tabData.find(tab => tab.value === activeTabValue);

    return (
        <div ref={sectionRef}>
            {isMobile ? (
                <>
                    <div className="mobile-nav-header">
                        <Button onClick={handleBack} className="mobile-nav-arrow" styles={{ root: { backgroundColor: 'var(--background-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', '&:hover': { backgroundColor: 'var(--background-light)' } } }}>Back</Button>
                        <Button onClick={handleNext} className="mobile-nav-arrow" styles={{ root: { backgroundColor: 'var(--accent-orange)', color: 'var(--text-primary)', border: 'none', '&:hover': { backgroundColor: 'var(--accent-orange-hover)' } } }}>Next</Button>
                    </div>
                    <Select
                        className="mobile-tabs-select"
                        data={selectData}
                        value={activeTabValue}
                        onChange={handleTabChange}
                        rightSection={<IconSelector size={14} />}
                        allowDeselect={false}
                        styles={{
                            input: { backgroundColor: 'var(--background-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)', fontSize: '16px', fontWeight: 600, '&:focus': { borderColor: 'var(--accent-orange)' } },
                            dropdown: { backgroundColor: 'var(--background-light)', borderColor: 'var(--border-color)' },
                            option: { color: 'var(--text-muted)', '&:hover': { backgroundColor: 'rgba(230, 115, 25, 0.1)' }, '&[data-selected]': { backgroundColor: 'rgba(230, 115, 25, 0.2)', color: 'var(--text-primary)' } },
                        }}
                    />
                    {/* This ensures the content panel renders on mobile */}
                    {activeTabData && <TabPanelContent tab={activeTabData} onBack={handleBack} onNext={handleNext} />}
                </>
            ) : (
                <Tabs
                    color='var(--accent-orange)'
                    className="custom-tabs-container"
                    value={activeTabValue}
                    onChange={handleTabChange}
                    styles={{
                        list: { borderColor: 'var(--border-color)' },
                        tab: { color: 'var(--text-muted)', fontWeight: 600, '&:hover': { color: 'var(--accent-orange)', backgroundColor: 'transparent' } },
                    }}
                >
                    <Tabs.List className="custom-tabs-list">
                        {tabData.map((tab) => (
                            <Tabs.Tab className="custom-tab" key={tab.value} value={tab.value}>
                                <span>{tab.label}</span>
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>

                    {tabData.map((tab) => (
                        <Tabs.Panel className='custom-tab-panel' key={tab.value} value={tab.value} pt="xs">
                            <TabPanelContent tab={tab} onBack={handleBack} onNext={handleNext} />
                        </Tabs.Panel>
                    ))}
                </Tabs>
            )}
        </div>
    );
}

export default TabSection;
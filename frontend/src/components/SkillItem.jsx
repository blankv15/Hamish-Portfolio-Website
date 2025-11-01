import React from 'react';
import * as Di from 'react-icons/di'; 

const Icon = ({ iconName }) => {
  const IconComponent = Di[iconName];
  if (!IconComponent) return null; 
  return <IconComponent size="2em" />;
};

const SkillItem = ({ skill }) => {
  const handleSkillClick = () => {
    // Track skill click in GTM
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'skill_click',
      skill_name: skill.name,
      skill_category: skill.category || 'uncategorized'
    });
  };

  return (
    <div className="skill-item" onClick={handleSkillClick} style={{ cursor: 'pointer' }}>
      <Icon iconName={skill.icon} />
      <span>{skill.name}</span>
    </div>
  );
};

export default SkillItem;
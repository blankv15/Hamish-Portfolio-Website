import React from 'react';
import * as Di from 'react-icons/di'; 

const Icon = ({ iconName }) => {
  const IconComponent = Di[iconName];
  if (!IconComponent) return null; 
  return <IconComponent size="2em" />;
};

const SkillItem = ({ skill }) => {
  return (
    <div className="skill-item">
      <Icon iconName={skill.icon} />
      <span>{skill.name}</span>
    </div>
  );
};

export default SkillItem;
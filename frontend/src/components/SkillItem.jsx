// SkillItem.jsx
import React from 'react';
import * as Di from 'react-icons/di'; // Import all DevIcons

// A helper component to dynamically render the correct icon
const Icon = ({ iconName }) => {
  const IconComponent = Di[iconName];
  if (!IconComponent) return null; // Or return a default icon
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
import React from 'react';
import TechBadge from './TechBadge'; 

function TechBadgeList({ technologies }) {
  return (
    <div>
      {technologies.map((tech, index) => (
        <TechBadge key={index} badgeText={tech} />
      ))}
    </div>
  );
}

export default TechBadgeList;
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToSection = () => {
  const location = useLocation();

  // Create individual, stable refs. These objects persist for the full lifetime of the component.
  const refs = {
    projects: useRef(null),
    skills: useRef(null),
    about: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    // Correctly parse the base section from the URL.
    // For example, '/skills/frontend-development' becomes 'skills'.
    const section = location.pathname.substring(1).split('/')[0];

    if (refs[section] && refs[section].current) {
      setTimeout(() => {
        refs[section].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
    // The effect only needs to run when the URL path changes.
    // The 'refs' object is not needed as a dependency because useRef guarantees its stability.
  }, [location.pathname]);

  return refs;
};
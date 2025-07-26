import { useEffect, useRef } from 'react';
// Import useNavigationType
import { useLocation, useNavigationType } from 'react-router-dom';

export const useScrollToSection = () => {
  const location = useLocation();
  // Get the type of navigation action (PUSH, POP, or REPLACE)
  const navigationType = useNavigationType();

  const refs = {
    projects: useRef(null),
    skills: useRef(null),
    about: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const section = location.pathname.substring(1).split('/')[0];

    // ONLY scroll if the user clicked a new link (PUSH).
    // Do NOT scroll on back/forward actions (POP).
    if (navigationType === 'PUSH' && refs[section] && refs[section].current) {
      setTimeout(() => {
        refs[section].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return refs;
};
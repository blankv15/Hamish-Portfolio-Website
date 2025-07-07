import React, { useState, useEffect } from 'react';

import "./Navbar.css"

// GitHub Icon Component
const GitHubIcon = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

// Mobile Menu Icon Component
const MenuIcon = ({ className }) => (
    <svg 
        className={className} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth="2" 
        stroke="currentColor"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);


const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setMenuOpen(!isMenuOpen);
    const closeMenu = () => setMenuOpen(false);

    const navId = isScrolled ? 'navbar scrolled' : 'navbar';
    const mobileMenuClasses = isMenuOpen ? 'mobile-menu' : 'mobile-menu hidden';

    return (
        <>
            <nav id={navId}>
                <div className="navbar-content">
                    
                    <div className="flex-shrink-0">
                        <a href="#" className="navbar-logo">LOGO</a>
                    </div>

                    <div className="nav-links-desktop">
                        <a href="#projects" className="nav-link">Projects</a>
                        <a href="#skills" className="nav-link">Skills</a>
                        <a href="#contact" className="nav-link">Contact</a>
                    </div>

                    <div className="nav-actions-desktop">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                            <GitHubIcon className="github-icon" />
                        </a>
                        <a href="/path-to-your-cv.pdf" download className="cv-button">
                            Download CV
                        </a>
                    </div>

                    <div className="mobile-menu-toggle">
                        <button onClick={toggleMenu}>
                            <MenuIcon className="menu-icon" />
                        </button>
                    </div>

                </div>

                <div className={mobileMenuClasses}>
                    <div className="mobile-menu-content">
                        <a href="#projects" onClick={closeMenu}>Projects</a>
                        <a href="#skills" onClick={closeMenu}>Skills</a>
                        <a href="#contact" onClick={closeMenu}>Contact</a>
                        <div className="mobile-menu-divider"></div>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="mobile-menu-github-link">
                            GitHub
                            <GitHubIcon />
                        </a>
                        <a href="/path-to-your-cv.pdf" download onClick={closeMenu} className="cv-button mobile-menu-cv-button">
                            Download CV
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
};


export default Navbar;

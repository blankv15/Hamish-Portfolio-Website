import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// --- SVG Icon Components (assuming they are defined above) ---
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

const CloseIcon = ({ className }) => (
    <svg 
        className={className} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth="2" 
        stroke="currentColor"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setMenuOpen(!isMenuOpen);
    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isMenuOpen]);

    const navClasses = `navbar ${isScrolled ? 'scrolled' : ''}`;
    const mobileMenuClasses = `mobile-menu ${isMenuOpen ? 'open' : ''}`;

    const cvPath = `${API_URL}/cv/HamishChhaganCV.pdf`;

    return (
        <header>
            <nav className={navClasses}>
                <div className="navbar-content">
                    <Link to="/" className="navbar-logo">Hamish Chhagan</Link>

                    <div className="nav-actions-mobile">
                        <a href="https://github.com/blankv15" target="_blank" rel="noopener noreferrer">
                            <GitHubIcon className="github-icon" />
                        </a>
                        <a href={cvPath} target="_blank" rel="noopener noreferrer" className="cv-button">
                            CV
                        </a>
                    </div>

                    <div className="nav-links-desktop">
                        {/* FIX: Use simple paths for section scrolling */}
                        <Link to="/projects" className="nav-link">Projects</Link>
                        <Link to="/skills" className="nav-link">Skills</Link>
                        <Link to="/about" className="nav-link">About</Link>
                        <Link to="/contact" className="nav-link">Contact</Link>
                    </div>

                    <div className="nav-actions-desktop">
                        <a href="https://github.com/blankv15" target="_blank" rel="noopener noreferrer">
                            <GitHubIcon className="github-icon" />
                        </a>
                        <a href={cvPath} target="_blank" rel="noopener noreferrer" className="cv-button">
                            Download CV
                        </a>
                    </div>

                    <div className="mobile-menu-toggle">
                        <button onClick={toggleMenu} aria-label="Toggle menu">
                            {isMenuOpen ? <CloseIcon className="menu-icon" /> : <MenuIcon className="menu-icon" />}
                        </button>
                    </div>
                </div>
            </nav>

            <div className={mobileMenuClasses}>
                <div className="mobile-menu-content">
                    {/* FIX: Use simple paths in the mobile menu as well */}
                    <Link to="/projects" onClick={closeMenu}>Projects</Link>
                    <Link to="/skills" onClick={closeMenu}>Skills</Link>
                    <Link to="/about" onClick={closeMenu}>About</Link>
                    <Link to="/contact" onClick={closeMenu}>Contact</Link>
                    <div className="mobile-menu-divider"></div>
                    <a href="https://github.com/blankv15" target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="mobile-menu-github-link">
                        GitHub
                        <GitHubIcon/>
                    </a>
                    <a href={cvPath} target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="cv-button mobile-menu-cv-button">
                        View CV
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

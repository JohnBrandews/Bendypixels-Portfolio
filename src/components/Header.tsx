import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  // Close menu on resize if screen becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <a href="#" className="logo" onClick={handleLinkClick}>BendyPixels</a>

        <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <a href="#about" onClick={handleLinkClick}>About</a>
          <a href="#portfolio" onClick={handleLinkClick}>Portfolio</a>
          <a href="#contact" onClick={handleLinkClick}>Contact</a>
          <a href="#contact" className="btn btn-sm" onClick={handleLinkClick}>Let's Talk</a>
        </nav>
      </div>
      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 0;
          transition: all 0.3s ease;
        }
        .header.scrolled {
          background: rgba(10, 10, 10, 0.9);
          backdrop-filter: blur(10px);
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          z-index: 1001; /* Keep logo above mobile menu */
        }
        .nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav a:not(.btn) {
          font-size: 0.95rem;
          font-weight: 500;
          opacity: 0.8;
        }
        .nav a:not(.btn):hover {
          opacity: 1;
          color: var(--color-primary);
        }
        .btn-sm {
          padding: 0.5rem 1.5rem;
          font-size: 0.9rem;
        }
        
        /* Mobile Menu Toggle */
        .menu-toggle {
          display: none;
          flex-direction: column;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 1001;
          padding: 0.5rem;
        }
        .bar {
          width: 25px;
          height: 2px;
          background-color: var(--color-text);
          transition: all 0.3s ease;
        }
        
        /* Mobile Styles */
        @media (max-width: 768px) {
          .menu-toggle {
            display: flex;
          }
          .nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 100%;
            height: 100vh;
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: center;
            transition: right 0.3s ease;
            padding: 2rem;
          }
          .nav.open {
            right: 0;
          }
          .nav a {
            font-size: 1.5rem !important;
          }
          
          /* Hamburger Animation */
          .menu-toggle.open .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
          }
          .menu-toggle.open .bar:nth-child(2) {
            opacity: 0;
          }
          .menu-toggle.open .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
          }
        }
      `}</style>
    </header>
  );
};

export default Header;

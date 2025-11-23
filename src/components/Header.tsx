import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <a href="#" className="logo">BendyPixels</a>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact">Contact</a>
          <a href="#contact" className="btn btn-sm">Let's Talk</a>
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
      `}</style>
    </header>
  );
};

export default Header;

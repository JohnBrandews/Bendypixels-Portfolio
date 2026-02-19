import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'How we work', href: '#process' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const SECTION_IDS = NAV_LINKS.map(({ href }) => href.slice(1)); // ['services', 'portfolio', 'faq', 'contact']

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const savedScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section from scroll position (IntersectionObserver)
  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && SECTION_IDS.includes(e.target.id))
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: 0 }
    );

    elements.forEach((el) => observerRef.current?.observe(el));
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  // When near top, clear active section so "hero" is implied
  useEffect(() => {
    const onScrollActive = () => {
      if (window.scrollY < 100) setActiveSection(null);
    };
    window.addEventListener('scroll', onScrollActive, { passive: true });
    return () => window.removeEventListener('scroll', onScrollActive);
  }, []);

  // Lock body scroll when mobile menu is open (preserve scroll position to avoid "jump to top")
  useEffect(() => {
    if (menuOpen) {
      savedScrollY.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScrollY.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
    } else {
      const y = savedScrollY.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      window.scrollTo(0, y);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href') || '';
    if (href.startsWith('#')) {
      e.preventDefault();
      closeMenu();
      const el = document.querySelector(href);
      setTimeout(() => el?.scrollIntoView({ behavior: 'smooth' }), 350);
    } else {
      closeMenu();
    }
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen((o) => !o);
  };

  const navLinksFragment = (
    <>
      {NAV_LINKS.map(({ label, href }) => {
        const id = href.slice(1);
        const isActive = activeSection === id;
        return (
          <a
            key={href}
            href={href}
            className="header-nav-link"
            data-active={isActive}
            onClick={closeMenu}
          >
            {label}
          </a>
        );
      })}
    </>
  );

  return (
    <header className={`header-modern ${scrolled ? 'header-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="container header-inner">
        <a href="/" className="header-logo" aria-label="BendyPixels.co Home">
          <img src="/logo.jpeg" alt="BendyPixels.co" className="header-logo-img" />
        </a>
        <nav className="header-nav header-nav-desktop" aria-label="Main navigation">
          {navLinksFragment}
        </nav>
        <div className="header-actions">
          <div className="header-socials">
            <a href="https://www.facebook.com/bendypixels.co" target="_blank" rel="noopener noreferrer" className="header-social-link" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.instagram.com/bendypixels.co" target="_blank" rel="noopener noreferrer" className="header-social-link" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://wa.me/254111666710" target="_blank" rel="noopener noreferrer" className="header-social-link" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
          <button
            type="button"
            className="header-menu-btn"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="header-mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="header-menu-icon" aria-hidden>
              <span className="header-menu-line" />
              <span className="header-menu-line" />
              <span className="header-menu-line" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu: render in portal so it's not affected by header layout, and always on top */}
      {createPortal(
        <div
          id="header-mobile-menu"
          className="header-mobile-menu"
          aria-hidden={!menuOpen}
          data-open={menuOpen}
        >
          <div className="header-mobile-backdrop" onClick={closeMenu} aria-hidden />
          <div className="header-mobile-drawer">
            <button
              type="button"
              className="header-mobile-close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <nav className="header-mobile-nav" aria-label="Main navigation">
              {NAV_LINKS.map(({ label, href }) => {
                const id = href.slice(1);
                const isActive = activeSection === id;
                return (
                  <a
                    key={href}
                    href={href}
                    className="header-mobile-nav-link"
                    data-active={isActive}
                    onClick={handleMobileNavClick}
                  >
                    {label}
                  </a>
                );
              })}
            </nav>
            <div className="header-mobile-socials">
              <a href="https://www.facebook.com/bendypixels.co" target="_blank" rel="noopener noreferrer" className="header-social-link" aria-label="Facebook">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/bendypixels.co" target="_blank" rel="noopener noreferrer" className="header-social-link" aria-label="Instagram">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://wa.me/254111666710" target="_blank" rel="noopener noreferrer" className="header-social-link" aria-label="WhatsApp">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        .header-modern {
          position: -webkit-sticky;
          position: sticky;
          top: 0;
          z-index: 1100;
          padding: var(--spacing-md) 0;
          border-bottom: 1px solid var(--color-border);
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: box-shadow var(--transition-normal), background var(--transition-normal);
        }
        .header-modern.header-scrolled {
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }
        .header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--spacing-sm);
        }
        .header-logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .header-logo-img {
          height: 52px;
          width: auto;
          object-fit: contain;
          display: block;
        }
        .header-nav {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }
        .header-nav-link {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-text);
          text-decoration: none;
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: 6px;
          transition: color var(--transition-fast), background var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
        }
        .header-nav-link:hover {
          color: var(--color-cyan);
          background: rgba(0, 0, 0, 0.04);
          transform: scale(1.05);
        }
        .header-nav-link:focus-visible {
          outline: 2px solid var(--color-cyan);
          outline-offset: 2px;
        }
        .header-nav-link[data-active="true"] {
          color: var(--color-cyan);
          font-weight: 600;
          box-shadow: 0 2px 0 0 currentColor;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }
        .header-socials {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }
        .header-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-muted);
          transition: color var(--transition-fast), transform var(--transition-fast), outline-offset var(--transition-fast);
        }
        .header-social-link:hover {
          color: var(--color-cyan);
          transform: translateY(-2px) scale(1.1);
        }
        .header-social-link:focus-visible {
          outline: 2px solid var(--color-cyan);
          outline-offset: 2px;
          border-radius: 6px;
        }
        .header-menu-btn {
          display: none;
          align-items: center;
          justify-content: center;
          min-width: 48px;
          min-height: 48px;
          width: 48px;
          height: 48px;
          padding: 0;
          background: transparent;
          border: none;
          color: var(--color-text);
          border-radius: 8px;
          transition: background var(--transition-fast);
          cursor: pointer;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          position: relative;
          z-index: 1101;
        }
        .header-menu-btn:hover {
          background: rgba(0, 0, 0, 0.06);
        }
        .header-menu-btn:focus-visible {
          outline: 2px solid var(--color-cyan);
          outline-offset: 2px;
        }
        .header-menu-icon {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 24px;
        }
        .header-menu-line {
          display: block;
          height: 2px;
          background: currentColor;
          border-radius: 1px;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        .header-modern.menu-open .header-menu-line:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        .header-modern.menu-open .header-menu-line:nth-child(2) {
          opacity: 0;
        }
        .header-modern.menu-open .header-menu-line:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }
        .header-mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 11000;
          pointer-events: none;
          visibility: hidden;
          transition: visibility 0.3s ease;
        }
        .header-mobile-menu .header-mobile-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .header-mobile-menu .header-mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(320px, 85vw);
          max-width: 320px;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
          padding: 5rem 1.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          overflow-y: auto;
          will-change: transform;
        }
        .header-mobile-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          background: transparent;
          border: none;
          border-radius: 8px;
          color: var(--color-text);
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .header-mobile-close:hover {
          background: rgba(0, 0, 0, 0.06);
          color: var(--color-cyan);
        }
        .header-mobile-close:focus-visible {
          outline: 2px solid var(--color-cyan);
          outline-offset: 2px;
        }
        .header-mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .header-mobile-nav-link {
          font-size: 1.125rem;
          font-weight: 500;
          color: var(--color-text);
          text-decoration: none;
          padding: 0.75rem 0;
          border-radius: 8px;
          transition: color var(--transition-fast), background var(--transition-fast), transform var(--transition-fast);
        }
        .header-mobile-nav-link:hover {
          color: var(--color-cyan);
          background: rgba(0, 0, 0, 0.04);
          transform: scale(1.02);
        }
        .header-mobile-nav-link:focus-visible {
          outline: 2px solid var(--color-cyan);
          outline-offset: 2px;
        }
        .header-mobile-nav-link[data-active="true"] {
          color: var(--color-cyan);
          font-weight: 600;
          box-shadow: 0 2px 0 0 currentColor;
        }
        .header-mobile-socials {
          display: flex;
          gap: 1rem;
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid var(--color-border);
        }
        .header-mobile-socials .header-social-link {
          min-width: 44px;
          min-height: 44px;
        }
        @media (max-width: 768px) {
          .header-nav-desktop { display: none !important; }
          .header-menu-btn { display: flex; }
        }
        @media (min-width: 769px) {
          .header-mobile-menu { display: none !important; }
        }
        @media (max-width: 768px) {
          .header-mobile-menu[data-open="true"] {
            pointer-events: auto;
            visibility: visible;
          }
          .header-mobile-menu[data-open="true"] .header-mobile-backdrop {
            opacity: 1;
            pointer-events: auto;
          }
          .header-mobile-menu[data-open="true"] .header-mobile-drawer {
            transform: translateX(0);
          }
        }
        @media (max-width: 640px) {
          .header-modern { padding: var(--spacing-sm) 0; }
          .header-logo-img { height: 44px; }
          .header-social-link {
            min-width: 44px;
            min-height: 44px;
            padding: 0.5rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;

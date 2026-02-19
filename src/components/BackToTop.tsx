import React, { useState, useEffect } from 'react';

const SHOW_AFTER_PX = 400;

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <>
      <button
        type="button"
        onClick={scrollToTop}
        className="back-to-top"
        aria-label="Back to top"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
      <style>{`
        .back-to-top {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 999;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid var(--color-border);
          border-radius: 50%;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          color: var(--color-text);
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
        }
        .back-to-top:hover {
          background: var(--color-cyan);
          color: var(--color-primary);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 255, 255, 0.3);
        }
        .back-to-top:focus-visible {
          outline: 2px solid var(--color-cyan);
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
};

export default BackToTop;

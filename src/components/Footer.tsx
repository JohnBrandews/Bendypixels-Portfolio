import React, { useState } from 'react';

const EMAIL = 'johnbrandews@gmail.com';
const CV_LINK = '/cv.pdf';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'How we work', href: '#process' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const serviceLabels = [
  'UX & UI Design',
  'Web & Mobile App',
  'Design & Creative',
  'Development',
];

const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <footer className="footer-modern" data-aos="fade-up">
      <div className="container footer-inner">
        <div className="footer-brand" data-aos="fade-up" data-aos-delay="100">
          <a href="/" className="footer-logo-link" aria-label="BendyPixels.co Home">
            <img src="/logo.jpeg" alt="BendyPixels.co" className="footer-logo-img" />
          </a>
          <p className="footer-tagline">Where we make it happen</p>
          <p className="footer-desc">
            Digital products and brand experiences. We design and build websites, apps, and identities that help brands stand out.
          </p>
        </div>
        <div className="footer-links" data-aos="fade-up" data-aos-delay="150">
          <h4 className="footer-heading">Quick links</h4>
          <ul className="footer-list">
            {quickLinks.map(({ label, href }) => (
              <li key={label}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-services" data-aos="fade-up" data-aos-delay="200">
          <h4 className="footer-heading">What we do</h4>
          <ul className="footer-list">
            {serviceLabels.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </div>
        <div className="footer-contact" data-aos="fade-up" data-aos-delay="250">
          <h4 className="footer-heading">Get in touch</h4>
          <span className="footer-email-row">
            <a href={`mailto:${EMAIL}`} className="footer-email">{EMAIL}</a>
            <button type="button" className="footer-copy-btn" onClick={handleCopy} aria-label="Copy email">
              {copied ? 'Copied' : 'Copy'}
            </button>
          </span>
          <a href={CV_LINK} className="footer-cv" download="John_Brandews_CV.pdf">Download CV</a>
          <div className="footer-social">
            <a href="https://www.linkedin.com/in/john-brandews-8657562bb" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
            <span className="footer-sep">/</span>
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" aria-label="Dribbble">Dribbble</a>
            <span className="footer-sep">/</span>
            <a href="https://www.instagram.com/bendypixels.co" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">© {new Date().getFullYear()} BendyPixels.co. All rights reserved.</p>
        </div>
      </div>
      <style>{`
        .footer-modern {
          border-top: 1px solid var(--color-border);
          margin-top: var(--spacing-xl);
          margin-left: var(--spacing-md);
          margin-right: var(--spacing-md);
        }
        .footer-inner {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: var(--spacing-xl);
          padding: var(--spacing-xl) 0 var(--spacing-lg);
        }
        .footer-brand {
          max-width: 280px;
        }
        .footer-logo-link {
          display: inline-block;
          margin-bottom: var(--spacing-sm);
        }
        .footer-logo-img {
          height: 44px;
          width: auto;
          object-fit: contain;
          display: block;
        }
        .footer-tagline {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          margin: 0 0 var(--spacing-xs);
          font-weight: 500;
        }
        .footer-desc {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin: 0;
        }
        .footer-heading {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text);
          margin: 0 0 var(--spacing-sm);
        }
        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-list li {
          margin-bottom: 0.35rem;
        }
        .footer-list a,
        .footer-list li {
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }
        .footer-list a:hover {
          color: var(--color-cyan);
        }
        .footer-email-row {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-sm);
        }
        .footer-email {
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }
        .footer-email:hover {
          color: var(--color-cyan);
        }
        .footer-copy-btn {
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 500;
          background: var(--color-cyan);
          color: #0a0a0a;
          border: none;
          cursor: pointer;
          transition: background var(--transition-fast);
        }
        .footer-copy-btn:hover {
          background: var(--color-turquoise);
        }
        .footer-cv {
          display: inline-block;
          font-size: 0.9rem;
          color: var(--color-text-muted);
          margin-bottom: var(--spacing-sm);
        }
        .footer-cv:hover {
          color: var(--color-cyan);
        }
        .footer-social {
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }
        .footer-social a:hover { color: var(--color-cyan); }
        .footer-sep { opacity: 0.5; margin: 0 0.15rem; }
        .footer-bottom {
          border-top: 1px solid var(--color-border);
          margin-left: var(--spacing-md);
          margin-right: var(--spacing-md);
        }
        .footer-bottom-inner {
          padding: var(--spacing-md) 0;
        }
        .footer-copy {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin: 0;
        }
        @media (max-width: 900px) {
          .footer-inner {
            grid-template-columns: 1fr 1fr;
          }
          .footer-brand { max-width: none; }
        }
        @media (max-width: 640px) {
          .footer-inner {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
            text-align: center;
          }
          .footer-brand { margin: 0 auto; }
          .footer-logo-link { margin-left: auto; margin-right: auto; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;

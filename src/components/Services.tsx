import React from 'react';

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    title: 'UX & UI',
    description: 'User-centered design that balances aesthetics with usability for seamless digital experiences.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/>
        <path d="M12 18h.01"/>
      </svg>
    ),
    title: 'Web & Mobile App',
    description: 'Responsive websites and native apps built with modern tech to reach your audience everywhere.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
      </svg>
    ),
    title: 'Design & Creative',
    description: 'Brand identity, visual design, and creative direction that make your brand memorable.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: 'Development',
    description: 'Bringing your vision to life with the latest technology and design trends.',
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="section services-modern" data-aos="fade-up">
      <div className="container">
        <h2 className="services-headline text-center" data-aos="fade-up" data-aos-delay="100">
          Collaborate with brands and agencies to create impactful results.
        </h2>
        <p className="services-label text-center" data-aos="fade-up" data-aos-delay="150">
          <span className="label-wavy">Services</span>
        </p>
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={s.title} className="service-card-modern" data-aos="fade-up" data-aos-delay={150 + i * 80}>
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .services-modern {
          border-top: 1px solid var(--color-border);
        }
        .services-headline {
          font-size: clamp(1.5rem, 3vw, 2rem);
          max-width: 640px;
          margin: 0 auto var(--spacing-sm);
          color: var(--color-primary);
        }
        .services-label {
          margin-bottom: var(--spacing-xl);
          font-size: 0.95rem;
          color: var(--color-text-muted);
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-md);
        }
        .service-card-modern {
          padding: var(--spacing-lg);
          border-radius: var(--radius-md);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-card);
          transition: transform var(--transition-normal), box-shadow var(--transition-normal), outline-offset var(--transition-normal);
        }
        .service-card-modern:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: var(--shadow-card), 0 12px 28px var(--color-shadow);
        }
        .service-card-modern:focus-within {
          outline: 2px solid var(--color-cyan);
          outline-offset: 2px;
          border-radius: var(--radius-md);
        }
        .service-icon {
          color: var(--color-cyan);
          margin-bottom: var(--spacing-sm);
        }
        .service-title {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
        .service-desc {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }
        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 500px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;

import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dig into your goals, audience, and constraints so the solution is built on a clear strategy.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Design',
    description: 'Wireframes, prototypes, and visual design that align with your brand and delight users.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Build',
    description: 'Clean, scalable code and content integration. We iterate with you so the product stays on track.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Deploy, monitor, and hand off with docs and support so you own and grow what we built.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
        <polyline points="10 17 15 12 10 7"/>
        <line x1="15" y1="12" x2="3" y2="12"/>
      </svg>
    ),
  },
];

const Process: React.FC = () => {
  return (
    <section id="process" className="section process-section" data-aos="fade-up">
      <div className="container">
        <p className="process-label text-center" data-aos="fade-up" data-aos-delay="50">
          <span className="label-wavy">How we work</span>
        </p>
        <h2 className="process-headline text-center" data-aos="fade-up" data-aos-delay="100">
          From idea to launch, in clear steps.
        </h2>
        <div className="process-steps">
          {steps.map((step, i) => (
            <React.Fragment key={step.title}>
              <div
                className="process-step"
                data-aos="fade-up"
                data-aos-delay={150 + i * 80}
              >
                <div className="process-step-number" aria-hidden>{step.number}</div>
                <div className="process-step-icon">{step.icon}</div>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="process-arrow" aria-hidden>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <style>{`
        .process-section {
          border-top: 1px solid var(--color-border);
        }
        .process-label {
          margin-bottom: var(--spacing-sm);
          font-size: 0.95rem;
          color: var(--color-text-muted);
        }
        .process-headline {
          font-size: clamp(1.5rem, 3vw, 2rem);
          max-width: 560px;
          margin: 0 auto var(--spacing-xl);
          color: var(--color-primary);
        }
        .process-steps {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          align-items: center;
        }
        .process-step {
          margin-bottom: 0;
        }
        .process-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-sm) 0;
          color: var(--color-cyan);
          opacity: 0.7;
        }
        .process-arrow svg {
          transform: rotate(90deg);
        }
        @media (min-width: 901px) {
          .process-steps {
            grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
            gap: var(--spacing-md);
          }
          .process-arrow {
            padding: 0 var(--spacing-xs);
          }
          .process-arrow svg {
            transform: none;
          }
        }
        .process-step {
          padding: var(--spacing-lg);
          border-radius: var(--radius-md);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-card);
          transition: box-shadow var(--transition-normal);
          position: relative;
        }
        .process-step:hover {
          box-shadow: var(--shadow-card), 0 8px 24px var(--color-shadow);
        }
        .process-step-number {
          position: absolute;
          top: var(--spacing-md);
          right: var(--spacing-md);
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-cyan);
          opacity: 0.25;
        }
        .process-step-icon {
          color: var(--color-cyan);
          margin-bottom: var(--spacing-sm);
        }
        .process-step-title {
          font-size: 1.15rem;
          margin-bottom: 0.5rem;
        }
        .process-step-desc {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
};

export default Process;

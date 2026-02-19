import React, { useState, useEffect } from 'react';
import AOS from 'aos';

const faqItems = [
  {
    id: '1',
    question: 'What services does BendyPixels offer?',
    answer: 'We offer web design and development, branding (logos, business cards, posters), and content writing. From simple landing pages to full e‑commerce sites and brand identity packages, we tailor our services to your needs.',
  },
  {
    id: '2',
    question: 'How long does a typical project take?',
    answer: 'Timelines vary by scope. A simple website can take 2–4 weeks; branding packages and larger builds may take 4–8 weeks or more. We’ll give you a clear timeline and milestones after discussing your project.',
  },
  {
    id: '3',
    question: 'What are your payment terms?',
    answer: 'We typically work with a 50% deposit to start, 25% at a key milestone (e.g. design approval), and 25% on completion. Payment is due within 7 days of each milestone. We can discuss flexible options for larger projects.',
  },
  {
    id: '4',
    question: 'Do you offer hosting and domain setup?',
    answer: 'Yes. Our website packages can include one year of domain registration, hosting, free SSL, email setup (up to 5 accounts), CDN, and daily backups so your site is secure and fast from day one.',
  },
  {
    id: '5',
    question: 'How do I get started?',
    answer: 'Reach out via Email or WhatsApp with a short description of your project. We’ll reply with a few questions, then send a quote and timeline. Once you’re happy, we’ll confirm the deposit and kick off.',
  },
];

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  // Accordion expand/collapse changes layout; AOS can mis-detect visibility and hide the section.
  // Refresh AOS so the FAQ stays visible when toggling items.
  useEffect(() => {
    const t = setTimeout(() => AOS.refresh(), 50);
    return () => clearTimeout(t);
  }, [openId]);

  return (
    <section id="faq" className="section faq-section" data-aos="fade-up">
      <div className="container">
        <h2 className="faq-headline text-center" data-aos="fade-up" data-aos-delay="100">Frequently asked questions</h2>
        <p className="faq-subhead text-center" data-aos="fade-up" data-aos-delay="150">
          Quick answers to common questions. Can’t find what you need? <a href="#contact">Get in touch</a>.
        </p>
        <div className="faq-list">
          {faqItems.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}
                data-aos="fade-up"
                data-aos-delay={200 + i * 50}
              >
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => setOpenId(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-question-${item.id}`}
                >
                  <span>{item.question}</span>
                  <span className="faq-icon" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={isOpen ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'} />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  className="faq-answer-wrap"
                  hidden={!isOpen}
                >
                  <p className="faq-answer">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        .faq-section {
          border-top: 1px solid var(--color-border);
        }
        .faq-headline {
          font-size: clamp(1.5rem, 3vw, 2rem);
          margin-bottom: var(--spacing-sm);
          color: var(--color-primary);
        }
        .faq-subhead {
          font-size: 1rem;
          color: var(--color-text-muted);
          margin-bottom: var(--spacing-xl);
        }
        .faq-subhead a {
          color: var(--color-cyan);
          font-weight: 500;
        }
        .faq-subhead a:hover {
          text-decoration: underline;
        }
        .faq-list {
          max-width: 720px;
          margin: 0 auto;
        }
        .faq-item {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-sm);
          background: var(--color-surface);
          box-shadow: var(--shadow-card);
          overflow: hidden;
        }
        .faq-item-open {
          border-color: var(--color-cyan);
        }
        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-md);
          padding: var(--spacing-md) var(--spacing-lg);
          text-align: left;
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--color-text);
          background: none;
          transition: background var(--transition-fast);
        }
        .faq-question:hover {
          background: var(--color-bg-outer);
        }
        .faq-icon {
          flex-shrink: 0;
          color: var(--color-text-muted);
          transition: transform var(--transition-normal);
        }
        .faq-item-open .faq-icon {
          transform: rotate(180deg);
          color: var(--color-cyan);
        }
        .faq-answer-wrap {
          overflow: hidden;
        }
        .faq-answer-wrap[hidden] {
          display: none;
        }
        .faq-answer-wrap:not([hidden]) {
          animation: faq-fade 0.25s ease;
        }
        @keyframes faq-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .faq-answer {
          padding: 0 var(--spacing-lg) var(--spacing-lg);
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--color-text-muted);
        }
      `}</style>
    </section>
  );
};

export default FAQ;

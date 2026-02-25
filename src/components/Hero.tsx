import React, { type PropsWithChildren } from 'react';
import { SplitText, type WordWrapperProp, type SplitTextProps } from '@cyriacbr/react-split-text';
import TextType from './TextType';

const stats = [
  { value: '50+', label: 'Projects' },
  { value: '30+', label: 'Clients' },
  { value: '5y', label: 'Experience' },
];

const STAGGER_MS = 50;

// Cast SplitText to include children as the library's types are legacy for React 18+
const SplitTextComp = SplitText as React.ComponentType<PropsWithChildren<SplitTextProps>>;

function StaggerWord({
  children,
  countIndex,
}: PropsWithChildren<WordWrapperProp>) {
  return (
    <span
      className="hero-split-word"
      style={{ animationDelay: `${countIndex * STAGGER_MS}ms` } as React.CSSProperties}
    >
      {children}
    </span>
  );
}

const HERO_HEADLINE = 'Digital experiences, made for you.';

const Hero: React.FC = () => {
  return (
    <section className="hero-tailored" data-aos="fade-up">
      <div className="container hero-grid">
        <div className="hero-content">
          <h1 className="hero-headline" data-aos="fade-up" data-aos-delay="100">
            <TextType
              text={[HERO_HEADLINE]}
              typingSpeed={75}
              pauseDuration={0}
              showCursor
              cursorCharacter="_"
              deletingSpeed={50}
              variableSpeedEnabled={false}
              cursorBlinkDuration={0.5}
              className="hero-typewriter"
              loop={false}
            />
          </h1>
          <p className="hero-subhead" data-aos="fade-up" data-aos-delay="200">
            <SplitTextComp WordWrapper={StaggerWord}>
              We craft brands and products that stand out. Let's build something memorable—websites, branding, and experiences that connect with your audience.
            </SplitTextComp>
          </p>
          <div className="hero-actions" data-aos="fade-up" data-aos-delay="300">
            <a href="#portfolio" className="btn btn-hero-primary">
              Explore More
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a href="#portfolio" className="hero-demo">
              <span className="hero-demo-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
              <span className="hero-demo-label">Watch Demo</span>
            </a>
          </div>
          <div className="hero-stats" data-aos="fade-up" data-aos-delay="400">
            {stats.map((s) => (
              <div key={s.label} className="hero-stat">
                <span className="hero-stat-value">{s.value}</span>
                <span className="hero-stat-arrow" aria-hidden>→</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-visual" data-aos="fade-left" data-aos-delay="200">
          <div className="hero-capsules">
            <div className="hero-capsule hero-capsule-lg">
              <img src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=85" alt="" className="hero-capsule-img" />
            </div>
            <div className="hero-capsule hero-capsule-sm hero-capsule-tl">
              <img
                src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=520&q=85"
                alt=""
                className="hero-capsule-img"
                loading="eager"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/design-desk/520/320'; }}
              />
            </div>
            <div className="hero-capsule hero-capsule-sm hero-capsule-br">
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=85" alt="" className="hero-capsule-img" />
            </div>
          </div>
          <div className="hero-dots" aria-hidden>
            <span className="hero-dot active" />
            <span className="hero-dot" />
            <span className="hero-dot" />
          </div>
        </div>
      </div>
      <div className="hero-scroll-hint" aria-hidden>
        <span className="hero-scroll-hint-text">Scroll</span>
        <span className="hero-scroll-hint-chevron">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </span>
      </div>
      <style>{`
        .hero-split-word {
          display: inline-block;
          white-space: pre;
          opacity: 0;
          transform: translateY(0.4em);
          animation: hero-word-in 0.5s ease forwards;
        }
        @keyframes hero-word-in {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hero-tailored {
          padding: var(--spacing-2xl) 0;
          min-height: 70vh;
          display: flex;
          align-items: center;
          position: relative;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-xl);
          align-items: center;
        }
        .hero-content {
          max-width: 560px;
        }
        .hero-headline {
          font-size: clamp(2rem, 4.5vw, 3rem);
          line-height: 1.2;
          margin-bottom: var(--spacing-md);
          letter-spacing: -0.02em;
          color: var(--color-primary);
          min-height: 1.2em;
        }
        .hero-typewriter {
          display: inline-block;
        }
        .text-type-cursor {
          display: inline-block;
          font-weight: 400;
          color: var(--color-cyan);
          animation: hero-cursor-blink 1s step-end infinite;
        }
        @keyframes hero-cursor-blink {
          50% { opacity: 0; }
        }
        .hero-subhead {
          font-size: 1.05rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          margin-bottom: var(--spacing-lg);
        }
        .hero-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-xl);
        }
        .btn-hero-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .hero-demo {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--color-text);
          font-weight: 500;
          transition: color var(--transition-fast);
        }
        .hero-demo:hover {
          color: var(--color-cyan);
        }
        .hero-demo-circle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--color-surface);
          border: 2px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-cyan);
          box-shadow: 0 4px 14px var(--color-shadow);
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }
        .hero-demo:hover .hero-demo-circle {
          border-color: var(--color-turquoise);
          box-shadow: 0 6px 20px var(--color-shadow);
        }
        .hero-demo-label {
          font-size: 0.95rem;
        }
        .hero-stats {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-lg);
        }
        .hero-stat {
          display: flex;
          align-items: baseline;
          gap: 0.35rem;
        }
        .hero-stat-value {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-text);
        }
        .hero-stat-arrow {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          opacity: 0.7;
        }
        .hero-stat-label {
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }
        .hero-visual {
          position: relative;
          min-height: 420px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .hero-capsules {
          position: relative;
          width: 100%;
          max-width: 540px;
          min-height: 360px;
        }
        .hero-capsule {
          position: absolute;
          border: 2px solid var(--color-border);
          border-radius: 999px;
          background: var(--color-surface);
          box-shadow: var(--shadow-card);
          overflow: hidden;
        }
        .hero-capsule-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .hero-capsule-lg {
          width: 90%;
          height: 260px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, var(--color-bg-outer) 0%, var(--color-surface) 100%);
        }
        .hero-capsule-sm {
          width: 52%;
          height: 152px;
          background: var(--color-surface);
        }
        .hero-capsule-tl {
          left: 0;
          top: 0;
          transform: translateY(-8px);
        }
        .hero-capsule-br {
          right: 0;
          bottom: 0;
          transform: translate(8px, 8px);
        }
        .hero-dots {
          display: flex;
          gap: 0.5rem;
          margin-top: var(--spacing-lg);
        }
        .hero-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-border);
          transition: background var(--transition-fast);
        }
        .hero-dot.active {
          background: var(--color-cyan);
          transform: scale(1.1);
        }
        .hero-scroll-hint {
          position: absolute;
          bottom: var(--spacing-lg);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          color: var(--color-text-muted);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.85;
          animation: hero-scroll-hint-bounce 2s ease-in-out infinite;
        }
        .hero-scroll-hint-chevron {
          display: flex;
          color: var(--color-cyan);
        }
        @keyframes hero-scroll-hint-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-xl);
          }
          .hero-content {
            max-width: 100%;
            text-align: center;
          }
          .hero-actions {
            justify-content: center;
          }
          .hero-stats {
            justify-content: center;
          }
          .hero-visual {
            min-height: 300px;
            order: -1;
          }
          .hero-capsules {
            max-width: 400px;
            min-height: 260px;
          }
          .hero-capsule-lg {
            height: 200px;
          }
          .hero-capsule-sm {
            height: 116px;
          }
        }
        @media (max-width: 600px) {
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }
          .hero-stats {
            flex-direction: column;
            align-items: center;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-split-word {
            animation: none;
            opacity: 1;
            transform: none;
          }
          .hero-scroll-hint {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;

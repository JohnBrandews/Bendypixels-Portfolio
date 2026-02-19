import React from 'react';

const IconLock = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconAccessibility = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="2.5" />
    <path d="M12 14.5v4M9 18l3-2 3 2" />
    <path d="M8 12l-2 1.5M16 12l2 1.5" />
    <path d="M12 14.5c-1.5 0-2.5.8-3 2" />
    <path d="M12 14.5c1.5 0 2.5.8 3 2" />
  </svg>
);

const About: React.FC = () => {
  return (
    <section id="about" className="section about-section" data-aos="fade-up">
      <div className="container">
        <div className="about-grid">
          {/* Left: Image card with community overlay */}
          <div className="about-card about-card--image" data-aos="fade-up" data-aos-delay="100">
            <div className="about-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1521185496955-15097b20c5fe?q=80&w=1050&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Creative workspace and design"
                className="about-image-img"
              />
              <div className="about-community-overlay">
                <div className="about-avatars">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" alt="" className="about-avatar" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="" className="about-avatar" />
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" alt="" className="about-avatar" />
                  <span className="about-avatar-badge">+350</span>
                </div>
                <p className="about-community-text">Trusted by 350+ brands to bring their vision to life</p>
              </div>
            </div>
          </div>

          {/* Right: Content card */}
          <div className="about-card about-card--content" data-aos="fade-up" data-aos-delay="150">
            <h2 className="about-heading">Where Ideas Blossom Into Digital Experiences</h2>
            <p className="about-description">
              Bendypixels isn't just a space to build websites—it's where your vision takes center stage.
              Here we craft immersive digital ecosystems that drive growth and engagement, with an approach
              rooted in minimalism, functionality, and aesthetic excellence.
            </p>
            <a href="#contact" className="about-cta">
              Read More →
            </a>
            <div className="about-features">
              <div className="about-feature">
                <span className="about-feature-icon about-feature-icon--lock" aria-hidden>
                  <IconLock />
                </span>
                <h3 className="about-feature-title">Confidentiality</h3>
                <p className="about-feature-desc">
                  Your privacy is our priority. A discreet and secure space for your project and ideas.
                </p>
              </div>
              <div className="about-feature">
                <span className="about-feature-icon about-feature-icon--access" aria-hidden>
                  <IconAccessibility />
                </span>
                <h3 className="about-feature-title">Accessibility</h3>
                <p className="about-feature-desc">
                  Designed for everyone, with clear processes that make collaboration easy and inclusive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .about-section {
          padding-top: clamp(2.5rem, 6vw, 4rem);
          padding-bottom: clamp(2.5rem, 6vw, 4rem);
        }
        .about-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: clamp(1.5rem, 4vw, 2.5rem);
          align-items: stretch;
        }
        .about-card {
          background: var(--color-surface);
          border-radius: 24px;
          box-shadow: 0 4px 24px var(--color-shadow), 0 0 0 1px var(--color-border);
          overflow: hidden;
        }
        .about-card--image {
          min-height: 320px;
        }
        .about-image-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 380px;
        }
        .about-image-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .about-community-overlay {
          position: absolute;
          bottom: 1.25rem;
          left: 1.25rem;
          right: 1.25rem;
          max-width: 280px;
          padding: 1rem 1.25rem;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        .about-avatars {
          display: flex;
          align-items: center;
          gap: -6px;
          margin-bottom: 0.5rem;
        }
        .about-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #fff;
          margin-left: -8px;
        }
        .about-avatar:first-child { margin-left: 0; }
        .about-avatar-badge {
          margin-left: 4px;
          padding: 2px 8px;
          background: rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-text);
        }
        .about-community-text {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-text);
          line-height: 1.35;
        }
        .about-card--content {
          padding: clamp(1.75rem, 4vw, 2.5rem);
          display: flex;
          flex-direction: column;
        }
        .about-heading {
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 700;
          color: var(--color-primary);
          line-height: 1.25;
          margin-bottom: 1.25rem;
        }
        .about-description {
          font-size: 1rem;
          color: var(--color-text-muted);
          line-height: 1.65;
          margin-bottom: 1.5rem;
          flex: 1;
        }
        .about-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, var(--color-cyan) 0%, var(--color-turquoise) 100%);
          color: var(--color-primary);
          font-weight: 600;
          font-size: 0.95rem;
          border-radius: 12px;
          margin-bottom: 1.75rem;
          transition: opacity 0.2s ease, transform 0.2s ease;
          align-self: flex-start;
        }
        .about-cta:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .about-cta:focus-visible {
          outline: 2px solid var(--color-cyan);
          outline-offset: 2px;
        }
        .about-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .about-feature {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 14px;
          padding: 1.25rem;
          text-align: center;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
        }
        .about-feature-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          margin-bottom: 0.75rem;
        }
        .about-feature-icon--lock {
          background: rgba(0, 255, 255, 0.18);
          color: var(--color-cyan);
        }
        .about-feature-icon--access {
          background: rgba(0, 219, 250, 0.2);
          color: var(--color-turquoise);
        }
        .about-feature-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 0.35rem;
        }
        .about-feature-desc {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
          .about-card--image {
            min-height: 280px;
          }
          .about-image-wrap {
            min-height: 320px;
          }
        }
        @media (max-width: 480px) {
          .about-features {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default About;



const About: React.FC = () => {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <div className="about-grid">
                    <div className="about-content">
                        <h2 className="section-title">Who We Are</h2>
                        <p className="about-text">
                            We are a collective of designers, developers, and strategists passionate about
                            pushing the boundaries of what's possible on the web.
                        </p>
                        <p className="about-text">
                            At Bendypixels, we don't just build websites; we create immersive digital
                            ecosystems that drive growth and engagement. Our approach is rooted in
                            minimalism, functionality, and aesthetic excellence.
                        </p>
                        <div className="stats">
                            <div className="stat-item">
                                <span className="stat-number">50+</span>
                                <span className="stat-label">Projects</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">30+</span>
                                <span className="stat-label">Clients</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">5y</span>
                                <span className="stat-label">Experience</span>
                            </div>
                        </div>
                    </div>
                    <div className="about-image">
                        <div className="image-placeholder"></div>
                    </div>
                </div>
            </div>
            <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .section-title {
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }
        .about-text {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1.5rem;
        }
        .stats {
          display: flex;
          gap: 3rem;
          margin-top: 3rem;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
        }
        .stat-number {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-primary);
        }
        .stat-label {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.6;
        }
        .image-placeholder {
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(45deg, var(--color-surface), var(--color-surface-hover));
          border-radius: var(--radius-lg);
          position: relative;
          overflow: hidden;
        }
        .image-placeholder::after {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80') center/cover;
          opacity: 0.6;
          transition: transform 0.5s ease;
        }
        .image-placeholder:hover::after {
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
        </section>
    );
};

export default About;

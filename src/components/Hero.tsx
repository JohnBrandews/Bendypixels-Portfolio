

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="container hero-content">
        <h1 className="hero-title">
          We craft digital <br />
          <span className="gradient-text">experiences</span> that matter.
        </h1>
        <p className="hero-subtitle">
          Bendypixels is a creative agency bridging the gap between art and technology.
          We build brands that stand out in the digital noise.
        </p>
        <div className="hero-actions">
          <a href="#portfolio" className="btn">View Our Work</a>
          <a href="#contact" className="btn btn-outline">Get in Touch</a>
        </div>
      </div>
      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 80px; /* Header height */
          background: radial-gradient(circle at 50% 50%, rgba(100, 108, 255, 0.1) 0%, rgba(10, 10, 10, 0) 50%);
        }
        .hero-content {
          max-width: 900px;
          text-align: center;
          margin: 0 auto;
        }
        .hero-title {
          font-size: clamp(3rem, 8vw, 5rem);
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.03em;
        }
        .gradient-text {
          background: linear-gradient(to right, var(--color-primary), var(--color-accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto 2.5rem;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
      `}</style>
    </section>
  );
};

export default Hero;

import { useMemo } from 'react';
import testimonialsData from '../data/testimonials.json';

const CARD_WIDTH = 260;
const GAP = 24;
const CARD_TOTAL = CARD_WIDTH + GAP;

const Testimonials: React.FC = () => {
  const duplicated = useMemo(
    () => [...testimonialsData, ...testimonialsData, ...testimonialsData],
    []
  );

  return (
    <section className="section bg-surface testimonials-section" data-aos="fade-up">
      <div className="container">
        <h2 className="section-title text-center mb-lg" data-aos="fade-up" data-aos-delay="100">Client Stories</h2>
        <div className="testimonials-carousel-wrap" aria-label="Testimonials carousel" data-aos="fade-up" data-aos-delay="150">
          <div className="testimonials-carousel-track">
            {duplicated.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="testimonial-card"
                style={{ minWidth: CARD_WIDTH }}
                data-aos="fade-up"
                data-aos-delay={200 + (index % testimonialsData.length) * 60}
              >
                <p className="testimonial-text">"{item.text}"</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>{item.name}</h4>
                    <p>{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .bg-surface {
          background-color: var(--color-surface);
        }
        .testimonials-section .container {
          max-width: 100%;
          overflow: hidden;
        }
        .testimonials-carousel-wrap {
          overflow: hidden;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }
        .testimonials-carousel-track {
          display: flex;
          gap: ${GAP}px;
          width: max-content;
          animation: testimonials-scroll 45s linear infinite;
        }
        .testimonials-carousel-track:hover {
          animation-play-state: paused;
        }
        @keyframes testimonials-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${testimonialsData.length * CARD_TOTAL}px); }
        }
        .testimonial-card {
          background: var(--color-bg);
          padding: 2rem 1.5rem;
          min-height: 220px;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
          transition: transform 0.3s ease, border-color 0.3s ease;
          flex-shrink: 0;
        }
        .testimonial-card:hover {
          transform: translateY(-5px);
          border-color: var(--color-cyan);
        }
        .testimonial-text {
          font-size: 1.05rem;
          line-height: 1.7;
          font-style: italic;
          margin-bottom: 1.5rem;
          color: var(--color-text);
        }
        .author-info h4 {
          font-size: 1rem;
          margin-bottom: 0.2rem;
          color: var(--color-text);
        }
        .author-info p {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;

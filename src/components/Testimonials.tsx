
import testimonialsData from '../data/testimonials.json';

const Testimonials: React.FC = () => {
  return (
    <section className="section bg-surface">
      <div className="container">
        <h2 className="section-title text-center mb-lg">Client Stories</h2>
        <div className="testimonials-grid">
          {testimonialsData.map((item) => (
            <div key={item.id} className="testimonial-card">
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
      <style>{`
        .bg-surface {
          background-color: var(--color-surface);
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        .testimonial-card {
          background: var(--color-bg);
          padding: 2rem;
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: transform 0.3s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-5px);
          border-color: var(--color-primary);
        }
        .testimonial-text {
          font-size: 1.1rem;
          font-style: italic;
          margin-bottom: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
        }
        .author-info h4 {
          font-size: 1rem;
          margin-bottom: 0.2rem;
        }
        .author-info p {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;

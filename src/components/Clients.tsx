import React from 'react';

const brands = [
  { src: '/brand2.png', alt: 'Stanpixels' },
  { src: '/brand1.jpeg', alt: 'Vertex Global Commodities', size: 'large' as const },
  { src: '/logo.jpeg', alt: 'Bendy Pixel', size: 'large' as const },
  { src: '/brand3.png', alt: 'Partner' },
];

const Clients: React.FC = () => {
  const loopBrands = [...brands, ...brands];

  return (
    <section className="clients-section" data-aos="fade-up" aria-label="Brands we work with">
      <div className="container">
        <div className="clients-marquee">
          <div className="clients-track">
            {loopBrands.map((b, i) => (
              <div key={`${b.alt}-${i}`} className={`client-logo ${b.size === 'large' ? 'client-logo--large' : ''}`}>
                <img src={b.src} alt={b.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
        <div className="clients-static">
          {brands.map((b) => (
            <div key={b.alt} className={`client-logo ${b.size === 'large' ? 'client-logo--large' : ''}`}>
              <img src={b.src} alt={b.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .clients-section {
          padding: var(--spacing-xl) 0;
          border-top: 1px solid var(--color-border);
        }
        .clients-static {
          display: none;
        }
        .clients-marquee {
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        .clients-track {
          display: flex;
          align-items: center;
          gap: var(--spacing-xl);
          width: max-content;
          animation: clients-scroll 25s linear infinite;
        }
        .clients-track:hover {
          animation-play-state: paused;
        }
        @keyframes clients-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .clients-marquee { display: none; }
          .clients-static {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: var(--spacing-xl);
          }
        }
        .client-logo {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 80px;
          min-width: 200px;
        }
        .client-logo--large {
          height: 100px;
          min-width: 260px;
        }
        .client-logo img {
          max-height: 72px;
          max-width: 200px;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: grayscale(0.4);
          opacity: 0.85;
          transition: filter 0.2s ease, opacity 0.2s ease;
        }
        .client-logo--large img {
          max-height: 92px;
          max-width: 260px;
        }
        .client-logo:hover img {
          filter: grayscale(0);
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Clients;

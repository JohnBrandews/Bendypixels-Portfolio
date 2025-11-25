import React, { useState, useEffect } from 'react';
import pricingData from '../data/pricing.json';
import { client, urlFor } from '../lib/sanity';

interface Project {
  _id: string;
  title: string;
  category: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage: any;
}

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'websites' | 'branding' | 'writing'>('websites');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const whatsappNumber = "254111666710";

  const getWhatsappLink = (message: string) => {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  // Fetch projects from Sanity when Branding tab is opened
  useEffect(() => {
    if (activeTab === 'branding' && projects.length === 0) {
      client
        .fetch(`*[_type == "project"]{
          _id,
          title,
          category,
          mainImage
        }`)
        .then((data) => {
          console.log('Sanity Data Fetched:', data);
          if (!data || data.length === 0) {
            console.warn('Sanity returned no projects. Check your dataset and CORS settings.');
          }
          setProjects(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Sanity Fetch Error:', err);
          console.error('Make sure https://bendypixels.netlify.app is added to your Sanity CORS origins.');
          setLoading(false);
        });
    }
  }, [activeTab, projects.length]);

  const categories = [
    { label: 'All', value: 'All' },
    { label: 'Political Posters', value: 'political' },
    { label: 'Events Posters', value: 'events' },
    { label: 'Sports Posters', value: 'sports' },
    { label: 'Business Logos', value: 'logos' },
    { label: 'Business Cards', value: 'cards' },
    { label: 'Business Mockups', value: 'mockups' },
    { label: 'Branding Packages', value: 'branding' },
  ];

  const filteredProjects = projects.filter((project) => {
    if (filter === 'All') return true;
    // Check if category includes the filter value (case insensitive)
    return project.category?.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <h2 className="section-title text-center mb-md">Our Services & Work</h2>

        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'websites' ? 'active' : ''}`}
            onClick={() => setActiveTab('websites')}
          >
            Websites
          </button>
          <button
            className={`tab-btn ${activeTab === 'branding' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('branding');
              if (projects.length === 0) setLoading(true);
            }}
          >
            Branding
          </button>
          <button
            className={`tab-btn ${activeTab === 'writing' ? 'active' : ''}`}
            onClick={() => setActiveTab('writing')}
          >
            Writing
          </button>
        </div>

        <div className="tab-content">
          {/* Websites Tab */}
          {activeTab === 'websites' && (
            <>
              <div className="pricing-grid">
                {pricingData.websites.map((plan) => (
                  <div key={plan.id} className="pricing-card">
                    <h3 className="plan-title">{plan.title}</h3>
                    <p className="plan-price-label">Starts from KSH.</p>
                    <div className="plan-price">{plan.price}</div>
                    <ul className="plan-features">
                      {plan.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    <a
                      href={getWhatsappLink(`I want the ${plan.title} website package.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-full"
                    >
                      Order Now
                    </a>
                  </div>
                ))}
              </div>

              {/* Quotation Inclusives */}
              <div className="quotation-section">
                <h3 className="section-subtitle text-center">Quotation Inclusives</h3>
                <div className="quotation-grid">
                  {/* Hosting & Domain */}
                  <div className="quotation-card">
                    <h4>Hosting & Domain</h4>
                    <ul>
                      <li>1 Year Domain Registration</li>
                      <li>1 Year Hosting (Shared/Cloud)</li>
                      <li>SSL Certificate (Free)</li>
                      <li>Email Setup (up to 5 accounts)</li>
                      <li>CDN Integration</li>
                      <li>Daily Backups</li>
                    </ul>
                  </div>

                  {/* Payment Terms */}
                  <div className="quotation-card">
                    <h4>Payment Terms</h4>
                    <div className="payment-terms">
                      <div className="term-row">
                        <span>Initial Deposit</span>
                        <span className="highlight">50%</span>
                      </div>
                      <div className="term-row">
                        <span>Development Phase</span>
                        <span className="highlight">25%</span>
                      </div>
                      <div className="term-row">
                        <span>Final Payment</span>
                        <span className="highlight">25%</span>
                      </div>
                    </div>
                    <p className="payment-note">Payments due within 7 days of milestones.</p>
                    <p className="payment-disclaimer">* Timeline may vary depending on project complexity, team availability, and client responsiveness.</p>
                  </div>

                  {/* Client Responsibilities */}
                  <div className="quotation-card">
                    <h4>Client Responsibilities</h4>
                    <div className="responsibility-group">
                      <h5>Content & Assets</h5>
                      <ul>
                        <li>Provide website content (text, images)</li>
                        <li>Logo and brand assets</li>
                        <li>Access to existing systems if needed</li>
                      </ul>
                    </div>
                    <div className="responsibility-group">
                      <h5>Communication</h5>
                      <ul>
                        <li>Timely feedback (48hr response time)</li>
                        <li>Content approval within deadlines</li>
                        <li>Availability for testing phase</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Branding Tab - FROM SANITY */}
          {activeTab === 'branding' && (
            <div>
              {/* Filter Buttons */}
              <div className="filter-buttons">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setFilter(cat.value)}
                    className={`filter-btn ${filter === cat.value ? 'active' : ''}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="portfolio-grid">
                {loading ? (
                  <p className="text-center col-span-full py-20">Loading your latest work...</p>
                ) : filteredProjects.length === 0 ? (
                  <p className="text-center col-span-full py-20">
                    {projects.length === 0 ? "No projects yet. Add some in Sanity!" : "No projects found in this category."}
                  </p>
                ) : (
                  filteredProjects.map((item) => (
                    <div key={item._id} className="portfolio-item">
                      <div className="portfolio-image">
                        <img
                          src={item.mainImage ? urlFor(item.mainImage).width(800).height(600).url() : 'https://via.placeholder.com/800x600?text=No+Image'}
                          alt={item.title}
                        />
                        <div className="portfolio-overlay">
                          <h3>{item.title}</h3>
                          <p>{item.category || 'Branding'}</p>
                          <div className="overlay-buttons">
                            <button
                              className="btn btn-sm btn-view"
                              onClick={() => setSelectedImage(item.mainImage ? urlFor(item.mainImage).url() : null)}
                            >
                              View
                            </button>
                            <a
                              href={getWhatsappLink(`I want a design like "${item.title}" made.`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm"
                            >
                              Order Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Writing Tab */}
          {activeTab === 'writing' && (
            <div className="services-grid">
              {pricingData.writing.map((service) => (
                <div key={service.id} className="service-card">
                  <h3>{service.title}</h3>
                  <p className="service-desc">{service.description}</p>
                  <div className="service-price">
                    KSH {service.price} <span className="unit">{service.unit}</span>
                  </div>
                  <a
                    href={getWhatsappLink(`I am interested in your ${service.title} service.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    Order Now
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedImage(null)}>×</button>
            <img src={selectedImage} alt="Full size view" />
          </div>
        </div>
      )}

      <style>{`
        .tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }
        .tab-btn {
          padding: 0.8rem 2rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.05);
          color: var(--color-text);
          font-weight: 600;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }
        .tab-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .tab-btn.active {
          background: var(--color-primary);
          color: white;
          box-shadow: 0 4px 20px rgba(100, 108, 255, 0.3);
        }

        /* Filter Buttons */
        .filter-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }
        .filter-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          font-weight: 500;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.7);
        }
        .filter-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }
        .filter-btn.active {
          background: var(--color-primary);
          color: white;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        /* Pricing Cards */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .pricing-card {
          background: var(--color-surface);
          padding: 2.5rem;
          border-radius: var(--radius-lg);
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: transform 0.3s ease;
        }
        .pricing-card:hover {
          transform: translateY(-10px);
          border-color: var(--color-primary);
        }
        .plan-title {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .plan-price-label {
          font-size: 0.9rem;
          opacity: 0.7;
          margin-bottom: 0.5rem;
        }
        .plan-price {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 2rem;
          font-family: var(--font-display);
        }
        .plan-features {
          list-style: none;
          text-align: left;
          margin-bottom: 2rem;
        }
        .plan-features li {
          padding: 0.8rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
        }
        .plan-features li::before {
          content: '✓';
          color: var(--color-accent);
          margin-right: 0.8rem;
          font-weight: bold;
        }
        .btn-full {
          width: 100%;
        }

        /* Quotation Inclusives */
        .quotation-section {
          margin-top: 4rem;
        }
        .section-subtitle {
          font-size: 2rem;
          margin-bottom: 2rem;
          color: var(--color-text);
        }
        .quotation-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .quotation-card {
          background: var(--color-surface);
          padding: 2rem;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .quotation-card h4 {
          color: var(--color-primary);
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 0.5rem;
        }
        .quotation-card ul {
          list-style: none;
          padding: 0;
        }
        .quotation-card li {
          margin-bottom: 0.8rem;
          color: rgba(255, 255, 255, 0.8);
          position: relative;
          padding-left: 1.2rem;
        }
        .quotation-card li::before {
          content: '•';
          color: var(--color-accent);
          position: absolute;
          left: 0;
        }
        
        /* Payment Terms specific */
        .payment-terms {
          margin-bottom: 1.5rem;
        }
        .term-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.8rem;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
          padding-bottom: 0.2rem;
        }
        .term-row span {
          color: rgba(255, 255, 255, 0.9);
        }
        .term-row .highlight {
          color: var(--color-accent);
          font-weight: bold;
        }
        .payment-note {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 0.5rem;
        }
        .payment-disclaimer {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
          font-style: italic;
        }

        /* Client Responsibilities specific */
        .responsibility-group {
          margin-bottom: 1.5rem;
        }
        .responsibility-group h5 {
          color: white;
          font-size: 1rem;
          margin-bottom: 0.8rem;
        }

        /* Branding Section */
        .branding-container {
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }
        .category-section {
          width: 100%;
        }
        .category-title {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--color-text);
        }
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        .portfolio-item {
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
        }
        .portfolio-image {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
        }
        .portfolio-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .portfolio-item:hover .portfolio-image img {
          transform: scale(1.05);
        }
        .portfolio-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4));
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .portfolio-item:hover .portfolio-overlay {
          opacity: 1;
        }
        .portfolio-overlay h3 {
          margin-bottom: 1rem;
          transform: translateY(10px);
          transition: transform 0.3s ease;
        }
        .portfolio-item:hover .portfolio-overlay h3 {
          transform: translateY(0);
        }
        .overlay-buttons {
          display: flex;
          gap: 0.5rem;
          transform: translateY(10px);
          transition: transform 0.3s ease 0.1s;
        }
        .portfolio-item:hover .overlay-buttons {
          transform: translateY(0);
        }
        .btn-view {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(5px);
        }
        .btn-view:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        .mt-sm { margin-top: 1rem; }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          backdrop-filter: blur(5px);
          animation: fadeIn 0.3s ease;
        }
        .modal-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
        }
        .modal-content img {
          max-width: 100%;
          max-height: 90vh;
          object-fit: contain;
          border-radius: var(--radius-sm);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
        .modal-close {
          position: absolute;
          top: -40px;
          right: -40px;
          background: none;
          border: none;
          color: white;
          font-size: 2rem;
          cursor: pointer;
          padding: 0.5rem;
          transition: transform 0.3s ease;
        }
        .modal-close:hover {
          transform: rotate(90deg);
          color: var(--color-primary);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Services Grid (Writing) */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .service-card {
          background: var(--color-surface);
          padding: 2rem;
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .service-desc {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }
        .service-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-accent);
          margin-bottom: 1.5rem;
        }
        .unit {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 400;
        }
      `}</style>
    </section>
  );
};

export default Portfolio;

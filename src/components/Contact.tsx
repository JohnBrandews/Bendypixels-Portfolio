import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        console.error('Server responded with error:', data);
        setErrorMessage(data.error || 'Failed to send message.');
        setStatus('error');
      }
    } catch (error) {
      console.error('Network or parsing error:', error);
      setErrorMessage('Network error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container contact-container">
        <div className="contact-info">
          <h2 className="section-title">Let's Create Something Amazing</h2>
          <p className="contact-desc">
            Ready to take your brand to the next level? Drop us a line and let's discuss your project.
          </p>
          <div className="contact-details">
            <div className="detail-item">
              <h3>Email</h3>
              <p>johnbrandews@gmail.com</p>
            </div>
            <div className="detail-item">
              <h3>Phone</h3>
              <p>+254111666710</p>
            </div>
            <div className="detail-item">
              <h3>moi avenue</h3>
              <p>Nairobi, Kenya</p>
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows={5}
              placeholder="Tell us about your project"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="success-msg">Message sent successfully! We will get back to you shortly.</p>
          )}
          {status === 'error' && (
            <p className="error-msg">{errorMessage || 'Failed to send message. Please try again.'}</p>
          )}
        </form>
      </div>
      <style>{`
        .contact-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }
        .contact-desc {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 3rem;
        }
        .contact-details {
          display: grid;
          gap: 2rem;
        }
        .detail-item h3 {
          font-size: 1.1rem;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }
        .contact-form {
          background: var(--color-surface);
          padding: 2.5rem;
          border-radius: var(--radius-lg);
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 1rem;
          background: var(--color-bg);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-sm);
          color: white;
          font-family: inherit;
          transition: border-color 0.3s ease;
        }
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--color-primary);
        }
        .success-msg {
          color: #4ade80;
          margin-top: 1rem;
          font-weight: 500;
        }
        .error-msg {
          color: #f87171;
          margin-top: 1rem;
          font-weight: 500;
        }
        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        @media (max-width: 768px) {
          .contact-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .contact-form {
            padding: 1.5rem;
          }
          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;

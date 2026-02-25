import React, { useState, useEffect } from 'react';
import AOS from 'aos';

const EMAIL = 'johnbrandews@gmail.com';
const WHATSAPP = '254111666710';
const HEADLINE_TEXT = 'Tell me about your next project';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (typedText.length >= HEADLINE_TEXT.length) {
      const blink = setInterval(() => setCursorVisible((v) => !v), 530);
      return () => clearInterval(blink);
    }
    const t = setTimeout(() => setTypedText(HEADLINE_TEXT.slice(0, typedText.length + 1)), 80);
    return () => clearTimeout(t);
  }, [typedText]);

  useEffect(() => {
    setTypedText('');
  }, []);

  useEffect(() => {
    if (showForm) {
      const t = setTimeout(() => AOS.refresh(), 150);
      return () => clearTimeout(t);
    }
  }, [showForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        console.error('Email error response:', data);
        setErrorMessage(data.error || 'Failed to send message.');
        setStatus('error');
      }
    } catch (error) {
      console.error('Fetch/Parsing error:', error);
      setErrorMessage('Network error. Please try again.');
      setStatus('error');
    }
  };

  const whatsappLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hi, I\'d like to discuss a project.')}`;

  return (
    <section id="contact" className="section contact-modern" data-aos="fade-up">
      <div className="container contact-inner">
        <h2 className="contact-headline text-center" data-aos="fade-up" data-aos-delay="100">
          <span className="typing-text">{typedText}</span>
          <span className={`typing-cursor ${cursorVisible ? 'visible' : ''}`} aria-hidden>|</span>
        </h2>
        <div className="contact-actions" data-aos="fade-up" data-aos-delay="200">
          <a href={`mailto:${EMAIL}`} className="btn btn-contact">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            Email Me
          </a>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-contact btn-whatsapp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            WhatsApp
          </a>
        </div>
        <div className="contact-form-toggle" data-aos="fade-up" data-aos-delay="250">
          <button type="button" className="link-button" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Send direct message' : 'Or send a message directly'}
          </button>
        </div>
        {showForm && (
          <form className="contact-form-modern" onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="100">
            <div className="form-group" data-aos="fade-up" data-aos-delay="150">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group" data-aos="fade-up" data-aos-delay="200">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group" data-aos="fade-up" data-aos-delay="250">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={4} placeholder="Tell me about your project" value={formData.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && <p className="form-msg success">Message sent. I’ll get back to you soon.</p>}
            {status === 'error' && <p className="form-msg error">{errorMessage}</p>}
          </form>
        )}
      </div>
      <style>{`
        .contact-modern {
          border-top: 1px solid var(--color-border);
        }
        .contact-headline {
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          margin-bottom: var(--spacing-lg);
          color: var(--color-primary);
          min-height: 1.2em;
        }
        .typing-cursor {
          opacity: 0;
          transition: opacity 0.1s ease;
        }
        .typing-cursor.visible {
          opacity: 1;
        }
        .contact-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-md);
        }
        .btn-contact {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-contact:focus-visible {
          outline: 2px solid var(--color-cyan);
          outline-offset: 3px;
        }
        .btn-whatsapp { background: #25D366; color: #fff; }
        .btn-whatsapp:hover { background: #20bd5a; }
        .contact-form-toggle { text-align: center; margin-bottom: var(--spacing-md); }
        .link-button {
          background: none;
          border: none;
          color: var(--color-text-muted);
          font-size: 0.9rem;
          text-decoration: underline;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 4px;
          transition: color var(--transition-fast), outline-offset 0.2s ease;
        }
        .link-button:hover { color: var(--color-cyan); }
        .link-button:focus-visible {
          outline: 2px solid var(--color-cyan);
          outline-offset: 2px;
        }
        .contact-form-modern {
          max-width: 480px;
          margin: 0 auto;
          padding: var(--spacing-lg);
          background: var(--color-bg-outer);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-card);
        }
        .form-group { margin-bottom: var(--spacing-sm); }
        .form-group label { display: block; margin-bottom: 0.25rem; font-size: 0.9rem; font-weight: 500; }
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          font-family: inherit;
          background: var(--color-surface);
          color: var(--color-text);
        }
        .form-group input:focus, .form-group textarea:focus {
          outline: none;
          border-color: var(--color-cyan);
          transition: border-color var(--transition-fast);
        }
        .form-msg { margin-top: var(--spacing-sm); font-size: 0.9rem; }
        .form-msg.success { color: #16a34a; }
        .form-msg.error { color: #dc2626; }
      `}</style>
    </section>
  );
};

export default Contact;



const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Bendypixels</h3>
            <p>&copy; {new Date().getFullYear()} Bendypixels.co. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <a href="https://www.instagram.com/bendypixels.co?igsh=MTM4MGtudmFtaTFxbg==">Instagram</a>
            <a href="#https://x.com/Lilbendy3?t=zJ0dnXGxEDW8aEltUxEb3w&s=09">Twitter</a>
            <a href="https://www.linkedin.com/in/john-brandews-8657562bb?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">LinkedIn</a>
            <a href="https://www.facebook.com/share/16vZ21rFpS/">Facebook</a>
          </div>
        </div>
      </div>
      <style>{`
        .footer {
          padding: 3rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 4rem;
        }
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-brand h3 {
          margin-bottom: 0.5rem;
        }
        .footer-brand p {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.5);
        }
        .footer-links {
          display: flex;
          gap: 1.5rem;
        }
        .footer-links a {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }
        .footer-links a:hover {
          color: var(--color-primary);
        }
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            text-align: center;
            gap: 2rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;

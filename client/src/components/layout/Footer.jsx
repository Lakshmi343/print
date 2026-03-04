import { Link } from 'react-router-dom';

export default function Footer({ data }) {
    const settings = data?.settings || {};

    const socials = [
        { key: 'facebook', icon: '📘', label: 'Facebook' },
        { key: 'twitter', icon: '🐦', label: 'Twitter' },
        { key: 'instagram', icon: '📸', label: 'Instagram' },
        { key: 'linkedin', icon: '💼', label: 'LinkedIn' },
    ];

    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            {settings.logo ? (
                                <img src={settings.logo} alt="Logo" style={{ height: '36px' }} />
                            ) : (
                                <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.3rem' }}>
                                    🖨️ PRINT<span style={{ color: 'var(--primary)' }}>PRO</span>
                                </span>
                            )}
                        </div>
                        <p className="footer-desc">
                            Your trusted partner for premium printing solutions. Quality, speed, and creativity in every print.
                        </p>
                        <div className="social-links">
                            {socials.map(s => (
                                settings[s.key] ? (
                                    <a key={s.key} href={settings[s.key]} target="_blank" rel="noopener noreferrer" className="social-link" title={s.label}>
                                        {s.icon}
                                    </a>
                                ) : null
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Services</h4>
                        <ul className="footer-links">
                            <li><Link to="/services/design">Graphic Design</Link></li>
                            <li><Link to="/services/offset">Offset Printing</Link></li>
                            <li><Link to="/services/large-format">Large Format</Link></li>
                            <li><Link to="/services/digital">Digital Printing</Link></li>
                            <li><Link to="/upload">File Upload</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Contact Us</h4>
                        <ul className="footer-contact">
                            {settings.address && <li><span>📍</span><span>{settings.address}</span></li>}
                            {settings.phone && <li><span>📞</span><a href={`tel:${settings.phone}`}>{settings.phone}</a></li>}
                            {settings.email && <li><span>✉️</span><a href={`mailto:${settings.email}`}>{settings.email}</a></li>}
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} PrintPro. All rights reserved.</p>
                    <div className="footer-legal">
                        <Link to={settings.privacy_link || '/privacy-policy'}>Privacy Policy</Link>
                        <span>·</span>
                        <Link to={settings.terms_link || '/terms'}>Terms & Conditions</Link>
                    </div>
                </div>
            </div>

            <style>{`
        .site-footer {
          background: #0a0a0a;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 80px 0 0;
          margin-top: 0;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 48px;
          padding-bottom: 60px;
        }
        .footer-logo { margin-bottom: 16px; color: #fff; }
        .footer-desc {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.7;
          margin-bottom: 24px;
        }
        .social-links { display: flex; gap: 10px; }
        .social-link {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s;
        }
        .social-link:hover {
          background: rgba(232,160,0,0.15);
          border-color: var(--primary);
          transform: translateY(-2px);
        }
        .footer-heading {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--primary);
          margin-bottom: 20px;
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-links a {
          color: var(--text-muted);
          font-size: 0.9rem;
          transition: all 0.2s;
        }
        .footer-links a:hover { color: var(--text-primary); padding-left: 4px; }
        .footer-contact {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-contact li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        .footer-contact span:first-child { font-size: 1rem; flex-shrink: 0; margin-top: 2px; }
        .footer-contact a { color: var(--text-muted); transition: color 0.2s; }
        .footer-contact a:hover { color: var(--primary); }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 24px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-bottom p { color: var(--text-muted); font-size: 0.875rem; }
        .footer-legal {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-muted);
          font-size: 0.875rem;
        }
        .footer-legal a { color: var(--text-muted); transition: color 0.2s; }
        .footer-legal a:hover { color: var(--primary); }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; text-align: center; }
        }
      `}</style>
        </footer>
    );
}

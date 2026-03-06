import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiInstagramLine, RiTwitterXLine, RiFacebookFill } from 'react-icons/ri';

export default function Header({ data }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const settings = data?.settings || {};
  const menuItems = data?.menuItems || [];
  const ctaButtons = data?.ctaButtons || [];
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const renderNavItem = (item, className) => {
    const content = (
      <>
        {item.icon && (
          <span className="nav-icon" style={{ marginRight: '8px', display: 'flex', alignItems: 'center' }}>
            {item.icon.startsWith('http') || item.icon.startsWith('/') ? (
              <img src={item.icon} alt="" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
            ) : item.icon}
          </span>
        )}
        {item.label}
      </>
    );

    return item.link.startsWith('http') ? (
      <a key={item.id} href={item.link} className={className} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    ) : (
      <Link key={item.id} to={item.link} className={className}>
        {content}
      </Link>
    );
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        {/* Logo */}
        <Link to="/" className="header-logo">
          {settings.logo ? (
            <img src={settings.logo} alt="Logo" style={{ height: '32px' }} />
          ) : (
            <span className="logo-text">
              <span style={{ fontWeight: 700, fontSize: '1.6rem', letterSpacing: '-0.02em', color: '#fff' }}>LOGO</span>
            </span>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="header-nav desktop-nav">
          {menuItems.map(item => renderNavItem(item, 'nav-link'))}
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <div className="social-header" style={{ display: 'flex', gap: '4px', marginRight: '8px' }}>
            {settings.facebook && <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="icon-btn" title="Facebook"><RiFacebookFill size={18} /></a>}
            {settings.twitter && <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="icon-btn" title="Twitter"><RiTwitterXLine size={18} /></a>}
            {settings.instagram && <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="icon-btn" title="Instagram"><RiInstagramLine size={18} /></a>}
          </div>
          <button className="icon-btn" title="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <button className="icon-btn" title="Phone">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </button>

          {ctaButtons.length > 0 ? (
            ctaButtons.map(btn => (
              <button
                key={btn.id}
                className="btn-primary"
                onClick={() => btn.link.startsWith('http') ? window.open(btn.link, '_blank') : navigate(btn.link)}
                style={{ padding: '8px 20px', fontSize: '0.75rem', letterSpacing: '0.05em', background: 'transparent', border: '1px solid #87d500', color: '#87d500' }}
              >
                {btn.label.toUpperCase()}
              </button>
            ))
          ) : (
            <button className="btn-primary" onClick={() => navigate('/quote')} style={{ padding: '8px 20px', fontSize: '0.75rem', letterSpacing: '0.05em', background: 'transparent', border: '1px solid #87d500', color: '#87d500' }}>
              REQUEST A QUOTE
            </button>
          )}

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="mobile-nav">
          {menuItems.map(item => (
            <div key={item.id} onClick={() => setMenuOpen(false)}>
              {renderNavItem(item, 'mobile-nav-link')}
            </div>
          ))}
          {ctaButtons.map(btn => (
            <button
              key={btn.id}
              className="btn-primary"
              style={{ marginTop: '12px', justifyContent: 'center', width: '100%' }}
              onClick={() => {
                setMenuOpen(false);
                btn.link.startsWith('http') ? window.open(btn.link, '_blank') : navigate(btn.link);
              }}
            >
              {btn.label} →
            </button>
          ))}
          {ctaButtons.length === 0 && (
            <Link to="/quote" className="btn-primary" style={{ marginTop: '12px', justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>
              Request a Quote →
            </Link>
          )}
        </div>
      )}

      <style>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
          padding: 24px 0;
          background: transparent;
        }
        .site-header.scrolled {
          background: rgba(5,5,5,0.95);
          backdrop-filter: blur(12px);
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .header-inner {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .header-logo {
          flex-shrink: 0;
          text-decoration: none;
        }
        .logo-text {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Inter', sans-serif;
        }
        .header-nav {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }
        .nav-link {
          color: rgba(255,255,255,0.7);
          font-size: 0.75rem;
          font-weight: 300;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s;
          white-space: nowrap;
          text-decoration: none;
        }
        .nav-link:hover {
          color: #fff;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .icon-btn {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.7);
          padding: 8px 6px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          cursor: pointer;
        }
        .icon-btn:hover {
          background: rgba(255,255,255,0.12);
          color: #fff;
        }
        .hamburger {
          display: none;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 1.1rem;
        }
        .mobile-nav {
          background: rgba(13,13,13,0.98);
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 16px 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .mobile-nav-link {
          color: rgba(255,255,255,0.75);
          font-size: 1rem;
          font-weight: 500;
          padding: 12px 16px;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .mobile-nav-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.06);
        }
        @media (max-width: 900px) {
          .desktop-nav { display: none; }
          .hamburger { display: block; }
          .icon-btn { display: none; }
          .social-header { display: none !important; }
          .header-actions .btn-primary { display: none; }
        }
        @media (max-width: 480px) {
          .logo-text { font-size: 1.2rem; }
        }
      `}</style>
    </header>
  );
}

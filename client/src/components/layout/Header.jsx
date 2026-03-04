import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ data }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const settings = data?.settings || {};
    const menuItems = data?.menuItems || [];
    const navigate = useNavigate();

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
            <div className="container header-inner">
                {/* Logo */}
                <Link to="/" className="header-logo">
                    {settings.logo ? (
                        <img src={settings.logo} alt="Logo" style={{ height: '40px' }} />
                    ) : (
                        <span className="logo-text">
                            <span className="logo-icon">🖨️</span>
                            <span>PRINT<span className="logo-accent">PRO</span></span>
                        </span>
                    )}
                </Link>

                {/* Desktop Nav */}
                <nav className="header-nav desktop-nav">
                    {menuItems.map(item => (
                        <Link key={item.id} to={item.link} className="nav-link">{item.label}</Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="header-actions">
                    <button className="icon-btn" title="Search">🔍</button>
                    <button className="icon-btn" title="Cart">🛒</button>
                    <button className="icon-btn" title="Account">👤</button>
                    <button className="btn-primary" onClick={() => navigate('/quote')} style={{ padding: '10px 22px', fontSize: '0.85rem' }}>
                        Request a Quote →
                    </button>
                    <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {menuOpen && (
                <div className="mobile-nav">
                    {menuItems.map(item => (
                        <Link key={item.id} to={item.link} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                            {item.label}
                        </Link>
                    ))}
                    <Link to="/quote" className="btn-primary" style={{ marginTop: '12px', justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>
                        Request a Quote →
                    </Link>
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
          padding: 16px 0;
        }
        .site-header.scrolled {
          background: rgba(13,13,13,0.95);
          backdrop-filter: blur(12px);
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          box-shadow: 0 4px 24px rgba(0,0,0,0.4);
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
          font-family: 'Poppins', sans-serif;
          font-weight: 900;
          font-size: 1.4rem;
          color: #fff;
          letter-spacing: 0.02em;
        }
        .logo-icon { font-size: 1.6rem; }
        .logo-accent { color: var(--primary); }
        .header-nav {
          display: flex;
          align-items: center;
          gap: 4px;
          flex: 1;
        }
        .nav-link {
          color: rgba(255,255,255,0.75);
          font-size: 0.9rem;
          font-weight: 500;
          padding: 8px 14px;
          border-radius: 8px;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .nav-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.06);
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .icon-btn {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.7);
          padding: 8px 10px;
          border-radius: 8px;
          font-size: 0.9rem;
          transition: all 0.2s;
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
          .header-actions .btn-primary { display: none; }
        }
        @media (max-width: 480px) {
          .logo-text { font-size: 1.2rem; }
        }
      `}</style>
        </header>
    );
}

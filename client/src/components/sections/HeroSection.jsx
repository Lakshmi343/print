import { Link } from 'react-router-dom';

export default function HeroSection({ hero, highlights }) {
    if (!hero) return null;

    return (
        <section className="hero-section">
            {/* Background */}
            <div className="hero-bg">
                {hero.bg_image ? (
                    <img src={hero.bg_image} alt="" className="hero-bg-img" />
                ) : (
                    <div className="hero-bg-gradient" />
                )}
                <div className="hero-bg-overlay" />
            </div>

            <div className="container hero-content">
                <div className="hero-text">
                    <div className="hero-badge">✨ Premium Printing Solutions</div>
                    <h1 className="hero-headline">{hero.headline}</h1>
                    <p className="hero-subtext">{hero.subtext}</p>
                    <div className="hero-ctas">
                        <Link to={hero.cta_link || '/quote'} className="btn-primary" style={{ fontSize: '1rem', padding: '16px 36px' }}>
                            {hero.cta_text || 'Request a Quote'} →
                        </Link>
                        <Link to="/products" className="btn-outline" style={{ fontSize: '1rem', padding: '15px 32px' }}>
                            Browse Products
                        </Link>
                    </div>

                    {/* Highlights */}
                    {highlights && highlights.length > 0 && (
                        <div className="hero-highlights">
                            {highlights.map(h => (
                                <div key={h.id} className="hero-highlight">
                                    <span className="highlight-icon">{h.icon}</span>
                                    <span className="highlight-title">{h.title}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Hero visual */}
                <div className="hero-visual">
                    <div className="hero-card hero-card-main">
                        <div className="hc-header">
                            <span className="hc-dot red" /><span className="hc-dot yellow" /><span className="hc-dot green" />
                        </div>
                        <div className="hc-body">
                            <div className="hc-img-placeholder">
                                <span style={{ fontSize: '4rem' }}>🖨️</span>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>Your design here</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-stats">
                        <div className="stat-card"><div className="stat-num">500+</div><div className="stat-label">Happy Clients</div></div>
                        <div className="stat-card"><div className="stat-num">10K+</div><div className="stat-label">Orders Done</div></div>
                        <div className="stat-card accent"><div className="stat-num">24h</div><div className="stat-label">Fast Delivery</div></div>
                    </div>
                </div>
            </div>

            <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 120px 0 80px;
          overflow: hidden;
        }
        .hero-bg { position: absolute; inset: 0; z-index: 0; }
        .hero-bg-gradient {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 70% 40%, rgba(232,160,0,0.12) 0%, transparent 70%),
                      radial-gradient(ellipse 60% 80% at 20% 60%, rgba(255,107,53,0.06) 0%, transparent 60%),
                      var(--bg-dark);
        }
        .hero-bg-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.15; }
        .hero-bg-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--bg-dark) 50%, transparent 100%);
        }
        .hero-content {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .hero-text { max-width: 600px; }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(232,160,0,0.1);
          border: 1px solid rgba(232,160,0,0.25);
          color: var(--primary);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 8px 18px;
          border-radius: 50px;
          margin-bottom: 24px;
          text-transform: uppercase;
        }
        .hero-headline {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(2.6rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 1.1;
          color: var(--text-primary);
          margin-bottom: 20px;
          background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-subtext {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 36px;
        }
        .hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 48px; }
        .hero-highlights {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          padding-top: 24px;
          border-top: 1px solid var(--border);
        }
        .hero-highlight {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
        }
        .highlight-icon { font-size: 1.2rem; }
        .highlight-title { color: var(--text-primary); }

        /* Hero Visual */
        .hero-visual { display: flex; flex-direction: column; gap: 20px; align-items: flex-end; }
        .hero-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          width: 100%;
          max-width: 400px;
        }
        .hero-card-main { max-width: 380px; }
        .hc-header {
          display: flex;
          gap: 6px;
          padding: 12px 16px;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
        }
        .hc-dot { width: 10px; height: 10px; border-radius: 50%; }
        .hc-dot.red { background: #ff5f57; }
        .hc-dot.yellow { background: var(--primary); }
        .hc-dot.green { background: #27c93f; }
        .hc-body { padding: 32px; }
        .hc-img-placeholder {
          background: var(--surface);
          border-radius: var(--radius);
          aspect-ratio: 16/9;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 2px dashed var(--border);
        }
        .hero-stats {
          display: flex;
          gap: 12px;
          width: 100%;
          max-width: 380px;
        }
        .stat-card {
          flex: 1;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 16px;
          text-align: center;
          transition: var(--transition);
        }
        .stat-card:hover {
          border-color: var(--border-accent);
          transform: translateY(-2px);
        }
        .stat-card.accent {
          background: linear-gradient(135deg, rgba(232,160,0,0.15), rgba(232,160,0,0.05));
          border-color: var(--border-accent);
        }
        .stat-num {
          font-family: 'Poppins', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary);
        }
        .stat-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 2px;
        }
        @media (max-width: 900px) {
          .hero-content { grid-template-columns: 1fr; gap: 48px; text-align: center; }
          .hero-badge { margin: 0 auto 24px; }
          .hero-ctas { justify-content: center; }
          .hero-highlights { justify-content: center; }
          .hero-visual { align-items: center; }
          .hero-card-main, .hero-stats { max-width: 100%; }
        }
        @media (max-width: 480px) {
          .hero-section { padding: 100px 0 60px; }
          .hero-ctas { flex-direction: column; }
          .hero-ctas a { text-align: center; justify-content: center; }
        }
      `}</style>
        </section>
    );
}

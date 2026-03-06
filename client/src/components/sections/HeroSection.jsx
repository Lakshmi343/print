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
          <h1 className="hero-headline">{hero.headline}</h1>
          <p className="hero-subtext">{hero.subtext}</p>
          <div className="hero-ctas">
            <Link to={hero.cta_link || '/quote'} className="btn-primary" style={{ fontSize: '0.7rem', fontWeight: 600, padding: '12px 24px', letterSpacing: '0.05em', color: '#000', textTransform: 'uppercase' }}>
              {hero.cta_text || 'INSTANT PRICING & ORDER ONLINE'}
            </Link>
          </div>
        </div>
      </div>

      {/* Highlights Array at bottom */}
      {highlights && highlights.length > 0 && (
        <div className="container" style={{ position: 'relative', zIndex: 1, marginTop: 'auto' }}>
          <div className="hero-highlights">
            {highlights.map(h => (
              <div key={h.id} className="hero-highlight">
                <span className="highlight-icon">
                  {h.icon && (h.icon.startsWith('http') || h.icon.startsWith('/') || h.icon.startsWith('data:')) ? (
                    <img src={h.icon} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                  ) : (
                    h.icon
                  )}
                </span>
                <span className="highlight-title">{h.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .hero-section {
          position: relative;
          min-height: calc(100vh - 80px); /* Adjust based on header height */
          display: flex;
          flex-direction: column;
          padding: 180px 0 40px;
          overflow: hidden;
          background-color: #050505;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 100px 100px;
        }
        .hero-bg-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.2) 100%);
        }
        .hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex: 1;
          width: 100%;
        }
        .hero-text { max-width: 700px; }
        .hero-headline {
          font-family: 'Inter', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 700;
          line-height: 1.25;
          color: #fff;
          margin-bottom: 24px;
          letter-spacing: -0.01em;
        }
        .hero-subtext {
          font-family: 'Inter', sans-serif;
          font-size: 1.15rem;
          color: #a0a0a0;
          line-height: 1.6;
          margin-bottom: 40px;
          max-width: 450px;
          font-weight: 300;
        }
        .hero-ctas { display: flex; margin-bottom: 48px; }
        .btn-primary {
          background-color: #87d500 !important;
          background-image: none !important;
          border-color: #87d500 !important;
          border-radius: 40px !important;
          color: #000 !important;
          box-shadow: none !important;
        }
        .btn-primary:hover {
          background-color: #98ed00 !important;
          box-shadow: 0 0 15px rgba(135,213,0,0.3) !important;
        }
        
        /* Bottom Highlights Row */
        .hero-highlights-container {
          position: relative;
          z-index: 1;
          width: 100%;
          margin-top: auto;
          padding-top: 60px;
        }
        .hero-highlights {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          width: 100%;
        }
        .hero-highlight {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #fff;
          font-size: 0.85rem;
          font-family: 'Inter', sans-serif;
          padding: 24px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(0, 0, 0, 0.4);
          transition: border-color 0.3s ease;
        }
        .hero-highlight:hover {
          border-color: rgba(255, 255, 255, 0.3);
        }
        .highlight-icon { font-size: 1.2rem; display: flex; align-items: center; }
        .highlight-title { font-weight: 300; letter-spacing: 0.02em; }

        @media (max-width: 1024px) {
          .hero-highlights { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .hero-highlights { grid-template-columns: 1fr; }
          .hero-section { padding: 120px 0 40px; }
        }
      `}</style>
    </section>
  );
}

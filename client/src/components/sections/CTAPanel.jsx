import { Link } from 'react-router-dom';

const actionIcons = {
    'Request a Quote': '📋',
    'Visit Our Shops': '🏪',
    'Upload Your Files': '📤',
    'Call Us': '📞',
};

export default function CTAPanel({ ctaButtons, settings }) {
    if (!ctaButtons) return null;

    return (
        <section className="cta-panel-section">
            <div className="container">
                <div className="cta-inner">
                    {/* Left: Image + Text */}
                    <div className="cta-left">
                        <div className="cta-image-wrap">
                            {settings?.cta_section_image ? (
                                <img src={settings.cta_section_image} alt="" className="cta-image" />
                            ) : (
                                <div className="cta-image-placeholder">
                                    <span style={{ fontSize: '5rem' }}>🎨</span>
                                    <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '12px' }}>We print your dreams</span>
                                </div>
                            )}
                        </div>
                        {settings?.cta_section_text && (
                            <p className="cta-text">{settings.cta_section_text}</p>
                        )}
                    </div>

                    {/* Right: Buttons */}
                    <div className="cta-right">
                        <div className="section-tag" style={{ marginBottom: '16px' }}>Quick Actions</div>
                        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '12px', fontSize: '2rem' }}>
                            Ready to <span>Get Started?</span>
                        </h2>
                        <p className="section-desc" style={{ textAlign: 'left', margin: '0 0 32px', maxWidth: 'none' }}>
                            Take the next step toward your perfect print. Choose an option below.
                        </p>
                        <div className="cta-buttons-grid">
                            {ctaButtons.map(btn => (
                                <Link key={btn.id} to={btn.link} className="cta-action-btn">
                                    <span className="cta-btn-icon">{actionIcons[btn.label] || '→'}</span>
                                    <span className="cta-btn-label">{btn.label}</span>
                                    <span className="cta-btn-arrow">→</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .cta-panel-section {
          padding: 100px 0;
          background: var(--bg-card);
          position: relative;
          overflow: hidden;
        }
        .cta-panel-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 50% 60% at 20% 50%, rgba(232,160,0,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .cta-image-wrap {
          border-radius: var(--radius-lg);
          overflow: hidden;
          aspect-ratio: 4/3;
          background: var(--surface);
          border: 1px solid var(--border);
        }
        .cta-image { width: 100%; height: 100%; object-fit: cover; }
        .cta-image-placeholder {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
        }
        .cta-text {
          margin-top: 20px;
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.8;
        }
        .cta-buttons-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cta-action-btn {
          display: flex;
          align-items: center;
          gap: 16px;
          background: var(--bg-dark);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 16px 20px;
          transition: var(--transition);
          color: var(--text-primary);
          font-weight: 600;
        }
        .cta-action-btn:hover {
          background: rgba(232,160,0,0.08);
          border-color: var(--primary);
          transform: translateX(4px);
        }
        .cta-btn-icon {
          width: 40px;
          height: 40px;
          background: rgba(232,160,0,0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        .cta-btn-label { flex: 1; font-size: 0.95rem; }
        .cta-btn-arrow {
          color: var(--primary);
          font-weight: 700;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .cta-action-btn:hover .cta-btn-arrow { opacity: 1; }
        @media (max-width: 900px) {
          .cta-inner { grid-template-columns: 1fr; gap: 48px; }
          .cta-inner .section-title { font-size: 1.8rem !important; }
        }
      `}</style>
        </section>
    );
}

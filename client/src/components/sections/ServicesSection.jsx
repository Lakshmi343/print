import { Link } from 'react-router-dom';

export default function ServicesSection({ services }) {
    if (!services || services.length === 0) return null;

    return (
        <section className="services-section">
            <div className="container">
                <div className="section-header">
                    <div className="section-tag">What We Offer</div>
                    <h2 className="section-title">Our <span>Services</span></h2>
                    <p className="section-desc">From concept to final print, we offer comprehensive services to bring your vision to life.</p>
                </div>

                <div className="services-grid">
                    {services.map((svc, i) => (
                        <Link key={svc.id} to={svc.link || '#'} className="service-card">
                            <div className="svc-image-wrap">
                                <img src={svc.image} alt={svc.title} className="svc-image" />
                                <div className="svc-overlay" />
                                <div className="svc-number">0{i + 1}</div>
                            </div>
                            <div className="svc-content">
                                <h3 className="svc-title">{svc.title}</h3>
                                <p className="svc-desc">{svc.description}</p>
                                <span className="svc-link">Learn More →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <style>{`
        .services-section {
          padding: 100px 0;
          background: linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-card) 100%);
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .service-card {
          display: block;
          background: var(--bg-card2);
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--border);
          transition: var(--transition);
          position: relative;
        }
        .service-card:hover {
          border-color: var(--border-accent);
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
        }
        .svc-image-wrap {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
        }
        .svc-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          filter: brightness(0.7);
        }
        .service-card:hover .svc-image { transform: scale(1.06); filter: brightness(0.5); }
        .svc-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 50%);
        }
        .svc-number {
          position: absolute;
          top: 16px;
          left: 16px;
          font-family: 'Poppins', sans-serif;
          font-weight: 900;
          font-size: 2.5rem;
          color: rgba(232,160,0,0.25);
          line-height: 1;
        }
        .svc-content { padding: 24px; }
        .svc-title {
          font-family: 'Poppins', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 10px;
        }
        .svc-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .svc-link {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--primary);
          transition: gap 0.2s;
        }
        .service-card:hover .svc-link { letter-spacing: 0.03em; }
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 580px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </section>
    );
}

export default function TestimonialsSection({ testimonials }) {
    if (!testimonials || testimonials.length === 0) return null;

    const renderStars = (rating) => '★'.repeat(rating) + '☆'.repeat(5 - rating);

    return (
        <section className="testimonials-section">
            <div className="container">
                <div className="section-header">
                    <div className="section-tag">Reviews</div>
                    <h2 className="section-title">What Our <span>Clients Say</span></h2>
                    <p className="section-desc">Don't just take our word for it — hear from our satisfied customers.</p>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map(t => (
                        <div key={t.id} className="testimonial-card">
                            <div className="testi-quote">❝</div>
                            <p className="testi-text">{t.review}</p>
                            <div className="testi-footer">
                                <div className="testi-avatar">{t.name.charAt(0).toUpperCase()}</div>
                                <div>
                                    <div className="testi-name">{t.name}</div>
                                    <div className="stars">{renderStars(t.rating)}</div>
                                </div>
                                <div className="testi-date">
                                    {new Date(t.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .testimonials-section {
          padding: 100px 0;
          background: var(--bg-dark);
          position: relative;
          overflow: hidden;
        }
        .testimonials-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-accent), transparent);
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .testimonial-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 32px;
          transition: var(--transition);
          position: relative;
        }
        .testimonial-card:hover {
          border-color: var(--border-accent);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .testi-quote {
          font-size: 3rem;
          color: var(--primary);
          opacity: 0.3;
          line-height: 1;
          margin-bottom: 12px;
          font-family: Georgia, serif;
        }
        .testi-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.8;
          flex: 1;
          margin-bottom: 24px;
        }
        .testi-footer {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .testi-avatar {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #000;
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        .testi-name {
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .stars { color: var(--primary); font-size: 0.85rem; }
        .testi-date {
          margin-left: auto;
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        @media (max-width: 900px) {
          .testimonials-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 580px) {
          .testimonials-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </section>
    );
}

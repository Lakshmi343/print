import { Star } from 'lucide-react';

export default function TestimonialsSection({ testimonials, settings }) {
  if (!testimonials || testimonials.length === 0) return null;

  const title = settings?.testimonials_title || 'What Our Customers Say';

  return (
    <section className="testimonials-section-model">
      <div className="container">
        {/* Heading Model - Centered with bold emphasis */}
        <div className="testimonials-header-centered">
          <div className="testi-header-content">
            <h2 className="testi-main-title">
              {title.includes('Customers') ? (
                <>
                  What Our <span className="testi-title-bold">Customers</span> Say
                </>
              ) : title}
            </h2>
          </div>
        </div>

        {/* Grid Model - 3 Columns */}
        <div className="testimonials-grid-model">
          {testimonials.map(t => (
            <div key={t.id} className="testi-card-minimal">
              <div className="testi-card-top">
                <h4 className="testi-user-name">{t.name}</h4>
                <div className="testi-stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill={i < t.rating ? "#ffc107" : "none"}
                      stroke={i < t.rating ? "#ffc107" : "#333"}
                    />
                  ))}
                </div>
              </div>

              <p className="testi-user-review">
                {t.review}
              </p>

              <div className="testi-card-bottom">
                <span className="testi-timestamp">2 months</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
                .testimonials-section-model {
                    padding: 120px 0;
                    background-color: #000000;
                }
                .testimonials-header-centered {
                    text-align: center;
                    margin-bottom: 80px;
                }
                .testi-main-title {
                    font-family: 'Inter', sans-serif;
                    font-size: clamp(2rem, 4vw, 3.8rem);
                    font-weight: 300;
                    color: #fff;
                    letter-spacing: -0.02em;
                    line-height: 1.1;
                }
                .testi-header-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 30px;
                }
                .testi-heading-img-wrap {
                    width: 100%;
                    max-width: 300px;
                    aspect-ratio: 16/9;
                    overflow: hidden;
                    border-radius: 4px;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .testi-heading-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .testi-title-bold { font-weight: 800; }

                .testimonials-grid-model {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 30px;
                }
                .testi-card-minimal {
                    background-color: #080808;
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    border: 1px solid rgba(255,255,255,0.02);
                    min-height: 280px;
                    transition: border-color 0.3s ease;
                }
                .testi-card-minimal:hover {
                    border-color: rgba(255,255,255,0.1);
                }
                .testi-card-top { margin-bottom: 24px; }
                .testi-user-name {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin-bottom: 8px;
                }
                .testi-stars-row { display: flex; gap: 3px; }
                
                .testi-user-review {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.85rem;
                    line-height: 1.7;
                    color: #999;
                    margin-bottom: 30px;
                    flex: 1;
                    font-weight: 400;
                }

                .testi-card-bottom {
                    display: flex;
                    align-items: center;
                    margin-top: auto;
                }
                .testi-timestamp {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #444444;
                }

                @media (max-width: 1024px) {
                    .testimonials-grid-model { grid-template-columns: 1fr 1fr; }
                }
                @media (max-width: 600px) {
                    .testimonials-grid-model { grid-template-columns: 1fr; }
                    .testi-main-title { font-size: 2.5rem; }
                }
            `}</style>
    </section>
  );
}

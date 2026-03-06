import { Link } from 'react-router-dom';
import { FileText, MapPin, Upload, Phone } from 'lucide-react';

const actionIconMap = {
  'Request a Quote': <FileText size={20} />,
  'Request a Quotes': <FileText size={20} />,
  'Visit Our Shops': <MapPin size={20} />,
  'Upload Your Files': <Upload size={20} />,
  'Call Us': <Phone size={20} />,
};

export default function CTAPanel({ ctaButtons, settings }) {
  if (!ctaButtons) return null;

  const title = settings?.cta_title || 'Need Reliable & Budget-Friendly Printing?';
  const description = settings?.cta_description || 'We’re here to make your next project simple, smooth, and hassle-free.';

  return (
    <section className="cta-section-model">
      <div className="container">
        <div className="cta-grid-model">
          {/* Left: Quick Action Buttons */}
          <div className="cta-buttons-col">
            {ctaButtons.map(btn => (
              <Link key={btn.id} to={btn.link} className="cta-black-card">
                <span className="cta-card-icon">
                  {actionIconMap[btn.label] || <FileText size={20} />}
                </span>
                <span className="cta-card-label">{btn.label}</span>
              </Link>
            ))}
          </div>

          {/* Right: Content Section */}
          <div className="cta-content-col">
            <div className="cta-img-card">
              {settings?.cta_section_image ? (
                <img src={settings.cta_section_image} alt="Quick Action" />
              ) : (
                <div className="cta-img-placeholder">
                  <span style={{ fontSize: '3rem' }}>🤝</span>
                </div>
              )}
            </div>

            <div className="cta-body">
              <h2 className="cta-main-title">
                {title.includes('Reliable & Budget-Friendly') ? (
                  <>
                    {title.split('Reliable & Budget-Friendly')[0]}
                    <span className="cta-title-bold">Reliable & Budget-Friendly</span>
                    {title.split('Reliable & Budget-Friendly')[1]}
                  </>
                ) : title}
              </h2>
              <p className="cta-main-desc">{description}</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
                .cta-section-model {
                    padding: 80px 0;
                    background-color: #ffffff;
                }
                .cta-grid-model {
                    display: grid;
                    grid-template-columns: 0.8fr 1.2fr;
                    gap: 60px;
                    align-items: flex-start;
                }

                .cta-buttons-col {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .cta-black-card {
                    background-color: #111111;
                    padding: 24px 30px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    text-decoration: none;
                    border: 1px solid #111111;
                    transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
                }
                .cta-black-card:hover {
                    background-color: #000000;
                    transform: translateX(5px);
                    border-color: #000000;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
                .cta-card-icon {
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .cta-card-label {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: #ffffff;
                }

                .cta-content-col {
                    display: flex;
                    flex-direction: column;
                }
                .cta-img-card {
                    width: 100%;
                    aspect-ratio: 16/7;
                    overflow: hidden;
                    background-color: #f9f9f9;
                    margin-bottom: 35px;
                    border: 1px solid #e2e2e2;
                }
                .cta-img-card img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .cta-img-placeholder {
                    width: 100%; height: 100%;
                    display: flex; align-items: center; justify-content: center;
                }

                .cta-body {
                    max-width: 600px;
                }
                .cta-main-title {
                    font-family: 'Inter', sans-serif;
                    font-size: clamp(2rem, 3.5vw, 3.5rem);
                    font-weight: 300;
                    color: #111111;
                    line-height: 1.1;
                    margin-bottom: 20px;
                    letter-spacing: -0.02em;
                }
                .cta-title-bold { font-weight: 800; }
                
                .cta-main-desc {
                    font-family: 'Inter', sans-serif;
                    font-size: 1.05rem;
                    color: #555555;
                    line-height: 1.6;
                }

                @media (max-width: 1024px) {
                    .cta-grid-model { grid-template-columns: 1fr; gap: 40px; }
                    .cta-buttons-col { order: 2; }
                    .cta-content-col { order: 1; }
                }
            `}</style>
    </section>
  );
}

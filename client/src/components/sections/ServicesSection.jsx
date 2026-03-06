import { Link } from 'react-router-dom';

export default function ServicesSection({ services, settings }) {
  if (!services || services.length === 0) return null;

  const title = settings?.services_title || 'Complete Print & Design Solutions';
  const description = settings?.services_description || 'We offer professional printing, copying, design, and bindery services tailored to your business needs—no job too big or small. Reach out or visit us to get started.';

  return (
    <section className="services-section">
      <div className="container">
        <div className="services-layout-wrapper">

          {/* Left Column: Title & Description */}
          <div className="svc-left-col">
            <h2 className="svc-main-title">
              {title.includes('Print & Design') ? (
                <>
                  Complete <span className="svc-title-bold">Print &</span>
                  <br />
                  <span className="svc-title-bold">Design</span> Solutions
                </>
              ) : title}
            </h2>
            <p className="svc-main-desc">{description}</p>
          </div>

          {/* Right Column: Grid Model - 3 Columns */}
          <div className="services-grid-model">
            {services.map(svc => (
              <Link key={svc.id} to={svc.link || '#'} className="svc-item-minimal">
                <div className="svc-img-wrapper">
                  <img src={svc.image} alt={svc.title} />
                </div>
                <div className="svc-text-content">
                  <h3 className="svc-label-uppercase">{svc.title.toUpperCase()}</h3>
                  <p className="svc-item-desc">{svc.description}</p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>

      <style>{`
                .services-section {
                    padding: 100px 0;
                    background-color: #030303;
                    position: relative;
                }
                /* Grid background effect from screenshot */
                .services-section::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
                    background-size: 25% 250px;
                    pointer-events: none;
                }

                .services-layout-wrapper {
                    display: grid;
                    grid-template-columns: 280px 1fr;
                    gap: 60px;
                    position: relative;
                    z-index: 1;
                }

                .svc-left-col {
                    display: flex;
                    flex-direction: column;
                }
                .svc-main-title {
                    font-family: 'Inter', sans-serif;
                    font-size: clamp(2.2rem, 3vw, 2.8rem);
                    font-weight: 300;
                    color: #fff;
                    line-height: 1.2;
                    letter-spacing: -0.02em;
                    margin-bottom: 30px;
                }
                .svc-title-bold { font-weight: 700; }
                .svc-main-desc {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.9rem;
                    line-height: 1.7;
                    color: #aaaaaa;
                    font-weight: 400;
                }

                .services-grid-model {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 50px 30px;
                }
                .svc-item-minimal {
                    display: flex;
                    flex-direction: column;
                    text-decoration: none;
                }
                .svc-img-wrapper {
                    aspect-ratio: 1/1;
                    background-color: #1a1a1a;
                    overflow: hidden;
                    margin-bottom: 20px;
                }
                .svc-img-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .svc-item-minimal:hover img { transform: scale(1.05); }
                
                .svc-label-uppercase {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin-bottom: 8px;
                    letter-spacing: 0.02em;
                    font-stretch: condensed;
                }
                .svc-item-desc {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.75rem;
                    color: #b0b0b0;
                    line-height: 1.5;
                    font-weight: 400;
                }

                @media (max-width: 1100px) {
                    .services-layout-wrapper { grid-template-columns: 240px 1fr; gap: 40px; }
                }
                @media (max-width: 900px) {
                    .services-layout-wrapper { grid-template-columns: 1fr; }
                    .services-grid-model { grid-template-columns: 1fr 1fr; }
                    .svc-main-title { font-size: 2.8rem; }
                    .services-section::before { background-size: 50% 250px; }
                }
                @media (max-width: 600px) {
                    .services-grid-model { grid-template-columns: 1fr; }
                    .services-section::before { background-size: 100% 250px; }
                }
            `}</style>
    </section>
  );
}

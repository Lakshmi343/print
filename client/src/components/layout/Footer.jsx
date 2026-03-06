import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import { RiInstagramLine, RiTwitterXLine, RiFacebookFill } from 'react-icons/ri';

export default function Footer({ data }) {
  const settings = data?.settings || {};

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-logo">
            {settings.logo ? (
              <img src={settings.logo} alt="Logo" />
            ) : (
              <span className="logo-text">LOGO</span>
            )}
          </div>

          <div className="footer-contact-info">
            <div className="contact-item">
              <MapPin size={18} strokeWidth={1.5} />
              <span>{settings.address || '123 Print Avenue, Suite 456, Creative City, ZIP 78910'}</span>
            </div>
            <div className="contact-item">
              <Phone size={18} strokeWidth={1.5} />
              <span>{settings.phone || '403-230-4649'}</span>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            Copyright © {new Date().getFullYear()}. All Rights Reserved
          </div>

          <div className="footer-socials">
            {settings.instagram && (
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer">
                <RiInstagramLine size={24} />
              </a>
            )}
            {settings.twitter && (
              <a href={settings.twitter} target="_blank" rel="noopener noreferrer">
                <RiTwitterXLine size={24} />
              </a>
            )}
            {settings.facebook && (
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer">
                <RiFacebookFill size={24} />
              </a>
            )}
          </div>

          <div className="footer-legal">
            <Link to={settings.privacy_link || '/privacy-policy'}>Privacy Policy</Link>
            <span className="separator">|</span>
            <Link to={settings.terms_link || '/terms'}>Terms & Conditions</Link>
          </div>
        </div>
      </div>

      <style>{`
                .site-footer {
                    background-color: #000000;
                    color: #ffffff;
                    padding-top: 80px;
                    font-family: 'Inter', sans-serif;
                }
                .footer-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .footer-top {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 60px;
                    width: 100%;
                }
                .footer-logo {
                    margin-bottom: 30px;
                }
                .logo-text {
                    font-size: 4rem;
                    font-weight: 800;
                    letter-spacing: -0.02em;
                    color: #ffffff;
                }
                .footer-logo img {
                    height: 60px;
                    width: auto;
                }
                .footer-contact-info {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                }
                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    color: #ffffff;
                    font-size: 0.95rem;
                    font-weight: 300;
                    letter-spacing: 0.01em;
                }
                .contact-item svg {
                    color: #ffffff;
                }
                
                .footer-bottom {
                    width: 100%;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 30px 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .footer-copyright {
                    font-size: 0.75rem;
                    color: #ffffff;
                    font-weight: 300;
                }
                .footer-socials {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                }
                .footer-socials a {
                    color: #ffffff;
                    transition: opacity 0.2s ease;
                    display: flex;
                    align-items: center;
                }
                .footer-socials a:hover {
                    opacity: 0.7;
                }
                .footer-legal {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.75rem;
                    font-weight: 300;
                }
                .footer-legal a {
                    color: #ffffff;
                    text-decoration: none;
                }
                .footer-legal a:hover {
                    text-decoration: underline;
                }
                .separator {
                    color: rgba(255, 255, 255, 0.3);
                }

                @media (max-width: 768px) {
                    .footer-bottom {
                        flex-direction: column;
                        gap: 24px;
                        text-align: center;
                    }
                    .footer-copyright {
                        order: 3;
                    }
                    .footer-socials {
                        order: 1;
                    }
                    .footer-legal {
                        order: 2;
                    }
                    .logo-text {
                        font-size: 3rem;
                    }
                }
            `}</style>
    </footer>
  );
}

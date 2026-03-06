import { useState } from 'react';
import { publicApi } from '../../utils/api';

export default function Newsletter({ settings }) {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
    const [status, setStatus] = useState(null); // 'success' | 'error' | null
    const [msg, setMsg] = useState('');

    const title = settings?.newsletter_title || 'Subscribe for exclusive deals and printing updates in your inbox.';
    const image = settings?.newsletter_image || '';

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);
        try {
            const res = await publicApi.subscribeNewsletter(form);
            setStatus('success');
            setMsg(res.message || 'Subscribed successfully!');
            setForm({ firstName: '', lastName: '', email: '' });
        } catch (err) {
            setStatus('error');
            setMsg(err.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <section className="newsletter-section-model">
            <div className="container" style={{ maxWidth: '1400px', padding: '0 40px' }}>
                <div className="newsletter-grid-model">
                    {/* Left: Branding Image */}
                    <div className="newsletter-img-col">
                        {image ? (
                            <img src={image} alt="Newsletter" className="newsletter-hero-img" />
                        ) : (
                            <div className="newsletter-hero-placeholder">
                                <span style={{ fontSize: '4rem' }}>✉️</span>
                            </div>
                        )}
                    </div>

                    {/* Right: Form Section */}
                    <div className="newsletter-form-col">
                        <div className="newsletter-form-inner">
                            <h2 className="newsletter-main-title">
                                {title}
                            </h2>
                            {settings?.newsletter_description && (
                                <p className="newsletter-main-desc">
                                    {settings.newsletter_description}
                                </p>
                            )}

                            <form className="newsletter-ui-form" onSubmit={handleSubmit}>
                                <div className="ns-input-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="Your first name"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="ns-input-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Your last name"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="ns-input-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="you@company.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="ns-status-container">
                                    {status && (
                                        <div className={`ns-status-msg ${status}`}>
                                            {msg}
                                        </div>
                                    )}
                                </div>

                                <button type="submit" className="ns-submit-btn">
                                    GET STARTED
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .newsletter-section-model {
                    padding: 80px 0;
                    background-color: #ffffff;
                }
                .newsletter-grid-model {
                    display: grid;
                    grid-template-columns: 1.1fr 0.9fr;
                    gap: 80px;
                    align-items: center;
                }

                .newsletter-img-col {
                    width: 100%;
                }

                .newsletter-hero-img {
                    width: 100%;
                    height: 600px;
                    object-fit: cover;
                    border-radius: 4px;
                }
                .newsletter-hero-placeholder {
                    width: 100%; height: 600px;
                    background-color: #f9f9f9;
                    border-radius: 4px;
                    display: flex; align-items: center; justify-content: center;
                }

                .newsletter-form-inner {
                    max-width: 500px;
                    margin-left: auto;
                    margin-right: auto;
                    padding-right: 20px;
                }

                .newsletter-main-title {
                    font-family: 'Inter', sans-serif;
                    font-size: clamp(2rem, 2.5vw, 2.4rem);
                    font-weight: 500;
                    color: #111;
                    line-height: 1.3;
                    margin-bottom: 20px;
                    letter-spacing: -0.01em;
                }

                .newsletter-main-desc {
                    font-family: 'Inter', sans-serif;
                    font-size: 1.05rem;
                    color: #666;
                    line-height: 1.6;
                    margin-bottom: 30px;
                }

                .newsletter-ui-form {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .ns-input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .ns-input-group label {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #333;
                }
                .ns-input-group input {
                    padding: 12px 16px;
                    border: 1px solid #d1d1d1;
                    border-radius: 6px;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.95rem;
                    color: #111;
                    outline: none;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }
                .ns-input-group input::placeholder {
                    color: #999;
                }
                .ns-input-group input:focus {
                    border-color: #111;
                    box-shadow: 0 0 0 2px rgba(17,17,17,0.1);
                }

                .ns-status-container {
                    min-height: 20px; /* Prevents shifting when status appears */
                }

                .ns-submit-btn {
                    margin-top: 5px;
                    background-color: #8FD400; /* Lime green from design */
                    color: #111;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.95rem;
                    font-weight: 700;
                    padding: 14px;
                    border: none;
                    border-radius: 6px; 
                    cursor: pointer;
                    transition: all 0.2s ease;
                    letter-spacing: 0.05em;
                }
                .ns-submit-btn:hover {
                    background-color: #7cb342;
                    transform: translateY(-2px);
                }

                .ns-status-msg {
                    padding: 15px;
                    border-radius: 4px;
                    font-size: 0.85rem;
                    font-weight: 600;
                }
                .ns-status-msg.success { background: #e8f5e9; color: #2e7d32; }
                .ns-status-msg.error { background: #ffebee; color: #c62828; }

                @media (max-width: 1024px) {
                    .newsletter-grid-model { grid-template-columns: 1fr 1fr; gap: 40px; }
                    .newsletter-form-inner { max-width: 100%; padding-right: 0; }
                }
                @media (max-width: 900px) {
                    .newsletter-grid-model { grid-template-columns: 1fr; gap: 50px; }
                    .newsletter-hero-img, .newsletter-hero-placeholder { height: 400px; }
                }
            `}</style>
        </section>
    );
}

import { useState } from 'react';
import { publicApi } from '../../utils/api';

export default function Newsletter() {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
    const [status, setStatus] = useState(null); // 'success' | 'error' | null
    const [msg, setMsg] = useState('');

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
        <section className="newsletter-section">
            <div className="container">
                <div className="newsletter-inner">
                    <div className="newsletter-text">
                        <div className="section-tag">Newsletter</div>
                        <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2rem' }}>
                            Stay <span>Updated</span> with Us
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '12px' }}>
                            Get the latest deals, design tips, and printing news delivered directly to your inbox.
                        </p>
                    </div>

                    <form className="newsletter-form" onSubmit={handleSubmit}>
                        <div className="nf-row">
                            <div className="form-group">
                                <label className="form-label">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-input"
                                    placeholder="John"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="form-input"
                                    placeholder="Doe"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                placeholder="john@example.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {status && (
                            <div className={`nf-message ${status}`}>
                                {status === 'success' ? '✅' : '❌'} {msg}
                            </div>
                        )}

                        <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '16px' }}>
                            Subscribe Now ✉️
                        </button>
                    </form>
                </div>
            </div>

            <style>{`
        .newsletter-section {
          padding: 100px 0;
          background: var(--bg-dark);
          position: relative;
          overflow: hidden;
        }
        .newsletter-section::before {
          content: '';
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 50%;
          background: radial-gradient(ellipse 60% 80% at 90% 50%, rgba(232,160,0,0.06) 0%, transparent 70%);
        }
        .newsletter-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          position: relative;
        }
        .newsletter-text {}
        .newsletter-form {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 36px;
        }
        .nf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .nf-message {
          padding: 12px 16px;
          border-radius: var(--radius);
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 16px;
        }
        .nf-message.success {
          background: rgba(76,175,80,0.1);
          color: #4caf50;
          border: 1px solid rgba(76,175,80,0.3);
        }
        .nf-message.error {
          background: rgba(244,67,54,0.1);
          color: #f44336;
          border: 1px solid rgba(244,67,54,0.3);
        }
        @media (max-width: 900px) {
          .newsletter-inner { grid-template-columns: 1fr; gap: 40px; }
          .newsletter-text .section-title { font-size: 1.8rem !important; }
          .nf-row { grid-template-columns: 1fr; }
        }
      `}</style>
        </section>
    );
}

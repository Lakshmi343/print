import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
    const [email, setEmail] = useState('admin@print.com');
    const [password, setPassword] = useState('admin123');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <div className="login-card">
                <div className="login-brand">
                    <span style={{ fontSize: '2.5rem' }}>🖨️</span>
                    <h1>PRINT<span style={{ color: 'var(--primary)' }}>PRO</span></h1>
                    <p>Admin Panel</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-input" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    {error && <div className="nf-message error" style={{ marginBottom: '16px' }}>❌ {error}</div>}
                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }} disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In →'}
                    </button>
                </form>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '20px' }}>
                    Default: admin@print.com / admin123
                </p>
            </div>

            <style>{`
        .admin-login-page {
          min-height: 100vh;
          background: var(--bg-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(232,160,0,0.06) 0%, var(--bg-dark) 70%);
        }
        .login-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 48px 40px;
          width: 100%;
          max-width: 440px;
          box-shadow: var(--shadow-lg);
        }
        .login-brand {
          text-align: center;
          margin-bottom: 36px;
        }
        .login-brand h1 {
          font-family: 'Poppins', sans-serif;
          font-weight: 900;
          font-size: 2rem;
          color: var(--text-primary);
          margin: 8px 0 4px;
        }
        .login-brand p {
          color: var(--text-muted);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .nf-message.error {
          background: rgba(244,67,54,0.1);
          color: #f44336;
          border: 1px solid rgba(244,67,54,0.3);
          padding: 12px 16px;
          border-radius: var(--radius);
          font-size: 0.9rem;
        }
      `}</style>
        </div>
    );
}

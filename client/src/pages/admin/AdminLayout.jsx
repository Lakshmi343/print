import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
    { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { to: '/admin/settings', icon: '⚙️', label: 'Site Settings' },
    { to: '/admin/navigation', icon: '🔗', label: 'Navigation' },
    { to: '/admin/hero', icon: '🦸', label: 'Hero Section' },
    { to: '/admin/highlights', icon: '✨', label: 'Highlights' },
    { to: '/admin/categories', icon: '📦', label: 'Categories' },
    { to: '/admin/services', icon: '🛠️', label: 'Services' },
    { to: '/admin/testimonials', icon: '💬', label: 'Testimonials' },
    { to: '/admin/cta-buttons', icon: '🔘', label: 'CTA Buttons' },
    { to: '/admin/newsletter', icon: '📧', label: 'Newsletter' },
];

export default function AdminLayout() {
    const { admin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-brand">
                    <span style={{ fontSize: '1.5rem' }}>🖨️</span>
                    <div>
                        <div className="sidebar-logo">PRINT<span>PRO</span></div>
                        <div className="sidebar-subtitle">Admin Panel</div>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        >
                            <span className="sl-icon">{item.icon}</span>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-user">
                        <div className="user-avatar">{admin?.email?.charAt(0)?.toUpperCase()}</div>
                        <div className="user-info">
                            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{admin?.email}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Administrator</div>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout} title="Logout">⏻</button>
                </div>
            </aside>

            <main className="admin-main">
                <Outlet />
            </main>

            <style>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: var(--bg-dark);
        }
        .admin-sidebar {
          width: 260px;
          background: var(--bg-card);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0; left: 0; bottom: 0;
          overflow-y: auto;
          z-index: 100;
        }
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 24px 20px;
          border-bottom: 1px solid var(--border);
        }
        .sidebar-logo {
          font-family: 'Poppins', sans-serif;
          font-weight: 900;
          font-size: 1.1rem;
          color: var(--text-primary);
        }
        .sidebar-logo span { color: var(--primary); }
        .sidebar-subtitle {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .sidebar-nav {
          flex: 1;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          padding: 10px 12px;
          border-radius: 8px;
          transition: all 0.2s;
          text-decoration: none;
        }
        .sidebar-link:hover {
          background: rgba(255,255,255,0.05);
          color: var(--text-primary);
        }
        .sidebar-link.active {
          background: rgba(232,160,0,0.12);
          color: var(--primary);
          font-weight: 700;
          border-right: 2px solid var(--primary);
        }
        .sl-icon { font-size: 1.05rem; width: 20px; text-align: center; }
        .sidebar-footer {
          padding: 16px 20px;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sidebar-user { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
        .user-avatar {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; color: #000; font-size: 1rem; flex-shrink: 0;
        }
        .user-info { min-width: 0; }
        .user-info > div { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .logout-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          color: var(--text-muted);
          width: 32px; height: 32px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .logout-btn:hover { background: rgba(244,67,54,0.1); color: #f44336; border-color: rgba(244,67,54,0.3); }
        .admin-main {
          flex: 1;
          margin-left: 260px;
          padding: 32px;
          overflow-y: auto;
        }
        @media (max-width: 768px) {
          .admin-sidebar { display: none; }
          .admin-main { margin-left: 0; padding: 16px; }
        }
      `}</style>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { adminApi } from '../../utils/api';

export default function Dashboard() {
    const [stats, setStats] = useState({});

    useEffect(() => {
        Promise.all([
            adminApi.getList('menu').then(d => d.length),
            adminApi.getList('categories').then(d => d.length),
            adminApi.getList('services').then(d => d.length),
            adminApi.getList('testimonials').then(d => d.length),
            adminApi.getList('highlights').then(d => d.length),
            adminApi.getNewsletter().then(d => d.length),
        ]).then(([menu, cats, svcs, tests, highs, news]) => {
            setStats({ menu, cats, svcs, tests, highs, news });
        }).catch(() => { });
    }, []);

    const cards = [
        { icon: '📦', label: 'Categories', value: stats.cats ?? '—' },
        { icon: '🛠️', label: 'Services', value: stats.svcs ?? '—' },
        { icon: '💬', label: 'Testimonials', value: stats.tests ?? '—' },
        { icon: '✨', label: 'Highlights', value: stats.highs ?? '—' },
        { icon: '🔗', label: 'Menu Items', value: stats.menu ?? '—' },
        { icon: '📧', label: 'Subscribers', value: stats.news ?? '—' },
    ];

    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontFamily: 'Poppins', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Dashboard 📊
                </h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: '6px' }}>Welcome back! Here's an overview of your website content.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
                {cards.map(c => (
                    <div key={c.label} className="card" style={{ padding: '28px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{
                            width: '56px', height: '56px',
                            background: 'rgba(232,160,0,0.1)',
                            border: '1px solid rgba(232,160,0,0.2)',
                            borderRadius: '12px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.6rem', flexShrink: 0
                        }}>{c.icon}</div>
                        <div>
                            <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '2rem', color: 'var(--text-primary)', lineHeight: 1 }}>{c.value}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>{c.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card" style={{ padding: '28px' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>Quick Links</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {[
                        ['/admin/settings', '⚙️ Site Settings'],
                        ['/admin/hero', '🦸 Hero Section'],
                        ['/admin/categories', '📦 Categories'],
                        ['/admin/services', '🛠️ Services'],
                        ['/admin/testimonials', '💬 Testimonials'],
                        ['/admin/newsletter', '📧 Newsletter'],
                    ].map(([to, label]) => (
                        <a key={to} href={to} className="btn-ghost" style={{ fontSize: '0.85rem' }}>{label}</a>
                    ))}
                </div>
            </div>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { adminApi } from '../../utils/api';

export default function NewsletterSubmissions() {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminApi.getNewsletter().then(d => { setSubs(d); setLoading(false); });
    }, []);

    const exportCSV = () => {
        const headers = 'First Name,Last Name,Email,Subscribed At';
        const rows = subs.map(s => `${s.first_name},${s.last_name},${s.email},${s.created_at}`);
        const blob = new Blob([[headers, ...rows].join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'subscribers.csv'; a.click();
    };

    return (
        <div>
            <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 style={{ fontFamily: 'Poppins', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>📧 Newsletter</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '6px' }}>{subs.length} subscribers total.</p>
                </div>
                {subs.length > 0 && (
                    <button className="btn-outline" onClick={exportCSV} style={{ fontSize: '0.9rem' }}>⬇️ Export CSV</button>
                )}
            </div>

            <div className="card" style={{ overflow: 'hidden' }}>
                {loading ? (
                    <div className="loading" style={{ padding: '48px' }}><div className="spinner" /></div>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Subscribed At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subs.length === 0 ? (
                                <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>No subscribers yet.</td></tr>
                            ) : subs.map((s, i) => (
                                <tr key={s.id}>
                                    <td style={{ color: 'var(--text-muted)', fontWeight: 700 }}>{i + 1}</td>
                                    <td>{s.first_name}</td>
                                    <td>{s.last_name}</td>
                                    <td><a href={`mailto:${s.email}`} style={{ color: 'var(--primary)' }}>{s.email}</a></td>
                                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                        {new Date(s.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

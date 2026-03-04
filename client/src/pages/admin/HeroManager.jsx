import { useState, useEffect } from 'react';
import { adminApi } from '../../utils/api';

export default function HeroManager() {
    const [form, setForm] = useState({ headline: '', subtext: '', cta_text: '', cta_link: '', bg_image: '' });
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        adminApi.getHero().then(d => { if (d) setForm(f => ({ ...f, ...d })); });
    }, []);

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await adminApi.updateHero(form);
            setMsg({ type: 'success', text: 'Hero section updated!' });
        } catch {
            setMsg({ type: 'error', text: 'Failed to update.' });
        } finally {
            setSaving(false);
            setTimeout(() => setMsg(null), 3000);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontFamily: 'Poppins', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>Hero Section 🦸</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: '6px' }}>Configure the main landing section of your homepage.</p>
            </div>
            {msg && <div className={`nf-message ${msg.type}`} style={{ marginBottom: '20px' }}>{msg.text}</div>}
            <form onSubmit={handleSubmit}>
                <div className="card" style={{ padding: '28px' }}>
                    <div className="form-group">
                        <label className="form-label">Headline</label>
                        <input name="headline" className="form-input" value={form.headline || ''} onChange={handleChange} required placeholder="e.g. Next-Generation Printing Solutions" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Subtext</label>
                        <textarea name="subtext" className="form-input" value={form.subtext || ''} onChange={handleChange} required placeholder="Describe your value proposition..." style={{ minHeight: '100px' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                            <label className="form-label">CTA Button Text</label>
                            <input name="cta_text" className="form-input" value={form.cta_text || ''} onChange={handleChange} placeholder="Request a Quote" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">CTA Button Link</label>
                            <input name="cta_link" className="form-input" value={form.cta_link || ''} onChange={handleChange} placeholder="/quote" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Background Image URL (optional)</label>
                        <input name="bg_image" className="form-input" value={form.bg_image || ''} onChange={handleChange} placeholder="https://..." />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" className="btn-primary" disabled={saving} style={{ padding: '13px 32px' }}>
                            {saving ? 'Saving...' : 'Save Hero ✓'}
                        </button>
                    </div>
                </div>
            </form>
            <style>{`.nf-message{padding:12px 16px;border-radius:8px;font-size:.9rem;font-weight:500}.nf-message.success{background:rgba(76,175,80,.1);color:#4caf50;border:1px solid rgba(76,175,80,.3)}.nf-message.error{background:rgba(244,67,54,.1);color:#f44336;border:1px solid rgba(244,67,54,.3)}`}</style>
        </div>
    );
}

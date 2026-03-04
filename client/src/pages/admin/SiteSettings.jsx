import { useState, useEffect } from 'react';
import { adminApi } from '../../utils/api';

export default function SiteSettings() {
    const [form, setForm] = useState({
        logo: '', address: '', phone: '', email: '',
        facebook: '', twitter: '', instagram: '', linkedin: '',
        privacy_link: '/privacy-policy', terms_link: '/terms',
        cta_section_image: '', cta_section_text: ''
    });
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        adminApi.getSettings().then(d => { if (d) setForm(f => ({ ...f, ...d })); });
    }, []);

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await adminApi.updateSettings(form);
            setMsg({ type: 'success', text: 'Settings saved successfully!' });
        } catch {
            setMsg({ type: 'error', text: 'Failed to save settings.' });
        } finally {
            setSaving(false);
            setTimeout(() => setMsg(null), 3000);
        }
    };

    const Field = ({ label, name, placeholder, type = 'text' }) => (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <input type={type} name={name} className="form-input" placeholder={placeholder} value={form[name] || ''} onChange={handleChange} />
        </div>
    );

    return (
        <div>
            <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h1 style={{ fontFamily: 'Poppins', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>Site Settings ⚙️</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '6px' }}>Manage your site's global configuration and branding.</p>
                </div>
            </div>
            {msg && <div className={`nf-message ${msg.type}`} style={{ marginBottom: '20px' }}>{msg.text}</div>}
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div className="card" style={{ padding: '28px' }}>
                        <h3 style={{ fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>Branding</h3>
                        <Field label="Logo URL" name="logo" placeholder="https://..." />
                    </div>
                    <div className="card" style={{ padding: '28px' }}>
                        <h3 style={{ fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>Contact Info</h3>
                        <Field label="Address" name="address" placeholder="123 Street, City" />
                        <Field label="Phone" name="phone" placeholder="+1 234 567 890" />
                        <Field label="Email" name="email" placeholder="info@company.com" type="email" />
                    </div>
                </div>
                <div className="card" style={{ padding: '28px', marginTop: '24px' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>Social Links</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <Field label="Facebook" name="facebook" placeholder="https://facebook.com/..." />
                        <Field label="Twitter" name="twitter" placeholder="https://twitter.com/..." />
                        <Field label="Instagram" name="instagram" placeholder="https://instagram.com/..." />
                        <Field label="LinkedIn" name="linkedin" placeholder="https://linkedin.com/..." />
                    </div>
                </div>
                <div className="card" style={{ padding: '28px', marginTop: '24px' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>Footer Legal Links</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <Field label="Privacy Policy Link" name="privacy_link" placeholder="/privacy-policy" />
                        <Field label="Terms & Conditions Link" name="terms_link" placeholder="/terms" />
                    </div>
                </div>
                <div className="card" style={{ padding: '28px', marginTop: '24px' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>CTA Panel Section</h3>
                    <Field label="Adjacent Image URL" name="cta_section_image" placeholder="https://..." />
                    <div className="form-group">
                        <label className="form-label">Adjacent Text</label>
                        <textarea name="cta_section_text" className="form-input" placeholder="Describe your services..." value={form.cta_section_text || ''} onChange={handleChange} />
                    </div>
                </div>
                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn-primary" disabled={saving} style={{ padding: '14px 36px', fontSize: '1rem' }}>
                        {saving ? 'Saving...' : 'Save Settings ✓'}
                    </button>
                </div>
            </form>
            <style>{`.nf-message{padding:12px 16px;border-radius:8px;font-size:.9rem;font-weight:500}.nf-message.success{background:rgba(76,175,80,.1);color:#4caf50;border:1px solid rgba(76,175,80,.3)}.nf-message.error{background:rgba(244,67,54,.1);color:#f44336;border:1px solid rgba(244,67,54,.3)}`}</style>
        </div>
    );
}

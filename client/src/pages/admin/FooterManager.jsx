import { useState, useEffect } from 'react';
import { adminApi } from '../../utils/api';

const Field = ({ label, name, placeholder, value, onChange, type = 'text' }) => (
    <div className="form-group">
        <label className="form-label">{label}</label>
        <input type={type} name={name} className="form-input" placeholder={placeholder} value={value || ''} onChange={onChange} />
    </div>
);

export default function FooterManager() {
    const [form, setForm] = useState({
        address: '', phone: '', email: '',
        facebook: '', twitter: '', instagram: '', linkedin: '',
        privacy_link: '/privacy-policy', terms_link: '/terms'
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
            setMsg({ type: 'success', text: 'Footer updated successfully!' });
        } catch {
            setMsg({ type: 'error', text: 'Failed to update footer.' });
        } finally {
            setSaving(false);
            setTimeout(() => setMsg(null), 3000);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontFamily: 'Poppins', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>Footer Manager 🦶</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: '6px' }}>Manage the contact info, social links, and legal pages in your footer.</p>
            </div>
            {msg && <div className={`nf-message ${msg.type}`} style={{ marginBottom: '20px' }}>{msg.text}</div>}

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div className="card" style={{ padding: '28px' }}>
                        <h3 style={{ fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>Centred Contact Info</h3>
                        <Field label="Physical Address" name="address" placeholder="123 Print Avenue..." value={form.address} onChange={handleChange} />
                        <Field label="Phone Number" name="phone" placeholder="403-230-4649" value={form.phone} onChange={handleChange} />
                        <Field label="Public Email" name="email" placeholder="info@printshop.com" type="email" value={form.email} onChange={handleChange} />
                    </div>

                    <div className="card" style={{ padding: '28px' }}>
                        <h3 style={{ fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>Social Media (Icons)</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <Field label="Instagram URL" name="instagram" placeholder="https://instagram.com/..." value={form.instagram} onChange={handleChange} />
                            <Field label="Twitter/X URL" name="twitter" placeholder="https://x.com/..." value={form.twitter} onChange={handleChange} />
                            <Field label="Facebook URL" name="facebook" placeholder="https://facebook.com/..." value={form.facebook} onChange={handleChange} />
                            <Field label="LinkedIn URL" name="linkedin" placeholder="https://linkedin.com/..." value={form.linkedin} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="card" style={{ padding: '28px', marginTop: '24px' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>Legal Strip (Bottom Right)</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <Field label="Privacy Policy Link" name="privacy_link" placeholder="/privacy-policy" value={form.privacy_link} onChange={handleChange} />
                        <Field label="Terms & Conditions Link" name="terms_link" placeholder="/terms" value={form.terms_link} onChange={handleChange} />
                    </div>
                </div>

                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn-primary" disabled={saving} style={{ padding: '14px 36px', fontSize: '1rem' }}>
                        {saving ? 'Saving...' : 'Update Footer Section ✓'}
                    </button>
                </div>
            </form>
            <style>{`.nf-message{padding:12px 16px;border-radius:8px;font-size:.9rem;font-weight:500}.nf-message.success{background:rgba(76,175,80,.1);color:#4caf50;border:1px solid rgba(76,175,80,.3)}.nf-message.error{background:rgba(244,67,54,.1);color:#f44336;border:1px solid rgba(244,67,54,.3)}`}</style>
        </div>
    );
}

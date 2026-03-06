import { useState, useEffect } from 'react';
import { adminApi } from '../../utils/api';
import ImageUpload from '../../components/ImageUpload';

const Field = ({ label, name, placeholder, value, onChange, type = 'text' }) => (
    <div className="form-group">
        <label className="form-label">{label}</label>
        <input type={type} name={name} className="form-input" placeholder={placeholder} value={value || ''} onChange={onChange} />
    </div>
);

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
                        <ImageUpload
                            label="Logo"
                            value={form.logo}
                            onChange={(val) => setForm(f => ({ ...f, logo: val }))}
                        />
                    </div>
                </div>

                <div className="card" style={{ padding: '28px', marginTop: '24px' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>Category Section Heading</h3>
                    <div className="form-group">
                        <label className="form-label">Main Title</label>
                        <textarea name="category_title" className="form-input" placeholder="Custom Printing Made..." value={form.category_title || ''} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description Text</label>
                        <textarea name="category_description" className="form-input" placeholder="Looking for a print shop..." value={form.category_description || ''} onChange={handleChange} />
                    </div>
                </div>

                <div className="card" style={{ padding: '28px', marginTop: '24px' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>Services Section Heading</h3>
                    <div className="form-group">
                        <label className="form-label">Main Title</label>
                        <textarea name="services_title" className="form-input" placeholder="Complete Print & Design..." value={form.services_title || ''} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description Text</label>
                        <textarea name="services_description" className="form-input" placeholder="We offer professional..." value={form.services_description || ''} onChange={handleChange} />
                    </div>
                </div>

                <div className="card" style={{ padding: '28px', marginTop: '24px' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>Testimonials Section Heading</h3>
                    <div className="form-group">
                        <label className="form-label">Main Title</label>
                        <textarea name="testimonials_title" className="form-input" placeholder="What Our Customers Say" value={form.testimonials_title || ''} onChange={handleChange} />
                    </div>
                </div>


                <div className="card" style={{ padding: '28px', marginTop: '24px' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>Quick Actions (CTA) Section</h3>
                    <div className="form-group">
                        <label className="form-label">Main Title</label>
                        <textarea name="cta_title" className="form-input" placeholder="Need Reliable & Budget-Friendly..." value={form.cta_title || ''} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description Text</label>
                        <textarea name="cta_description" className="form-input" placeholder="We’re here to make..." value={form.cta_description || ''} onChange={handleChange} />
                    </div>
                    <ImageUpload
                        label="Section Image"
                        value={form.cta_section_image}
                        onChange={(val) => setForm(f => ({ ...f, cta_section_image: val }))}
                    />
                </div>

                <div className="card" style={{ padding: '28px', marginTop: '24px' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>Newsletter Section</h3>
                    <div className="form-group">
                        <label className="form-label">Main Title</label>
                        <textarea name="newsletter_title" className="form-input" placeholder="Subscribe for exclusive deals..." value={form.newsletter_title || ''} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description Text</label>
                        <textarea name="newsletter_description" className="form-input" placeholder="Join our mailing list..." value={form.newsletter_description || ''} onChange={handleChange} />
                    </div>
                    <ImageUpload
                        label="Side Image"
                        value={form.newsletter_image}
                        onChange={(val) => setForm(f => ({ ...f, newsletter_image: val }))}
                    />
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

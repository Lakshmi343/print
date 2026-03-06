import { useState } from 'react';
import { adminApi } from '../utils/api';

export default function ImageUpload({ label, value, onChange }) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setError(null);
        try {
            const res = await adminApi.uploadImage(file);
            onChange(res.url);
        } catch (err) {
            console.error('Upload failed', err);
            setError('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const displayUrl = value?.startsWith('/')
        ? `http://localhost:5000${value}`
        : value;

    return (
        <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">{label}</label>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    style={{ flex: 1, padding: '8px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--surface)' }}
                />
                {uploading && <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Uploading...</span>}
            </div>
            {error && <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{error}</div>}
            {value && (
                <div style={{ marginTop: '12px', background: 'var(--surface)', padding: '8px', borderRadius: '8px', border: '1px solid var(--border)', display: 'inline-block' }}>
                    <img src={displayUrl} alt="Preview" style={{ maxHeight: '80px', maxWidth: '100%', objectFit: 'contain', borderRadius: '4px' }} />
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px', wordBreak: 'break-all' }}>Path: {value}</div>
                </div>
            )}
        </div>
    );
}

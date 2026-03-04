import { useState, useEffect } from 'react';
import { adminApi } from '../../utils/api';

/**
 * Generic CRUD manager for list-based entities.
 * @param {string} entity - API entity name (e.g. 'menu', 'categories')
 * @param {string} title - Display title
 * @param {string} icon - Emoji icon
 * @param {Array} fields - [{name, label, type, placeholder, required, options}]
 */
export default function CrudManager({ entity, title, icon, fields }) {
    const [items, setItems] = useState([]);
    const [modal, setModal] = useState(null); // null | 'create' | item
    const [form, setForm] = useState({});
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState(null);

    const defaultForm = () => {
        const d = {};
        fields.forEach(f => { d[f.name] = f.default ?? ''; });
        return d;
    };

    const load = () => adminApi.getList(entity).then(setItems).catch(() => { });

    useEffect(() => { load(); }, [entity]);

    const openCreate = () => { setForm(defaultForm()); setModal('create'); };
    const openEdit = (item) => { setForm({ ...item }); setModal(item); };
    const closeModal = () => { setModal(null); setForm({}); };

    const handleChange = e => {
        const val = e.target.type === 'checkbox' ? (e.target.checked ? 1 : 0) : e.target.value;
        setForm(f => ({ ...f, [e.target.name]: val }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (modal === 'create') await adminApi.create(entity, form);
            else await adminApi.update(entity, modal.id, form);
            setMsg({ type: 'success', text: `${modal === 'create' ? 'Created' : 'Updated'} successfully!` });
            closeModal();
            load();
        } catch {
            setMsg({ type: 'error', text: 'Operation failed.' });
        } finally {
            setSaving(false);
            setTimeout(() => setMsg(null), 3000);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this item?')) return;
        try {
            await adminApi.remove(entity, id);
            load();
        } catch { alert('Failed to delete.'); }
    };

    const getDisplayValue = (item) => {
        const f = fields.find(f => f.primary);
        return f ? item[f.name] : item[fields[0].name];
    };

    return (
        <div>
            <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 style={{ fontFamily: 'Poppins', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>{icon} {title}</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '6px' }}>Manage {items.length} {title.toLowerCase()} items.</p>
                </div>
                <button className="btn-primary" onClick={openCreate}>+ Add {title.replace(/s$/, '')}</button>
            </div>

            {msg && <div className={`nf-message ${msg.type}`} style={{ marginBottom: '20px' }}>{msg.text}</div>}

            <div className="card" style={{ overflow: 'hidden' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            {fields.filter(f => !f.hideInTable).map(f => <th key={f.name}>{f.label}</th>)}
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length === 0 ? (
                            <tr><td colSpan={fields.length + 2} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>No items yet. Click "+ Add" to create one.</td></tr>
                        ) : items.map(item => (
                            <tr key={item.id}>
                                {fields.filter(f => !f.hideInTable).map(f => (
                                    <td key={f.name}>
                                        {f.type === 'img' ? (
                                            item[f.name] ? <img src={item[f.name]} alt="" style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 6 }} /> : '—'
                                        ) : f.emoji ? (
                                            <span style={{ fontSize: '1.3rem' }}>{item[f.name]}</span>
                                        ) : (
                                            <span style={{ maxWidth: '200px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {String(item[f.name] ?? '—')}
                                            </span>
                                        )}
                                    </td>
                                ))}
                                <td>
                                    {'active' in item
                                        ? <span className={`badge ${item.active ? 'active' : 'inactive'}`}>{item.active ? '● Active' : '○ Inactive'}</span>
                                        : '—'
                                    }
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button className="btn-ghost" style={{ padding: '6px 14px', fontSize: '0.8rem' }} onClick={() => openEdit(item)}>Edit</button>
                                        <button onClick={() => handleDelete(item.id)} style={{ background: 'rgba(244,67,54,0.1)', color: '#f44336', border: '1px solid rgba(244,67,54,0.2)', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {modal !== null && (
                <div className="modal-backdrop" onClick={closeModal}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{modal === 'create' ? `Add ${title.replace(/s$/, '')}` : `Edit ${getDisplayValue(modal)}`}</h2>
                            <button className="modal-close" onClick={closeModal}>✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-body">
                            {fields.map(f => (
                                <div className="form-group" key={f.name}>
                                    <label className="form-label">{f.label}{f.required ? ' *' : ''}</label>
                                    {f.type === 'textarea' ? (
                                        <textarea name={f.name} className="form-input" placeholder={f.placeholder} value={form[f.name] ?? ''} onChange={handleChange} required={f.required} />
                                    ) : f.type === 'toggle' ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <label className="toggle-switch">
                                                <input type="checkbox" name={f.name} checked={!!form[f.name]} onChange={handleChange} />
                                                <span className="toggle-slider" />
                                            </label>
                                            <span style={{ color: form[f.name] ? '#4caf50' : 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
                                                {form[f.name] ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    ) : f.type === 'select' ? (
                                        <select name={f.name} className="form-input" value={form[f.name] ?? ''} onChange={handleChange} required={f.required}>
                                            {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                        </select>
                                    ) : (
                                        <input type={f.type || 'text'} name={f.name} className="form-input" placeholder={f.placeholder} value={form[f.name] ?? ''} onChange={handleChange} required={f.required} />
                                    )}
                                </div>
                            ))}
                            <div className="modal-footer">
                                <button type="button" className="btn-ghost" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
        .nf-message{padding:12px 16px;border-radius:8px;font-size:.9rem;font-weight:500}
        .nf-message.success{background:rgba(76,175,80,.1);color:#4caf50;border:1px solid rgba(76,175,80,.3)}
        .nf-message.error{background:rgba(244,67,54,.1);color:#f44336;border:1px solid rgba(244,67,54,.3)}
        .modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px}
        .modal{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);width:100%;max-width:520px;max-height:90vh;overflow-y:auto}
        .modal-header{display:flex;align-items:center;justify-content:space-between;padding:24px 28px;border-bottom:1px solid var(--border)}
        .modal-header h2{font-family:'Poppins',sans-serif;font-weight:700;font-size:1.15rem;color:var(--text-primary)}
        .modal-close{background:rgba(255,255,255,.06);border:1px solid var(--border);color:var(--text-muted);width:32px;height:32px;border-radius:8px;font-size:0.9rem;cursor:pointer;transition:all 0.2s}
        .modal-close:hover{background:rgba(244,67,54,.08);color:#f44336}
        .modal-body{padding:24px 28px}
        .modal-footer{display:flex;gap:12px;justify-content:flex-end;margin-top:24px;padding-top:20px;border-top:1px solid var(--border)}
        .toggle-switch{position:relative;width:44px;height:24px;flex-shrink:0}
        .toggle-switch input{display:none}
        .toggle-slider{position:absolute;inset:0;background:var(--surface);border-radius:12px;cursor:pointer;transition:0.2s}
        .toggle-slider:before{content:'';position:absolute;width:18px;height:18px;background:#fff;border-radius:50%;top:3px;left:3px;transition:0.2s}
        .toggle-switch input:checked + .toggle-slider{background:var(--primary)}
        .toggle-switch input:checked + .toggle-slider:before{transform:translateX(20px);background:#000}
      `}</style>
        </div>
    );
}

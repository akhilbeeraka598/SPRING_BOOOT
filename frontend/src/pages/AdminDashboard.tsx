import React, { useState, useEffect } from 'react';
import { Plus, Trash2, LayoutGrid, FilePlus, Settings } from 'lucide-react';
import api from '../services/api';

const AdminDashboard: React.FC = () => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchImages = async () => {
        try {
            const res = await api.get('/members/images');
            setImages(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchImages(); }, []);

    const handleAddImage = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/admin/images', { name, url, description });
            setName(''); setUrl(''); setDescription('');
            fetchImages();
        } catch (err) {
            alert('Failed to add image');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to remove this piece of content?')) {
            await api.delete(`/admin/images/${id}`);
            fetchImages();
        }
    };

    return (
        <div className="app-container">
            <header className="admin-header">
                <div>
                    <h1 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Management Console</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Control and update the members area content</p>
                </div>
                <div style={{ padding: '0.75rem 1.25rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '0.75rem', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Settings size={18} /> Admin Session Active
                </div>
            </header>

            <section className="admin-form-section">
                <div className="glass-effect" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ background: 'var(--primary)', padding: '0.75rem', borderRadius: '0.75rem', color: 'white' }}>
                            <FilePlus size={24} />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Add New Digital Asset</h2>
                    </div>

                    <form onSubmit={handleAddImage}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
                            <div className="input-group">
                                <label className="input-label">Asset Name</label>
                                <input className="premium-input" placeholder="e.g. Summer Collection 2024" value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Media URL</label>
                                <input className="premium-input" placeholder="https://images.unsplash.com/..." value={url} onChange={e => setUrl(e.target.value)} required />
                            </div>
                            <div className="input-group" style={{ gridColumn: 'span 2' }}>
                                <label className="input-label">Asset Description</label>
                                <textarea className="premium-input" style={{ minHeight: '120px', resize: 'vertical' }} placeholder="Provide structured metadata for this asset..." value={description} onChange={e => setDescription(e.target.value)} required />
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="premium-button" style={{ width: 'auto', padding: '1rem 3rem' }} disabled={loading}>
                                {loading ? 'Processing...' : 'Publish Content'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <LayoutGrid size={20} color="var(--primary)" />
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Live Content ({images.length})</h2>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    {images.length > 0 ? (
                        images.map(img => (
                            <div key={img.id} className="list-item glass-effect">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <img src={img.url} alt="" style={{ width: '64px', height: '64px', borderRadius: '0.75rem', objectFit: 'cover', border: '1px solid var(--border)' }} />
                                    <div>
                                        <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{img.name}</h4>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{img.description}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => handleDelete(img.id)} style={{
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        color: '#ef4444',
                                        border: '1px solid rgba(239, 68, 68, 0.2)',
                                        padding: '0.75rem',
                                        borderRadius: '0.75rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                        onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)')}
                                        onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)')}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '3rem', textAlign: 'center', border: '2px dashed var(--border)', borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)' }}>
                            No active content found. Add your first asset above.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;

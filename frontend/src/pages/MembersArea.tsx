import React, { useEffect, useState } from 'react';
import { Image as ImageIcon, Sparkles } from 'lucide-react';
import api from '../services/api';

const MembersArea: React.FC = () => {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await api.get('/members/images');
                setImages(res.data);
            } catch (err) {
                console.error('Failed to fetch images:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    if (loading) {
        return (
            <div className="app-container" style={{ textAlign: 'center', padding: '10rem' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
                    <Sparkles size={48} className="animate-pulse" />
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>Loading exclusive content...</p>
            </div>
        );
    }

    return (
        <div className="app-container">
            <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>
                    Members Gallery
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
                    Explore our handpicked collection of premium content, exclusively available to our valued members.
                </p>
            </header>

            {images.length > 0 ? (
                <div className="card-grid">
                    {images.map((img) => (
                        <div key={img.id} className="image-card glass-effect">
                            <img src={img.url} alt={img.name} />
                            <div className="card-content">
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Premium Asset</span>
                                <h3 className="card-title" style={{ marginTop: '0.5rem' }}>{img.name}</h3>
                                <p className="card-desc">{img.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="glass-effect" style={{ padding: '6rem 2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', opacity: 0.3 }}>
                        <ImageIcon size={80} style={{ margin: '0 auto' }} />
                    </div>
                    <h2 style={{ marginBottom: '1rem' }}>Quiet in here...</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>
                        The gallery is currently empty. Our administrators are working on some amazing new content for you!
                    </p>
                </div>
            )}
        </div>
    );
};

export default MembersArea;

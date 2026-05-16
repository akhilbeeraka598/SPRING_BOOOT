import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, User, Lock, Shield, CheckCircle2 } from 'lucide-react';
import { signup } from '../services/auth.service';

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const roles = isAdmin ? ['ROLE_ADMIN', 'ROLE_MEMBER'] : ['ROLE_MEMBER'];
            await signup(username, password, roles);
            setMessage('Account created successfully! Redirecting...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setMessage('Signup failed. Username might be taken or DB is offline. Try logging in if you already have an account.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card glass-effect">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'linear-gradient(135deg, var(--secondary), #f472b6)',
                        borderRadius: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 8px 16px rgba(236, 72, 153, 0.4)'
                    }}>
                        <UserPlus size={32} color="white" />
                    </div>
                    <h1 className="gradient-text" style={{ fontSize: '2.25rem', marginBottom: '0.5rem', fontWeight: 800 }}>Join Us</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Create your account to get started</p>
                </div>

                {message && (
                    <div style={{
                        background: message.includes('success') ? 'var(--success-bg)' : 'var(--error-bg)',
                        border: `1px solid ${message.includes('success') ? 'var(--success)' : 'var(--error)'}`,
                        color: message.includes('success') ? 'var(--success)' : 'var(--error)',
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }}>
                        {message.includes('success') && <CheckCircle2 size={16} />}
                        {message}
                    </div>
                )}

                <form onSubmit={handleSignup}>
                    <div className="input-group">
                        <label className="input-label">Username</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                className="premium-input"
                                style={{ paddingLeft: '2.75rem' }}
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Choose a username"
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                className="premium-input"
                                style={{ paddingLeft: '2.75rem' }}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a secure password"
                                required
                            />
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '2rem',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '0.75rem',
                        border: '1px solid var(--border)',
                        cursor: 'pointer'
                    }} onClick={() => setIsAdmin(!isAdmin)}>
                        <input
                            type="checkbox"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>Register as Admin</label>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Gain full management access</span>
                        </div>
                        <Shield size={18} color={isAdmin ? 'var(--primary)' : 'var(--text-muted)'} />
                    </div>

                    <button className="premium-button" type="submit" disabled={loading} style={{ background: 'linear-gradient(135deg, var(--secondary), #f472b6)', boxShadow: '0 4px 6px -1px rgba(236, 72, 153, 0.3)' }}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: 600 }}>Sign in here</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;

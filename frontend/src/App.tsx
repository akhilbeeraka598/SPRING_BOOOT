import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, Image as ImageIcon, LogIn, UserPlus, ShieldCheck } from 'lucide-react';
import { getCurrentUser, logout } from './services/auth.service';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MembersArea from './pages/MembersArea';
import AdminDashboard from './pages/AdminDashboard';

const Navbar = () => {
    const user = getCurrentUser();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="nav-bar glass-effect">
            <Link to="/" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ background: 'var(--primary)', padding: '0.4rem', borderRadius: '0.5rem', display: 'flex' }}>
                    <ShieldCheck size={24} />
                </div>
                Premium<span style={{ color: 'var(--primary)' }}>Hub</span>
            </Link>

            <div className="nav-links">
                {user ? (
                    <>
                        <Link to="/members" className={`nav-link ${isActive('/members') ? 'active' : ''}`}>
                            <ImageIcon size={18} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                            Members
                        </Link>
                        {user?.roles?.includes('ROLE_ADMIN') && (
                            <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'active' : ''}`}>
                                <LayoutDashboard size={18} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                                Admin Console
                            </Link>
                        )}
                        <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 0.5rem' }}></div>
                        <button onClick={handleLogout} className="nav-link logout-btn">
                            <LogOut size={18} style={{ marginRight: '6px' }} /> Sign Out
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={`nav-link ${isActive('/login') ? 'active' : ''}`}>
                            <LogIn size={18} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                            Sign In
                        </Link>
                        <Link to="/signup" className={`nav-link ${isActive('/signup') ? 'active' : ''}`} style={{ background: 'var(--primary)', color: 'white' }}>
                            <UserPlus size={18} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                            Get Started
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <div className="app-container" style={{ padding: '1rem' }}>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/members" element={<MembersArea />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>

                <footer style={{ marginTop: '8rem', textAlign: 'center', padding: '4rem 0', borderTop: '1px solid var(--border)' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        &copy; 2024 PremiumHub Digital Ecosystem. All rights reserved.
                    </p>
                </footer>
            </div>
        </Router>
    );
};

export default App;

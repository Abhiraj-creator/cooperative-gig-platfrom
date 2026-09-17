import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { loginSuccess } from '../state/authSlice';

export function AdminSignupPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock admin signup — in production, verify the admin code server-side
      const newAdmin = {
        id: `admin-${Date.now()}`,
        name,
        email,
        role: 'admin' as const,
      };

      dispatch(loginSuccess(newAdmin));
      navigate('/admin');
    } catch (err) {
      console.error('Admin signup error', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="page auth-page-container">
      <div className="auth-form-wrapper">
        <div className="form-header">
          <Link to="/signup" className="back-link">
            ← Back to Role Selection
          </Link>
          <span className="eyebrow">// FEDERATION ADMINISTRATOR REGISTRATION</span>
          <h1>CREATE ADMIN ACCOUNT</h1>
          <p>Register as a federation admin to govern, verify, and oversee the cooperative network.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form-box">
          <div className="form-group">
            <label htmlFor="adm-name" className="mono-label">
              FULL NAME
            </label>
            <input
              id="adm-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya Verma"
              className="tech-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="adm-email" className="mono-label">
              EMAIL ADDRESS
            </label>
            <input
              id="adm-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@coopgig.org"
              className="tech-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="adm-phone" className="mono-label">
              PHONE NUMBER
            </label>
            <input
              id="adm-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="tech-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="adm-code" className="mono-label">
              FEDERATION ACCESS CODE
            </label>
            <input
              id="adm-code"
              type="text"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              placeholder="e.g. SAHKAAR-ADMIN-2026"
              className="tech-input"
              required
            />
            <small style={{ color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
              Access code is issued by the cooperative federation.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="adm-password" className="mono-label">
              CREATE PASSWORD
            </label>
            <input
              id="adm-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="tech-input"
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={isLoading}>
            {isLoading ? 'REGISTERING ADMIN...' : 'CREATE ADMIN ACCOUNT →'}
          </button>
        </form>

        <p className="auth-footer-note">
          Already registered? <Link to="/login">Sign in here</Link>
        </p>
      </div>
    </main>
  );
}

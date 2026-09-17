import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { loginSuccess } from '../state/authSlice';
import { authService } from '../services/authService';

export function CustomerSignupPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('Mumbai, MH');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await authService.signupCustomer({
        name,
        email,
        password,
        location,
      });

      dispatch(loginSuccess(user));
      navigate('/customer');
    } catch (err) {
      console.error('Customer signup error', err);
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
          <span className="eyebrow">// SERVICE SEEKER REGISTRATION</span>
          <h1>CREATE CUSTOMER ACCOUNT</h1>
          <p>Get instant access to verified worker-owned services with transparent pricing.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form-box">
          <div className="form-group">
            <label htmlFor="cust-name" className="mono-label">
              FULL NAME
            </label>
            <input
              id="cust-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="tech-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cust-email" className="mono-label">
              EMAIL ADDRESS
            </label>
            <input
              id="cust-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rahul@example.com"
              className="tech-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cust-password" className="mono-label">
              CREATE PASSWORD
            </label>
            <input
              id="cust-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="tech-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cust-location" className="mono-label">
              PRIMARY SERVICE LOCATION
            </label>
            <input
              id="cust-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Mumbai, MH"
              className="tech-input"
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={isLoading}>
            {isLoading ? 'REGISTERING ACCOUNT...' : 'COMPLETE CUSTOMER REGISTRATION →'}
          </button>
        </form>

        <p className="auth-footer-note">
          Already registered? <Link to="/login">Sign in here</Link>
        </p>
      </div>
    </main>
  );
}

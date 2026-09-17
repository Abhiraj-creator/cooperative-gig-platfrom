import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { loginSuccess, type UserRole } from '../state/authSlice';
import { authService, DEMO_CUSTOMER, DEMO_WORKER, DEMO_ADMIN } from '../services/authService';
export function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (!email) {
      if (role === 'worker') setEmail('marcus.worker@coopgig.org');
      else if (role === 'admin') setEmail('admin@coopgig.org');
      else setEmail('sarah.customer@coopgig.org');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await authService.loginWithCredentials({
        email: email || (selectedRole === 'worker' ? 'worker@coopgig.org' : 'customer@coopgig.org'),
        password: password || 'demo123',
        role: selectedRole,
      });

      dispatch(loginSuccess(user));

      if (user.role === 'worker') {
        navigate('/worker');
      } else if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/booking');
      }
    } catch (err) {
      console.error('Login error', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    let demoUser = DEMO_CUSTOMER;
    if (role === 'worker') demoUser = DEMO_WORKER;
    if (role === 'admin') demoUser = DEMO_ADMIN;
    
    dispatch(loginSuccess(demoUser));
    
    if (role === 'worker') navigate('/worker');
    else if (role === 'admin') navigate('/admin');
    else navigate('/booking');
  };

  return (
    <main className="page auth-page-container">
      <div className="auth-layout">
        {/* Left Informational Panel */}
        <section className="auth-hero-panel">
          <div className="auth-hero-content">
            <span className="eyebrow">// AUTHENTICATION PROTOCOL</span>
            <h1 className="auth-title">
              {selectedRole === 'worker' && <>WORKER <span className="text-highlight">MEMBER</span> HUB.</>}
              {selectedRole === 'customer' && <>CUSTOMER <span className="text-highlight">SERVICE</span> ACCESS.</>}
              {selectedRole === 'admin' && <>FEDERATION <span className="text-highlight">ADMIN</span> PANEL.</>}
            </h1>
            <p className="auth-description">
              {selectedRole === 'worker' && 'Access your cooperative earnings dashboard, view incoming service dispatches, and manage your dividend shares in real-time.'}
              {selectedRole === 'customer' && 'Connect with verified worker-owners, schedule transparent gig services, and view your zero-markup cost breakdown.'}
              {selectedRole === 'admin' && 'Govern platform operations, verify worker credentials, and oversee cooperative disputes.'}
            </p>

            <div className="auth-features-list">
              {selectedRole === 'worker' && (
                <>
                  <div className="auth-feature-tag"><span className="tag-icon">⚡</span> 100% Direct Worker Earnings</div>
                  <div className="auth-feature-tag"><span className="tag-icon">📊</span> Co-op Dividend Governance</div>
                  <div className="auth-feature-tag"><span className="tag-icon">🛡️</span> Verified Trade Certification</div>
                </>
              )}
              {selectedRole === 'customer' && (
                <>
                  <div className="auth-feature-tag"><span className="tag-icon">🔍</span> Instant Algorithmic Gig Matching</div>
                  <div className="auth-feature-tag"><span className="tag-icon">💳</span> Transparent Price Guarantee</div>
                  <div className="auth-feature-tag"><span className="tag-icon">🌱</span> Supporting Local Worker Cooperatives</div>
                </>
              )}
              {selectedRole === 'admin' && (
                <>
                  <div className="auth-feature-tag"><span className="tag-icon">✅</span> Worker Verification Approvals</div>
                  <div className="auth-feature-tag"><span className="tag-icon">📈</span> Platform Analytics & Treasury</div>
                  <div className="auth-feature-tag"><span className="tag-icon">⚖️</span> Dispute Resolution Operations</div>
                </>
              )}
            </div>

            <div className="auth-quick-demo-box">
              <span className="mono-label">// INSTANT DEMO EVALUATION</span>
              <p className="demo-hint">Skip manual input and test live post-login screens immediately:</p>
              <div className="demo-actions">
                <button
                  type="button"
                  className={`demo-btn ${selectedRole === 'customer' ? 'active-demo' : ''}`}
                  onClick={() => handleDemoLogin('customer')}
                >
                  ⚡ LOGIN AS DEMO CUSTOMER
                </button>
                <button
                  type="button"
                  className={`demo-btn ${selectedRole === 'worker' ? 'active-demo' : ''}`}
                  onClick={() => handleDemoLogin('worker')}
                >
                  🛠️ LOGIN AS DEMO WORKER
                </button>
                <button
                  type="button"
                  className={`demo-btn ${selectedRole === 'admin' ? 'active-demo' : ''}`}
                  onClick={() => handleDemoLogin('admin')}
                >
                  🛡️ LOGIN AS DEMO ADMIN
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Right Form Panel */}
        <section className="auth-form-panel">
          <div className="auth-card">
            {/* Role Switcher Tabs */}
            <div className="role-switcher-header">
              <span className="mono-label">// SELECT USER FLOW</span>
              <div className="role-tab-group" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedRole === 'customer'}
                  className={`role-tab ${selectedRole === 'customer' ? 'active-customer' : ''}`}
                  onClick={() => handleRoleSelect('customer')}
                >
                  CUSTOMER
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedRole === 'worker'}
                  className={`role-tab ${selectedRole === 'worker' ? 'active-worker' : ''}`}
                  onClick={() => handleRoleSelect('worker')}
                >
                  WORKER
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedRole === 'admin'}
                  className={`role-tab ${selectedRole === 'admin' ? 'active-admin' : ''}`}
                  onClick={() => handleRoleSelect('admin')}
                >
                  ADMIN
                </button>
              </div>
            </div>

            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-badge">
                <span className="badge-dot"></span>
                <span className="badge-text">
                  LOGGING IN AS: <strong>{selectedRole.toUpperCase()}</strong>
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="mono-label">
                  EMAIL ADDRESS
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={selectedRole === 'worker' ? 'marcus.worker@coopgig.org' : selectedRole === 'admin' ? 'admin@coopgig.org' : 'sarah.customer@coopgig.org'}
                  className="tech-input"
                  required
                />
              </div>

              <div className="form-group">
                <div className="label-row">
                  <label htmlFor="password" className="mono-label">
                    PASSWORD
                  </label>
                  <span className="password-note">Any credentials accepted</span>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="tech-input"
                  required
                />
              </div>

              <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                {isLoading ? 'AUTHENTICATING...' : `SIGN IN AS ${selectedRole.toUpperCase()}`}
              </button>
            </form>

            <div className="auth-footer-links">
              <p>
                Don't have an account yet?{' '}
                <Link to="/signup" className="auth-link">
                  Create an account →
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

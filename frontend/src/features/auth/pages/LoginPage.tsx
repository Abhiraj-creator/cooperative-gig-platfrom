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
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await authService.loginWithCredentials({
        email: email || (selectedRole === 'worker' ? 'worker@coopgig.org' : selectedRole === 'admin' ? 'admin@coopgig.org' : 'customer@coopgig.org'),
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
              <div className="demo-actions" style={{ display: 'flex', flexDirection: 'row', gap: '6px', flexWrap: 'nowrap' }}>
                <button
                  type="button"
                  className={`demo-btn ${selectedRole === 'customer' ? 'active-demo' : ''}`}
                  onClick={() => handleDemoLogin('customer')}
                  style={{ flex: 1, minWidth: 0, fontSize: '0.7rem', padding: '8px 4px', textAlign: 'center' }}
                >
                  ⚡ CUSTOMER
                </button>
                <button
                  type="button"
                  className={`demo-btn ${selectedRole === 'worker' ? 'active-demo' : ''}`}
                  onClick={() => handleDemoLogin('worker')}
                  style={{ flex: 1, minWidth: 0, fontSize: '0.7rem', padding: '8px 4px', textAlign: 'center' }}
                >
                  🛠️ WORKER
                </button>
                <button
                  type="button"
                  className={`demo-btn ${selectedRole === 'admin' ? 'active-demo' : ''}`}
                  onClick={() => handleDemoLogin('admin')}
                  style={{ flex: 1, minWidth: 0, fontSize: '0.7rem', padding: '8px 4px', textAlign: 'center' }}
                >
                  🛡️ ADMIN
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
              <div className="role-tab-group" role="tablist" style={{ display: 'flex', flexDirection: 'row', gap: '8px', flexWrap: 'nowrap' }}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedRole === 'customer'}
                  className={`role-tab ${selectedRole === 'customer' ? 'active-customer' : ''}`}
                  onClick={() => handleRoleSelect('customer')}
                  style={{ flex: 1, minWidth: 0, padding: '8px 4px', fontSize: '0.75rem' }}
                >
                  CUSTOMER
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedRole === 'worker'}
                  className={`role-tab ${selectedRole === 'worker' ? 'active-worker' : ''}`}
                  onClick={() => handleRoleSelect('worker')}
                  style={{ flex: 1, minWidth: 0, padding: '8px 4px', fontSize: '0.75rem' }}
                >
                  WORKER
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedRole === 'admin'}
                  className={`role-tab ${selectedRole === 'admin' ? 'active-admin' : ''}`}
                  onClick={() => handleRoleSelect('admin')}
                  style={{ flex: 1, minWidth: 0, padding: '8px 4px', fontSize: '0.75rem' }}
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
                  placeholder="Enter your email address"
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

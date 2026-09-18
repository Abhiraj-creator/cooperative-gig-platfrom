import { useNavigate, Link } from 'react-router-dom';

export function SignupPage() {
  const navigate = useNavigate();

  return (
    <main className="page auth-page-container">
      <div className="signup-hub-container">
        <header className="signup-hub-header">
          <span className="eyebrow">// ONBOARDING PROTOCOL</span>
          <h1 className="signup-hub-title">CHOOSE YOUR COOPERATIVE ROLE</h1>
          <p className="signup-hub-subtitle">
            Select how you would like to participate in the democratic, zero-extraction gig economy.
          </p>
        </header>

        <div className="signup-role-grid">
          {/* Customer Selection Card */}
          <div className="signup-role-card customer-card" onClick={() => navigate('/signup/customer')}>
            <div className="card-tag">// SERVICE SEEKER</div>
            <h2>JOIN AS A CUSTOMER</h2>
            <p>
              Book reliable, skilled service professionals directly from local worker-owned cooperatives with total price transparency.
            </p>
            <ul className="role-perks-list">
              <li>✓ Transparent cost breakdown (0% corporate markup)</li>
              <li>✓ Verified & background-checked co-op workers</li>
              <li>✓ Direct chat and automated job tracking</li>
            </ul>
            <button type="button" className="card-action-btn">
              CREATE CUSTOMER ACCOUNT →
            </button>
          </div>

          {/* Worker Selection Card */}
          <div className="signup-role-card worker-card" onClick={() => navigate('/signup/worker')}>
            <div className="card-tag">// CO-OP MEMBER / PROVIDER</div>
            <h2>JOIN AS A WORKER-OWNER</h2>
            <p>
              Become a co-owner of the platform. Take home fair compensation, vote on platform governance, and receive equity dividend payouts.
            </p>
            <ul className="role-perks-list">
              <li>✓ 100% hourly rate payout with co-op equity</li>
              <li>✓ Democratic voting rights on platform policies</li>
              <li>✓ Algorithmic fair job dispatch without bidding wars</li>
            </ul>
            <button type="button" className="card-action-btn worker-accent">
              BECOME A WORKER MEMBER →
            </button>
          </div>

          {/* Admin Selection Card */}
          <div className="signup-role-card" style={{ borderColor: 'var(--accent)', background: 'rgba(var(--accent-rgb, 99,102,241),0.05)', cursor: 'pointer' }} onClick={() => navigate('/signup/admin')}>
            <div className="card-tag">// FEDERATION ADMINISTRATOR</div>
            <h2>JOIN AS AN ADMIN</h2>
            <p>
              Register as a federation administrator to verify workers, manage platform governance, resolve disputes, and oversee cooperative operations.
            </p>
            <ul className="role-perks-list">
              <li>✓ Worker verification & credential management</li>
              <li>✓ Platform analytics & treasury oversight</li>
              <li>✓ Dispute resolution & audit trail access</li>
            </ul>
            <button type="button" className="card-action-btn" style={{ borderColor: 'none', color: 'white' }}>
              REGISTER AS ADMIN →
            </button>
          </div>
        </div>

        <div className="signup-already-account">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in to your account →
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

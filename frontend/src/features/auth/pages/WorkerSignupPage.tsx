import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { loginSuccess } from '../state/authSlice';
import { authService } from '../services/authService';

const SKILL_OPTIONS = [
  'Electrical & Smart Home',
  'Plumbing & Hydraulics',
  'HVAC & Climate Control',
  'Carpentry & Woodwork',
  'Solar & Clean Energy',
  'IT & Local Network Repair',
  'Appliance Maintenance',
];

export function WorkerSignupPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [coopMemberId, setCoopMemberId] = useState('');
  const [hourlyRate, setHourlyRate] = useState<number>(45);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Electrical & Smart Home']);
  const [location, setLocation] = useState('Pune, MH');
  const [isLoading, setIsLoading] = useState(false);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await authService.signupWorker({
        name,
        email,
        password,
        coopMemberId: coopMemberId || `COOP-${Math.floor(1000 + Math.random() * 9000)}-IN`,
        hourlyRate,
        skills: selectedSkills,
        location,
      });

      dispatch(loginSuccess(user));
      navigate('/worker');
    } catch (err) {
      console.error('Worker signup error', err);
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
          <span className="eyebrow">// CO-OP MEMBER REGISTRATION</span>
          <h1>JOIN AS A WORKER-OWNER</h1>
          <p>Register your skills, receive direct dispatch gigs, and earn platform equity shares.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form-box">
          <div className="form-group">
            <label htmlFor="wrk-name" className="mono-label">
              FULL NAME
            </label>
            <input
              id="wrk-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rajesh Kumar"
              className="tech-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="wrk-email" className="mono-label">
              EMAIL ADDRESS
            </label>
            <input
              id="wrk-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rajesh.worker@coopgig.org"
              className="tech-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="wrk-password" className="mono-label">
              CREATE PASSWORD
            </label>
            <input
              id="wrk-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="tech-input"
              required
            />
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label htmlFor="coop-id" className="mono-label">
                CO-OP MEMBER ID (OPTIONAL)
              </label>
              <input
                id="coop-id"
                type="text"
                value={coopMemberId}
                onChange={(e) => setCoopMemberId(e.target.value)}
                placeholder="COOP-8842-IN"
                className="tech-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="hourly-rate" className="mono-label">
                BASE HOURLY RATE ($/HR)
              </label>
              <input
                id="hourly-rate"
                type="number"
                min={15}
                max={200}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="tech-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="mono-label">PRIMARY SKILL SPECIALIZATIONS</label>
            <div className="skills-chip-group">
              {SKILL_OPTIONS.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    className={`skill-chip ${isSelected ? 'skill-selected' : ''}`}
                    onClick={() => toggleSkill(skill)}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="wrk-location" className="mono-label">
              WORKING REGION / CITY
            </label>
            <input
              id="wrk-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Pune & PCMC"
              className="tech-input"
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn worker-btn" disabled={isLoading}>
            {isLoading ? 'CREATING MEMBER ACCOUNT...' : 'REGISTER AS CO-OP WORKER OWNER →'}
          </button>
        </form>

        <p className="auth-footer-note">
          Already a co-op member? <Link to="/login">Sign in here</Link>
        </p>
      </div>
    </main>
  );
}

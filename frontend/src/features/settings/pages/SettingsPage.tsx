import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Bell, ShieldAlert, Save, LogOut, Check, Camera,
} from 'lucide-react';
import { useAuth } from '../../auth/hooks/useAuth';
import { useAppDispatch } from '../../../app/hooks';
import { loginSuccess, logout } from '../../auth/state/authSlice';
import { getDisplayName, getInitials } from '../../../shared/utils/displayName';

interface NotificationSettings {
  bookingAlerts: boolean;
  statusUpdates: boolean;
  earningsAlerts: boolean;
  promotions: boolean;
}

const SETTINGS_STORAGE_KEY = 'sahkaar_settings';

export function SettingsPage() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const displayName = getDisplayName(user);
  const initials = getInitials(user);

  // ── Profile state ────────────────────────────────────────────────────────
  const [editName, setEditName] = useState(user?.name || '');
  const [editLocation, setEditLocation] = useState(user?.location || '');
  const [profileSaved, setProfileSaved] = useState(false);

  // ── Notification state ────────────────────────────────────────────────────
  const [notifications, setNotifications] = useState<NotificationSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) return JSON.parse(saved).notifications;
    } catch {/* ignore */}
    return {
      bookingAlerts: true,
      statusUpdates: true,
      earningsAlerts: user?.role === 'worker',
      promotions: false,
    };
  });

  // ── Active section ────────────────────────────────────────────────────────
  const [activeSection, setActiveSection] = useState<'profile' | 'notifications' | 'account'>('profile');

  const handleNotificationToggle = (key: keyof NotificationSettings) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    try {
      const existing = JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) || '{}');
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({ ...existing, notifications: updated }));
    } catch {/* ignore */}
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const updated = { ...user, name: editName, location: editLocation };
    dispatch(loginSuccess(updated));
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const sections = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'account' as const, label: 'Account', icon: ShieldAlert },
  ];

  return (
    <main className="settings-page">
      <div className="settings-container">
        {/* Sidebar */}
        <aside className="settings-sidebar">
          <div className="settings-sidebar-header">
            <div className="settings-avatar">
              <span>{initials}</span>
            </div>
            <div className="settings-user-info">
              <strong>{displayName}</strong>
              <small>{user?.role === 'worker' ? 'Co-op Worker' : 'Customer'}</small>
            </div>
          </div>

          <nav className="settings-nav" aria-label="Settings sections">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                className={`settings-nav-item ${activeSection === id ? 'active-settings-nav' : ''}`}
                onClick={() => setActiveSection(id)}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="settings-content">

          {/* ── Profile Section ─────────────────────────────────────────────── */}
          {activeSection === 'profile' && (
            <section className="settings-section">
              <div className="settings-section-header">
                <h1>Profile</h1>
                <p>Update your name and display information.</p>
              </div>

              {/* Avatar preview */}
              <div className="profile-avatar-preview">
                <div className="settings-avatar-large">{initials}</div>
                <div className="avatar-preview-info">
                  <strong>Profile Photo</strong>
                  <small>Your initials are used as your avatar</small>
                  <button type="button" className="avatar-change-btn">
                    <Camera size={14} /> Change Photo (coming soon)
                  </button>
                </div>
              </div>

              <form onSubmit={handleProfileSave} className="settings-form">
                <div className="settings-field">
                  <label htmlFor="settings-name">Display Name</label>
                  <input
                    id="settings-name"
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Your full name"
                    className="settings-input"
                    required
                  />
                </div>

                <div className="settings-field">
                  <label htmlFor="settings-email">Email Address</label>
                  <input
                    id="settings-email"
                    type="email"
                    value={user?.email || ''}
                    className="settings-input settings-input-readonly"
                    readOnly
                    disabled
                  />
                  <small className="field-hint">Email cannot be changed in demo mode.</small>
                </div>

                <div className="settings-field">
                  <label htmlFor="settings-location">Location</label>
                  <input
                    id="settings-location"
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    placeholder="City, State"
                    className="settings-input"
                  />
                </div>

                {user?.role === 'worker' && user.coopMemberId && (
                  <div className="settings-field">
                    <label>Co-op Member ID</label>
                    <input
                      type="text"
                      value={user.coopMemberId}
                      className="settings-input settings-input-readonly"
                      readOnly
                      disabled
                    />
                    <small className="field-hint">Assigned by your cooperative administrator.</small>
                  </div>
                )}

                {user?.role === 'worker' && user.skills && user.skills.length > 0 && (
                  <div className="settings-field">
                    <label>Skills</label>
                    <div className="skills-display">
                      {user.skills.map((skill) => (
                        <span key={skill} className="skill-chip">{skill}</span>
                      ))}
                    </div>
                    <small className="field-hint">Skills are set by your co-op profile.</small>
                  </div>
                )}

                <button
                  type="submit"
                  className={`settings-save-btn ${profileSaved ? 'saved' : ''}`}
                >
                  {profileSaved ? (
                    <><Check size={16} /> Saved!</>
                  ) : (
                    <><Save size={16} /> Save Changes</>
                  )}
                </button>
              </form>
            </section>
          )}

          {/* ── Notifications Section ────────────────────────────────────────── */}
          {activeSection === 'notifications' && (
            <section className="settings-section">
              <div className="settings-section-header">
                <h1>Notifications</h1>
                <p>Control which alerts you receive. All settings are saved instantly.</p>
              </div>

              <div className="notification-list">
                <div className="notification-row">
                  <div className="notification-info">
                    <strong>Booking Alerts</strong>
                    <small>Notify me when a booking is confirmed or cancelled</small>
                  </div>
                  <button
                    type="button"
                    className={`toggle-switch ${notifications.bookingAlerts ? 'toggle-on' : ''}`}
                    onClick={() => handleNotificationToggle('bookingAlerts')}
                    aria-pressed={notifications.bookingAlerts}
                    aria-label="Booking Alerts"
                  >
                    <span className="toggle-thumb" />
                  </button>
                </div>

                <div className="notification-row">
                  <div className="notification-info">
                    <strong>Status Updates</strong>
                    <small>Real-time updates on service progress and worker location</small>
                  </div>
                  <button
                    type="button"
                    className={`toggle-switch ${notifications.statusUpdates ? 'toggle-on' : ''}`}
                    onClick={() => handleNotificationToggle('statusUpdates')}
                    aria-pressed={notifications.statusUpdates}
                    aria-label="Status Updates"
                  >
                    <span className="toggle-thumb" />
                  </button>
                </div>

                {user?.role === 'worker' && (
                  <div className="notification-row">
                    <div className="notification-info">
                      <strong>Earnings & Payouts</strong>
                      <small>Alerts when payout transfers are initiated or dividends are credited</small>
                    </div>
                    <button
                      type="button"
                      className={`toggle-switch ${notifications.earningsAlerts ? 'toggle-on' : ''}`}
                      onClick={() => handleNotificationToggle('earningsAlerts')}
                      aria-pressed={notifications.earningsAlerts}
                      aria-label="Earnings Alerts"
                    >
                      <span className="toggle-thumb" />
                    </button>
                  </div>
                )}

                <div className="notification-row">
                  <div className="notification-info">
                    <strong>Promotions & Updates</strong>
                    <small>New features, service categories, and co-op news</small>
                  </div>
                  <button
                    type="button"
                    className={`toggle-switch ${notifications.promotions ? 'toggle-on' : ''}`}
                    onClick={() => handleNotificationToggle('promotions')}
                    aria-pressed={notifications.promotions}
                    aria-label="Promotions"
                  >
                    <span className="toggle-thumb" />
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ── Account / Danger Zone ────────────────────────────────────────── */}
          {activeSection === 'account' && (
            <section className="settings-section">
              <div className="settings-section-header">
                <h1>Account</h1>
                <p>Manage your session and account access.</p>
              </div>

              <div className="account-info-card">
                <div className="account-info-row">
                  <span>Logged in as</span>
                  <strong>{user?.email}</strong>
                </div>
                <div className="account-info-row">
                  <span>Account type</span>
                  <strong className="account-role-badge">
                    {user?.role === 'worker' ? '🛠️ Co-op Worker Member' : '🏠 Customer'}
                  </strong>
                </div>
                <div className="account-info-row">
                  <span>Member since</span>
                  <strong>September 2026</strong>
                </div>
                {user?.role === 'worker' && user.coopMemberId && (
                  <div className="account-info-row">
                    <span>Co-op ID</span>
                    <strong>{user.coopMemberId}</strong>
                  </div>
                )}
              </div>

              <div className="danger-zone">
                <h2>Danger Zone</h2>
                <div className="danger-card">
                  <div>
                    <strong>Sign Out</strong>
                    <small>You will be redirected to the login page.</small>
                  </div>
                  <button type="button" className="danger-btn" onClick={handleLogout}>
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              </div>
            </section>
          )}

        </div>
      </div>
    </main>
  );
}

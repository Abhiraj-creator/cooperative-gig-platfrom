import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Settings, LayoutDashboard, ListChecks, Briefcase, IndianRupee, ChevronDown, Shield } from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/state/authSlice';
import { getDisplayName, getInitials } from '../utils/displayName';

export function WorkerNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const displayName = getDisplayName(user);
  const initials = getInitials(user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!profileOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('.worker-profile-area')) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [profileOpen]);

  const currentFull = location.pathname + location.search;
  const isActive = (targetPath: string) => {
    if (targetPath === '/worker' && (location.search === '' || location.search === '?tab=all')) {
      return 'worker-nav-link active-nav-link-worker';
    }
    return currentFull === targetPath ? 'worker-nav-link active-nav-link-worker' : 'worker-nav-link';
  };

  return (
    <header className="worker-navbar" role="banner">
      {/* Brand */}
      <Link to="/worker" className="worker-brand" aria-label="SAHKAAR Worker Portal">
        <span className="worker-brand-icon" aria-hidden="true">
          <Logo size={38} />
        </span>
        <span className="worker-brand-text">
          <strong>SAHKAAR</strong>
          <small>Co-op Worker Portal</small>
        </span>
      </Link>

      {/* Desktop Nav Links */}
      <nav className="worker-nav-links" aria-label="Worker navigation">
        <Link to="/worker" className={isActive('/worker')}>
          <LayoutDashboard size={15} />
          <span>Dashboard</span>
        </Link>
        <Link to="/worker?tab=available" className={isActive('/worker?tab=available')}>
          <ListChecks size={15} />
          <span>Available Gigs</span>
        </Link>
        <Link to="/worker?tab=my_gigs" className={isActive('/worker?tab=my_gigs')}>
          <Briefcase size={15} />
          <span>My Active Jobs</span>
        </Link>
        <Link to="/worker?tab=completed" className={isActive('/worker?tab=completed')}>
          <IndianRupee size={15} />
          <span>Earnings</span>
        </Link>
      </nav>

      {/* Right Side */}
      <div className="worker-nav-right">
        {/* Co-op Badge */}
        {user?.coopMemberId && (
          <span className="worker-coop-badge">
            <Shield size={12} />
            {user.coopMemberId}
          </span>
        )}

        <Link to="/settings" className="worker-settings-btn" aria-label="Settings">
          <Settings size={17} />
        </Link>

        {/* Profile Dropdown */}
        <div className="worker-profile-area">
          <button
            type="button"
            className="worker-avatar-btn"
            onClick={() => setProfileOpen((prev) => !prev)}
            aria-expanded={profileOpen}
            aria-haspopup="true"
          >
            <span className="worker-avatar-circle">{initials}</span>
            <span className="worker-avatar-name">{displayName}</span>
            <ChevronDown size={14} className={`avatar-chevron ${profileOpen ? 'open' : ''}`} />
          </button>

          {profileOpen && (
            <div className="worker-profile-dropdown" role="menu">
              <div className="profile-dropdown-header">
                <span className="worker-profile-dropdown-initials">{initials}</span>
                <div>
                  <strong>{displayName}</strong>
                  <small>{user?.email}</small>
                  {user?.coopMemberId && (
                    <small className="coop-id-label">{user.coopMemberId}</small>
                  )}
                </div>
              </div>
              <div className="profile-dropdown-divider" />
              <Link to="/settings" className="profile-dropdown-item" role="menuitem">
                <Settings size={14} /> Profile & Settings
              </Link>
              <button
                type="button"
                className="profile-dropdown-item profile-dropdown-logout"
                onClick={handleLogout}
                role="menuitem"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Hamburger */}
      <button
        type="button"
        className={`mobile-menu-btn worker-mobile-btn ${menuOpen ? 'menu-open' : ''}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="worker-mobile-menu" role="navigation" aria-label="Mobile menu">
          <div className="mobile-menu-user">
            <span className="mobile-menu-initials worker-initials">{initials}</span>
            <div>
              <strong>{displayName}</strong>
              {user?.coopMemberId && <small>{user.coopMemberId}</small>}
            </div>
          </div>
          <Link to="/worker" className="mobile-nav-link">
            <LayoutDashboard size={15} /> Dashboard
          </Link>
          <Link to="/worker?tab=available" className="mobile-nav-link">
            <ListChecks size={15} /> Available Gigs
          </Link>
          <Link to="/worker?tab=my_gigs" className="mobile-nav-link">
            <Briefcase size={15} /> My Active Jobs
          </Link>
          <Link to="/worker?tab=completed" className="mobile-nav-link">
            <IndianRupee size={15} /> Earnings
          </Link>
          <Link to="/settings" className="mobile-nav-link">
            <Settings size={15} /> Settings
          </Link>
          <button type="button" className="mobile-nav-logout" onClick={handleLogout}>
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      )}
    </header>
  );
}

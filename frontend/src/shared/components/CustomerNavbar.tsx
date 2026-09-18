import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Settings, Calendar, Search, Clock, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/state/authSlice';
import { getDisplayName, getInitials } from '../utils/displayName';

export function CustomerNavbar() {
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

  // Close dropdowns on route change
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname, location.search]);

  // Close profile dropdown on outside click
  useEffect(() => {
    if (!profileOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('.customer-profile-area')) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [profileOpen]);

  const currentFull = location.pathname + location.search;
  const isActive = (targetPath: string) => {
    if (targetPath === '/booking' && (location.search === '' || location.search === '?tab=services')) {
      return 'customer-nav-link active-nav-link';
    }
    return currentFull === targetPath ? 'customer-nav-link active-nav-link' : 'customer-nav-link';
  };

  return (
    <header className="customer-navbar" role="banner">
      {/* Brand */}
      <Link to="/booking" className="customer-brand" aria-label="SAHKAAR Home">
        <span className="customer-brand-icon" aria-hidden="true">
          <Logo size={79} />
        </span>
        <span className="customer-brand-text">
          <strong>SAHKAAR</strong>
          <small>For Customers</small>
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="customer-nav-links" aria-label="Customer navigation">
        <Link to="/booking" className={isActive('/booking')}>
          <Search size={15} />
          <span>Book a Service</span>
        </Link>
        <Link to="/booking?tab=mybookings" className={isActive('/booking?tab=mybookings')}>
          <Calendar size={15} />
          <span>My Bookings</span>
        </Link>
        <Link to="/booking?tab=track" className={isActive('/booking?tab=track')}>
          <Clock size={15} />
          <span>Track Status</span>
        </Link>
      </nav>

      {/* Right Side — Profile & Settings */}
      <div className="customer-nav-right">
        <Link to="/settings" className="customer-settings-btn" aria-label="Settings">
          <Settings size={17} />
        </Link>

        {/* Profile Dropdown */}
        <div className="customer-profile-area">
          <button
            type="button"
            className="customer-avatar-btn"
            onClick={() => setProfileOpen((prev) => !prev)}
            aria-expanded={profileOpen}
            aria-haspopup="true"
          >
            <span className="customer-avatar-circle">{initials}</span>
            <span className="customer-avatar-name">{displayName}</span>
            <ChevronDown size={14} className={`avatar-chevron ${profileOpen ? 'open' : ''}`} />
          </button>

          {profileOpen && (
            <div className="customer-profile-dropdown" role="menu">
              <div className="profile-dropdown-header">
                <span className="profile-dropdown-initials">{initials}</span>
                <div>
                  <strong>{displayName}</strong>
                  <small>{user?.email}</small>
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
        className={`mobile-menu-btn ${menuOpen ? 'menu-open' : ''}`}
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
        <div className="customer-mobile-menu" role="navigation" aria-label="Mobile menu">
          <div className="mobile-menu-user">
            <span className="mobile-menu-initials">{initials}</span>
            <div>
              <strong>{displayName}</strong>
              <small>{user?.email}</small>
            </div>
          </div>
          <Link to="/booking" className="mobile-nav-link">
            <Search size={15} /> Book a Service
          </Link>
          <Link to="/booking?tab=mybookings" className="mobile-nav-link">
            <Calendar size={15} /> My Bookings
          </Link>
          <Link to="/booking?tab=track" className="mobile-nav-link">
            <Clock size={15} /> Track Status
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

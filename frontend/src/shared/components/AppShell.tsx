import { ArrowRight, Blocks, LogOut, UserCheck, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, type ReactNode } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/locomotive-scroll.css';
import TextRoll from './TextRoll';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/state/authSlice';
import { CustomerNavbar } from './CustomerNavbar';
import { WorkerNavbar } from './WorkerNavbar';
import { getDisplayName } from '../utils/displayName';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [headerHidden, setHeaderHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { isAuthenticated, user } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const displayName = getDisplayName(user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Technical cursor tracking
  useEffect(() => {
    const updateCursor = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
      document.documentElement.dataset.cursorVisible = 'true';
    };

    window.addEventListener('pointermove', updateCursor, { passive: true });
    return () => window.removeEventListener('pointermove', updateCursor);
  }, []);

  // Initialize Locomotive Scroll
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
        wrapper: window,
        content: document.documentElement,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      },
    });

    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  // Sticky header with smooth auto-hide on scroll down and reveal on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      if (currentScrollY < 120) {
        setHeaderHidden(false);
      } else {
        const diff = currentScrollY - lastScrollY;
        if (diff > 14) {
          setHeaderHidden(true);
        } else if (diff < -14) {
          setHeaderHidden(false);
        }
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // If authenticated, render role-specific navbar instead of public one
  if (isAuthenticated && user?.role === 'customer') {
    return (
      <div className="app-shell" data-scroll-container>
        <span className="technical-cursor" aria-hidden="true" />
        <CustomerNavbar />
        {children}
      </div>
    );
  }

  if (isAuthenticated && user?.role === 'worker') {
    return (
      <div className="app-shell" data-scroll-container>
        <span className="technical-cursor" aria-hidden="true" />
        <WorkerNavbar />
        {children}
      </div>
    );
  }

  // ─── Public Navbar (unauthenticated / landing page) ───────────────────────
  return (
    <div className="app-shell" data-scroll-container>
      <span className="technical-cursor" aria-hidden="true" />
      <header
        className={`site-header ${headerHidden ? 'header-hidden' : ''} ${
          isScrolled ? 'header-scrolled' : ''
        }`}
      >
        <Link className="brand-mark" to="/" aria-label="SAHKAAR home">
          <span className="brand-icon" aria-hidden="true">
            <Blocks size={24} strokeWidth={1.7} />
          </span>
          <span>
            <strong>SAHKAAR</strong>
            <small>Cooperative Services Network</small>
          </span>
        </Link>

        <nav className="app-nav" aria-label="Primary navigation">
          {/* How it works */}
          <div className="nav-menu">
            <a className="nav-link" href="/#network">
              <TextRoll splitBy="chars">How it works</TextRoll>
              <span className="nav-arrow" aria-hidden="true">↗</span>
            </a>
            <div className="nav-dropdown">
              <a href="/#network">Platform overview</a>
              <a href="/#services">Browse services</a>
            </div>
          </div>

          {/* Services */}
          <div className="nav-menu">
            <a className="nav-link" href="/#services">
              <TextRoll splitBy="chars">Services</TextRoll>
              <span className="nav-arrow" aria-hidden="true">↗</span>
            </a>
            <div className="nav-dropdown">
              <a href="/#services">All categories</a>
              <a href="/#network">Matching engine</a>
            </div>
          </div>

          {/* Join as Worker */}
          <div className="nav-menu">
            <Link className="nav-link" to="/signup/worker">
              <TextRoll splitBy="chars">Join as Worker</TextRoll>
              <span className="nav-arrow" aria-hidden="true">↗</span>
            </Link>
            <div className="nav-dropdown">
              <Link to="/signup/worker">Register as member</Link>
              <Link to="/login">Worker login</Link>
            </div>
          </div>

          {/* Auth buttons */}
          {isAuthenticated && user ? (
            <>
              <div className="nav-menu">
                <span className="nav-link auth-user-badge">
                  <UserCheck size={14} className="user-icon" />
                  <span className="user-badge-label">{displayName} ({user.role})</span>
                </span>
              </div>
              <button type="button" onClick={handleLogout} className="nav-cta logout-cta" title="Logout session">
                <span className="nav-cta-label">Logout</span>
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <div className="nav-menu">
                <Link className="nav-link nav-login" to="/login">
                  <TextRoll splitBy="chars">Sign In</TextRoll>
                </Link>
              </div>
              <Link className="nav-cta" to="/signup">
                <span className="nav-cta-label"><TextRoll splitBy="words">Join / Register</TextRoll></span>
                <ArrowRight className="nav-cta-arrow" size={16} />
              </Link>
            </>
          )}

          {/* Mobile hamburger for public nav */}
          <button
            type="button"
            className={`mobile-menu-btn public-mobile-btn ${mobileOpen ? 'menu-open' : ''}`}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Public Mobile Menu */}
      {mobileOpen && (
        <div className="public-mobile-menu">
          <a href="/#network" className="mobile-nav-link">How it works</a>
          <a href="/#services" className="mobile-nav-link">Services</a>
          <Link to="/signup/worker" className="mobile-nav-link">Join as Worker</Link>
          <Link to="/login" className="mobile-nav-link">Sign In</Link>
          <Link to="/signup" className="mobile-nav-cta">Join / Register →</Link>
        </div>
      )}

      {children}
    </div>
  );
}

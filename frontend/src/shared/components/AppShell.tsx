import { ArrowRight, Blocks } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState, type ReactNode } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/locomotive-scroll.css';
import TextRoll from './TextRoll';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [headerHidden, setHeaderHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
          // Scrolling down -> hide navbar smoothly
          setHeaderHidden(true);
        } else if (diff < -14) {
          // Scrolling up -> reveal navbar smoothly
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

  return (
    <div className="app-shell" data-scroll-container>
      <span className="technical-cursor" aria-hidden="true" />
      <header
        className={`site-header ${headerHidden ? 'header-hidden' : ''} ${
          isScrolled ? 'header-scrolled' : ''
        }`}
      >
        <Link className="brand-mark" to="/customer" aria-label="SAHAAY home">
          <span className="brand-icon" aria-hidden="true">
            <Blocks size={24} strokeWidth={1.7} />
          </span>
          <span>
            <strong>SAHAAY</strong>
            <small>Cooperative Services Network</small>
          </span>
        </Link>
        <nav className="app-nav" aria-label="Primary navigation">
          <div className="nav-menu">
            <a className="nav-link" href="/customer#services">
              <TextRoll splitBy="chars">Services</TextRoll> <span className="nav-arrow" aria-hidden="true">↗</span>
            </a>
            <div className="nav-dropdown">
              <a href="/customer#services"><TextRoll splitBy="words">Browse services</TextRoll></a>
              <Link to="/booking"><TextRoll splitBy="words">Request a service</TextRoll></Link>
            </div>
          </div>
          <div className="nav-menu">
            <a className="nav-link" href="/customer#network">
              <TextRoll splitBy="chars">How it works</TextRoll> <span className="nav-arrow" aria-hidden="true">↗</span>
            </a>
            <div className="nav-dropdown">
              <a href="/customer#network"><TextRoll splitBy="words">Smart matching</TextRoll></a>
              <a href="/customer#network"><TextRoll splitBy="words">Fair allocation</TextRoll></a>
            </div>
          </div>
          <div className="nav-menu"><Link className="nav-link" to="/worker"><TextRoll splitBy="chars">Workers</TextRoll></Link></div>
          <div className="nav-menu"><Link className="nav-link" to="/admin"><TextRoll splitBy="chars">Admin</TextRoll></Link></div>
          <div className="nav-menu"><Link className="nav-link nav-login" to="/customer"><TextRoll splitBy="chars">Login</TextRoll></Link></div>
          <Link className="nav-cta" to="/booking">
            <span className="nav-cta-label"><TextRoll splitBy="words">Request a service</TextRoll></span>
            <ArrowRight className="nav-cta-arrow" size={16} />
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}

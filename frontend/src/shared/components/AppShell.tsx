import { ArrowRight, Blocks } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="site-header">
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
          <a href="/customer#services">Services</a>
          <a href="/customer#network">How it works</a>
          <Link to="/worker">Workers</Link>
          <Link to="/admin">Admin</Link>
          <Link className="nav-login" to="/customer">Login</Link>
          <Link className="nav-cta" to="/booking">
            Request a service <ArrowRight size={16} />
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}

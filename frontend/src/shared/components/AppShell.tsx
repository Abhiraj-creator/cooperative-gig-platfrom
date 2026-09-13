import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <nav className="app-nav" aria-label="Primary navigation">
        <Link to="/customer" >Customer</Link>
        <Link to="/worker">Worker</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/booking">Booking</Link>
      </nav>
      {children}
    </div>
  );
}

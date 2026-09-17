import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface GuestRouteProps {
  children: ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, userRole } = useAuth();

  if (isAuthenticated) {
    if (userRole === 'customer') {
      return <Navigate to="/booking" replace />;
    }
    if (userRole === 'worker') {
      return <Navigate to="/worker" replace />;
    }
    if (userRole === 'admin') {
      return <Navigate to="/admin" replace />;
    }
  }

  return <>{children}</>;
}

import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../state/authSlice';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, userRole } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // Redirect user to their own role dashboard if trying to access unauthorized role route
    if (userRole === 'customer') {
      return <Navigate to="/customer" replace />;
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

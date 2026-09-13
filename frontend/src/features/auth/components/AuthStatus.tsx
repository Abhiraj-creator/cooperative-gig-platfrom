import { useAuth } from '../hooks/useAuth';

export function AuthStatus() {
  const { userRole } = useAuth();

  return <span>{userRole ? `Signed in as ${userRole}` : 'Not signed in'}</span>;
}

import { type ReactNode, useMemo, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthFlag, getUserRoles } from '../../lib/auth';

function useAuthReactive(): boolean {
  const [isAuthed, setIsAuthed] = useState<boolean>(getAuthFlag());
  useEffect(() => {
    const update = () => setIsAuthed(getAuthFlag());
    const onAuthChange = () => update();
    const onStorage = (e: StorageEvent) => {
      if (['auth', 'userRole'].includes(e.key || '')) update();
    };
    const onFocus = () => update();
    window.addEventListener('authchange', onAuthChange as EventListener);
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('authchange', onAuthChange as EventListener);
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onFocus);
    };
  }, []);
  return isAuthed;
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const isAuthed = useAuthReactive();
  const location = useLocation();
  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
}

export function RedirectIfAuth({ children }: { children: ReactNode }) {
  const isAuthed = useAuthReactive();
  if (isAuthed) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export function RequireAdmin({ children }: { children: ReactNode }) {
  const location = useLocation();

  const isAuthorized = useMemo(() => {
    // Check auth cookies
    const hasAuthCookies = getAuthFlag();
    if (!hasAuthCookies) {
      return false;
    }

    // Check admin role via helper
    const roles = getUserRoles();
    if (roles && Array.isArray(roles)) {
      return roles.includes('admin');
    }

    return false;
  }, []);

  // If not authorized, redirect to access denied
  if (!isAuthorized) {
    const isInDashboard = location.pathname.startsWith('/dashboard');
    const accessDeniedPath = isInDashboard
      ? '/dashboard/access-denied'
      : '/access-denied';
    return <Navigate to={accessDeniedPath} replace />;
  }

  return <>{children}</>;
}

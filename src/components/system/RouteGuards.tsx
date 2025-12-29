import { type ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthFlag } from '../../lib/auth';

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

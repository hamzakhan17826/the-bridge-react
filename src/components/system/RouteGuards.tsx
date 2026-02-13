import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isInitialized, isLoggedIn } = useAuthUser();
  const location = useLocation();
  if (!isInitialized) {
    return null;
  }
  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
}

export function RedirectIfAuth({ children }: { children: ReactNode }) {
  const { isInitialized, isLoggedIn } = useAuthUser();
  if (!isInitialized) {
    return null;
  }
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export function RequireAdmin({ children }: { children: ReactNode }) {
  const location = useLocation();

  const { isInitialized, isLoggedIn, isAdmin } = useAuthUser();
  if (!isInitialized) {
    return null;
  }

  const isAuthorized = isLoggedIn && isAdmin;

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

export function RequireMembershipTier({
  children,
  tierCode,
}: {
  children: ReactNode;
  tierCode: string;
}) {
  const location = useLocation();
  const { isInitialized, isLoggedIn, hasMembershipTier } = useAuthUser();
  if (!isInitialized) return null;
  const allowed = isLoggedIn && hasMembershipTier(tierCode);
  if (!allowed) {
    const isInDashboard = location.pathname.startsWith('/dashboard');
    const accessDeniedPath = isInDashboard
      ? '/dashboard/access-denied'
      : '/access-denied';
    return <Navigate to={accessDeniedPath} replace />;
  }
  return <>{children}</>;
}

export function RequireAdminOrMedium({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { isInitialized, isLoggedIn, isAdmin, hasMembershipTier } =
    useAuthUser();
  if (!isInitialized) return null;
  const allowed =
    isLoggedIn && (isAdmin || hasMembershipTier('PROFESSIONALMEDIUM'));
  if (!allowed) {
    const isInDashboard = location.pathname.startsWith('/dashboard');
    const accessDeniedPath = isInDashboard
      ? '/dashboard/access-denied'
      : '/access-denied';
    return <Navigate to={accessDeniedPath} replace />;
  }
  return <>{children}</>;
}

export function RequireFeature({
  children,
  featureName,
}: {
  children: ReactNode;
  featureName: string;
}) {
  const location = useLocation();
  const { isInitialized, isLoggedIn, hasFeature } = useAuthUser();
  if (!isInitialized) return null;
  const allowed = isLoggedIn && hasFeature(featureName);
  if (!allowed) {
    const isInDashboard = location.pathname.startsWith('/dashboard');
    const accessDeniedPath = isInDashboard
      ? '/dashboard/access-denied'
      : '/access-denied';
    return <Navigate to={accessDeniedPath} replace />;
  }
  return <>{children}</>;
}

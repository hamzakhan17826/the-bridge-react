import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ForgetPasswordPage from './pages/ForgetPassword';
import ResetPasswordPage from './pages/ResetPassword';
import VerifyEmailPage from './pages/VerifyEmail';
import UserProfile from './components/ui/UserProfile';
import { HelmetProvider } from 'react-helmet-async';
import RefreshToken from './components/system/RefreshToken';
import AppLayout from './components/layouts/AppLayout';
import { RequireAuth, RedirectIfAuth } from './components/system/RouteGuards';

// Removed unused ErrorFallback; use render-props pattern instead

function App() {
  return (
    <HelmetProvider>
      <QueryErrorResetBoundary>
        {() => (
          <BrowserRouter>
            <RefreshToken />
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route
                  path="/register"
                  element={
                    <RedirectIfAuth>
                      <RegisterPage />
                    </RedirectIfAuth>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <RedirectIfAuth>
                      <LoginPage />
                    </RedirectIfAuth>
                  }
                />
                <Route
                  path="/forget-password"
                  element={<ForgetPasswordPage />}
                />
                <Route
                  path="/Account/ResetPassword"
                  element={<ResetPasswordPage />}
                />
                <Route
                  path="/Account/VerifyEmail"
                  element={<VerifyEmailPage />}
                />
                <Route
                  path="/profile"
                  element={
                    <RequireAuth>
                      <UserProfile />
                    </RequireAuth>
                  }
                />
              </Route>
            </Routes>
            <ToastContainer />
          </BrowserRouter>
        )}
      </QueryErrorResetBoundary>
    </HelmetProvider>
  );
}

export default App;

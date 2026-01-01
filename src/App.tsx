import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Home,
  RegisterPage,
  LoginPage,
  ForgetPasswordPage,
  ResetPasswordPage,
  VerifyEmailPage,
  VerifyChangeEmailPage,
  UserProfile,
  ContactUsPage,
  MediumProfile,
  Events,
  Overview,
  Users,
  Settings,
} from './pages';
import { HelmetProvider } from 'react-helmet-async';
import RefreshToken from './components/system/RefreshToken';
import ScrollToTop from './components/system/ScrollToTop';
import AppLayout from './components/layouts/AppLayout';
import { RequireAuth, RedirectIfAuth } from './components/system/RouteGuards';
import DashboardLayout from './components/layouts/dashboard/DashboardLayout';
// import { ThemeProvider } from '@/components/theme-provider';

function App() {
  return (
    <HelmetProvider>
      <QueryErrorResetBoundary>
        {() => (
          <BrowserRouter>
            {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}
            <RefreshToken />
            <ScrollToTop />
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/mediums/:slug" element={<MediumProfile />} />
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
                  path="/Account/VerifyChangeEmail"
                  element={<VerifyChangeEmailPage />}
                />
                <Route
                  path="/profile"
                  element={
                    <RequireAuth>
                      <UserProfile />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <RequireAuth>
                      <ContactUsPage />
                    </RequireAuth>
                  }
                />
              </Route>
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <DashboardLayout />
                  </RequireAuth>
                }
              >
                <Route index element={<Overview />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
            <ToastContainer />
            {/* </ThemeProvider> */}
          </BrowserRouter>
        )}
      </QueryErrorResetBoundary>
    </HelmetProvider>
  );
}

export default App;

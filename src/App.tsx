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
  Mediums,
  BookMedium,
  Podcasts,
  Reviews,
  Blogs,
  BlogPost,
  BookDetail,
  Books,
  Memberships,
  AboutUs,
  Events,
  Overview,
  DashboardUserProfile,
  DashboardMembership,
  MembershipOrders,
  Users,
  Settings,
  MembershipUpgrade,
  PaymentReturn,
  ActivityLogs,
  AccessDenied,
  DashboardAccessDenied,
  AdminOrdersHistory,
  AdminUserMemberships,
  PMOnboarding,
  PMBookings,
  PMSchedule,
  PMServices,
  PMEarnings,
  PMPayout,
  MembershipOverview,
  AddPodcast,
} from './pages';
import { HelmetProvider } from 'react-helmet-async';
import RefreshToken from './components/system/RefreshToken';
import ScrollToTop from './components/system/ScrollToTop';
import AppLayout from './components/layouts/AppLayout';
import {
  RequireAuth,
  RedirectIfAuth,
  RequireAdmin,
} from './components/system/RouteGuards';
import DashboardLayout from './components/layouts/dashboard/DashboardLayout';
import { BreadcrumbProvider } from '@/components/ui/breadcrumb';
import { AuthInitializer } from './components/system/AuthInitializer';
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
            <AuthInitializer />
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/podcasts" element={<Podcasts />} />
                <Route path="/mediums" element={<Mediums />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:slug" element={<BlogPost />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:id" element={<BookDetail />} />
                <Route path="/membership" element={<Memberships />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/mediums/:slug" element={<MediumProfile />} />
                <Route path="/book/:slug" element={<BookMedium />} />
                <Route path="/access-denied" element={<AccessDenied />} />
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
                <Route path="/payment-return" element={<PaymentReturn />} />
              </Route>
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <BreadcrumbProvider>
                      <DashboardLayout />
                    </BreadcrumbProvider>
                  </RequireAuth>
                }
              >
                <Route index element={<Overview />} />
                <Route path="pm/onboarding" element={<PMOnboarding />} />
                <Route path="pm/bookings" element={<PMBookings />} />
                <Route path="pm/schedule" element={<PMSchedule />} />
                <Route path="pm/services" element={<PMServices />} />
                <Route path="pm/earnings" element={<PMEarnings />} />
                <Route path="pm/payout" element={<PMPayout />} />
                <Route path="profile" element={<DashboardUserProfile />} />
                <Route path="membership" element={<DashboardMembership />} />
                <Route
                  path="membership/orders"
                  element={<MembershipOrders />}
                />
                <Route
                  path="membership/overview"
                  element={<MembershipOverview />}
                />
                <Route
                  path="membership/upgrade/:plan"
                  element={<MembershipUpgrade />}
                />
                <Route
                  path="users"
                  element={
                    <RequireAdmin>
                      <Users />
                    </RequireAdmin>
                  }
                />
                <Route
                  path="activity-logs"
                  element={
                    <RequireAdmin>
                      <ActivityLogs />
                    </RequireAdmin>
                  }
                />
                <Route
                  path="orders-history"
                  element={
                    <RequireAdmin>
                      <AdminOrdersHistory />
                    </RequireAdmin>
                  }
                />
                <Route
                  path="user-memberships"
                  element={
                    <RequireAdmin>
                      <AdminUserMemberships />
                    </RequireAdmin>
                  }
                />
                <Route
                  path="add-podcast"
                  element={
                    <RequireAdmin>
                      <AddPodcast />
                    </RequireAdmin>
                  }
                />
                <Route path="settings" element={<Settings />} />
                <Route
                  path="access-denied"
                  element={<DashboardAccessDenied />}
                />
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

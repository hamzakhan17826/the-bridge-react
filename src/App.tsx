import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
  EventConfirmation,
  EventConfirmed,
  CreateEvent,
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
  CreditsHistory,
  MyEvents,
} from './pages';
import { HelmetProvider } from 'react-helmet-async';
import RefreshToken from './components/system/RefreshToken';
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
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/events', element: <Events /> },
        { path: '/events/confirmation', element: <EventConfirmation /> },
        { path: '/events/confirmed', element: <EventConfirmed /> },
        { path: '/podcasts', element: <Podcasts /> },
        { path: '/mediums', element: <Mediums /> },
        { path: '/blogs', element: <Blogs /> },
        { path: '/blogs/:slug', element: <BlogPost /> },
        { path: '/books', element: <Books /> },
        { path: '/books/:id', element: <BookDetail /> },
        { path: '/membership', element: <Memberships /> },
        { path: '/about', element: <AboutUs /> },
        { path: '/reviews', element: <Reviews /> },
        { path: '/mediums/:mediumId', element: <MediumProfile /> },
        { path: '/book/:slug', element: <BookMedium /> },
        { path: '/access-denied', element: <AccessDenied /> },
        {
          path: '/register',
          element: (
            <RedirectIfAuth>
              <RegisterPage />
            </RedirectIfAuth>
          ),
        },
        {
          path: '/login',
          element: (
            <RedirectIfAuth>
              <LoginPage />
            </RedirectIfAuth>
          ),
        },
        { path: '/forget-password', element: <ForgetPasswordPage /> },
        { path: '/Account/ResetPassword', element: <ResetPasswordPage /> },
        { path: '/Account/VerifyEmail', element: <VerifyEmailPage /> },
        {
          path: '/Account/VerifyChangeEmail',
          element: <VerifyChangeEmailPage />,
        },
        {
          path: '/profile',
          element: (
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          ),
        },
        {
          path: '/contact',
          element: (
            <RequireAuth>
              <ContactUsPage />
            </RequireAuth>
          ),
        },
        { path: '/payment-return', element: <PaymentReturn /> },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <RequireAuth>
          <BreadcrumbProvider>
            <DashboardLayout />
          </BreadcrumbProvider>
        </RequireAuth>
      ),
      children: [
        { index: true, element: <Overview /> },
        { path: 'credits-history', element: <CreditsHistory /> },
        { path: 'pm/onboarding', element: <PMOnboarding /> },
        { path: 'pm/bookings', element: <PMBookings /> },
        { path: 'pm/schedule', element: <PMSchedule /> },
        { path: 'pm/services', element: <PMServices /> },
        { path: 'pm/earnings', element: <PMEarnings /> },
        { path: 'pm/payout', element: <PMPayout /> },
        { path: 'events/create', element: <CreateEvent /> },
        { path: 'events', element: <MyEvents /> },
        { path: 'profile', element: <DashboardUserProfile /> },
        { path: 'membership', element: <DashboardMembership /> },
        { path: 'membership/orders', element: <MembershipOrders /> },
        { path: 'membership/overview', element: <MembershipOverview /> },
        { path: 'membership/upgrade/:plan', element: <MembershipUpgrade /> },
        {
          path: 'users',
          element: (
            <RequireAdmin>
              <Users />
            </RequireAdmin>
          ),
        },
        {
          path: 'activity-logs',
          element: (
            <RequireAdmin>
              <ActivityLogs />
            </RequireAdmin>
          ),
        },
        {
          path: 'orders-history',
          element: (
            <RequireAdmin>
              <AdminOrdersHistory />
            </RequireAdmin>
          ),
        },
        {
          path: 'user-memberships',
          element: (
            <RequireAdmin>
              <AdminUserMemberships />
            </RequireAdmin>
          ),
        },
        {
          path: 'add-podcast',
          element: (
            <RequireAdmin>
              <AddPodcast />
            </RequireAdmin>
          ),
        },
        { path: 'settings', element: <Settings /> },
        { path: 'access-denied', element: <DashboardAccessDenied /> },
      ],
    },
  ]);
  return (
    <HelmetProvider>
      <QueryErrorResetBoundary>
        {() => (
          <>
            {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}
            <RefreshToken />
            <AuthInitializer />
            <RouterProvider router={router} />
            <ToastContainer />
            {/* </ThemeProvider> */}
          </>
        )}
      </QueryErrorResetBoundary>
    </HelmetProvider>
  );
}

export default App;

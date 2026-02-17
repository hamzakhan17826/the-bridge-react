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
  BookDetail,
  Books,
  Memberships,
  AboutUs,
  Events,
  EventConfirmation,
  EventConfirmed,
  CreateEvent,
  EditEvent,
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
  AdminSendEmails,
  AdminTags,
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
  MyBooks,
  CreateBook,
  EditBook,
  MyBlogs,
  CreateBlog,
  EditBlog,
  Blogs,
  BlogPreview,
  NotFound,
  CreditTopUp,
  DevCreditTester,
} from './pages';
import { HelmetProvider } from 'react-helmet-async';
import RefreshToken from './components/system/RefreshToken';
import AppLayout from './components/layouts/AppLayout';
import {
  RequireAuth,
  RedirectIfAuth,
  RequireAdmin,
  RequireMembershipTier,
} from './components/system/RouteGuards';
import DashboardLayout from './components/layouts/dashboard/DashboardLayout';
import { BreadcrumbProvider } from '@/components/ui/breadcrumb';
import { AuthInitializer } from './components/system/AuthInitializer';
import { setRouter } from './lib/router';
// import { ThemeProvider } from '@/components/theme-provider';

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <NotFound />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/events', element: <Events /> },
        { path: '/events/confirmation', element: <EventConfirmation /> },
        { path: '/events/confirmed', element: <EventConfirmed /> },
        { path: '/podcasts', element: <Podcasts /> },
        { path: '/blogs', element: <Blogs /> },
        { path: '/blogs/:slug', element: <BlogPreview /> },
        { path: '/mediums', element: <Mediums /> },
        { path: '/books', element: <Books /> },
        { path: '/books/:slug', element: <BookDetail /> },
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
          element: <ContactUsPage />,
        },
        { path: '/dev/credit-tester', element: <DevCreditTester /> },
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
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Overview /> },
        { path: 'credits-history', element: <CreditsHistory /> },
        { path: 'pm/onboarding', element: <PMOnboarding /> },
        { path: 'pm/bookings', element: <PMBookings /> },
        { path: 'pm/schedule', element: <PMSchedule /> },
        { path: 'pm/services', element: <PMServices /> },
        { path: 'pm/earnings', element: <PMEarnings /> },
        { path: 'pm/payout', element: <PMPayout /> },
        {
          path: 'events',
          element: (
            <RequireMembershipTier tierCode="PROFESSIONALMEDIUM">
              <MyEvents />
            </RequireMembershipTier>
          ),
        },
        {
          path: 'events/create',
          element: (
            <RequireMembershipTier tierCode="PROFESSIONALMEDIUM">
              <CreateEvent />
            </RequireMembershipTier>
          ),
        },
        {
          path: 'events/:eventId/edit',
          element: (
            <RequireMembershipTier tierCode="PROFESSIONALMEDIUM">
              <EditEvent />
            </RequireMembershipTier>
          ),
        },
        {
          path: 'books',
          element: (
            <RequireMembershipTier tierCode="PROFESSIONALMEDIUM">
              <MyBooks />
            </RequireMembershipTier>
          ),
        },
        {
          path: 'books/create',
          element: (
            <RequireMembershipTier tierCode="PROFESSIONALMEDIUM">
              <CreateBook />
            </RequireMembershipTier>
          ),
        },
        {
          path: 'books/:slug/edit',
          element: (
            <RequireMembershipTier tierCode="PROFESSIONALMEDIUM">
              <EditBook />
            </RequireMembershipTier>
          ),
        },
        {
          path: 'blogs',
          element: (
            <RequireMembershipTier tierCode="PROFESSIONALMEDIUM">
              <MyBlogs />
            </RequireMembershipTier>
          ),
        },
        {
          path: 'blogs/create',
          element: (
            <RequireMembershipTier tierCode="PROFESSIONALMEDIUM">
              <CreateBlog />
            </RequireMembershipTier>
          ),
        },
        {
          path: 'blogs/:slug/edit',
          element: (
            <RequireMembershipTier tierCode="PROFESSIONALMEDIUM">
              <EditBlog />
            </RequireMembershipTier>
          ),
        },
        { path: 'profile', element: <DashboardUserProfile /> },
        { path: 'membership', element: <DashboardMembership /> },
        { path: 'membership/orders', element: <MembershipOrders /> },
        { path: 'membership/overview', element: <MembershipOverview /> },
        { path: 'membership/topup', element: <CreditTopUp /> },
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
          path: 'send-emails',
          element: (
            <RequireAdmin>
              <AdminSendEmails />
            </RequireAdmin>
          ),
        },
        {
          path: 'tags',
          element: (
            <RequireAdmin>
              <AdminTags />
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
            <RequireMembershipTier tierCode="PROFESSIONALMEDIUM">
              <AddPodcast />
            </RequireMembershipTier>
          ),
        },
        { path: 'settings', element: <Settings /> },
        { path: 'access-denied', element: <DashboardAccessDenied /> },
      ],
    },
  ]);
  setRouter(router);
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

import { createBrowserRouter } from 'react-router-dom';
import { AdminDashboardPage } from '../features/admin/pages/AdminDashboardPage';
import { BookingCreatePage } from '../features/booking/pages/BookingCreatePage';
import { CustomerHomePage } from '../features/customer/pages/CustomerHomePage';
import { WorkerDashboardPage } from '../features/worker/pages/WorkerDashboardPage';
import { SettingsPage } from '../features/settings/pages/SettingsPage';
import { App } from './App';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { SignupPage } from '../features/auth/pages/SignupPage';
import { CustomerSignupPage } from '../features/auth/pages/CustomerSignupPage';
import { WorkerSignupPage } from '../features/auth/pages/WorkerSignupPage';
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute';
import { GuestRoute } from '../features/auth/components/GuestRoute';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <GuestRoute><CustomerHomePage /></GuestRoute> },
      { path: 'login', element: <GuestRoute><LoginPage /></GuestRoute> },
      { path: 'signup', element: <GuestRoute><SignupPage /></GuestRoute> },
      { path: 'signup/customer', element: <GuestRoute><CustomerSignupPage /></GuestRoute> },
      { path: 'signup/worker', element: <GuestRoute><WorkerSignupPage /></GuestRoute> },
      { path: 'customer', element: <GuestRoute><CustomerHomePage /></GuestRoute> },
      {
        path: 'worker',
        element: (
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'booking',
        element: (
          <ProtectedRoute allowedRoles={['customer']}>
            <BookingCreatePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);


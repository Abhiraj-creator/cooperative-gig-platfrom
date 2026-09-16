import { createBrowserRouter } from 'react-router-dom';
import { AdminDashboardPage } from '../features/admin/pages/AdminDashboardPage';
import { BookingCreatePage } from '../features/booking/pages/BookingCreatePage';
import { CustomerHomePage } from '../features/customer/pages/CustomerHomePage';
import { WorkerDashboardPage } from '../features/worker/pages/WorkerDashboardPage';
import { App } from './App';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { SignupPage } from '../features/auth/pages/SignupPage';
import { CustomerSignupPage } from '../features/auth/pages/CustomerSignupPage';
import { WorkerSignupPage } from '../features/auth/pages/WorkerSignupPage';
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <CustomerHomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'signup/customer', element: <CustomerSignupPage /> },
      { path: 'signup/worker', element: <WorkerSignupPage /> },
      { path: 'customer', element: <CustomerHomePage /> },
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
    ],
  },
]);


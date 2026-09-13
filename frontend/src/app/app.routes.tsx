import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AdminDashboardPage } from '../features/admin/pages/AdminDashboardPage';
import { BookingCreatePage } from '../features/booking/pages/BookingCreatePage';
import { CustomerHomePage } from '../features/customer/pages/CustomerHomePage';
import { WorkerDashboardPage } from '../features/worker/pages/WorkerDashboardPage';
import { App } from './App';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/customer" replace /> },
      { path: 'customer', element: <CustomerHomePage /> },
      { path: 'worker', element: <WorkerDashboardPage /> },
      { path: 'admin', element: <AdminDashboardPage /> },
      { path: 'booking', element: <BookingCreatePage /> },
    ],
  },
]);

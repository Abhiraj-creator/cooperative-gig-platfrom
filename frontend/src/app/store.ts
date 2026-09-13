import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../features/admin/state/adminSlice';
import authReducer from '../features/auth/state/authSlice';
import bookingReducer from '../features/booking/state/bookingSlice';
import customerReducer from '../features/customer/state/customerSlice';
import workerReducer from '../features/worker/state/workerSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer,
    booking: bookingReducer,
    customer: customerReducer,
    worker: workerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

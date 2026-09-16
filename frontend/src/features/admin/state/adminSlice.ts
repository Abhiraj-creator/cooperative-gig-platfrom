import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AdminQueueSummary } from '../types';

interface AdminState {
  queues: AdminQueueSummary[];
}

const initialState: AdminState = {
  queues: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminQueues(state, action: PayloadAction<AdminQueueSummary[]>) {
      state.queues = action.payload;
    },
  },
});

export const { setAdminQueues } = adminSlice.actions;
export default adminSlice.reducer;

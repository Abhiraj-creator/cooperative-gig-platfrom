import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AdminQueueSummary } from '../types';

interface WorkerProfile {
  id: string;
  name: string;
  location: string;
  isApproved: boolean;
  skills?: string[];
  rate?: number;
  phone?: string;
  photo?: string;
}

interface AdminState {
  queues: AdminQueueSummary[];
  workers: WorkerProfile[];
}

const initialState: AdminState = {
  queues: [],
  workers: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminQueues(state, action: PayloadAction<AdminQueueSummary[]>) {
      state.queues = action.payload;
    },
    setPendingWorkers(state, action: PayloadAction<WorkerProfile[]>) {
      state.workers = action.payload;
    },
    approveWorker(state, action: PayloadAction<string>) {
      const worker = state.workers.find((w) => w.id === action.payload);
      if (worker) {
        worker.isApproved = true;
      }
    },
  },
});

export const { setAdminQueues, setPendingWorkers, approveWorker } = adminSlice.actions;
export default adminSlice.reducer;

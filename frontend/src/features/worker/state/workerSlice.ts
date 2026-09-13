import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { WorkerJobRequest } from '../types';

interface WorkerState {
  jobRequests: WorkerJobRequest[];
}

const initialState: WorkerState = {
  jobRequests: [],
};

const workerSlice = createSlice({
  name: 'worker',
  initialState,
  reducers: {
    setWorkerJobRequests(state, action: PayloadAction<WorkerJobRequest[]>) {
      state.jobRequests = action.payload;
    },
  },
});

export const { setWorkerJobRequests } = workerSlice.actions;
export default workerSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ServiceCategory } from '../types';

interface CustomerState {
  serviceCategories: ServiceCategory[];
}

const initialState: CustomerState = {
  serviceCategories: [],
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setServiceCategories(state, action: PayloadAction<ServiceCategory[]>) {
      state.serviceCategories = action.payload;
    },
  },
});

export const { setServiceCategories } = customerSlice.actions;
export default customerSlice.reducer;

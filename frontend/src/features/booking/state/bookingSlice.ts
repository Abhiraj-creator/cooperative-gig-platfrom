import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { BookingDraft, ServiceMode } from '../types';

interface BookingState {
  draft: BookingDraft;
}

const initialState: BookingState = {
  draft: {
    mode: 'scheduled',
    serviceCategoryId: '',
    addressId: '',
  },
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingMode(state, action: PayloadAction<ServiceMode>) {
      state.draft.mode = action.payload;
    },
    setBookingDraft(state, action: PayloadAction<BookingDraft>) {
      state.draft = action.payload;
    },
  },
});

export const { setBookingDraft, setBookingMode } = bookingSlice.actions;
export default bookingSlice.reducer;

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createBookingDraft } from '../services/bookingService';
import { setBookingDraft, setBookingMode } from '../state/bookingSlice';
import type { BookingDraft, ServiceMode } from '../types';

export function useBookingDraft() {
  const dispatch = useAppDispatch();
  const draft = useAppSelector((state) => state.booking.draft);

  function updateMode(mode: ServiceMode) {
    dispatch(setBookingMode(mode));
  }

  async function saveDraft(nextDraft: BookingDraft) {
    const savedDraft = await createBookingDraft(nextDraft);
    dispatch(setBookingDraft(savedDraft));
  }

  return { draft, saveDraft, updateMode };
}

export type ServiceMode = 'scheduled' | 'on-demand' | 'emergency';

export interface BookingDraft {
  mode: ServiceMode;
  serviceCategoryId: string;
  addressId: string;
}

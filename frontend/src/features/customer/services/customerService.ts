import type { ServiceCategory } from '../types';

export async function fetchServiceCategories(): Promise<ServiceCategory[]> {
  return [
    { id: 'electrician', name: 'Electrician', emergencyEnabled: true },
    { id: 'plumber', name: 'Plumber', emergencyEnabled: true },
    { id: 'caregiver', name: 'Caregiver', emergencyEnabled: false },
  ];
}

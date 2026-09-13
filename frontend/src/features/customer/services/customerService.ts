import type { ServiceCategory } from '../types';

export async function fetchServiceCategories(): Promise<ServiceCategory[]> {
  return [
    { id: 'electrician', name: 'Electrician', emergencyEnabled: true },
    { id: 'plumber', name: 'Plumber', emergencyEnabled: true },
    { id: 'carpenter', name: 'Carpenter', emergencyEnabled: false },
    { id: 'painter', name: 'Painter', emergencyEnabled: false },
    { id: 'cleaner', name: 'Cleaner', emergencyEnabled: false },
    { id: 'driver', name: 'Driver', emergencyEnabled: false },
    { id: 'gardener', name: 'Gardener', emergencyEnabled: false },
    { id: 'caregiver', name: 'Caregiver', emergencyEnabled: false },
    { id: 'technician', name: 'Technician', emergencyEnabled: true },
  ];
}

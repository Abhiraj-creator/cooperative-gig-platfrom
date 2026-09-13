import type { AdminQueueSummary } from '../types';

export async function fetchAdminQueues(): Promise<AdminQueueSummary[]> {
  return [
    { id: 'verification', label: 'Verification', count: 18 },
    { id: 'workforce', label: 'Workforce', count: 7 },
    { id: 'disputes', label: 'Disputes', count: 3 },
  ];
}

import type { AdminQueueSummary } from '../types';

export async function fetchAdminQueues(): Promise<AdminQueueSummary[]> {
  return [
    { id: 'verification', label: 'Verification', count: 18 },
    { id: 'workforce', label: 'Workforce', count: 7 },
    { id: 'disputes', label: 'Disputes', count: 3 },
  ];
}

export async function fetchPendingWorkers() {
  return [
    { id: 'wrk-101', name: 'Ramesh Kumar', location: 'Noida', isApproved: false },
    { id: 'wrk-102', name: 'Suresh Raina', location: 'Mumbai', isApproved: false },
    { id: 'wrk-103', name: 'Amit Singh', location: 'Pune', isApproved: true },
  ];
}

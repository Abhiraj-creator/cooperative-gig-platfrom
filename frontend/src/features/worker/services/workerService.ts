import type { WorkerJobRequest } from '../types';

export async function fetchWorkerJobRequests(): Promise<WorkerJobRequest[]> {
  return [
    { id: 'job-101', service: 'Plumbing repair', distanceKm: 2.4 },
    { id: 'job-102', service: 'Electrical inspection', distanceKm: 4.1 },
  ];
}

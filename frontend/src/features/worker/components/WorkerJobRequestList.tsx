import type { WorkerJobRequest } from '../types';

interface WorkerJobRequestListProps {
  requests: WorkerJobRequest[];
}

export function WorkerJobRequestList({ requests }: WorkerJobRequestListProps) {
  return (
    <ul>
      {requests.map((request) => (
        <li key={request.id}>
          {request.service} - {request.distanceKm} km away
        </li>
      ))}
    </ul>
  );
}

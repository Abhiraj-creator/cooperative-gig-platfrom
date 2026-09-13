import type { AdminQueueSummary } from '../types';

interface AdminQueueListProps {
  queues: AdminQueueSummary[];
}

export function AdminQueueList({ queues }: AdminQueueListProps) {
  return (
    <ul>
      {queues.map((queue) => (
        <li key={queue.id}>
          {queue.label}: {queue.count}
        </li>
      ))}
    </ul>
  );
}

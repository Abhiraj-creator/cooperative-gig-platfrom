import { AdminQueueList } from '../components/AdminQueueList';
import { useAdminQueues } from '../hooks/useAdminQueues';
import { TextReveal } from '@/shared/components';

export function AdminDashboardPage() {
  const { queues } = useAdminQueues();

  return (
    <main className="page">
      <section className="panel">
        <p className="eyebrow">Cooperative Federation Admin</p>
        <TextReveal trigger="mount" splitBy="words">
          <h1>Verify, Monitor, and Govern Platform Work</h1>
        </TextReveal>
        <p>
          Operate the parallel administration layer for verification, workforce
          management, bookings, payments, disputes, analytics, and audit.
        </p>
        <AdminQueueList queues={queues} />
      </section>
    </main>
  );
}

import { WorkerJobRequestList } from '../components/WorkerJobRequestList';
import { useWorkerJobs } from '../hooks/useWorkerJobs';
import { TextReveal } from '@/shared/components';

export function WorkerDashboardPage() {
  const { jobRequests } = useWorkerJobs();

  return (
    <main className="page">
      <section className="panel">
        <p className="eyebrow">Worker</p>
        <TextReveal trigger="mount" splitBy="words">
          <h1>Manage Jobs and Availability</h1>
        </TextReveal>
        <p>
          Review matched job requests, maintain verification details, track
          earnings, and access cooperative welfare support.
        </p>
        <WorkerJobRequestList requests={jobRequests} />
      </section>
    </main>
  );
}

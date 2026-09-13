import { WorkerJobRequestList } from '../components/WorkerJobRequestList';
import { useWorkerJobs } from '../hooks/useWorkerJobs';

export function WorkerDashboardPage() {
  const { jobRequests } = useWorkerJobs();

  return (
    <main className="page">
      <section className="panel">
        <p className="eyebrow">Worker</p>
        <h1>Manage Jobs and Availability</h1>
        <p>
          Review matched job requests, maintain verification details, track
          earnings, and access cooperative welfare support.
        </p>
        <WorkerJobRequestList requests={jobRequests} />
      </section>
    </main>
  );
}

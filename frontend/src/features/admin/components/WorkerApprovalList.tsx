import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchPendingWorkers } from '../services/adminService';
import { setPendingWorkers, approveWorker } from '../state/adminSlice';
import { CheckCircle } from 'lucide-react';

export function WorkerApprovalList() {
  const dispatch = useAppDispatch();
  const workers = useAppSelector((state) => state.admin.workers);

  useEffect(() => {
    if (workers.length === 0) {
      fetchPendingWorkers().then((data) => {
        dispatch(setPendingWorkers(data));
      });
    }
  }, [dispatch, workers.length]);

  const handleApprove = (id: string) => {
    dispatch(approveWorker(id));
  };

  return (
    <div className="worker-approval-list">
      <h3 className="mono-label" style={{ marginTop: '24px', marginBottom: '16px' }}>// WORKER VERIFICATION QUEUE</h3>
      <div className="booking-cards-list">
        {workers.map((worker) => (
          <div key={worker.id} className="booking-status-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="booking-card-top" style={{ marginBottom: '8px' }}>
                <span className={`status-pill ${worker.isApproved ? 'status-completed' : 'status-in_progress'}`}>
                  {worker.isApproved ? '✓ APPROVED' : '⚡ PENDING VERIFICATION'}
                </span>
              </div>
              <h4 style={{ margin: '0 0 4px 0' }}>{worker.name}</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>Location: {worker.location} | ID: {worker.id}</p>
            </div>
            
            <div>
              {!worker.isApproved ? (
                <button 
                  type="button" 
                  className="book-now-btn" 
                  onClick={() => handleApprove(worker.id)}
                  style={{ padding: '8px 16px' }}
                >
                  <CheckCircle size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }} />
                  Verify & Approve
                </button>
              ) : (
                <span className="payout-done-badge">Verified Member</span>
              )}
            </div>
          </div>
        ))}
        {workers.length === 0 && (
          <p>No workers in the queue.</p>
        )}
      </div>
    </div>
  );
}

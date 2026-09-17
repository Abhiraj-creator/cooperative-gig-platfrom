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
          <div key={worker.id} className="booking-status-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px', backgroundColor: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <img 
                  src={worker.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.name)}&background=random&size=128`} 
                  alt={worker.name} 
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent)' }}
                />
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', color: 'var(--text)' }}>{worker.name}</h4>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📍 {worker.location}</span>
                    <span>|</span>
                    <span style={{ fontFamily: 'monospace' }}>ID: {worker.id}</span>
                  </p>
                </div>
              </div>
              
              <div className="booking-card-top" style={{ marginBottom: 0 }}>
                <span className={`status-pill ${worker.isApproved ? 'status-completed' : 'status-in_progress'}`} style={{ padding: '6px 12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  {worker.isApproved ? '✓ VERIFIED' : '⚡ PENDING'}
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', padding: '16px', backgroundColor: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)' }}>
              {worker.skills && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>Core Skills</span>
                  <strong style={{ fontSize: '0.9rem' }}>{worker.skills.join(', ')}</strong>
                </div>
              )}
              {worker.rate && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>Hourly Rate</span>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--accent)' }}>₹{worker.rate}/hr</strong>
                </div>
              )}
              {worker.phone && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>Contact</span>
                  <strong style={{ fontSize: '0.9rem' }}>{worker.phone}</strong>
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
              {!worker.isApproved ? (
                <button 
                  type="button" 
                  className="book-now-btn" 
                  onClick={() => handleApprove(worker.id)}
                  style={{ padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
                >
                  <CheckCircle size={18} />
                  Approve Worker Profile
                </button>
              ) : (
                <span className="payout-done-badge" style={{ padding: '8px 16px', borderRadius: '6px' }}>★ Active Co-op Member</span>
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

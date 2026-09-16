import { useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import gigsData from '../../../data/gigsData.json';
import type { GigItem } from '../../booking/pages/BookingCreatePage';
import { DollarSign, Award, Clock, MapPin, CheckCircle, Shield, Briefcase, X } from 'lucide-react';

export function WorkerDashboardPage() {
  const { user } = useAuth();
  const [gigs, setGigs] = useState<GigItem[]>(gigsData.gigs as GigItem[]);
  const [filterTab, setFilterTab] = useState<'all' | 'available' | 'my_gigs' | 'completed'>('all');
  const [selectedGig, setSelectedGig] = useState<GigItem | null>(null);

  // Dynamic earnings calculations
  const myCompletedGigs = gigs.filter((g) => g.status === 'completed' && g.worker.name === (user?.name || 'Marcus Vance'));
  const totalEarned = myCompletedGigs.reduce((sum, g) => sum + g.coopFeeSplit.workerPayout, 428);
  const dividendPoolShare = (totalEarned * 0.14).toFixed(2);

  const filteredGigs = gigs.filter((gig) => {
    if (filterTab === 'available') return gig.status === 'available';
    if (filterTab === 'my_gigs') return gig.status === 'in_progress';
    if (filterTab === 'completed') return gig.status === 'completed';
    return true;
  });

  const handleAcceptGig = (gigId: string) => {
    setGigs((prevGigs) =>
      prevGigs.map((g) =>
        g.id === gigId
          ? {
              ...g,
              status: 'in_progress',
              worker: {
                ...g.worker,
                name: user?.name || 'Marcus Vance',
                coopId: user?.coopMemberId || 'COOP-8842-SF',
              },
            }
          : g
      )
    );
    if (selectedGig && selectedGig.id === gigId) {
      setSelectedGig((prev) => (prev ? { ...prev, status: 'in_progress' } : null));
    }
  };

  const handleCompleteGig = (gigId: string) => {
    setGigs((prevGigs) =>
      prevGigs.map((g) => (g.id === gigId ? { ...g, status: 'completed' } : g))
    );
    if (selectedGig && selectedGig.id === gigId) {
      setSelectedGig((prev) => (prev ? { ...prev, status: 'completed' } : null));
    }
  };

  return (
    <main className="page worker-dashboard-container">
      {/* Worker Hero Header */}
      <section className="worker-hero-header">
        <div className="worker-profile-summary">
          <div className="worker-avatar">
            {(user?.name || 'Marcus Vance').charAt(0)}
          </div>
          <div>
            <span className="eyebrow">// CO-OP WORKER OWNER PORTAL</span>
            <h1 className="worker-name">{user?.name || 'Marcus Vance'}</h1>
            <div className="worker-badges">
              <span className="badge-coop">{user?.coopMemberId || 'COOP-8842-SF'}</span>
              <span className="badge-skill">Master Electrician</span>
              <span className="badge-status">● DISPATCH READY</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="worker-stats-grid">
          <div className="stat-card">
            <span className="stat-label">TODAY'S PAYOUT (85%)</span>
            <div className="stat-value">
              <DollarSign size={20} className="stat-icon" />
              <span>{totalEarned.toFixed(2)}</span>
            </div>
            <span className="stat-sub font-mono">Direct Bank Transfer</span>
          </div>

          <div className="stat-card accent-card">
            <span className="stat-label">CO-OP DIVIDEND RESERVE</span>
            <div className="stat-value">
              <Award size={20} className="stat-icon" />
              <span>${dividendPoolShare}</span>
            </div>
            <span className="stat-sub font-mono">Q3 Patronage Share</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">COMPLETED DISPATCHES</span>
            <div className="stat-value">
              <Briefcase size={20} className="stat-icon" />
              <span>{142 + myCompletedGigs.length}</span>
            </div>
            <span className="stat-sub font-mono">100% 5-Star Rating</span>
          </div>
        </div>
      </section>

      {/* Dispatch Board Control Bar */}
      <section className="dispatch-control-bar">
        <div className="tab-buttons">
          <button
            type="button"
            className={`tab-btn ${filterTab === 'all' ? 'active-tab' : ''}`}
            onClick={() => setFilterTab('all')}
          >
            ALL DISPATCHES ({gigs.length})
          </button>
          <button
            type="button"
            className={`tab-btn ${filterTab === 'available' ? 'active-tab' : ''}`}
            onClick={() => setFilterTab('available')}
          >
            AVAILABLE ({gigs.filter((g) => g.status === 'available').length})
          </button>
          <button
            type="button"
            className={`tab-btn ${filterTab === 'my_gigs' ? 'active-tab' : ''}`}
            onClick={() => setFilterTab('my_gigs')}
          >
            MY ACTIVE GIGS ({gigs.filter((g) => g.status === 'in_progress').length})
          </button>
          <button
            type="button"
            className={`tab-btn ${filterTab === 'completed' ? 'active-tab' : ''}`}
            onClick={() => setFilterTab('completed')}
          >
            COMPLETED ({gigs.filter((g) => g.status === 'completed').length})
          </button>
        </div>
      </section>

      {/* Dispatches List */}
      <section className="dispatch-list-grid">
        {filteredGigs.map((gig) => (
          <div key={gig.id} className={`dispatch-card ${gig.status}`} onClick={() => setSelectedGig(gig)}>
            <div className="dispatch-card-header">
              <span className="category-tag">{gig.category}</span>
              <span className={`status-pill status-${gig.status}`}>
                {gig.status === 'available' && '● OPEN DISPATCH'}
                {gig.status === 'in_progress' && '⚡ IN PROGRESS'}
                {gig.status === 'completed' && '✓ COMPLETED'}
              </span>
            </div>

            <h3 className="dispatch-title">{gig.title}</h3>
            <p className="dispatch-desc">{gig.description}</p>

            <div className="dispatch-meta-row">
              <div className="meta-item"><Clock size={14} /> {gig.estimatedHours} hrs est.</div>
              <div className="meta-item"><MapPin size={14} /> {gig.location}</div>
              <div className="meta-item"><Shield size={14} /> Customer: {gig.customerName}</div>
            </div>

            <div className="dispatch-card-footer">
              <div className="payout-box">
                <span className="payout-label">YOUR PAYOUT (85%):</span>
                <strong className="payout-amount">${gig.coopFeeSplit.workerPayout.toFixed(2)}</strong>
              </div>

              <div className="card-actions" onClick={(e) => e.stopPropagation()}>
                {gig.status === 'available' && (
                  <button
                    type="button"
                    className="action-btn accept-btn"
                    onClick={() => handleAcceptGig(gig.id)}
                  >
                    ACCEPT GIG →
                  </button>
                )}
                {gig.status === 'in_progress' && (
                  <button
                    type="button"
                    className="action-btn complete-btn"
                    onClick={() => handleCompleteGig(gig.id)}
                  >
                    MARK COMPLETE ✓
                  </button>
                )}
                {gig.status === 'completed' && (
                  <span className="payout-done-badge">PAID OUT</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Selected Job Modal */}
      {selectedGig && (
        <div className="modal-backdrop" onClick={() => setSelectedGig(null)}>
          <div className="modal-card-container" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close-btn" onClick={() => setSelectedGig(null)}>
              <X size={20} />
            </button>

            <div className="modal-content">
              <div className="modal-header">
                <span className="eyebrow">// GIG DISPATCH SPECIFICATION</span>
                <h2>{selectedGig.title}</h2>
                <div className="modal-badge-row">
                  <span className="category-pill">{selectedGig.category}</span>
                  <span className="location-pill"><MapPin size={12} /> {selectedGig.location}</span>
                </div>
              </div>

              <div className="modal-grid-body">
                <div className="modal-left-details">
                  <div className="detail-section">
                    <h3>SCOPE OF WORK</h3>
                    <p>{selectedGig.description}</p>
                  </div>

                  <div className="detail-section">
                    <h3>CUSTOMER INFORMATION</h3>
                    <p>
                      <strong>Customer:</strong> {selectedGig.customerName}<br />
                      <strong>Site Address:</strong> {selectedGig.location}<br />
                      <strong>Required Skill:</strong> {selectedGig.requiredSkill}
                    </p>
                  </div>
                </div>

                <div className="modal-right-payout">
                  <div className="fee-split-table">
                    <h3>PAYOUT STRUCTURE ($)</h3>
                    <div className="fee-row highlight-worker">
                      <span>Your Direct Payout (85%)</span>
                      <strong>${selectedGig.coopFeeSplit.workerPayout.toFixed(2)}</strong>
                    </div>
                    <div className="fee-row">
                      <span>Co-op Reserve Fund (12%)</span>
                      <span>${selectedGig.coopFeeSplit.coopReserveFund.toFixed(2)}</span>
                    </div>
                    <div className="fee-row">
                      <span>Platform Ops (3%)</span>
                      <span>${selectedGig.coopFeeSplit.platformOps.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="modal-action-box">
                    {selectedGig.status === 'available' && (
                      <button
                        type="button"
                        className="confirm-booking-btn worker-action"
                        onClick={() => handleAcceptGig(selectedGig.id)}
                      >
                        ACCEPT THIS DISPATCH GIG →
                      </button>
                    )}
                    {selectedGig.status === 'in_progress' && (
                      <button
                        type="button"
                        className="confirm-booking-btn complete-action"
                        onClick={() => handleCompleteGig(selectedGig.id)}
                      >
                        MARK GIG AS COMPLETED ✓
                      </button>
                    )}
                    {selectedGig.status === 'completed' && (
                      <div className="completed-notice">
                        <CheckCircle size={24} />
                        <span>Job Completed & Payout Transfer Initiated!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

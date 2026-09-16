import { useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import gigsData from '../../../data/gigsData.json';
import { Search, ShieldCheck, Clock, MapPin, CheckCircle, X, ArrowRight } from 'lucide-react';

export interface GigItem {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  description: string;
  price: number;
  estimatedHours: number;
  urgency: string;
  location: string;
  status: string;
  customerName: string;
  requiredSkill: string;
  coopFeeSplit: {
    workerPayout: number;
    coopReserveFund: number;
    platformOps: number;
  };
  worker: {
    name: string;
    coopId: string;
    rating: number;
    completedGigs: number;
  };
}

export function BookingCreatePage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeGig, setActiveGig] = useState<GigItem | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingNotes, setBookingNotes] = useState('');
  const [scheduledDate, setScheduledDate] = useState('2026-09-18T10:00');

  const filteredGigs = gigsData.gigs.filter((gig) => {
    const matchesSearch =
      gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || gig.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenDetails = (gig: GigItem) => {
    setActiveGig(gig);
    setIsBooked(false);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <main className="page booking-hub-container">
      {/* Header Banner */}
      <section className="booking-hero-header">
        <div className="hero-text-group">
          <span className="eyebrow">// SERVICE SEEKER PORTAL</span>
          <h1>COOPERATIVE GIG BOOKING</h1>
          <p>
            Welcome back, <strong>{user?.name || 'Valued Customer'}</strong>. Browse verified worker-owner services
            with 100% price transparency and zero corporate markup extraction.
          </p>
        </div>

        <div className="transparency-pill-box">
          <div className="pill-item">
            <ShieldCheck size={18} className="pill-icon" />
            <span>85% Direct Worker Payout</span>
          </div>
          <div className="pill-item">
            <span className="pill-icon">🏛️</span>
            <span>12% Co-op Reserve Dividend</span>
          </div>
          <div className="pill-item">
            <span className="pill-icon">⚡</span>
            <span>3% Platform Infrastructure</span>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="booking-filter-bar">
        <div className="search-box-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search electrical, plumbing, solar, or climate services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filter-scroll">
          <button
            type="button"
            className={`filter-chip ${selectedCategory === 'all' ? 'active-chip' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            ALL SERVICES ({gigsData.gigs.length})
          </button>
          {gigsData.categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`filter-chip ${selectedCategory === cat.id ? 'active-chip' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.icon}</span> {cat.name.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="booking-gigs-grid">
        {filteredGigs.map((gig) => (
          <div key={gig.id} className="gig-card" onClick={() => handleOpenDetails(gig)}>
            <div className="gig-card-header">
              <span className="gig-category-tag">{gig.category}</span>
              <span className={`urgency-badge urgency-${gig.urgency.toLowerCase()}`}>{gig.urgency}</span>
            </div>

            <h3 className="gig-card-title">{gig.title}</h3>
            <p className="gig-card-desc">{gig.description.slice(0, 110)}...</p>

            <div className="gig-card-meta">
              <div className="meta-item">
                <Clock size={14} />
                <span>{gig.estimatedHours} hrs est.</span>
              </div>
              <div className="meta-item">
                <MapPin size={14} />
                <span>{gig.location}</span>
              </div>
            </div>

            <div className="gig-card-footer">
              <div className="price-tag">
                <span className="currency">$</span>
                <span className="amount">{gig.price}</span>
                <span className="price-label">FIXED ESTIMATE</span>
              </div>
              <button type="button" className="view-details-btn">
                VIEW DETAILS <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Detailed Modal / Drawer View */}
      {activeGig && (
        <div className="modal-backdrop" onClick={() => setActiveGig(null)}>
          <div className="modal-card-container" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close-btn" onClick={() => setActiveGig(null)}>
              <X size={20} />
            </button>

            {!isBooked ? (
              <div className="modal-content">
                <div className="modal-header">
                  <span className="eyebrow">// GIG DETAILS & TRANSPARENT COST BREAKDOWN</span>
                  <h2>{activeGig.title}</h2>
                  <div className="modal-badge-row">
                    <span className="category-pill">{activeGig.category}</span>
                    <span className="location-pill"><MapPin size={12} /> {activeGig.location}</span>
                  </div>
                </div>

                <div className="modal-grid-body">
                  <div className="modal-left-details">
                    <div className="detail-section">
                      <h3>SERVICE DESCRIPTION</h3>
                      <p>{activeGig.description}</p>
                    </div>

                    <div className="detail-section">
                      <h3>ASSIGNED CO-OP WORKER OWNER</h3>
                      <div className="worker-preview-box">
                        <div className="worker-avatar-placeholder">
                          {activeGig.worker.name.charAt(0)}
                        </div>
                        <div>
                          <strong>{activeGig.worker.name}</strong>
                          <span className="worker-meta">
                            {activeGig.worker.coopId} • ★ {activeGig.worker.rating} ({activeGig.worker.completedGigs} completed jobs)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="detail-section">
                      <h3>TRANSPARENT FEE BREAKDOWN ($)</h3>
                      <div className="fee-split-table">
                        <div className="fee-row highlight-worker">
                          <span>Worker Payout (85%)</span>
                          <strong>${activeGig.coopFeeSplit.workerPayout.toFixed(2)}</strong>
                        </div>
                        <div className="fee-row">
                          <span>Co-op Member Reserve Fund (12%)</span>
                          <span>${activeGig.coopFeeSplit.coopReserveFund.toFixed(2)}</span>
                        </div>
                        <div className="fee-row">
                          <span>Platform Ops & Hosting (3%)</span>
                          <span>${activeGig.coopFeeSplit.platformOps.toFixed(2)}</span>
                        </div>
                        <div className="fee-row total-row">
                          <span>TOTAL TRANSPARENT COST</span>
                          <strong>${activeGig.price.toFixed(2)}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleConfirmBooking} className="modal-booking-form">
                    <span className="mono-label">// CONFIRM BOOKING REQUEST</span>
                    
                    <div className="form-group">
                      <label className="mono-label">PREFERRED DATE & TIME</label>
                      <input
                        type="datetime-local"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="tech-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="mono-label">SERVICE ADDRESS NOTES</label>
                      <textarea
                        value={bookingNotes}
                        onChange={(e) => setBookingNotes(e.target.value)}
                        placeholder="Provide gate codes, parking instructions, or specific job details..."
                        className="tech-input tech-textarea"
                        rows={4}
                      />
                    </div>

                    <button type="submit" className="confirm-booking-btn">
                      CONFIRM GIG BOOKING (${activeGig.price}) →
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="booking-success-box">
                <CheckCircle size={56} className="success-icon" />
                <h2>GIG DISPATCHED SUCCESSFULLY!</h2>
                <p>
                  Your service request for <strong>{activeGig.title}</strong> has been dispatched to{' '}
                  <strong>{activeGig.worker.name}</strong> ({activeGig.worker.coopId}).
                </p>

                <div className="booking-summary-receipt">
                  <div className="receipt-row">
                    <span>DISPATCH ID:</span>
                    <strong>#DSP-{Math.floor(100000 + Math.random() * 900000)}</strong>
                  </div>
                  <div className="receipt-row">
                    <span>ESTIMATED DURATION:</span>
                    <span>{activeGig.estimatedHours} hours</span>
                  </div>
                  <div className="receipt-row">
                    <span>TOTAL LOCKED RATE:</span>
                    <strong>${activeGig.price}</strong>
                  </div>
                </div>

                <button type="button" className="close-modal-btn" onClick={() => setActiveGig(null)}>
                  RETURN TO SERVICES LIST
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

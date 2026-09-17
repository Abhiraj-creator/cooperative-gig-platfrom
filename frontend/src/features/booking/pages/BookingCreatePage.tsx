import { useState} from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import gigsData from '../../../data/gigsData.json';
import { Search, ShieldCheck, Clock, MapPin, CheckCircle, X, ArrowRight, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import { getDisplayName } from '../../../shared/utils/displayName';

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
    verified: boolean;
    dp: string;
  };
}

export function BookingCreatePage() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'services';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeGig, setActiveGig] = useState<GigItem | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingNotes, setBookingNotes] = useState('');
  const [scheduledDate, setScheduledDate] = useState('2026-09-18T10:00');

  // Custom Request State
  const [isCustomRequestModalOpen, setIsCustomRequestModalOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [customCategory, setCustomCategory] = useState(gigsData.categories[0].id);
  const [customUrgency, setCustomUrgency] = useState('Normal');
  const [customHours, setCustomHours] = useState(1);
  const [customLocation, setCustomLocation] = useState('Sector 62, Noida');

  // Pricing Logic
  const baseRate = 500;
  const urgencyMultiplier = customUrgency === 'Emergency' ? 2 : customUrgency === 'High' ? 1.5 : 1;
  const calculatedPrice = customHours * baseRate * urgencyMultiplier;
  const customFeeSplit = {
    workerPayout: calculatedPrice * 0.85,
    coopReserveFund: calculatedPrice * 0.12,
    platformOps: calculatedPrice * 0.03,
  };

  const displayName = getDisplayName(user, 'Valued Customer');

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

  const handleCustomRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGig: GigItem = {
      id: `gig-custom-${Date.now()}`,
      title: customTitle || 'Custom Service Request',
      description: customDescription || 'No details provided.',
      category: gigsData.categories.find(c => c.id === customCategory)?.name || 'Custom',
      categoryId: customCategory,
      price: calculatedPrice,
      estimatedHours: customHours,
      urgency: customUrgency,
      location: customLocation,
      status: 'available',
      customerName: displayName,
      requiredSkill: 'Verified Professional',
      coopFeeSplit: customFeeSplit,
      worker: {
        name: 'Rajesh Kumar',
        coopId: 'COOP-8842-IN',
        rating: 4.98,
        completedGigs: 142,
        verified: true,
        dp: '/images/photos/image1.jpg'
      }
    };
    setActiveGig(newGig);
    setIsCustomRequestModalOpen(false);
    setIsBooked(true); // Jump straight to confirmed screen for demo
  };

  return (
    <main className="page booking-hub-container">
      {/* Header Banner */}
      <section className="booking-hero-header">
        <div className="hero-text-group">
          <span className="eyebrow">// SERVICE BOOKING PORTAL</span>
          <h1>
            {activeTab === 'mybookings' && 'My Service Bookings'}
            {activeTab === 'track' && 'Live Dispatch Tracking'}
            {(activeTab === 'services' || !activeTab) && 'Find a Skilled Worker'}
          </h1>
          <p>
            Welcome back, <strong>{displayName}</strong>! Book verified co-op services
            with full price transparency — no hidden fees.
          </p>
        </div>

        <div className="transparency-pill-box">
          <div className="pill-item">
            <ShieldCheck size={18} className="pill-icon" />
            <span>85% Direct Worker Payout</span>
          </div>
          <div className="pill-item">
            <span className="pill-icon">🏛️</span>
            <span>12% Co-op Reserve</span>
          </div>
          <div className="pill-item">
            <span className="pill-icon">⚡</span>
            <span>3% Platform Ops</span>
          </div>
        </div>
      </section>

      {/* ── TAB 1: MY BOOKINGS ────────────────────────────────────────────── */}
      {activeTab === 'mybookings' && (
        <section className="my-bookings-section">
          <div className="section-title-bar">
            <h2>Your Active & Recent Service Bookings</h2>
            <Link to="/booking" className="secondary-action">
              + Book New Service
            </Link>
          </div>

          <div className="booking-cards-list">
            <div className="booking-status-card">
              <div className="booking-card-top">
                <span className="category-pill">Electrical & Smart Home</span>
                <span className="status-pill status-in_progress">⚡ IN PROGRESS</span>
              </div>
              <h3>Smart Home Hub & Whole-House Sensor Installation</h3>
              <p>Assigned Worker: <strong>Ramesh Kumar</strong> (COOP-8842-IN)</p>

              <div className="booking-card-details">
                <div><Clock size={14} /> Scheduled: Today, 2:30 PM</div>
                <div><MapPin size={14} /> Sector 62, Noida</div>
                <div><strong>Amount: ₹2,400</strong> (Paid)</div>
              </div>

              <div className="booking-card-actions">
                <Link to="/booking?tab=track" className="book-now-btn">
                  Track Live Status →
                </Link>
              </div>
            </div>

            <div className="booking-status-card">
              <div className="booking-card-top">
                <span className="category-pill">Plumbing & Hydraulics</span>
                <span className="status-pill status-completed">✓ COMPLETED</span>
              </div>
              <h3>Emergency Main Line Leak Repair & Pressure Valve Swap</h3>
              <p>Worker: <strong>Marcus Vance</strong> (COOP-8842-IN)</p>

              <div className="booking-card-details">
                <div><Clock size={14} /> Completed: Yesterday, 4:15 PM</div>
                <div><MapPin size={14} /> Bandra West, Mumbai</div>
                <div><strong>Amount: ₹1,800</strong> (Receipt #BKG-883920)</div>
              </div>

              <div className="booking-card-actions">
                <span className="payout-done-badge">★ Rating Submitted (5/5)</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB 2: LIVE TRACKING ─────────────────────────────────────────── */}
      {activeTab === 'track' && (
        <section className="live-track-section">
          <div className="track-hero-card">
            <div className="track-header font-mono">
              <span className="eyebrow">// REAL-TIME DISPATCH TRACKING</span>
              <h2>Booking #BKG-994182</h2>
              <span className="status-pill status-in_progress">⚡ WORKER EN ROUTE</span>
            </div>

            {/* Timeline */}
            <div className="tracking-timeline">
              <div className="timeline-step completed">
                <div className="step-circle"><CheckCircle2 size={16} /></div>
                <span>Requested</span>
              </div>
              <div className="timeline-step completed">
                <div className="step-circle"><CheckCircle2 size={16} /></div>
                <span>Matched</span>
              </div>
              <div className="timeline-step active">
                <div className="step-circle">●</div>
                <span>Worker En Route</span>
              </div>
              <div className="timeline-step">
                <div className="step-circle">○</div>
                <span>In Progress</span>
              </div>
              <div className="timeline-step">
                <div className="step-circle">○</div>
                <span>Completed</span>
              </div>
            </div>

            {/* Worker Details Box */}
            <div className="track-worker-box" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img 
                src="/images/photos/image1.jpg" 
                alt="Ramesh Kumar" 
                style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div className="worker-info" style={{ flex: 1 }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Ramesh Kumar
                  <CheckCircle size={16} style={{ color: '#10b981' }} />
                </h3>
                <p>Master Electrician • Co-op Member ID: COOP-8842-IN</p>
                <div className="rating-badge">★ 4.98 (142 completed jobs)</div>
              </div>

              <div className="eta-badge">
                <span className="eta-label">ESTIMATED ARRIVAL</span>
                <strong className="eta-time">14 mins</strong>
              </div>

              <div className="worker-contact-btns">
                <button type="button" className="action-btn accept-btn" onClick={() => alert('Calling worker at +91 98765 43210...')}>
                  <Phone size={14} /> Call Worker
                </button>
                <button type="button" className="action-btn" onClick={() => alert('Opening live message chat...')}>
                  <MessageSquare size={14} /> Send Message
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB 3: SERVICES SEARCH & LISTING (DEFAULT) ───────────────────── */}
      {(activeTab === 'services' || (activeTab !== 'mybookings' && activeTab !== 'track')) && (
        <>
          {/* Filter & Search Bar */}
          <section className="booking-filter-bar">
            <div className="search-box-wrapper" style={{ display: 'flex', gap: '16px', width: '100%' }}>
              <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
                <Search size={18} className="search-icon" style={{ position: 'absolute', left: '16px' }} />
                <input
                  type="text"
                  placeholder="Search — electrical, plumbing, solar, carpentry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  style={{ width: '100%', paddingLeft: '44px' }}
                />
              </div>
              <button
                type="button"
                className="book-now-btn"
                style={{ padding: '0 24px', flexShrink: 0 }}
                onClick={() => setIsCustomRequestModalOpen(true)}
              >
                + Request Custom Service
              </button>
            </div>

            <div className="category-filter-scroll">
              <button
                type="button"
                className={`filter-chip ${selectedCategory === 'all' ? 'active-chip' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All ({gigsData.gigs.length})
              </button>
              {gigsData.categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`filter-chip ${selectedCategory === cat.id ? 'active-chip' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span>{cat.icon}</span> {cat.name}
                </button>
              ))}
            </div>
          </section>

          {/* Results Count */}
          {searchQuery && (
            <div className="booking-results-count">
              <span>
                {filteredGigs.length} service{filteredGigs.length !== 1 ? 's' : ''} found for &ldquo;{searchQuery}&rdquo;
              </span>
            </div>
          )}

          {/* Services Grid — Simplified Cards */}
          <section className="booking-gigs-grid">
            {filteredGigs.length === 0 ? (
              <div className="booking-empty-state">
                <Search size={40} />
                <h3>No services found</h3>
                <p>Try a different search term or category.</p>
              </div>
            ) : (
              filteredGigs.map((gig) => (
                <div key={gig.id} className="gig-card" onClick={() => handleOpenDetails(gig)}>
                  {/* Top: Category + Urgency */}
                  <div className="gig-card-header">
                    <span className="gig-category-tag">{gig.category}</span>
                    <span className={`urgency-badge urgency-${gig.urgency.toLowerCase()}`}>
                      {gig.urgency === 'Emergency' ? '🚨' : gig.urgency === 'High' ? '⚡' : '🕐'} {gig.urgency}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="gig-card-title">{gig.title}</h3>

                  {/* Short description */}
                  <p className="gig-card-desc">{gig.description.slice(0, 85)}…</p>

                  {/* Meta Pills */}
                  <div className="gig-card-meta">
                    <div className="meta-pill">
                      <Clock size={13} />
                      <span>{gig.estimatedHours} hrs</span>
                    </div>
                    <div className="meta-pill">
                      <MapPin size={13} />
                      <span>{gig.location.split(',')[0]}</span>
                    </div>
                  </div>

                  {/* Footer: Big Bold Price + Solid Orange Book Now Button */}
                  <div className="gig-card-footer">
                    <div className="price-tag">
                      <span className="price-amount">₹{gig.price.toLocaleString('en-IN')}</span>
                      <span className="price-label">Fixed</span>
                    </div>
                    <button
                      type="button"
                      className="book-now-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetails(gig);
                      }}
                    >
                      Book Now <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>
        </>
      )}

      {/* Detailed Modal View */}
      {activeGig && (
        <div className="modal-backdrop" onClick={() => setActiveGig(null)}>
          <div className="modal-card-container" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close-btn" onClick={() => setActiveGig(null)}>
              <X size={20} />
            </button>

            {!isBooked ? (
              <div className="modal-content">
                <div className="modal-header">
                  <span className="eyebrow">// SERVICE DETAILS & COST BREAKDOWN</span>
                  <h2>{activeGig.title}</h2>
                  <div className="modal-badge-row">
                    <span className="category-pill">{activeGig.category}</span>
                    <span className="location-pill"><MapPin size={12} /> {activeGig.location}</span>
                  </div>
                </div>

                <div className="modal-grid-body">
                  <div className="modal-left-details">
                    <div className="detail-section">
                      <h3>WHAT'S INCLUDED</h3>
                      <p>{activeGig.description}</p>
                    </div>

                    <div className="detail-section">
                      <h3>YOUR ASSIGNED WORKER</h3>
                      <div className="worker-preview-box" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img 
                          src={activeGig.worker.dp} 
                          alt={activeGig.worker.name}
                          style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <strong style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {activeGig.worker.name}
                            {activeGig.worker.verified && <CheckCircle size={14} style={{ color: '#10b981' }} />}
                          </strong>
                          <span className="worker-meta">
                            {activeGig.worker.coopId} • ★ {activeGig.worker.rating} ({activeGig.worker.completedGigs} jobs done)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="detail-section">
                      <h3>TRANSPARENT COST BREAKDOWN</h3>
                      <div className="fee-split-table">
                        <div className="fee-row highlight-worker">
                          <span>Worker Payout (85%)</span>
                          <strong>₹{activeGig.coopFeeSplit.workerPayout.toFixed(2)}</strong>
                        </div>
                        <div className="fee-row">
                          <span>Co-op Reserve Fund (12%)</span>
                          <span>₹{activeGig.coopFeeSplit.coopReserveFund.toFixed(2)}</span>
                        </div>
                        <div className="fee-row">
                          <span>Platform Ops (3%)</span>
                          <span>₹{activeGig.coopFeeSplit.platformOps.toFixed(2)}</span>
                        </div>
                        <div className="fee-row total-row">
                          <span>TOTAL</span>
                          <strong>₹{activeGig.price.toFixed(2)}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleConfirmBooking} className="modal-booking-form">
                    <span className="mono-label">// CONFIRM YOUR BOOKING</span>

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
                      <label className="mono-label">ADDRESS / ACCESS NOTES</label>
                      <textarea
                        value={bookingNotes}
                        onChange={(e) => setBookingNotes(e.target.value)}
                        placeholder="Gate code, parking instructions, or specific job notes..."
                        className="tech-input tech-textarea"
                        rows={4}
                      />
                    </div>

                    <button type="submit" className="confirm-booking-btn">
                      Confirm Booking — ₹{activeGig.price.toLocaleString('en-IN')} →
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="booking-success-box">
                <CheckCircle size={56} className="success-icon" />
                <h2>BOOKING CONFIRMED!</h2>
                <p>
                  Your request for <strong>{activeGig.title}</strong> has been dispatched to{' '}
                  <strong>{activeGig.worker.name}</strong>.
                </p>

                <div className="booking-summary-receipt">
                  <div className="receipt-row">
                    <span>BOOKING ID:</span>
                    <strong>#BKG-{Math.floor(100000 + Math.random() * 900000)}</strong>
                  </div>
                  <div className="receipt-row">
                    <span>DURATION:</span>
                    <span>{activeGig.estimatedHours} hours</span>
                  </div>
                  <div className="receipt-row">
                    <span>TOTAL AMOUNT:</span>
                    <strong>₹{activeGig.price.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="receipt-row">
                    <span>WORKER:</span>
                    <span>{activeGig.worker.name}</span>
                  </div>
                </div>

                <button type="button" className="close-modal-btn" onClick={() => setActiveGig(null)}>
                  BACK TO SERVICES
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Custom Request Modal */}
      {isCustomRequestModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsCustomRequestModalOpen(false)}>
          <div className="modal-card-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px' }}>
            <button type="button" className="modal-close-btn" onClick={() => setIsCustomRequestModalOpen(false)}>
              <X size={20} />
            </button>

            <div className="modal-content">
              <div className="modal-header">
                <span className="eyebrow">// POST A NEW GIG</span>
                <h2>Request Custom Service</h2>
                <p style={{ marginTop: '8px', color: 'var(--text-muted)' }}>Describe your needs, set the urgency, and let our verified worker-owners handle the rest.</p>
              </div>

              <form onSubmit={handleCustomRequestSubmit} className="modal-grid-body" style={{ gap: '32px' }}>
                <div className="modal-left-details" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="form-group">
                    <label className="mono-label">SERVICE TITLE</label>
                    <input
                      type="text"
                      className="tech-input"
                      placeholder="e.g. Install new ceiling fan"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="mono-label">CATEGORY</label>
                    <select
                      className="tech-input"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                    >
                      {gigsData.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="mono-label">DETAILED DESCRIPTION</label>
                    <textarea
                      className="tech-input tech-textarea"
                      rows={4}
                      placeholder="Describe exactly what needs to be done..."
                      value={customDescription}
                      onChange={(e) => setCustomDescription(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="mono-label">SERVICE LOCATION ADDRESS</label>
                    <input
                      type="text"
                      className="tech-input"
                      value={customLocation}
                      onChange={(e) => setCustomLocation(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="modal-right-payout" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="form-group">
                    <label className="mono-label">URGENCY LEVEL</label>
                    <select
                      className="tech-input"
                      value={customUrgency}
                      onChange={(e) => setCustomUrgency(e.target.value)}
                    >
                      <option value="Normal">Normal (Standard Rate)</option>
                      <option value="High">High (1.5x Rate)</option>
                      <option value="Emergency">Emergency (2x Rate)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="mono-label">ESTIMATED HOURS</label>
                    <input
                      type="number"
                      className="tech-input"
                      min="0.5"
                      step="0.5"
                      value={customHours}
                      onChange={(e) => setCustomHours(Number(e.target.value))}
                      required
                    />
                  </div>

                  <div className="fee-split-table" style={{ marginTop: 'auto' }}>
                    <h3>LIVE PRICE ESTIMATE (₹)</h3>
                    <div className="fee-row highlight-worker">
                      <span>Worker Payout (85%)</span>
                      <strong>₹{customFeeSplit.workerPayout.toFixed(2)}</strong>
                    </div>
                    <div className="fee-row">
                      <span>Co-op Reserve (12%)</span>
                      <span>₹{customFeeSplit.coopReserveFund.toFixed(2)}</span>
                    </div>
                    <div className="fee-row">
                      <span>Platform Ops (3%)</span>
                      <span>₹{customFeeSplit.platformOps.toFixed(2)}</span>
                    </div>
                    <div className="fee-row total-row">
                      <span>TOTAL ESTIMATE</span>
                      <strong>₹{calculatedPrice.toFixed(2)}</strong>
                    </div>
                  </div>

                  <button type="submit" className="confirm-booking-btn" style={{ width: '100%', marginTop: '16px' }}>
                    Post Gig & Book Worker →
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

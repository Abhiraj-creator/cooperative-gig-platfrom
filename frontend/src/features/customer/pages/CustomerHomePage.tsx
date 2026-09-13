import type { CSSProperties } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock3,
  HandCoins,
  Home,
  Languages,
  LocateFixed,
  MapPinned,
  MessageSquareText,
  Route,
  Search,
  ShieldCheck,
  UserRoundCheck,
} from 'lucide-react';
import { ServiceCategoryList } from '../components/ServiceCategoryList';
import { useCustomerServices } from '../hooks/useCustomerServices';

const tickerItems = [
  'Verified workers',
  'Fair allocation',
  'Smart matching',
  'Local services',
  'Secure payments',
  'Real-time status',
  'Cooperative ownership',
  'Multilingual access',
];

const problems = [
  ['01', 'Disconnected', 'Customers struggle to find trustworthy local workers.'],
  ['02', 'Underused', 'Skilled cooperative workers remain invisible to nearby demand.'],
  ['03', 'Uneven', 'Manual allocation can send too much work to the same people.'],
  ['04', 'Blind', 'Admins lack live visibility into requests, zones and service quality.'],
];

const journey = ['Request', 'Match', 'Compare', 'Book', 'Track', 'Pay', 'Review'];

const useCases = {
  Households: ['Everyday repairs', 'Cleaning', 'Care support'],
  Communities: ['Shared maintenance', 'Local service zones', 'Emergency response'],
  Institutions: ['Verified workforce', 'Scheduled visits', 'Payment records'],
  Cooperatives: ['Worker verification', 'Demand monitoring', 'Fair allocation'],
};

export function CustomerHomePage() {
  const { serviceCategories } = useCustomerServices();
  const [activeUseCase, setActiveUseCase] = useState<keyof typeof useCases>('Households');

  return (
    <main className="landing-page">
      <section className="hero-section blueprint-grid">
        <div className="hero-copy">
          <p className="eyebrow">Cooperative service network / 01</p>
          <h1>SAHAAY</h1>
          <p className="hero-tagline">Skilled hands. Fair opportunities. One cooperative network.</p>
          <p className="hero-text">
            A cooperative-owned digital marketplace connecting households, communities and
            institutions with verified skilled workers matched by service, location,
            availability and workload.
          </p>
          <div className="hero-actions">
            <Link className="primary-action" to="/booking">
              Request a service <ArrowRight size={18} />
            </Link>
            <Link className="secondary-action" to="/worker">
              Join as a worker <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="network-board" aria-label="Live cooperative service map">
          <div className="coordinate-label">X: 1131 / Y: 482</div>
          <div className="map-road road-one" />
          <div className="map-road road-two" />
          <span className="map-node customer-node">
            <Home size={20} />
            <small>Customer</small>
          </span>
          <span className="map-node worker-node">
            <UserRoundCheck size={20} />
            <small>Worker</small>
          </span>
          <span className="map-node hub-node">
            <Building2 size={20} />
            <small>Hub</small>
          </span>
          <div className="match-card">
            <p>Match found</p>
            <strong>ETA 14 min</strong>
            <span>Verified electrician</span>
          </div>
        </div>
      </section>

      <div className="ticker" aria-label="Platform capabilities">
        <div>
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <section className="split-section" id="network">
        <div>
          <p className="eyebrow">The problem / 02</p>
          <h2>Local skill is everywhere. Access is not.</h2>
        </div>
        <p>
          Skilled workers already exist across communities, but cooperative networks need one
          reliable digital channel for demand, verification, booking, payment and visibility.
        </p>
      </section>

      <section className="problem-grid">
        {problems.map(([number, title, copy]) => (
          <article className="problem-panel" key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="service-section" id="services">
        <div className="section-heading">
          <p className="eyebrow">Service index / 03</p>
          <h2>Tell us what needs to be done.</h2>
        </div>
        <form className="service-search" aria-label="Service discovery">
          <label>
            <Search size={18} />
            <input type="search" placeholder="What do you need help with?" />
          </label>
          <label>
            <MapPinned size={18} />
            <input type="text" placeholder="Your location" />
          </label>
          <button type="button">
            <LocateFixed size={18} /> Use current location
          </button>
        </form>
        <ServiceCategoryList services={serviceCategories} />
      </section>

      <section className="matching-section">
        <div className="section-heading">
          <p className="eyebrow">Matching engine / 04</p>
          <h2>The right worker. Not just the nearest one.</h2>
        </div>
        <div className="matching-grid">
          <article className="request-panel">
            <p className="mono-label">Customer request</p>
            <h3>Electrical repair</h3>
            <dl>
              <div><dt>Location</dt><dd>Sector 12</dd></div>
              <div><dt>Priority</dt><dd>Normal</dd></div>
              <div><dt>Time</dt><dd>Today / 4:00 PM</dd></div>
            </dl>
          </article>
          <article className="engine-panel">
            {['Eligibility', 'Distance', 'Availability', 'Workload', 'Reliability'].map((step, index) => (
              <div key={step}>
                <span>Step {String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </article>
          <article className="match-result">
            <p className="mono-label">AI-assisted match</p>
            <h3>Ramesh Kumar</h3>
            <span>Electrician / Verified / 2.4 km</span>
            <strong>ETA 14 min</strong>
            <Link to="/booking">View profile <ArrowRight size={16} /></Link>
          </article>
        </div>
      </section>

      <section className="fair-section">
        <div>
          <p className="eyebrow">Fair allocation / 05</p>
          <h2>More jobs should not always mean more jobs for the same person.</h2>
        </div>
        <div className="allocation-board" aria-label="Fair workload allocation">
          {[10, 6, 2, 8, 3].map((before, index) => (
            <div className="worker-bar" key={`worker-${index}`}>
              <span>Worker {String(index + 1).padStart(2, '0')}</span>
              <i style={{ '--before': before, '--after': [7, 6, 6, 7, 6][index] } as CSSProperties} />
            </div>
          ))}
        </div>
      </section>

      <section className="journey-section">
        <p className="eyebrow">Customer journey / 06</p>
        <div className="journey-grid">
          {journey.map((item, index) => (
            <article key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
              <CheckCircle2 size={20} />
            </article>
          ))}
        </div>
      </section>

      <section className="product-preview">
        <div className="phone-preview">
          <p className="mono-label">Booking status</p>
          <h3>Plumbing repair</h3>
          <strong>Worker on the way</strong>
          <div className="timeline">
            {['Requested', 'Matched', 'Accepted', 'On the way', 'Arrived'].map((item, index) => (
              <span className={index < 4 ? 'active' : ''} key={item}>{item}</span>
            ))}
          </div>
          <div className="preview-actions">
            <button type="button"><MessageSquareText size={16} /> Chat</button>
            <button type="button"><Clock3 size={16} /> Track</button>
          </div>
        </div>
        <div>
          <p className="eyebrow">Product preview / 07</p>
          <h2>Booking, tracking and cooperative oversight in one flow.</h2>
          <p>
            The public site leads naturally into request creation, worker registration and
            admin visibility without making AI feel like a gimmick.
          </p>
        </div>
      </section>

      <section className="trust-section">
        {[
          [ShieldCheck, 'Verified workers'],
          [HandCoins, 'Secure payments'],
          [Route, 'Audit trails'],
          [BadgeCheck, 'Dispute support'],
          [BarChart3, 'Demand visibility'],
          [Languages, 'Multilingual access'],
        ].map(([Icon, label]) => (
          <article key={label as string}>
            <Icon size={24} strokeWidth={1.5} />
            <strong>{label as string}</strong>
          </article>
        ))}
      </section>

      <section className="use-case-section">
        <div className="section-heading">
          <p className="eyebrow">Use cases / 08</p>
          <h2>Built for every node in the cooperative network.</h2>
        </div>
        <div className="tabs" role="tablist" aria-label="Use cases">
          {Object.keys(useCases).map((key) => (
            <button
              aria-selected={activeUseCase === key}
              key={key}
              onClick={() => setActiveUseCase(key as keyof typeof useCases)}
              role="tab"
              type="button"
            >
              {key}
            </button>
          ))}
        </div>
        <div className="use-case-panel">
          <h3>{activeUseCase}</h3>
          <ul>
            {useCases[activeUseCase].map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="final-cta">
        <Link to="/booking">
          <span>Customer</span>
          <strong>Need a skilled hand?</strong>
          Request a service <ArrowRight size={18} />
        </Link>
        <Link to="/worker">
          <span>Worker</span>
          <strong>Are you skilled?</strong>
          Join the cooperative <ArrowRight size={18} />
        </Link>
      </section>

      <footer className="site-footer">
        <div className="footer-grid">
          {['Platform', 'For workers', 'For customers', 'Cooperative', 'Legal'].map((title) => (
            <div key={title}>
              <h3>{title}</h3>
              <a href="/customer#services">Services</a>
              <a href="/customer#network">How it works</a>
              <a href="/booking">Request service</a>
            </div>
          ))}
        </div>
        <strong className="footer-word">SAHAAY</strong>
        <p>2026 Cooperative Service Network</p>
      </footer>
    </main>
  );
}

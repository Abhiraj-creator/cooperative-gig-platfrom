import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, ShieldAlert } from 'lucide-react';
import { Logo } from '../components/Logo';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="page not-found-page" style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      textAlign: 'center'
    }}>
      <div className="not-found-card" style={{
        maxWidth: '640px',
        width: '100%',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        padding: 'clamp(32px, 6vw, 56px) 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        position: 'relative',
        boxShadow: '0 20px 50px rgba(0,0,0,0.06)'
      }}>
        {/* Top Technical Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 59, 10, 0.08)',
          border: '1px solid var(--accent)',
          padding: '6px 14px',
          color: 'var(--accent)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase'
        }}>
          <ShieldAlert size={15} />
          <span>// ERROR 404: ROUTE_NOT_FOUND</span>
        </div>

        {/* Big Graphic & Code */}
        <div style={{ margin: '12px 0 4px' }}>
          <Logo size={64} style={{ opacity: 0.9, margin: '0 auto 12px' }} />
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 12vw, 7.5rem)',
            fontWeight: 900,
            lineHeight: 0.85,
            margin: 0,
            letterSpacing: '-0.04em',
            color: 'var(--foreground)'
          }}>
            404
          </h1>
        </div>

        {/* Headline */}
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          textTransform: 'uppercase',
          margin: 0,
          letterSpacing: '-0.01em'
        }}>
          PAGE DOES NOT EXIST
        </h2>

        {/* Description */}
        <p style={{
          color: 'var(--muted)',
          fontSize: '0.95rem',
          maxWidth: '460px',
          margin: 0,
          lineHeight: 1.6
        }}>
          The URL endpoint you entered was not recognized by the SAHKAAR cooperative route directory. Please check the web address or navigate back home.
        </p>

        {/* Navigation Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          justifyContent:'center',
          marginTop: '12px'
        }}>
          <button
            type="button"
            className="card-action-btn"
            style={{
              background: 'var(--foreground)',
              color: 'var(--background)',
              borderColor: 'var(--foreground)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 22px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} /> GO BACK
          </button>

          <Link
            to="/"
            className="card-action-btn"
            style={{
              background: 'var(--accent)',
              color: '#fffaf4',
              borderColor: 'var(--accent)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 22px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            <Home size={16} /> BACK TO HOME →
          </Link>
        </div>
      </div>
    </main>
  );
}

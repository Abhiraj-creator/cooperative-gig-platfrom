import { useRef } from 'react';
import {
  ArrowRight,
  Car,
  Drill,
  HeartHandshake,
  Leaf,
  PaintRoller,
  PlugZap,
  ShowerHead,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ServiceCategory } from '../types';
import { gsap, useGSAP } from '@/libs/gsap';

interface ServiceCategoryListProps {
  services: ServiceCategory[];
}

export function ServiceCategoryList({ services }: ServiceCategoryListProps) {
  const gridRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: gridRef });

  const iconById = {
    electrician: PlugZap,
    plumber: ShowerHead,
    carpenter: Drill,
    painter: PaintRoller,
    cleaner: Sparkles,
    driver: Car,
    gardener: Leaf,
    caregiver: HeartHandshake,
    technician: Wrench,
  };

  const handleTileHover = contextSafe((targetEl: HTMLElement) => {
    if (!indicatorRef.current || !gridRef.current) return;

    const gridRect = gridRef.current.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    const x = targetRect.left - gridRect.left;
    const y = targetRect.top - gridRect.top;
    const width = targetRect.width;
    const height = targetRect.height;

    gsap.to(indicatorRef.current, {
      x,
      y,
      width,
      height,
      opacity: 1,
      duration: 0.38,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  });

  const handleMouseLeaveGrid = contextSafe(() => {
    if (!indicatorRef.current) return;
    gsap.to(indicatorRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  return (
    <ul className="service-grid" ref={gridRef} onMouseLeave={handleMouseLeaveGrid}>
      {/* Sliding Orange Backdrop Indicator */}
      <div ref={indicatorRef} className="service-grid-hover-indicator" aria-hidden="true" />

      {services.map((service) => (
        <li
          className="service-tile"
          key={service.id}
          onMouseEnter={(e) => handleTileHover(e.currentTarget)}
        >
          <Link to="/booking" aria-label={`Request ${service.name} service`}>
            <span className="tile-index">[{service.id.slice(0, 2).toUpperCase()}]</span>
            <span className="tile-icon" aria-hidden="true">
              {(() => {
                const Icon = iconById[service.id as keyof typeof iconById] ?? Wrench;
                return <Icon size={28} strokeWidth={1.5} />;
              })()}
            </span>
            <strong>{service.name}</strong>
            <small>{service.emergencyEnabled ? 'Emergency supported' : 'Scheduled service'}</small>
            <span className="tile-action">
              Nearby <ArrowRight size={14} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

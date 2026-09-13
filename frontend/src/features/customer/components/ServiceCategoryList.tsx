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

interface ServiceCategoryListProps {
  services: ServiceCategory[];
}

export function ServiceCategoryList({ services }: ServiceCategoryListProps) {
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

  return (
    <ul className="service-grid">
      {services.map((service) => (
        <li className="service-tile" key={service.id}>
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

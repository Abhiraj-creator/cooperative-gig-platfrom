import type { ServiceCategory } from '../types';

interface ServiceCategoryListProps {
  services: ServiceCategory[];
}

export function ServiceCategoryList({ services }: ServiceCategoryListProps) {
  return (
    <ul>
      {services.map((service) => (
        <li key={service.id}>
          {service.name}
          {service.emergencyEnabled ? ' - emergency supported' : ''}
        </li>
      ))}
    </ul>
  );
}

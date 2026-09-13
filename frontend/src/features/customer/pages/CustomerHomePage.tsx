import { Link } from 'react-router-dom';
import { ServiceCategoryList } from '../components/ServiceCategoryList';
import { useCustomerServices } from '../hooks/useCustomerServices';

export function CustomerHomePage() {
  const { serviceCategories } = useCustomerServices();

  return (
    <main className="page">
      <section className="panel">
        <p className="eyebrow">Customer</p>
        <h1>Book Verified Cooperative Services</h1>
        <p>
          Discover skilled workers, create service requests, schedule bookings,
          and track execution through the cooperative marketplace.
        </p>
        <ServiceCategoryList services={serviceCategories} />
        <Link to="/booking">Create booking</Link>
      </section>
    </main>
  );
}

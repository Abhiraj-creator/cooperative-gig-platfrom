import { ServiceModeSelector } from '../components/ServiceModeSelector';
import { useBookingDraft } from '../hooks/useBookingDraft';
import { TextReveal } from '@/shared/components';

export function BookingCreatePage() {
  const { draft, updateMode } = useBookingDraft();

  return (
    <main className="page">
      <section className="panel">
        <p className="eyebrow">Booking</p>
        <TextReveal trigger="mount" splitBy="words">
          <h1>Create a Service Request</h1>
        </TextReveal>
        <p>
          Start from the mandated booking flow: scheduled, on-demand, or
          emergency service matching.
        </p>
        <ServiceModeSelector value={draft.mode} onChange={updateMode} />
      </section>
    </main>
  );
}

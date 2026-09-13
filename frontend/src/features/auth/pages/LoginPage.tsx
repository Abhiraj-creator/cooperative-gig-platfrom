import { AuthStatus } from '../components/AuthStatus';
import { TextReveal } from '@/shared/components';

export function LoginPage() {
  return (
    <main className="page">
      <section className="panel">
        <p className="eyebrow">Auth</p>
        <TextReveal trigger="mount" splitBy="words">
          <h1>Platform Login</h1>
        </TextReveal>
        <p>Shared authentication entry for customers, workers, and cooperative admins.</p>
        <AuthStatus />
      </section>
    </main>
  );
}

import { AuthStatus } from '../components/AuthStatus';

export function LoginPage() {
  return (
    <main className="page">
      <section className="panel">
        <p className="eyebrow">Auth</p>
        <h1>Platform Login</h1>
        <p>Shared authentication entry for customers, workers, and cooperative admins.</p>
        <AuthStatus />
      </section>
    </main>
  );
}

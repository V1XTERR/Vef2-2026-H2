import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '5rem', color: 'var(--color-accent)' }}>404</h1>
      <h2 style={{ marginBottom: '1rem' }}>Síða fannst ekki</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
        Síðan sem þú ert að leita að er ekki til.
      </p>
      <Link href="/" style={{
        background: 'var(--color-accent)',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        fontWeight: 600
      }}>
        Fara á forsíðu
      </Link>
    </div>
  );
}
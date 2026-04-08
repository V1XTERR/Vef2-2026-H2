import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-primary)',
      color: 'rgba(255,255,255,0.7)',
      textAlign: 'center',
      padding: '1rem',
      fontSize: '0.85rem',
      marginTop: 'auto'
    }}>
      <p>© {new Date().getFullYear()} Ichiraku Ramen.</p>
      <Link href="/admin" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
        Stjórnborð
      </Link>
    </footer>
  );
}
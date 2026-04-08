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
      © {new Date().getFullYear()} Ichiraku Ramen.
    </footer>
  );
}
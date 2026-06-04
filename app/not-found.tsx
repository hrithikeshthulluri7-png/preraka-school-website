import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '1rem', textAlign: 'center', padding: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Page not found</h2>
      <p style={{ color: '#666' }}>The page you are looking for does not exist.</p>
      <Link href="/" style={{ padding: '0.5rem 1.5rem', background: '#0070f3', color: '#fff', borderRadius: '6px', textDecoration: 'none' }}>
        Go home
      </Link>
    </div>
  );
}

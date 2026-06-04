'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error server-side only — never expose to client
    console.error(error);
  }, [error]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '1rem', textAlign: 'center', padding: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Something went wrong</h2>
      <p style={{ color: '#666' }}>We encountered an unexpected error. Please try again.</p>
      <button
        onClick={reset}
        style={{ padding: '0.5rem 1.5rem', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
      >
        Try again
      </button>
    </div>
  );
}

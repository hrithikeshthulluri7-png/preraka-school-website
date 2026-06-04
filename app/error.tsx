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
    // Errors are captured server-side via Vercel log drains — never expose stack traces in the browser
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('[dev]', error?.message);
    }
  }, [error]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh', gap: '1rem', textAlign: 'center', padding: '2rem',
      background: 'linear-gradient(160deg,#020D1F 0%,#041E42 100%)',
    }}>
      <div style={{ fontSize: '3rem' }}>🛸</div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>Something went wrong</h2>
      <p style={{ color: 'rgba(161,207,239,0.7)', maxWidth: 360 }}>
        We encountered an unexpected error. Please try again or return to the home page.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={reset}
          style={{ padding: '0.5rem 1.5rem', background: '#2E7E46', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
        >
          Try again
        </button>
        <a href="/" style={{ padding: '0.5rem 1.5rem', background: 'rgba(161,207,239,0.15)', color: '#A1CFEF', border: '1px solid rgba(161,207,239,0.35)', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
          Go home
        </a>
      </div>
    </div>
  );
}

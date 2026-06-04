'use client';
import { useEffect } from 'react';

export default function GalleryError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') console.error('[gallery]', error?.message);
  }, [error]);

  return (
    <div style={{
      minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: '1rem', textAlign: 'center', padding: '2rem',
      background: 'linear-gradient(160deg,#020D1F 0%,#041E42 100%)',
    }}>
      <div style={{ fontSize: '3rem' }}>🔭</div>
      <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.4rem' }}>Gallery couldn't load</h2>
      <p style={{ color: 'rgba(161,207,239,0.65)', maxWidth: 320 }}>
        The 3D gallery needs WebGL. Please try a different browser or device.
      </p>
      <button onClick={reset} style={{ padding: '0.5rem 1.5rem', background: '#2E7E46', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
        Try again
      </button>
    </div>
  );
}

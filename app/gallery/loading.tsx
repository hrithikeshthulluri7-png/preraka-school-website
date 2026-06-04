export default function GalleryLoading() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: '1rem',
      background: 'linear-gradient(160deg,#020D1F 0%,#041E42 40%,#062B5A 70%,#041E42 100%)',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        border: '2px solid rgba(161,207,239,0.6)', borderTopColor: 'transparent',
        animation: 'spin 0.9s linear infinite',
      }} />
      <p style={{ color: 'rgba(161,207,239,0.6)', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
        Loading Gallery…
      </p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

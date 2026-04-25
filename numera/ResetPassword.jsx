export default function Spinner() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: '#F9FAFB',
    }}>
      <div style={{
        width: 36, height: 36,
        border: '2px solid rgba(200,169,110,0.2)',
        borderTopColor: '#C8A96E',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

export default function ErrorFallback({ error, onReset }) {
  return (
    <div className="fallback" role="alert">
      <h2>Ada yang tidak beres</h2>
      <p>Bagian ini gagal ditampilkan. Data kamu aman, silakan coba lagi.</p>
      {error?.message && <pre className="fallback-detail">{error.message}</pre>}
      <button className="btn" onClick={onReset}>
        Coba lagi
      </button>
    </div>
  );
}

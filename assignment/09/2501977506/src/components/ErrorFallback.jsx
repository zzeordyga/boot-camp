"use client";

export default function ErrorFallback({ error, onReset }) {
  return (
    <div className="panel error" role="alert">
      <h2>Something went wrong</h2>
      <p>This part of the page crashed. Your data is safe. Try again, or reload if it keeps happening.</p>
      <div className="row">
        <button onClick={onReset}>Try again</button>
        <button className="ghost" onClick={() => window.location.reload()}>Reload page</button>
      </div>
      {error?.message && (
        <details>
          <summary>Technical details</summary>
          <pre>{error.message}</pre>
        </details>
      )}
    </div>
  );
}

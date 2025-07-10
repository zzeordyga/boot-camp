'use client';

export default function Spinner() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh"
    }}>
      <div className="spinner" />
      <style jsx global>{`
        .spinner {
          width: 48px;
          height: 48px;
          border: 5px solid #ccc;
          border-top: 5px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

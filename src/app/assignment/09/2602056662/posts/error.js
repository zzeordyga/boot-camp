'use client';

export default function Error({ error, reset }) {
    return (
        <div style={{ padding: 20, color: "red" }}>
            <h2>⚠️ Something went wrong:</h2>
            <p>{error.message}</p>

            <button
                onClick={() => reset()}
                style={{ marginTop: 12, padding: "8px 12px" }}
            >
                Try Again
            </button>
        </div>
    );
}

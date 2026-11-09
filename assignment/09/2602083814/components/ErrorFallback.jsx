function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="mx-auto max-w-xl rounded-xl border border-red-200 bg-red-50 p-8 text-center">
      <div className="text-4xl">⚠️</div>

      <h2 className="mt-4 text-xl font-bold text-red-800">
        Something went wrong
      </h2>

      <p className="mt-2 text-sm text-red-600">
        An unexpected error occurred while displaying the posts.
      </p>

      {error?.message && (
        <p className="mt-3 break-words text-xs text-red-500">
          {error.message}
        </p>
      )}

      <button
        onClick={resetErrorBoundary}
        className="mt-6 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  );
}

export default ErrorFallback;
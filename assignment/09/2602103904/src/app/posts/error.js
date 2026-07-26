"use client";

export default function Error({
  error,
  reset,
}) {

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">
                Something went wrong
            </h1>

            <p className="mt-3 text-gray-600 text-xl">
                {error.message}
            </p>

            <button type="button" onClick={() => window.location.reload()} className="mt-5 rounded-md bg-blue-500 px-4 py-2 text-white cursor-pointer text-lg" >
                Try Again
            </button>
        </div>
    );
}
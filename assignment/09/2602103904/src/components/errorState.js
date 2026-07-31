export default function ErrorState ( {message} ) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold text-red-600">
                Failed to Load Notes
            </h2>
            <p className="mt-2 text-xl text-gray-600">{message}</p>

            <button type="button" onClick={() => window.location.reload()} className="mt-5 rounded-md bg-blue-500 px-4 py-2 text-white cursor-pointer text-lg" >
                Try Again
            </button>
        </div>
    )
}
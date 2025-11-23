export default function Loading({ message = "Loading data..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  );
}
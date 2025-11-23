export default function HomePage() {
  return (
    <div className="space-y-8 text-center py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Firebase Real-time Posts
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Welcome to my Firebase Assignment! This implementation demonstrates real-time data synchronization with Firestore, search functionality, and comprehensive error handling.
        </p>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Assignment Features</h2>
          <ul className="text-left space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2 mt-1">✓</span>
              <span>Real-time data synchronization using Firestore</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2 mt-1">✓</span>
              <span>Live search filtering with instant updates</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2 mt-1">✓</span>
              <span>Comprehensive error handling with Error Boundaries</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2 mt-1">✓</span>
              <span>Loading states and user-friendly UI feedback</span>
            </li>
          </ul>
        </div>
        
        <a 
          href="/assignment/09/2501995143/posts"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition transform hover:scale-105"
        >
          View Posts →
        </a>
      </div>
    </div>
  );
}
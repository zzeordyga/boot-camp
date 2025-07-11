import Link from 'next/link';

export default function Page() {
    return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4 font-sans text-gray-800">
      <div className="bg-white rounded-xl shadow-2xl p-8 md:p-10 w-full max-w-2xl transform transition-all duration-300 hover:scale-105">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-700 mb-6 drop-shadow-lg">
          Cat Fact Details
        </h1>

        <p className="text-center text-lg text-gray-600 mb-8">
          Your NIM: <span className="font-bold text-purple-600">2501992343</span>
        </p>
        <div className="flex justify-center mb-8">
            <Link href="/views/2501992343" className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition duration-200 ease-in-out transform hover:-translate-y-1">
                Balik ke page awal
            </Link>
        </div>

   
        <div className="text-center bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Details Page Content</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            kucing oren
          </p>
          <p className="mt-4 text-md text-gray-600 italic">
            
          </p>
        </div>

      </div>
    </div>
  );

}
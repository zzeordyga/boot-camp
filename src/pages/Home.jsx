import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">
        Welcome to Campus Club Finder
      </h1>
      <p className="text-lg text-gray-700 max-w-xl mb-6">
        Discover exciting communities, explore your interests, and join clubs that make your campus experience unforgettable.
      </p>
      <img
        src="/images/campus.png"
        alt="Campus Clubs"
        className="w-full max-w-[600px] h-auto rounded shadow mx-auto mb-6"
      />
      <Link
        to="/clubs"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Find Your Club
      </Link>
    </div>
  );
}
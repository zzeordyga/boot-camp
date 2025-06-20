import { Link } from "react-router-dom";
import { clubs } from "../data/clubs";

export default function Clubs() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">All Clubs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {clubs.map((club) => (
          <Link
            key={club.id}
            to={`/clubs/${club.id}`}
            className="block border border-gray-300 rounded-lg p-4 hover:shadow-lg transition text-center bg-white"
          >
            <img
              src={club.image}
              alt={club.name}
              className="w-32 h-32 object-cover mx-auto rounded mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">{club.name}</h2>
            <p className="text-gray-600">{club.shortDescription}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

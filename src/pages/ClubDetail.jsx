import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { clubs } from "../data/clubs";

export default function ClubDetail() {
  const { clubId } = useParams();
  const club = clubs.find((c) => c.id === clubId);

  const [joined, setJoined] = useState(false);

  // Check localStorage on load
  useEffect(() => {
    const joinedClubs = JSON.parse(localStorage.getItem("joinedClubs") || "[]");
    if (joinedClubs.includes(clubId)) {
      setJoined(true);
    }
  }, [clubId]);

  const handleJoin = () => {
    const joinedClubs = JSON.parse(localStorage.getItem("joinedClubs") || "[]");
    if (!joinedClubs.includes(clubId)) {
      joinedClubs.push(clubId);
      localStorage.setItem("joinedClubs", JSON.stringify(joinedClubs));
      setJoined(true);
      alert("You have joined this club!");
    }
  };

  if (!club) {
    return <p className="p-6 text-red-500">Club not found.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{club.name}</h1>

      <div className="flex flex-col md:flex-row gap-6 mb-6 items-start">
        <img
          src={club.image}
          alt={club.name}
          className="w-100 md:w-64 rounded shadow"
        />
        <div className="flex-1">
          <p className="text-gray-700 mb-4">{club.description}</p>

          <h2 className="text-xl font-semibold mb-2">Upcoming Events:</h2>
          <ul className="list-disc list-inside mb-6">
            {club.events.map((event, index) => (
              <li key={index}>
                {event.name} – {event.date}
              </li>
            ))}
          </ul>

          {!joined ? (
            <button
              onClick={handleJoin}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Join Club
            </button>
          ) : (
            <p className="text-green-700 font-semibold">You have joined this club!</p>
          )}
        </div>
      </div>
    </div>
  );
}

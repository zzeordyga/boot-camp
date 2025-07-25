"use client";
import { useRouter } from "next/navigation";
import { auth } from "./lib/firebase";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Welcome to Firebase Auth App</h1>
      {user ? (
        <>
          <p>Hello, {user.email}</p>
          <button onClick={() => router.push("/2501989462/assignment-10/user/profile")}>
            Go to Profile
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => router.push("/2501989462/assignment-10/login")}
          >
            Login
          </button>
          <button
            onClick={() => router.push("/2501989462/assignment-10/register")}
          >
            Register
          </button>
        </>
      )}
    </div>
  );
}

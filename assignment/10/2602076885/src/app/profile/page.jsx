"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        window.location.href = "/login";
        return;
      }

      setUser(currentUser);

      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    await signOut(auth);
    window.location.href = "/";
  }

  if (loading) {
    return (
      <main
        style={{
          minHeight: "calc(100vh - 65px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Loading profile...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main
      style={{
        minHeight: "calc(100vh - 65px)",
        padding: "50px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "#1e293b",
          borderRadius: "16px",
          padding: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "30px",
          }}
        >
          ⚽ Your Profile
        </h1>

        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              color: "#94a3b8",
              marginBottom: "5px",
            }}
          >
            Email
          </p>

          <p
            style={{
              fontSize: "18px",
            }}
          >
            {user.email}
          </p>
        </div>

        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <p
            style={{
              color: "#94a3b8",
              marginBottom: "5px",
            }}
          >
            Role
          </p>

          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: userData?.role === "admin" ? "#22c55e" : "white",
            }}
          >
            {userData?.role || "user"}
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "12px 20px",
            borderRadius: "8px",
            border: "none",
            background: "#ef4444",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </main>
  );
}

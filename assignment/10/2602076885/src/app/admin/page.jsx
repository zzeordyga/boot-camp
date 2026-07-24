"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        window.location.href = "/login";
        return;
      }

      try {
        // Check current user's role
        const currentUserDoc = await getDoc(doc(db, "users", currentUser.uid));

        if (!currentUserDoc.exists()) {
          window.location.href = "/";
          return;
        }

        const currentUserData = currentUserDoc.data();

        // Check admin role
        if (currentUserData.role !== "admin") {
          window.location.href = "/";
          return;
        }

        setAuthorized(true);

        // Fetch all users
        const usersSnapshot = await getDocs(collection(db, "users"));

        const usersList = usersSnapshot.docs.map((userDoc) => ({
          id: userDoc.id,
          ...userDoc.data(),
        }));

        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load users. Please try again.");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
        <p>Checking authorization...</p>
      </main>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <main
      style={{
        minHeight: "calc(100vh - 65px)",
        padding: "50px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          🛡️ Admin Dashboard
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "40px",
          }}
        >
          Manage and monitor registered users.
        </p>

        {/* Statistics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              background: "#1e293b",
              borderRadius: "12px",
              padding: "25px",
            }}
          >
            <p
              style={{
                color: "#94a3b8",
                marginBottom: "10px",
              }}
            >
              Total Users
            </p>

            <h2
              style={{
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              {users.length}
            </h2>
          </div>

          <div
            style={{
              background: "#1e293b",
              borderRadius: "12px",
              padding: "25px",
            }}
          >
            <p
              style={{
                color: "#94a3b8",
                marginBottom: "10px",
              }}
            >
              Administrators
            </p>

            <h2
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#22c55e",
              }}
            >
              {users.filter((user) => user.role === "admin").length}
            </h2>
          </div>

          <div
            style={{
              background: "#1e293b",
              borderRadius: "12px",
              padding: "25px",
            }}
          >
            <p
              style={{
                color: "#94a3b8",
                marginBottom: "10px",
              }}
            >
              Regular Users
            </p>

            <h2
              style={{
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              {users.filter((user) => user.role === "user").length}
            </h2>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              background: "#450a0a",
              border: "1px solid #ef4444",
              color: "#fca5a5",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Users Table */}
        <div
          style={{
            background: "#1e293b",
            borderRadius: "16px",
            padding: "30px",
            overflowX: "auto",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              marginBottom: "25px",
            }}
          >
            Registered Users
          </h2>

          {users.length === 0 ? (
            <p
              style={{
                color: "#94a3b8",
              }}
            >
              No users found.
            </p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px",
                      borderBottom: "1px solid #475569",
                    }}
                  >
                    Email
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px",
                      borderBottom: "1px solid #475569",
                    }}
                  >
                    Role
                  </th>

                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px",
                      borderBottom: "1px solid #475569",
                    }}
                  >
                    User ID
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td
                      style={{
                        padding: "15px 12px",
                        borderBottom: "1px solid #334155",
                      }}
                    >
                      {user.email}
                    </td>

                    <td
                      style={{
                        padding: "15px 12px",
                        borderBottom: "1px solid #334155",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          padding: "5px 10px",
                          borderRadius: "6px",
                          background:
                            user.role === "admin" ? "#166534" : "#334155",
                          color: "white",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td
                      style={{
                        padding: "15px 12px",
                        borderBottom: "1px solid #334155",
                        color: "#94a3b8",
                        fontSize: "14px",
                      }}
                    >
                      {user.id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}

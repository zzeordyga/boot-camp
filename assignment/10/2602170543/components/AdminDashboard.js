import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Shield, Users, LogOut, ArrowLeft } from "lucide-react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <Shield size={40} color="#dc3545" />
              <div>
                <h1
                  style={{
                    margin: "0 0 5px 0",
                    color: "#333",
                    fontSize: "32px",
                  }}
                >
                  Admin Dashboard
                </h1>
                <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                  System management and overview
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: "12px 24px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#c82333")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          <Link
            to="/user/profile"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#667eea",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            <ArrowLeft size={18} />
            Back to Profile
          </Link>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#dc3545",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: "600",
            }}
          >
            {currentUser?.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p
              style={{
                margin: "0 0 5px 0",
                fontSize: "18px",
                fontWeight: "600",
                color: "#333",
              }}
            >
              Logged in as Admin
            </p>
            <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
              {currentUser?.email}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "10px",
                  backgroundColor: "#667eea",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Users size={28} color="white" />
              </div>
              <div>
                <p
                  style={{
                    margin: "0 0 5px 0",
                    fontSize: "12px",
                    color: "#666",
                    fontWeight: "600",
                  }}
                >
                  TOTAL USERS
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#333",
                  }}
                >
                  {users.length}
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "10px",
                  backgroundColor: "#28a745",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Users size={28} color="white" />
              </div>
              <div>
                <p
                  style={{
                    margin: "0 0 5px 0",
                    fontSize: "12px",
                    color: "#666",
                    fontWeight: "600",
                  }}
                >
                  REGULAR USERS
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#333",
                  }}
                >
                  {users.filter((u) => u.role === "user").length}
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "10px",
                  backgroundColor: "#dc3545",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Shield size={28} color="white" />
              </div>
              <div>
                <p
                  style={{
                    margin: "0 0 5px 0",
                    fontSize: "12px",
                    color: "#666",
                    fontWeight: "600",
                  }}
                >
                  ADMINISTRATORS
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#333",
                  }}
                >
                  {users.filter((u) => u.role === "admin").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ margin: "0 0 20px 0", color: "#333", fontSize: "24px" }}>
            All Users
          </h2>

          {loading ? (
            <p style={{ textAlign: "center", color: "#666", padding: "40px" }}>
              Loading users...
            </p>
          ) : users.length === 0 ? (
            <p style={{ textAlign: "center", color: "#666", padding: "40px" }}>
              No users found
            </p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#f8f9fa",
                      borderBottom: "2px solid #e0e0e0",
                    }}
                  >
                    <th
                      style={{
                        padding: "15px",
                        textAlign: "left",
                        color: "#666",
                        fontWeight: "600",
                        fontSize: "12px",
                      }}
                    >
                      EMAIL
                    </th>
                    <th
                      style={{
                        padding: "15px",
                        textAlign: "left",
                        color: "#666",
                        fontWeight: "600",
                        fontSize: "12px",
                      }}
                    >
                      ROLE
                    </th>
                    <th
                      style={{
                        padding: "15px",
                        textAlign: "left",
                        color: "#666",
                        fontWeight: "600",
                        fontSize: "12px",
                      }}
                    >
                      CREATED AT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user.id}
                      style={{
                        borderBottom: "1px solid #e0e0e0",
                        backgroundColor: index % 2 === 0 ? "white" : "#f8f9fa",
                      }}
                    >
                      <td
                        style={{
                          padding: "15px",
                          color: "#333",
                          fontSize: "14px",
                        }}
                      >
                        {user.email}
                      </td>
                      <td style={{ padding: "15px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 12px",
                            backgroundColor:
                              user.role === "admin" ? "#dc3545" : "#28a745",
                            color: "white",
                            borderRadius: "12px",
                            fontSize: "12px",
                            fontWeight: "600",
                            textTransform: "uppercase",
                          }}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "15px",
                          color: "#666",
                          fontSize: "14px",
                        }}
                      >
                        {user.createdAt
                          ? new Date(
                              user.createdAt.seconds * 1000
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

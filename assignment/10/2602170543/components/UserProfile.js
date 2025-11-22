import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Shield, LogOut } from "lucide-react";

const UserProfile = () => {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();

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
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{ margin: "0 0 5px 0", color: "#333", fontSize: "32px" }}
            >
              User Profile
            </h1>
            <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
              Manage your account information
            </p>
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

        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: "0 0 25px 0", color: "#333", fontSize: "24px" }}>
            Account Information
          </h2>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "20px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
              }}
            >
              <User size={24} color="#667eea" style={{ marginRight: "15px" }} />
              <div>
                <p
                  style={{
                    margin: "0 0 5px 0",
                    fontSize: "12px",
                    color: "#666",
                    fontWeight: "600",
                  }}
                >
                  USER ID
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    color: "#333",
                    wordBreak: "break-all",
                  }}
                >
                  {currentUser?.uid}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "20px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
              }}
            >
              <Mail size={24} color="#667eea" style={{ marginRight: "15px" }} />
              <div>
                <p
                  style={{
                    margin: "0 0 5px 0",
                    fontSize: "12px",
                    color: "#666",
                    fontWeight: "600",
                  }}
                >
                  EMAIL ADDRESS
                </p>
                <p style={{ margin: 0, fontSize: "16px", color: "#333" }}>
                  {currentUser?.email}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "20px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
              }}
            >
              <Shield
                size={24}
                color="#667eea"
                style={{ marginRight: "15px" }}
              />
              <div>
                <p
                  style={{
                    margin: "0 0 5px 0",
                    fontSize: "12px",
                    color: "#666",
                    fontWeight: "600",
                  }}
                >
                  ROLE
                </p>
                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    backgroundColor:
                      userRole === "admin" ? "#dc3545" : "#28a745",
                    color: "white",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  {userRole}
                </span>
              </div>
            </div>
          </div>
        </div>

        {userRole === "admin" && (
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            }}
          >
            <h2
              style={{ margin: "0 0 15px 0", color: "#333", fontSize: "24px" }}
            >
              Admin Access
            </h2>
            <p
              style={{ margin: "0 0 20px 0", color: "#666", fontSize: "14px" }}
            >
              You have administrator privileges. Access the admin dashboard to
              manage the system.
            </p>
            <Link
              to="/admin/dashboard"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                backgroundColor: "#667eea",
                color: "white",
                textDecoration: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#5568d3")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#667eea")}
            >
              Go to Admin Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

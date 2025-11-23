import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function Layout({ user, role }) {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && user && <Navbar role={role} />}
    </>
  );
}

const App = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);

        setUser(currentUser);
        setRole(snap.exists() ? snap.data().role : null);
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => unsub();
  }, []);

  return (
    <BrowserRouter>
      <Layout user={user} role={role} />

      <Routes>
        <Route path="/login" element={<Login setUser={setUser} setRole={setRole} />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/user/profile"
          element={
            <ProtectedRoute user={user} role={role} requiredRole="user">
              <UserProfile user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute user={user} role={role} requiredRole="admin">
              <AdminDashboard user={user} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

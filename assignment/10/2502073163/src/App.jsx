import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // prevent render while loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docSnap = await getDoc(doc(db, "users", firebaseUser.uid));
        if (docSnap.exists()) {
          setUserData({ uid: firebaseUser.uid, ...docSnap.data() });
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Only logged-in users */}
      <Route
        path="/user/profile"
        element={
          userData ? <Profile /> : <Navigate to="/login" />
        }
      />

      {/* Only admins */}
      <Route
        path="/admin/dashboard"
        element={
          userData?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
}
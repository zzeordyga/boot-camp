import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        setUserRole(docSnap.data().role);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!auth.currentUser) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/not-authorized" />;

  return children;
};

export default ProtectedRoute;

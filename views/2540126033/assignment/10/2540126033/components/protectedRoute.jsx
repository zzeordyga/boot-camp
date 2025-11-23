'use client';

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/2540126033/assignment/10/2540126033/rawr/login");
      } else if (allowedRoles && !allowedRoles.includes(role)) {
        // User is logged in but wrong role -> redirect to user dashboard
        router.push("/2540126033/assignment/10/2540126033/rawr/dashboard"); 
      }
    }
  }, [user, role, loading, router, allowedRoles]);

  if (loading) return <div className="p-10 text-center">Loading access rights...</div>;
  
  // If user is missing or role is wrong (and useEffect hasn't fired yet), return null to block view
  if (!user || (allowedRoles && !allowedRoles.includes(role))) return null;

  return children;
}
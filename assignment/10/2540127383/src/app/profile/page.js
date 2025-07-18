'use client';

import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import getConfig from '@/firebase/config';

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const { db, app } = getConfig();
      const auth = getAuth(app);
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setUserData(null);
        setLoading(false);
        return;
      }

      const userRef = doc(db, 'Users', currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setUserData(data);
        setUserRole(data.role || 'user');
      } else {
        setUserData(null);
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading profile...</p>;
  if (!userData) return <p className="text-center mt-8 text-red-600">User not found.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">User Profile</h1>

        <div className="space-y-4">
          <div className="border-b pb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <p className="text-gray-900">{userData.name}</p>
          </div>

          <div className="border-b pb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="text-gray-900">{userData.email}</p>
          </div>

          <div className="border-b pb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              userRole === 'admin'
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {userRole}
            </span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-md">
          <p className="text-green-700 text-sm">
            <strong>Protected:</strong> Profile shown is based on logged-in user from Firebase Auth.
          </p>
        </div>
      </div>
    </div>
  );
}

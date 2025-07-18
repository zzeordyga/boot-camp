'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import getConfig from '@/firebase/config';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const { db } = getConfig();
      try {
        const usersCollection = collection(db, 'Users');
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Administrative controls and system overview</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Total Users</h3>
            <p className="text-2xl font-bold text-blue-600">{users.length}</p>
          </div>

        </div>

        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700 text-sm">
            <strong>Admin Route Protection:</strong> This page is only accessible to users with the 'admin' role.
            The ProtectedRoute component verified both authentication and authorization before rendering this content.
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">User Management</h2>

          {loading ? (
            <p className="text-gray-500">Loading users...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.name || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role || 'user'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">Active</td>
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
}

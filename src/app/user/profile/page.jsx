'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase/config';
import { useRouter } from 'next/navigation';
import { userLogout } from '../../../firebase/authService';

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
        return;
      }

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout =  async () => {
    await userLogout();
    router.push('/');
  }

  if (loading) return <p>Loading profile...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>👤 User Profile</h1>
      <p><strong>Name:</strong> {userData?.name}</p>
      <p><strong>Email:</strong> {userData?.email}</p>
      <p><strong>Age:</strong> {userData?.age}</p>
      <p><strong>Role:</strong> {userData?.role}</p>
      <button onClick={handleLogout} style={{marginTop: '1rem'}} >Logout</button>
    </div>
  );
}

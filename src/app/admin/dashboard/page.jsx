'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase/config'; 
import { useRouter } from 'next/navigation';
import { userLogout } from '../../../firebase/authService';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login'); // not logged in
        return;
      }

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().role === 'admin') {
        setAuthorized(true); // has admin role
      } else {
        router.push('/not-authorized'); // or show error
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout =  async () => {
    await userLogout();
    router.push('/');
  }

  if (loading) return <p>Loading...</p>;

  return authorized ? (
    <div>
      <h1>Welcome, Admin!</h1>
      <p>This is the admin dashboard.</p>
      <button onClick={handleLogout} style={{marginTop: '1rem'}} >Logout</button>
    </div>
  ) : null;
}

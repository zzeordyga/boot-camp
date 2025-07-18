import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
        return;
      }

      const ref = doc(db, 'users', user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        if (data.role === 'admin') {
          setIsAdmin(true);
        } else {
          alert('Access denied. You are not admin.');
          navigate('/dashboard');
        }
      } else {
        alert('User data not found.');
        navigate('/login');
      }

      setLoading(false);
    };

    checkRole();
  }, [navigate]);

  if (loading) return <div>Checking role...</div>;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Only visible to users with role "admin".</p>
    </div>
  );
}

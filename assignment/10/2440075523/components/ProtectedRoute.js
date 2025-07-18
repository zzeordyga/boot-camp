import { useEffect, useState } from 'react';
import { auth } from 'assignment/10/2440075523/services/firebase.js';
import { getUserRole } from 'assignment/10/2440075523/services/auth.js';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate('/login');
        return;
      }

      const role = await getUserRole(user.uid);
      
      if (requiredRole === 'admin' && role !== 'admin') {
        navigate('/profile');
        return;
      }

      setIsAuthorized(true);
    });

    return () => unsubscribe();
  }, [navigate, requiredRole]);

  return isAuthorized ? children : null;
};

export default ProtectedRoute;
'use client'
import Link from 'next/link';
import { useAuthGuard } from '../hook/useAuthGuard';
import getConfig from '../firebase/config';
import { signOut } from 'firebase/auth';


const navRoute = '/2440111573/sesi-10';

export default function Sesi10Layout({ children }) {
  const { role } = useAuthGuard();
  const { auth } = getConfig();
  const isLoggedIn = role === "admin" || role === "user";

  const handleLogout = async()=>{
    await signOut(auth);
  }

  console.log(auth.currentUser);
  return (
    <>
      <div style={{ height: '60px', backgroundColor: '#333', color: 'white', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>
        <div>
          {isLoggedIn &&(
          <>
            <Link href={`${navRoute}`} style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Home</Link>
            {role === "admin" &&(
            <Link href={`${navRoute}/dashboard`} style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Dashboard</Link>)}
            {role === "user" &&(
            <Link href={`${navRoute}/profile`} style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>)}
          </>
          )}
        </div>
        <div>
          {role === "guest" &&(
          <Link href={`${navRoute}/login`} style={{ color: 'white', textDecoration: 'none' }}>Login</Link>)}
          {isLoggedIn &&(
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              padding: '0 20px',
              fontSize: '16px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Log Out
          </button>
          )}
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        {children}
      </div>
    </>
  );
}
'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase-config';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/2540126033/assignment/10/2540126033/rawr/dashboard'); 
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <>
    <div style={{ padding: '50px' }}>
      <h1>Login</h1>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <div>
          <label>Email:</label><br/>
          <input
            type="email"
            required
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '8px', width: '100%' }}
          />
        </div>

        <div>
          <label>Password:</label><br/>
          <input
            type="password"
            required
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '8px', width: '100%' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
          Sign In
        </button>
      </form>

      <p>
        Don't have an account? <Link href="/2540126033/assignment/10/2540126033/rawr/register">Register here</Link>
      </p>
    </div>
    </>
  );
}
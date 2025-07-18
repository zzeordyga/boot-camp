import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const register = async () => {
    try {
      // 1. Register user dengan email & password
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;

      // 2. Simpan data user ke Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'user' // default role
      });

      alert('Register success!');
      navigate('/login');
    } catch (error) {
      alert('Register failed: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        placeholder="Email"
        type="email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        required
        minLength={6}
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={register}>Register</button>
    </div>
  );
}

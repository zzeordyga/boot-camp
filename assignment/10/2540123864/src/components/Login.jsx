import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setUser, setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const uid = result.user.uid;

      const ref = doc(db, "users", uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setUser(result.user);
        setRole(data.role);

        if (data.role === "admin") navigate("/admin/dashboard");
        else navigate("/user/profile");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <input 
        type="email" 
        placeholder="Email"
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />

      <input 
        type="password" 
        placeholder="Password"
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;

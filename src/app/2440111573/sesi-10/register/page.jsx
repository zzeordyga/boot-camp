"use client";
import { createUserWithEmailAndPassword} from 'firebase/auth';
import getConfig from "../../firebase/config";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { doc, setDoc } from 'firebase/firestore';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
    setErrors({
      ...errors,
      [event.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) {
      newErrors.name = "Name is Empty";
    }
    if (!form.email) {
      newErrors.email = "Email is Empty";
    }
    if (!form.password) {
      newErrors.password = "Password is Empty";
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is Empty";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleRegister = () => {
    const validateError = validate();
    console.log("error value: " + Object.keys(validateError).length);
    if (Object.keys(validateError).length > 0) {
      setErrors(validateError);
    } else {
      // console.log("no error proceed to register: ");
      const { auth, db } = getConfig();
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          // console.log("User object:", user);
          await setDoc(doc(db, "account", user.uid), {
            name: form.name,
            email: user.email,
            role: "user"
          });
          // console.log("pass here");
          router.push("/2440111573/sesi-10");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Error:", errorMessage); 
          setErrors({ email: errorMessage }); 
        });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 60px - 40px)' }}>
      <div style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>Register</h1>
        <label style={{ textAlign: 'left', display: 'block', marginBottom: '5px', color: '#333' }}>Name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        {errors.name && (
          <div style={{ color: 'red', fontSize: '12px', textAlign: 'left', paddingLeft: '5px', marginBottom: '10px' }}>
            {errors.name}
          </div>
        )}
        <label style={{ textAlign: 'left', display: 'block', marginBottom: '5px', color: '#333' }}>Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        {errors.email && (
          <div style={{ color: 'red', fontSize: '12px', textAlign: 'left', paddingLeft: '5px', marginBottom: '10px' }}>
            {errors.email}
          </div>
        )}
        <label style={{ textAlign: 'left', display: 'block', marginBottom: '5px', color: '#333' }}>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        {errors.password && (
          <div style={{ color: 'red', fontSize: '12px', textAlign: 'left', paddingLeft: '5px', marginBottom: '10px' }}>
            {errors.password}
          </div>
        )}
        <label style={{ textAlign: 'left', display: 'block', marginBottom: '5px', color: '#333' }}>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        {errors.confirmPassword && (
          <div style={{ color: 'red', fontSize: '12px', textAlign: 'left', paddingLeft: '5px', marginBottom: '10px' }}>
            {errors.confirmPassword}
          </div>
        )}
        <button
          onClick={handleRegister}
          style={{ width: '100%', padding: '10px', backgroundColor: '#0066cc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Register
        </button>
        <p style={{ marginTop: '20px', fontSize: '14px' }}>
          Already have an account?{' '}
          <Link href="/2440111573/sesi-10/login" style={{ color: '#0066cc', textDecoration: 'none' }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
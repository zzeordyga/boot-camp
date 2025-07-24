"use client"
import { signInWithEmailAndPassword } from 'firebase/auth';
import getConfig from "../../firebase/config";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function LoginPage(){
  const router = useRouter();
  const [form, setForm] = useState({
    email:"",
    password:""
  });
  const [errors, setErrors] = useState({})

  const handleChange = (event)=>{
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
    setErrors({
      ...errors,
      [event.target.name]: "",
    })
  };

  const validate = ()=>{
    const newErrors = {}
    if(!form.email){
      newErrors.email = "Email is Empty"
    }
    if(!form.password){
      newErrors.password = "Password is Empty"
    }
    
    return newErrors;
  }

  const handleLogin = ()=>{
    const validateError = validate();
    console.log("error value: " + Object.keys(validateError).length);
    if(Object.keys(validateError).length > 0){
      setErrors(validateError);
    }else{
      const {auth} = getConfig();
      signInWithEmailAndPassword(auth, form.email, form.password)
      .then(() => {
        // Signed in 
        // console.log("we are logged in")
        router.push("/2440111573/sesi-10");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }
    // console.log(errors.email);
    // console.log(errors.password);

    // console.log(form);
  }

  

  return(
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 60px - 40px)' }}>
      <div style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>Login</h1>
        <label style={{ textAlign: 'left', display: 'block', marginBottom: '5px', color: '#333' }}>Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
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
          style={{ width: '100%', padding: '8px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        {errors.password && (
          <div style={{ color: 'red', fontSize: '12px', textAlign: 'left', paddingLeft: '5px', marginBottom: '10px' }}>
            {errors.password}
          </div>
        )}
        <button
          onClick={handleLogin}
          style={{ width: '100%', padding: '10px', backgroundColor: '#0066cc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Login
        </button>
        <p style={{ marginTop: '20px', fontSize: '14px' }}>
          Don’t have an account?{' '}
          <Link href="/2440111573/sesi-10/register" style={{ color: '#0066cc', textDecoration: 'none' }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}


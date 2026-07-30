"use client"

import React, { useEffect, useState } from 'react'
import { db } from './firebase/Init'
import { auth } from './firebase/Init'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import ProtectedRoute from './firebase/ProtectedRoute'


export default function page() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  const handleLogout = async()=>{
    try{
      const logOutUser = await signOut(auth);
      console.log(`Sign out Success`);

      router.replace(`/assingment/10/2602175462/login`);
    } catch (error){
      console.log(`Error ${error}`);
    }
  }

  const fetchCurrentUser = async ()=>{
    try{
      const uid = auth.currentUser.uid;

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()){
        setUserData(docSnap.data());
      } else {
        console.log(`user tidak ditemukan`);
        
      }

    } catch (error){
      console.log(error);
    }
  }

  function goToUser(){
    router.push('/assingment/10/2602175462/user/profile');
  }

  function goToAdmin(){
    router.push('/assingment/10/2602175462/admin/dashboard');
  }

  useEffect(()=>{
    if(auth.currentUser){
      fetchCurrentUser();
    }
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <h1>Main Page</h1>
        <button onClick={handleLogout}>Logout</button>
        <h2>Hi</h2>
        <h3>Name: {userData?.name}</h3>
        <p>Role : {userData?.role}</p>
        <button onClick={goToUser}>Go to /user/profile</button>
        <button onClick={goToAdmin}>Go to /admin/dashboard</button>
      </div>
    </ProtectedRoute>
  )
}
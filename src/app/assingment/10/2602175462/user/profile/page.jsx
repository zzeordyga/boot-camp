"use client";

import React from 'react'
import { useEffect, useState } from 'react';
import { auth } from '../../firebase/Init';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { db } from '../../firebase/Init';
import { getDoc, doc } from 'firebase/firestore';
import ProtectedRoute from '../../firebase/ProtectedRoute';

export default function page() {
    const [userData, setUserData] = useState(null);

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

    useEffect(()=>{
        if(auth.currentUser){
            fetchCurrentUser();
        }
    }, []);

  return (
    <ProtectedRoute>
        <div>
            <h1>User Profile</h1>
            <h3>Name : {userData?.name}</h3>
            <p>Email: {userData?.email}</p>
            <p>Role : {userData?.role}</p>
        </div>
    </ProtectedRoute>
  )
}

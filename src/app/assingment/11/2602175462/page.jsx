"use client";

import React from 'react'
import ProtectedRoute from './firebase/ProtectedRoute'
import ThemeBtn from './components/ThemeBtn'
import styles from "./page.module.css"
import './globals.css'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, snapshotEqual } from 'firebase/firestore'
import { db, auth } from './firebase/Init'
import { onAuthStateChanged } from 'firebase/auth';


export default function page() {
  const [tasks, setTasks] = useState([]);


  useEffect(()=>{
    const unsubscribeAuth = onAuthStateChanged(auth, (user) =>{
      if(!user) return;

      const taskRef = collection(db, 'tasks', user.uid, "tasks");

      const unsubscribeSnapshot = onSnapshot(taskRef, (snapshot) =>{
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTasks(data);
      })
      return unsubscribeSnapshot;
    })

    return () => unsubscribeAuth();
  }, []);

  return (
    <ProtectedRoute>
      <div className={styles.container}>
          <h1 className={styles.h1}>Task Management App</h1>
          {/* fetch data yang ada di firestore sesuai pengguna */}
          {/* btn add data */}
          <ThemeBtn/>
          {tasks.map((task)=>(
              <div key={task.id}>
                <h3>{task.id}</h3>
                <p>{task.value}</p>
                <p>{task.isDone ? "Done" : "Not Done"}</p>
              </div>
            ))}
          <button>Add New Tasks</button>
      </div>
    </ProtectedRoute>
  )
}
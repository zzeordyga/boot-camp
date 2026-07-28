"use client";

import React from 'react'
import ProtectedRoute from './firebase/ProtectedRoute'
import ThemeBtn from './components/ThemeBtn'
import styles from "./page.module.css"
import './globals.css'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, snapshotEqual, getDocs, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { db, auth } from './firebase/Init'
import { onAuthStateChanged, validatePassword } from 'firebase/auth';


export default function page() {
  const [tasks, setTasks] = useState([]);
  const [newTasks, setNewTasks] = useState("");


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

  const handleAddTask = async ()=>{
    if(!newTasks.trim()) return;

    const user = auth.currentUser;

    if(!user) return;

    const taskRef = collection(db, "tasks", user.uid, "tasks");

    const snapshot = await getDocs(taskRef);

    let maxId = 0;

    snapshot.forEach((docSnap) =>{
      const id = Number(docSnap.id);

      if(!isNaN(id) && id > maxId){
        maxId = id;
      }
    })

    const nextId = String(maxId+1);

    await setDoc(doc(taskRef, nextId),{
      value: newTasks,
      isDone: false,
    });

    setNewTasks("");
  }

  const handleToogleDone = async(taskId, currentStatus) =>{
    const user = auth.currentUser;

    if(!user) return;

    const taskDoc = doc(db, "tasks", user.uid, "tasks", taskId);

    await updateDoc(taskDoc, {
      isDone: !currentStatus,
    })
  }

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <h1 className={styles.h1}>Task Management App</h1>
        {/* fetch data yang ada di firestore sesuai pengguna */}
        {/* btn add data */}
        <ThemeBtn/>
        <h2>Tasks List</h2>
        {tasks.map((task)=>(
            <div key={task.id} className={styles.taskContainer}>
              <label>
                <input type="checkbox" checked={task.isDone} onChange={() => handleToogleDone(task.id, task.isDone)} />
                {task.isDone ? "" : ""}
              </label>
              {/* <h3>{task.id}</h3> */}
              <h3 className={`${styles.m} ${task.isDone ? styles.done : ""}`}>{task.value}</h3>
              <button>Edit</button>
              {/* <p>Done : {task.isDone ? "Done" : "Not Done"}</p> */}
            </div>
          ))}

          <h2>Add new tasks: </h2>
          <input type="text" value={newTasks} onChange={(e)=> setNewTasks(e.target.value)}/>
          <button onClick={handleAddTask}>Add Tasks</button>
      </div>
    </ProtectedRoute>
  )
}
"use client";

import React from 'react'
import ProtectedRoute from './firebase/ProtectedRoute'
import ThemeBtn from './components/ThemeBtn'
import styles from "./page.module.css"
import './globals.css'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, snapshotEqual, getDocs, doc, setDoc, getDoc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore'
import { db, auth } from './firebase/Init'
import { onAuthStateChanged, validatePassword, signOut } from 'firebase/auth';
import { useAsyncError } from 'react-router';
import { useRouter } from 'next/navigation';


export default function Page() {
  const [tasks, setTasks] = useState([]);
  const [newTasks, setNewTasks] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const router = useRouter();


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

    // const snapshot = await getDocs(taskRef);

    // let maxId = 0;

    // snapshot.forEach((docSnap) =>{
    //   const id = Number(docSnap.id);

    //   if(!isNaN(id) && id > maxId){
    //     maxId = id;
    //   }
    // })

    // const nextId = String(maxId+1);

    await addDoc(taskRef, {
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

  const handleEdit = (task) =>{
    setEditingId(task.id);
    setEditValue(task.value);
  };

  const handleDone = async () =>{
    if(!editValue.trim()){
      alert("Task tidak boleh kosong");
      return;
    }

    const user = auth.currentUser;
    
    if(!user) return;

    const taskDoc = doc(db, "tasks", user.uid, "tasks", editingId);

    await updateDoc(taskDoc, {
      value:editValue,
    });

    setEditingId(null);
    setEditValue("");
  }

  // Delete
  const handleDeleteTask = async(taskId)=>{
    const user = auth.currentUser;

    if(!user) return;

    const confirmDelete = window.confirm("Are you sure to delete this task ?")

    if(!confirmDelete) return;

    try{
      await deleteDoc(
        doc(db, "tasks", user.uid, "tasks", taskId)
      );
    } catch (error) {
      console.error("Failed to delete this task: ", error);
    }
  }

  const handleLogout = async ()=>{
    try{
      await signOut(auth);
      router.replace("/assingment/11/2602175462/auth/login")
      console.log("Logout berhasil");
    } catch(error) {
      console.error("Logout gagal:", error);
      
    }
  }

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Task Management App</h1>

          <div className={styles.actions}>
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
            <ThemeBtn />
          </div>
        </header>

        <section className={styles.addTask}>
          <h3>Add New Task</h3>

          <div className={styles.inputGroup}>
            <input
              type="text"
              value={newTasks}
              onChange={(e) => setNewTasks(e.target.value)}
              placeholder='ex: make a breakfast'
            />
            <button onClick={handleAddTask} className={styles.addBtn}>Add</button>
          </div>
        </section>

        <h2>Tasks List</h2>

        <div className={styles.taskList}>
          {tasks.map((task) => (
            <div key={task.id} className={styles.taskContainer}>
              <label>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={() =>
                    handleToogleDone(task.id, task.isDone)
                  }
                />
              </label>

              {editingId === task.id ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className={styles.editInput}
                />
              ) : (
                <h3
                  className={`${styles.taskText} ${
                    task.isDone ? styles.done : ""
                  }`}
                >
                  {task.value}
                </h3>
              )}

              <div className={styles.taskButtons}>
                {editingId === task.id ? (
                  <button onClick={handleDone} className={styles.addBtn}>Done</button>
                ) : (
                  <button onClick={() => handleEdit(task)} className={styles.editBtn}>
                    Edit
                  </button>
                )}

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  disabled={editingId === task.id}
                  className={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
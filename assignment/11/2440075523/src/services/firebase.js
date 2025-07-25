// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOflvgsyNL3ntPiROhr_mOxKL_qCui0RY",
  authDomain: "sesi11-dbb7c.firebaseapp.com",
  projectId: "sesi11-dbb7c",
  storageBucket: "sesi11-dbb7c.firebasestorage.app",
  messagingSenderId: "1075657638520",
  appId: "1:1075657638520:web:73f4826c143a325d8ae38d",
  measurementId: "G-NY6D1HFQTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const tasksCollection = collection(db, 'tasks');

export const getTasksRealtime = (callback) => {
  return onSnapshot(tasksCollection, (snapshot) => {
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(tasks);
  });
};

export const addTask = async (taskData) => {
  return await addDoc(tasksCollection, taskData);
};

export const updateTask = async (taskId, updates) => {
  return await updateDoc(doc(tasksCollection, taskId), updates);
};

export const deleteTask = async (taskId) => {
  return await deleteDoc(doc(tasksCollection, taskId));
};
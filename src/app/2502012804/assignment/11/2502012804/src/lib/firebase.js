import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDs9jvUxYSbxMyOS4oBlWcbGrqrorfKiSE",
  authDomain: "assinment-11-96dbb.firebaseapp.com",
  projectId: "assinment-11-96dbb",
  storageBucket: "assinment-11-96dbb.firebasestorage.app",
  messagingSenderId: "456911134603",
  appId: "1:456911134603:web:3d6fe93c80a06d185dd98e",
  measurementId: "G-9244EP6PMY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tasksCollection = collection(db, 'tasks');

const addTask = (task) => addDoc(tasksCollection, task);
const updateTask = (id, updatedData) => updateDoc(doc(db, 'tasks', id), updatedData);
const deleteTask = (id) => deleteDoc(doc(db, 'tasks', id));

const getTasks = (callback) => onSnapshot(tasksCollection, (snapshot) => {
  const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  callback(tasks);
});

export { db, addTask, updateTask, deleteTask, getTasks };
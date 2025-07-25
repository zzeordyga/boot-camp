import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const tasksRef = collection(db, "tasks");

export const addTask = (task) => addDoc(tasksRef, task);

export const updateTask = (id, updated) =>
  updateDoc(doc(db, "tasks", id), updated);

export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const listenToTasks = (cb) => {
  return onSnapshot(tasksRef, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    cb(tasks);
  });
};

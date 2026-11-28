import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const TASKS_COLLECTION = "tasks";

export async function addTask(title) {
  const trimmed = title.trim();
  if (!trimmed) {
    throw new Error("Task title cannot be empty");
  }

  return addDoc(collection(db, TASKS_COLLECTION), {
    title: trimmed,
    completed: false,
    createdAt: serverTimestamp(),
  });
}

export async function updateTask(id, data) {
  return updateDoc(doc(db, TASKS_COLLECTION, id), data);
}

export async function deleteTask(id) {
  return deleteDoc(doc(db, TASKS_COLLECTION, id));
}

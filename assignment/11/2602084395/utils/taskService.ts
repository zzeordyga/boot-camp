import { db } from "@/lib/firebase"
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp
} from "firebase/firestore"

export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: Timestamp
}

const tasksCollection = collection(db, "tasks")

export const addTask = async (title: string) => {
  await addDoc(tasksCollection, {
    title,
    completed: false,
    createdAt: Timestamp.now()
  })
}

export const updateTask = async (id: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => {
  const taskDoc = doc(db, "tasks", id)
  await updateDoc(taskDoc, updates)
}

export const deleteTask = async (id: string) => {
  const taskDoc = doc(db, "tasks", id)
  await deleteDoc(taskDoc)
}

export const subscribeToTasks = (callback: (tasks: Task[]) => void) => {
  const q = query(tasksCollection, orderBy("createdAt", "desc"))
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Task[]
    callback(tasks)
  })
}
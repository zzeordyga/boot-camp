// firebase/tasks.js

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot
} from 'firebase/firestore'
import db from './config'

const tasksRef = collection(db, 'tasks')

export function addTask(task) {
  return addDoc(tasksRef, task)
}

export function updateTask(id, updatedTask) {
  const taskDoc = doc(db, 'tasks', id)
  return updateDoc(taskDoc, updatedTask)
}

export function deleteTask(id) {
  const taskDoc = doc(db, 'tasks', id)
  return deleteDoc(taskDoc)
}

export function listenTasks(callback) {
  return onSnapshot(tasksRef, snapshot => {
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(tasks)
  })
}

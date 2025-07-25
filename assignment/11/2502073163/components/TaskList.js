import React from 'react';
import { useEffect, useState } from 'react'
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

export default function TaskList() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const tasksRef = collection(db, 'tasks')
    const unsubscribe = onSnapshot(tasksRef, snapshot => {
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setTasks(tasksData)
    })
    return () => unsubscribe()
  }, [])

  const addTask = async () => {
    const title = prompt('Enter task title:')
    if (title) {
      const tasksRef = collection(db, 'tasks')
      await addDoc(tasksRef, { title, done: false })
    }
  }

  const toggleTask = async (task) => {
    const taskRef = doc(db, 'tasks', task.id)
    await updateDoc(taskRef, { done: !task.done })
  }

  const deleteTask = async (id) => {
    const taskRef = doc(db, 'tasks', id)
    await deleteDoc(taskRef)
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      <button
        onClick={addTask}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Task
      </button>

      {tasks.map(task => (
        <div key={task.id} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task)}
            />
            <span className={task.done ? 'line-through' : ''}>
              {task.title}
            </span>
          </label>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
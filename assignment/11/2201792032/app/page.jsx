'use client'

import { useEffect, useState } from 'react'
import AddTaskForm from '@/components/AddTaskForm'
import TaskItem from '@/components/TaskItem'
import {
  listenTasks,
  updateTask,
  deleteTask
} from '@/firebase/tasks'

export default function HomePage() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const unsubscribe = listenTasks(setTasks)
    return () => unsubscribe()
  }, [])

  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>

      <AddTaskForm />

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet.</p>
      ) : (
        <div className="space-y-3">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}
    </main>
  )
}

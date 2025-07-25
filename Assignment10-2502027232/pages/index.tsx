'use client'
import { useState } from 'react'
import { useTasks } from '../hooks/useTasks'

export default function Home() {
  const { tasks, addTask, deleteTask } = useTasks()
  const [newTask, setNewTask] = useState('')

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Task Manager</h1>
      <input
        className="border p-2 mr-2"
        placeholder="New Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={() => { addTask(newTask); setNewTask(''); }} className="bg-blue-500 text-white p-2">Add</button>
      <ul className="mt-4">
        {tasks.map(task => (
          <li key={task.id} className="flex justify-between border-b py-2">
            {task.title}
            <button onClick={() => deleteTask(task.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

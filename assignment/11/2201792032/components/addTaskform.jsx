import { useState } from 'react'
import { addTask } from '@/firebase/tasks'

export default function AddTaskForm() {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!title.trim()) return

    setLoading(true)
    try {
      await addTask({ title: title.trim(), createdAt: Date.now() })
      setTitle('')
    } catch (err) {
      console.error('Failed to add task:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={title}
        placeholder="Enter new task"
        onChange={e => setTitle(e.target.value)}
        className="flex-1 border px-3 py-2 rounded-md"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        {loading ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}

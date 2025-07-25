import { useState } from 'react'

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(task.title)

  const handleSave = () => {
    onUpdate(task.id, { ...task, title: newTitle })
    setIsEditing(false)
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-md shadow-sm bg-white dark:bg-gray-800">
      {isEditing ? (
        <input
          className="flex-1 border px-2 py-1 rounded-md"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
      ) : (
        <span className="flex-1">{task.title}</span>
      )}

      <div className="ml-4 flex gap-2">
        {isEditing ? (
          <button
            className="bg-green-500 text-white px-2 py-1 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

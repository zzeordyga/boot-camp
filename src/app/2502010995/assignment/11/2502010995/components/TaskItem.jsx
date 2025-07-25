import { updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export default function TaskItem({ task }) {
  const toggleComplete = async () => {
    await updateDoc(doc(db, 'tasks', task.id), {
      completed: !task.completed,
    });
  };

  const deleteTask = async () => {
    await deleteDoc(doc(db, 'tasks', task.id));
  };

  return (
    <div className={`flex items-center justify-between p-3 rounded ${task.completed ? 'bg-green-800' : 'bg-gray-700'}`}>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleComplete}
          className="w-5 h-5"
        />
        <p className={`text-lg ${task.completed ? 'line-through text-gray-400' : ''}`}>
          {task.text}
        </p>
      </div>
      <button onClick={deleteTask} className="px-3 py-1 bg-red-600 text-white rounded">Hapus</button>
    </div>
  );
}

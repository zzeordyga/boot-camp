import { useEffect, useState } from 'react';
import { getTasksRealtime } from '../services/firebase';
import { useSettings } from '../context/SettingsContext';

export default function TaskList() {
  const { sortOrder } = useSettings();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = getTasksRealtime((fetchedTasks) => {
      const sortedTasks = [...fetchedTasks].sort((a, b) => {
        return sortOrder === 'asc' 
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      });
      setTasks(sortedTasks);
    });

    return () => unsubscribe();
  }, [sortOrder]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="p-2 border rounded">
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
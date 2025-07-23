import { useTasks } from '../hooks/useTasks';
import { useUserSettings } from '../context/UserSettingsContext';

export default function Home() {
  const { tasks, addTask } = useTasks();
  const { theme, setTheme } = useUserSettings();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Task Manager App</h1>
      <button onClick={() => addTask({ title: 'New Task' })} className="bg-blue-500 text-white px-2 py-1 rounded">
        Add Task
      </button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
import { useSettings } from './context/SettingsContext';
import TaskList from './components/TaskList';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const { theme } = useSettings();

  return (
    <div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <ThemeToggle />
        </header>
        <TaskList />
      </div>
    </div>
  );
}
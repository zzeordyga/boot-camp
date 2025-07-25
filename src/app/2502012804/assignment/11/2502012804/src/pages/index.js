import { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { useSettings } from '../context/SettingsContext';

export default function Home() {
  const { theme, toggleTheme, language, setLanguage } = useSettings();
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleEdit = (task) => {
    setTaskToEdit(task);
  };

  return (
    <div className={`app-container ${theme}`}>
      <header>
        <h1>Task Management App</h1>
        <div className="settings">
          <button onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </header>
      <main>
        <TaskForm taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
        <TaskList onEdit={handleEdit} />
      </main>
      <style jsx>{`
        .app-container {
          transition: background-color 0.3s, color 0.3s;
          min-height: 100vh;
        }
        .light {
          background-color: #f0f2f5;
          color: #333;
        }
        .dark {
          background-color: #1a1a1a;
          color: #f0f2f5;
        }
        header {
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #ccc;
        }
        main {
          padding: 2rem;
        }
      `}</style>
    </div>
  );
}
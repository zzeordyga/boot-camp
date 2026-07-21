"use client";

import { useTasks } from "../src/hooks/useTasks";
import { useSettings } from "../src/context/SettingsContext";
import TaskForm from "../src/components/TaskForm";
import TaskList from "../src/components/TaskList";
import SettingsBar from "../src/components/SettingsBar";

export default function HomePage() {
  const { tasks, loading, error, addTask, toggleTask, editTask, removeTask } =
    useTasks();
  const { theme, t } = useSettings();

  return (
    <div className={`app app--${theme}`}>
      <div className="app__container">
        <header className="app__header">
          <h1>{t.appTitle}</h1>
          <SettingsBar />
        </header>

        <TaskForm onAdd={addTask} />

        {error && <p className="error-text">Couldn't load tasks: {error}</p>}
        {loading ? (
          <p className="task-list__empty">Loading tasks…</p>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onEdit={editTask}
            onRemove={removeTask}
          />
        )}
      </div>
    </div>
  );
}

"use client";

import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import SettingsBar from "../components/SettingsBar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function HomePage() {
  const { t } = useContext(SettingsContext);
  const [sortOrder, setSortOrder] = useLocalStorage("taskSortOrder", "newest");

  return (
    <main className="container">
      <header className="app-header">
        <h1>{t.appTitle}</h1>
      </header>

      <SettingsBar sortOrder={sortOrder} onSortChange={setSortOrder} />
      <TaskForm />
      <TaskList sortOrder={sortOrder} />
    </main>
  );
}

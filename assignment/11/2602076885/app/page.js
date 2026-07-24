"use client";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SettingsPanel from "./components/SettingsPanel";
import { useSettings } from "./context/SettingsContext";

export default function Home() {
  const { language } = useSettings();
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "10px",
            }}
          >
            {language === "en" ? "✅ Task Management" : "✅ Manajemen Tugas"}
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: "16px",
            }}
          >
            Manajemen tugas agar hidupmu makin gg.
          </p>
        </header>

        <SettingsPanel />

        <TaskForm />

        <TaskList />
      </div>
    </main>
  );
}

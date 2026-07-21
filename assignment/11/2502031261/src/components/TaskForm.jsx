"use client";

import { useState } from "react";
import { useSettings } from "../context/SettingsContext";

export default function TaskForm({ onAdd }) {
  const { t } = useSettings();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      setError("Task title can't be empty.");
      return;
    }
    if (trimmed.length > 200) {
      setError("Task title is too long (max 200 characters).");
      return;
    }

    setError("");
    onAdd(trimmed);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="task-form" noValidate>
      <input
        type="text"
        required
        maxLength={200}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t.newTaskPlaceholder}
        aria-label={t.newTaskPlaceholder}
        className="task-form__input"
      />
      <button type="submit" className="btn btn--primary">
        {t.addButton}
      </button>
      {error && <p className="error-text">{error}</p>}
    </form>
  );
}

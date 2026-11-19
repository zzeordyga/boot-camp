"use client";

import { useContext, useState } from "react";
import { SettingsContext } from "../context/SettingsContext";
import { addTask } from "../lib/tasks";

export default function TaskForm() {
  const { t } = useContext(SettingsContext);
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      setError(t.emptyTitleError);
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      await addTask(trimmed);
      setTitle("");
    } catch {
      setError(t.actionError);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          placeholder={t.placeholder}
          aria-label={t.placeholder}
          disabled={submitting}
        />
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? t.adding : t.addButton}
        </button>
      </div>
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

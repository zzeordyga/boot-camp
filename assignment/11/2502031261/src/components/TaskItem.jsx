"use client";

import { useState } from "react";
import { useSettings } from "../context/SettingsContext";

export default function TaskItem({ task, onToggle, onEdit, onRemove }) {
  const { t } = useSettings();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  function handleSave() {
    if (draft.trim()) {
      onEdit(task.id, draft);
    }
    setIsEditing(false);
  }

  function handleCancel() {
    setDraft(task.title);
    setIsEditing(false);
  }

  return (
    <li className={`task-item ${task.completed ? "task-item--done" : ""}`}>
      <label className="task-item__checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id, task.completed)}
          aria-label={`Mark "${task.title}" as ${
            task.completed ? "pending" : "completed"
          }`}
        />
      </label>

      {isEditing ? (
        <div className="task-item__edit">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
          />
          <button onClick={handleSave} className="btn btn--small">
            {t.save}
          </button>
          <button onClick={handleCancel} className="btn btn--small btn--ghost">
            {t.cancel}
          </button>
        </div>
      ) : (
        <>
          <span className="task-item__title">{task.title}</span>
          <div className="task-item__actions">
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn--small btn--ghost"
              aria-label={`${t.edit} "${task.title}"`}
            >
              {t.edit}
            </button>
            <button
              onClick={() => onRemove(task.id)}
              className="btn btn--small btn--danger"
              aria-label={`${t.delete} "${task.title}"`}
            >
              {t.delete}
            </button>
          </div>
        </>
      )}
    </li>
  );
}

"use client";

import { useContext, useState } from "react";
import { SettingsContext } from "../context/SettingsContext";

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const { t } = useContext(SettingsContext);
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);

  function handleSave() {
    const trimmed = draftTitle.trim();
    if (!trimmed) return;
    if (trimmed !== task.title) {
      onEdit(task.id, trimmed);
    }
    setIsEditing(false);
  }

  function handleCancel() {
    setDraftTitle(task.title);
    setIsEditing(false);
  }

  return (
    <li
      className={`task-item${task.completed ? " completed" : ""}`}
      data-completed={task.completed ? "true" : "false"}
    >
      <div className="task-main">
        <input
          type="checkbox"
          checked={Boolean(task.completed)}
          onChange={() => onToggle(task.id, !task.completed)}
          aria-label={`${t.markComplete}: ${task.title}`}
        />

        {isEditing ? (
          <input
            type="text"
            className="task-edit-input"
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            aria-label={t.edit}
          />
        ) : (
          <span className="task-title">{task.title}</span>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button type="button" className="btn-primary" onClick={handleSave}>
              {t.save}
            </button>
            <button type="button" onClick={handleCancel}>
              {t.cancel}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                setDraftTitle(task.title);
                setIsEditing(true);
              }}
            >
              {t.edit}
            </button>
            <button
              type="button"
              className="btn-danger"
              onClick={() => onDelete(task.id)}
            >
              {t.delete}
            </button>
          </>
        )}
      </div>
    </li>
  );
}

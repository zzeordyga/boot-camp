'use client';

import { useEffect, useRef, useState } from 'react';
import { useSettings } from '@/context/SettingsContext';

/**
 * Satu baris task: checkbox selesai, ubah judul inline, hapus dengan konfirmasi inline.
 */
export default function TaskItem({ task, onToggle, onRename, onDelete }) {
  const { t } = useSettings();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const [confirming, setConfirming] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const startEdit = () => {
    setDraft(task.title);
    setConfirming(false);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(task.title);
    setIsEditing(false);
  };

  const submitEdit = (event) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (trimmed !== task.title) onRename(task.id, trimmed);
    setIsEditing(false);
  };

  const checkboxId = `task-${task.id}`;

  return (
    <li className={`task-item${task.completed ? ' is-done' : ''}`}>
      {isEditing ? (
        <form className="task-edit" onSubmit={submitEdit}>
          <input
            ref={inputRef}
            className="input"
            aria-label={t('editLabel')}
            value={draft}
            maxLength={200}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && cancelEdit()}
          />
          <div className="task-actions">
            <button type="submit" className="btn btn-primary" disabled={!draft.trim()}>
              {t('save')}
            </button>
            <button type="button" className="btn" onClick={cancelEdit}>
              {t('cancel')}
            </button>
          </div>
        </form>
      ) : (
        <>
          <label className="task-main" htmlFor={checkboxId}>
            <input
              id={checkboxId}
              type="checkbox"
              className="task-check"
              checked={task.completed}
              onChange={() => onToggle(task.id, task.completed)}
              aria-label={t('toggleLabel', { title: task.title })}
            />
            <span className="task-title">{task.title}</span>
          </label>

          {confirming ? (
            <div className="task-confirm" role="group" aria-label={t('confirmDelete')}>
              <span className="task-confirm-text">{t('confirmDelete')}</span>
              <div className="task-actions">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    setConfirming(false);
                    onDelete(task.id);
                  }}
                >
                  {t('confirmYes')}
                </button>
                <button type="button" className="btn" onClick={() => setConfirming(false)}>
                  {t('cancel')}
                </button>
              </div>
            </div>
          ) : (
            <div className="task-actions">
              <button type="button" className="btn" onClick={startEdit}>
                {t('edit')}
              </button>
              <button type="button" className="btn btn-danger-outline" onClick={() => setConfirming(true)}>
                {t('delete')}
              </button>
            </div>
          )}
        </>
      )}
    </li>
  );
}

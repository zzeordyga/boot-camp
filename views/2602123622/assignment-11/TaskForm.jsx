'use client';

import { useState } from 'react';
import { t } from './translations';
import { useSettings } from './SettingsContext';
import styles from './styles.module.css';

export default function TaskForm({ task, onClose, onSubmit }) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState(task?.status || 'todo');
  const [priority, setPriority] = useState(task?.priority || 'medium');
  const { language } = useSettings();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      id: task?.id,
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t('taskTitle', language)}
        required
        className={styles.input}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={t('taskDescription', language)}
        className={styles.textarea}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)} className={styles.select}>
        <option value="todo">{t('todo', language)}</option>
        <option value="in-progress">{t('inProgress', language)}</option>
        <option value="done">{t('done', language)}</option>
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value)} className={styles.select}>
        <option value="low">{t('low', language)}</option>
        <option value="medium">{t('medium', language)}</option>
        <option value="high">{t('high', language)}</option>
      </select>
      <div className={styles.formActions}>
        <button type="submit" className={styles.submitBtn}>
          {task?.id ? t('updateTask', language) : t('addTaskBtn', language)}
        </button>
        <button type="button" onClick={onClose} className={styles.cancelBtn}>{t('cancel', language)}</button>
      </div>
    </form>
  );
}
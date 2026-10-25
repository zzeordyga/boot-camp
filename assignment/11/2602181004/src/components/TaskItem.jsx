'use client'
import { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { errorKey } from '@/lib/taskUtils';
import TaskForm from './TaskForm';
import styles from './tasks.module.css';

const priorityLabels = { low: 'priorityLow', medium: 'priorityMedium', high: 'priorityHigh' };

export default function TaskItem({ task, onToggle, onUpdate, onDelete }) {
  const { t, locale } = useSettings();
  const [mode, setMode] = useState('view');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const run = async (action) => {
    setBusy(true);
    setError('');
    try {
      await action();
      return true;
    } catch (err) {
      setError(t(errorKey(err)));
      return false;
    } finally {
      setBusy(false);
    }
  };

  if (mode === 'edit') {
    return (
      <li className={`${styles.task} ${styles.taskEditing}`}>
        <TaskForm
          initialValues={{ title: task.title, description: task.description, priority: task.priority }}
          submitLabel={t('save')}
          busyLabel={t('saving')}
          onCancel={() => setMode('view')}
          onSubmit={async (fields) => {
            await onUpdate(task.id, fields);
            setMode('view');
          }}
        />
      </li>
    );
  }

  const created = task.createdAt
    ? new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(task.createdAt)
    : '—';

  return (
    <li className={`${styles.task} ${task.completed ? styles.taskDone : ''}`}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={task.completed}
        disabled={busy}
        aria-label={t(task.completed ? 'markActive' : 'markDone', { title: task.title })}
        onChange={() => run(() => onToggle(task))}
      />
      <div className={styles.taskBody}>
        <div className={styles.taskHead}>
          <h3 className={styles.taskTitle}>{task.title}</h3>
          <span className={`${styles.priority} ${styles[`priority-${task.priority}`]}`}>
            {t(priorityLabels[task.priority])}
          </span>
        </div>
        {task.description && <p className={styles.taskDescription}>{task.description}</p>}
        <span className={styles.taskMeta}>{t('created', { date: created })}</span>
        {error && (
          <span className={styles.fieldError} role="alert">
            {error}
          </span>
        )}
        {mode === 'confirm' ? (
          <div className={styles.confirm}>
            <span>{t('deleteConfirm')}</span>
            <div className={styles.taskActions}>
              <button type="button" className={styles.ghostButton} onClick={() => setMode('view')} disabled={busy}>
                {t('cancel')}
              </button>
              <button
                type="button"
                className={styles.dangerButton}
                disabled={busy}
                onClick={async () => {
                  if (!(await run(() => onDelete(task.id)))) setMode('view');
                }}
              >
                {busy ? t('deleting') : t('delete')}
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.taskActions}>
            <button type="button" className={styles.ghostButton} onClick={() => setMode('edit')} disabled={busy}>
              {t('edit')}
            </button>
            <button type="button" className={styles.ghostButton} onClick={() => setMode('confirm')} disabled={busy}>
              {t('delete')}
            </button>
          </div>
        )}
      </div>
    </li>
  );
}

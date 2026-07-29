import { useState } from 'react';
import { formatDate } from './utils';
import { t } from './translations';
import { useSettings } from './SettingsContext';
import styles from './styles.module.css';

export default function TaskList({ tasks, onEdit, onDelete }) {
  const [filter, setFilter] = useState('all');
  const { language } = useSettings();

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <div className={styles.container}>
      <div className={styles.filterBar}>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className={styles.filterSelect}>
          <option value="all">{t('all', language)}</option>
          <option value="todo">{t('todo', language)}</option>
          <option value="in-progress">{t('inProgress', language)}</option>
          <option value="done">{t('done', language)}</option>
        </select>
      </div>
      {filteredTasks.length === 0 ? (
        <p className={styles.empty}>{t('noTasks', language)}</p>
      ) : (
        <div className={styles.taskGrid}>
          {filteredTasks.map((task) => (
            <div key={task.id} className={styles.taskCard}>
              <div className={styles.taskHeader}>
                <h3 className={styles.taskTitle}>{task.title}</h3>
                <span className={`${styles.badge} ${styles[task.status]}`}>{task.status}</span>
              </div>
              <p className={styles.taskDesc}>{task.description}</p>
              <div className={styles.taskMeta}>
                <span className={`${styles.priority} ${styles[task.priority]}`}>{task.priority}</span>
                <span className={styles.date}>{formatDate(task.updatedAt || task.createdAt)}</span>
              </div>
              <div className={styles.taskActions}>
                <button onClick={() => onEdit(task)} className={styles.editBtn}>{t('edit', language)}</button>
                <button onClick={() => onDelete(task.id)} className={styles.deleteBtn}>{t('delete', language)}</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
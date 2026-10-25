'use client'
import { useMemo } from 'react';
import { useSettings } from '@/context/SettingsContext';
import useLocalStorage from '@/hooks/useLocalStorage';
import useTasks from '@/hooks/useTasks';
import { createTask, deleteTask, updateTask } from '@/lib/tasks';
import { FILTERS, SORTS, countTasks, errorKey, filterTasks, sortTasks } from '@/lib/taskUtils';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import styles from './tasks.module.css';

export const PREFERENCES_KEY = 'task-manager-preferences';

const defaultPreferences = { sort: 'newest', filter: 'all' };
const filterLabels = { all: 'filterAll', active: 'filterActive', done: 'filterDone' };
const sortLabels = { newest: 'sortNewest', oldest: 'sortOldest', priority: 'sortPriority', title: 'sortTitle' };
const emptyLabels = { all: 'emptyAll', active: 'emptyActive', done: 'emptyDone' };

export default function TaskBoard() {
  const { t } = useSettings();
  const { tasks, status, live, error, retry } = useTasks();
  const [preferences, setPreferences] = useLocalStorage(PREFERENCES_KEY, defaultPreferences);
  const sort = SORTS.includes(preferences?.sort) ? preferences.sort : defaultPreferences.sort;
  const filter = FILTERS.includes(preferences?.filter) ? preferences.filter : defaultPreferences.filter;

  const counts = useMemo(() => countTasks(tasks), [tasks]);
  const visible = useMemo(() => sortTasks(filterTasks(tasks, filter), sort), [tasks, filter, sort]);
  const percent = counts.all ? Math.round((counts.done / counts.all) * 100) : 0;

  const setPreference = (field, value) =>
    setPreferences((current) => ({ ...defaultPreferences, ...current, [field]: value }));

  return (
    <>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.pageTitle}>{t('appTitle')}</h1>
          <p className={styles.subtitle}>{t('appSubtitle')}</p>
        </div>
        <span className={`${styles.badge} ${live ? styles.badgeLive : ''}`}>
          <span className={styles.dot} />
          {live ? t('live') : status === 'error' ? t('offline') : t('connecting')}
        </span>
      </div>

      <div className={styles.board}>
        <aside className={styles.sidebar}>
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>{t('newTask')}</h2>
            {status === 'ready' ? (
              <TaskForm submitLabel={t('addTask')} busyLabel={t('adding')} onSubmit={createTask} resetOnSubmit />
            ) : (
              <p className={styles.muted}>{t(status === 'error' ? 'loadError' : 'loading')}</p>
            )}
          </section>
        </aside>

        <section className={styles.listColumn}>
          {status === 'ready' && counts.all > 0 && (
            <div className={styles.progress}>
              <span className={styles.progressText}>{t('progress', { done: counts.done, total: counts.all })}</span>
              <div
                className={styles.progressTrack}
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className={styles.progressBar} style={{ width: `${percent}%` }} />
              </div>
            </div>
          )}

          <div className={styles.toolbar}>
            <div className={styles.tabs} role="group">
              {FILTERS.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={filter === option}
                  className={`${styles.tab} ${filter === option ? styles.tabActive : ''}`}
                  onClick={() => setPreference('filter', option)}
                >
                  {t(filterLabels[option])}
                  <span className={styles.tabCount}>{counts[option]}</span>
                </button>
              ))}
            </div>
            <label className={styles.sortLabel}>
              <span>{t('sortBy')}</span>
              <select
                className={`${styles.input} ${styles.select} ${styles.sortSelect}`}
                value={sort}
                onChange={(event) => setPreference('sort', event.target.value)}
              >
                {SORTS.map((option) => (
                  <option key={option} value={option}>
                    {t(sortLabels[option])}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {status === 'loading' && (
            <ul className={styles.list} aria-hidden="true">
              {[0, 1, 2].map((key) => (
                <li key={key} className={`${styles.task} ${styles.skeleton}`}>
                  <span className={styles.skeletonLine} style={{ width: '50%' }} />
                  <span className={styles.skeletonLine} />
                </li>
              ))}
            </ul>
          )}

          {status === 'error' && (
            <div className={`${styles.formError} ${styles.loadError}`} role="alert">
              <span>
                <strong>{t('loadError')}</strong> {t(errorKey(error))}
              </span>
              <button type="button" className={styles.ghostButton} onClick={retry}>
                {t('retry')}
              </button>
            </div>
          )}

          {status === 'ready' && visible.length === 0 && <div className={styles.empty}>{t(emptyLabels[filter])}</div>}

          {status === 'ready' && visible.length > 0 && (
            <ul className={styles.list}>
              {visible.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={(item) => updateTask(item.id, { completed: !item.completed })}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}

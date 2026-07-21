"use client";

import { useMemo } from "react";
import TaskItem from "./TaskItem";
import { useSettings } from "../context/SettingsContext";
import { sortTasks, getTaskStats } from "../lib/taskUtils";

export default function TaskList({ tasks, onToggle, onEdit, onRemove }) {
  const { t, sortOrder, setSortOrder } = useSettings();

  const sorted = useMemo(() => sortTasks(tasks, sortOrder), [tasks, sortOrder]);
  const stats = useMemo(() => getTaskStats(tasks), [tasks]);

  return (
    <div>
      <div className="task-list__toolbar">
        <span className="task-list__stats">
          {stats.pending} {t.pending} · {stats.completed} {t.completed}
        </span>

        <label className="task-list__sort">
          {t.sortLabel}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">{t.newest}</option>
            <option value="oldest">{t.oldest}</option>
            <option value="alphabetical">{t.alphabetical}</option>
          </select>
        </label>
      </div>

      {sorted.length === 0 ? (
        <p className="task-list__empty">{t.emptyState}</p>
      ) : (
        <ul className="task-list">
          {sorted.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onRemove={onRemove}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

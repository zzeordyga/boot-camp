export const PRIORITIES = ['low', 'medium', 'high'];
export const FILTERS = ['all', 'active', 'done'];
export const SORTS = ['newest', 'oldest', 'priority', 'title'];

export const TITLE_MAX = 100;
export const DESCRIPTION_MAX = 500;

const priorityRank = { high: 0, medium: 1, low: 2 };

function createdTime(task) {
  return task.createdAt instanceof Date ? task.createdAt.getTime() : Number.POSITIVE_INFINITY;
}

function newestFirst(a, b) {
  return createdTime(b) - createdTime(a);
}

export function sortTasks(tasks, sort) {
  const sorted = [...tasks];
  switch (sort) {
    case 'oldest':
      return sorted.sort((a, b) => createdTime(a) - createdTime(b));
    case 'priority':
      return sorted.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority] || newestFirst(a, b));
    case 'title':
      return sorted.sort(
        (a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }) || newestFirst(a, b),
      );
    default:
      return sorted.sort(newestFirst);
  }
}

export function filterTasks(tasks, filter) {
  if (filter === 'active') return tasks.filter((task) => !task.completed);
  if (filter === 'done') return tasks.filter((task) => task.completed);
  return tasks;
}

export function countTasks(tasks) {
  const done = tasks.filter((task) => task.completed).length;
  return { all: tasks.length, active: tasks.length - done, done };
}

export function validateTask({ title = '', description = '', priority }) {
  const errors = {};
  const trimmedTitle = title.trim();
  if (!trimmedTitle) errors.title = 'titleRequired';
  else if (trimmedTitle.length > TITLE_MAX) errors.title = 'titleTooLong';
  if (description.trim().length > DESCRIPTION_MAX) errors.description = 'descriptionTooLong';
  if (!PRIORITIES.includes(priority)) errors.priority = 'priorityInvalid';
  return errors;
}

export function errorKey(error) {
  if (error?.code === 'not-configured') return 'errorNotConfigured';
  if (error?.code === 'permission-denied') return 'errorPermission';
  if (error?.code === 'unavailable') return 'errorUnavailable';
  if (error?.code === 'deadline-exceeded') return 'errorTimeout';
  return 'errorUnknown';
}

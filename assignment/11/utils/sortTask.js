export function sortTasks(tasks, order) {
  return [...tasks].sort((a, b) =>
    order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
  );
}

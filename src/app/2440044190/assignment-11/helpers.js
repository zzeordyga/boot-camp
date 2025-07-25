export function sortTasks(tasks, sortBy = "createdAt") {
  return [...tasks].sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1);
}
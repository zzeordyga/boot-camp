/**
 * Sorts a list of tasks according to the given order.
 * Pure function — no side effects — so it's easy to unit test in isolation.
 *
 * @param {Array<{id: string, title: string, completed: boolean, createdAt: number}>} tasks
 * @param {"newest" | "oldest" | "alphabetical"} order
 * @returns {Array} a NEW sorted array (does not mutate the input)
 */
export function sortTasks(tasks, order = "newest") {
  if (!Array.isArray(tasks)) return [];

  const copy = [...tasks];

  switch (order) {
    case "oldest":
      return copy.sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0));
    case "alphabetical":
      return copy.sort((a, b) =>
        (a.title ?? "").localeCompare(b.title ?? "")
      );
    case "newest":
    default:
      return copy.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
  }
}

/**
 * Returns counts of completed vs pending tasks — used in the summary bar.
 */
export function getTaskStats(tasks) {
  if (!Array.isArray(tasks)) return { total: 0, completed: 0, pending: 0 };

  const completed = tasks.filter((t) => t.completed).length;
  return {
    total: tasks.length,
    completed,
    pending: tasks.length - completed,
  };
}

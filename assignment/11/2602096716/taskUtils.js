export function sortTasksByDate(tasks, order = "newest") {
  return [...tasks].sort((a, b) => {
    const aTime = a.createdAt?.seconds || 0;
    const bTime = b.createdAt?.seconds || 0;
    return order === "newest" ? bTime - aTime : aTime - bTime;
  });
}
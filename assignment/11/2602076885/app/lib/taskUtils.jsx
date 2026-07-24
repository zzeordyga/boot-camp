export function sortTasks(tasks, sortOrder) {
  return [...tasks].sort((a, b) => {
    const timeA = a.createdAt?.toMillis?.() || 0;
    const timeB = b.createdAt?.toMillis?.() || 0;

    if (sortOrder === "newest") {
      return timeB - timeA;
    }

    return timeA - timeB;
  });
}

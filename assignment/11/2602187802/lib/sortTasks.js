function getTimestampMillis(createdAt) {
  if (createdAt == null) {
    return Number.POSITIVE_INFINITY;
  }
  if (typeof createdAt.toMillis === "function") {
    return createdAt.toMillis();
  }
  if (typeof createdAt.seconds === "number") {
    return createdAt.seconds * 1000;
  }
  if (createdAt instanceof Date) {
    return createdAt.getTime();
  }
  if (typeof createdAt === "number") {
    return createdAt;
  }
  return 0;
}

export function sortTasks(tasks, order = "newest") {
  return [...tasks].sort((a, b) => {
    const timeA = getTimestampMillis(a.createdAt);
    const timeB = getTimestampMillis(b.createdAt);

    if (timeA === timeB) return 0;
    return order === "oldest" ? timeA - timeB : timeB - timeA;
  });
}

export const filterTasks = (tasks: Array<{ completed: boolean }>, showCompleted: boolean) => {
  if (showCompleted) {
    return tasks
  }
  return tasks.filter((task) => !task.completed)
}

export const formatDate = (timestamp: { toDate: () => Date }): string => {
  const date = timestamp.toDate()
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })
}
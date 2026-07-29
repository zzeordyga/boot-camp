export function formatDate(timestamp) {
  if (!timestamp) return 'Just now';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleString();
}

export function generateTaskId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

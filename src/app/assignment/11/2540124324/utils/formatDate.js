// utils/formatDate.js
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("id-ID");
}

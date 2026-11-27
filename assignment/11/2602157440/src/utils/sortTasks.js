export const SORT_ORDERS = ['newest', 'oldest', 'title', 'status'];

function time(task) {
  const value = task?.createdAt;
  if (!value) return 0;
  if (typeof value === 'number') return value;
  if (value instanceof Date) return value.getTime();
  if (typeof value.toMillis === 'function') return value.toMillis();
  return 0;
}

const byNewest = (a, b) => time(b) - time(a);
const byOldest = (a, b) => time(a) - time(b);
const byTitle = (a, b) =>
  (a.title ?? '').localeCompare(b.title ?? '', undefined, { sensitivity: 'base' }) ||
  byNewest(a, b);
const byStatus = (a, b) => Number(Boolean(a.completed)) - Number(Boolean(b.completed)) || byNewest(a, b);

const comparators = {
  newest: byNewest,
  oldest: byOldest,
  title: byTitle,
  status: byStatus,
};

/**
 * Mengembalikan array BARU yang sudah diurutkan (input tidak diubah).
 * - newest: createdAt terbaru dulu
 * - oldest: createdAt terlama dulu
 * - title : judul A-Z (tidak peka huruf besar/kecil)
 * - status: belum selesai dulu, lalu selesai (masing-masing terbaru dulu)
 * Urutan tidak dikenal -> fallback ke 'newest'.
 */
export function sortTasks(tasks, order = 'newest') {
  if (!Array.isArray(tasks)) return [];
  const compare = comparators[order] ?? comparators.newest;
  return [...tasks].sort(compare);
}

export default sortTasks;

import { sortTasks, SORT_ORDERS } from '@/utils/sortTasks';

const tasks = [
  { id: 'a', title: 'beli susu', completed: true, createdAt: 2000 },
  { id: 'b', title: 'Anjing jalan-jalan', completed: false, createdAt: 3000 },
  { id: 'c', title: 'cuci mobil', completed: false, createdAt: 1000 },
  { id: 'd', title: 'Bayar listrik', completed: true, createdAt: 4000 },
];

const ids = (list) => list.map((task) => task.id);

describe('sortTasks', () => {
  it('menyediakan empat urutan', () => {
    expect(SORT_ORDERS).toEqual(['newest', 'oldest', 'title', 'status']);
  });

  it('newest: createdAt terbaru lebih dulu', () => {
    expect(ids(sortTasks(tasks, 'newest'))).toEqual(['d', 'b', 'a', 'c']);
  });

  it('oldest: createdAt terlama lebih dulu', () => {
    expect(ids(sortTasks(tasks, 'oldest'))).toEqual(['c', 'a', 'b', 'd']);
  });

  it('title: urut abjad tanpa peduli huruf besar/kecil', () => {
    expect(ids(sortTasks(tasks, 'title'))).toEqual(['b', 'd', 'a', 'c']);
  });

  it('status: belum selesai dulu, lalu selesai (masing-masing terbaru dulu)', () => {
    expect(ids(sortTasks(tasks, 'status'))).toEqual(['b', 'c', 'd', 'a']);
  });

  it('tidak mengubah array asli', () => {
    const copy = [...tasks];
    sortTasks(tasks, 'title');
    expect(tasks).toEqual(copy);
  });

  it('urutan tidak dikenal memakai newest', () => {
    expect(ids(sortTasks(tasks, 'acak'))).toEqual(ids(sortTasks(tasks, 'newest')));
  });

  it('mendukung createdAt berupa Date dan objek Timestamp (toMillis)', () => {
    const mixed = [
      { id: 'x', title: 'x', completed: false, createdAt: new Date(1000) },
      { id: 'y', title: 'y', completed: false, createdAt: { toMillis: () => 3000 } },
      { id: 'z', title: 'z', completed: false, createdAt: 2000 },
    ];
    expect(ids(sortTasks(mixed, 'newest'))).toEqual(['y', 'z', 'x']);
  });

  it('mengembalikan array kosong untuk input bukan array', () => {
    expect(sortTasks(null, 'newest')).toEqual([]);
    expect(sortTasks([], 'title')).toEqual([]);
  });
});

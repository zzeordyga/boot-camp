export const translations = {
  id: {
    appTitle: 'Manajer Tugas',
    tagline: 'Kelola tugas harianmu secara real-time.',
    addPlaceholder: 'Apa yang perlu dikerjakan?',
    addLabel: 'Judul tugas baru',
    add: 'Tambah',
    adding: 'Menambah…',
    sortBy: 'Urutkan',
    'sort.newest': 'Terbaru',
    'sort.oldest': 'Terlama',
    'sort.title': 'Judul (A–Z)',
    'sort.status': 'Status',
    loading: 'Memuat tugas…',
    error: 'Gagal memuat tugas: {message}',
    actionError: 'Aksi gagal: {message}',
    empty: 'Belum ada tugas. Tambahkan tugas pertamamu!',
    progress: '{done} dari {total} selesai',
    edit: 'Ubah',
    save: 'Simpan',
    cancel: 'Batal',
    delete: 'Hapus',
    confirmDelete: 'Hapus tugas ini?',
    confirmYes: 'Ya, hapus',
    editLabel: 'Ubah judul tugas',
    toggleLabel: 'Tandai "{title}" selesai',
    switchToDark: 'Ganti ke mode gelap',
    switchToLight: 'Ganti ke mode terang',
    language: 'Bahasa',
  },
  en: {
    appTitle: 'Task Manager',
    tagline: 'Manage your daily tasks in real time.',
    addPlaceholder: 'What needs to be done?',
    addLabel: 'New task title',
    add: 'Add',
    adding: 'Adding…',
    sortBy: 'Sort by',
    'sort.newest': 'Newest',
    'sort.oldest': 'Oldest',
    'sort.title': 'Title (A–Z)',
    'sort.status': 'Status',
    loading: 'Loading tasks…',
    error: 'Failed to load tasks: {message}',
    actionError: 'Action failed: {message}',
    empty: 'No tasks yet. Add your first task!',
    progress: '{done} of {total} completed',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    confirmDelete: 'Delete this task?',
    confirmYes: 'Yes, delete',
    editLabel: 'Edit task title',
    toggleLabel: 'Mark "{title}" as done',
    switchToDark: 'Switch to dark mode',
    switchToLight: 'Switch to light mode',
    language: 'Language',
  },
};

export const LANGUAGES = ['id', 'en'];

/** Ambil teks terjemahan; `{nama}` di template diganti dari `vars`. */
export function translate(lang, key, vars = {}) {
  const dict = translations[lang] ?? translations.id;
  const template = dict[key] ?? translations.id[key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_, name) =>
    vars[name] !== undefined ? String(vars[name]) : `{${name}}`
  );
}

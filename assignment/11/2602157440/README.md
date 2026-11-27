# Assignment 11 — Task Management App dengan Next.js

**Nama:** Alif Arya Ramadhan  
**NIM:** 2602157440

Aplikasi manajemen tugas dengan **Next.js (App Router, JavaScript)**, **Context API**, custom hook
**useLocalStorage**, **Firebase Firestore** real-time (`onSnapshot`), dan unit test **Jest + React Testing Library**.

## Fitur

- Tambah, centang selesai, ubah judul (inline), dan hapus task (dengan konfirmasi di dalam halaman, tanpa `window.confirm`).
- Data real-time dari collection `tasks` (`title`, `completed`, `createdAt` = `serverTimestamp()`).
- Urutan task: Terbaru, Terlama, Judul (A–Z), Status — pilihan disimpan di `localStorage`.
- Tema terang/gelap dan bahasa Indonesia/English — disimpan di `localStorage` lewat Context.
- Responsif: rapi di desktop dan HP (lebar 390px) tanpa scroll horizontal.

## Cara menjalankan

```bash
cd assignment/11/2602157440
npm install
npm run dev      # buka http://localhost:3000
npm test         # jalankan unit test (Jest)
npm run build    # build produksi
```

### Firestore Security Rules

Konfigurasi Firebase sudah ada di `src/lib/firebase.js`. Agar collection `tasks` bisa dibaca/ditulis,
Security Rules project harus mengizinkannya. Salin isi `firestore.rules` (atau cukup blok
`match /tasks/{taskId}` bila project sudah punya rules lain) ke **Firebase Console → Firestore Database → Rules → Publish**.
Tanpa rules ini aplikasi akan menampilkan pesan *"Missing or insufficient permissions"*.

## Pemetaan requirement ke file

| Requirement | File | Keterangan |
|---|---|---|
| Custom hook `useLocalStorage` | `src/hooks/useLocalStorage.js` | Render awal pakai nilai default, nilai tersimpan dibaca di `useEffect` setelah mount (tanpa hydration error); akses `localStorage` dibungkus `try/catch` |
| Preferensi urutan sort | `src/app/page.js` | `useLocalStorage('task-sort-order', 'newest')` |
| Context API (tema & bahasa) | `src/context/SettingsContext.js` | `SettingsProvider` + `useSettings()` → `theme`, `toggleTheme`, `language`, `setLanguage`, `t()`; disimpan via `useLocalStorage` |
| Terjemahan `t()` | `src/i18n/translations.js` | Kamus `id` / `en` dengan placeholder `{nama}` |
| Provider global | `src/app/layout.js` | Membungkus seluruh app dengan `SettingsProvider` |
| Firebase init | `src/lib/firebase.js` | `getApps()` mencegah inisialisasi ganda |
| CRUD + real-time Firestore | `src/hooks/useTasks.js` | `onSnapshot` + state `loading`/`error`, `unsubscribe` saat cleanup; `addDoc`, `updateDoc`, `deleteDoc` |
| Tambah task | `src/components/TaskForm.js` | |
| Centang / ubah judul / hapus + konfirmasi | `src/components/TaskItem.js` | Konfirmasi hapus inline (“Ya, hapus” / “Batal”) |
| Header nama & NIM, toggle tema & bahasa | `src/components/Header.js` | |
| Utilitas sort | `src/utils/sortTasks.js` | `sortTasks(tasks, order)` — `newest`, `oldest`, `title`, `status` |
| Unit test utilitas | `__tests__/sortTasks.test.js` | |
| Unit test komponen | `__tests__/TaskItem.test.js` | Render judul, toggle, ubah judul, hapus dengan konfirmasi |
| Konfigurasi Jest | `jest.config.js`, `jest.setup.js` | `next/jest`, `testEnvironment: 'jsdom'`, `@testing-library/jest-dom` |
| Desain responsif | `src/app/globals.css` | Variabel CSS untuk tema, media query `max-width: 560px` |
| Security Rules | `firestore.rules` | Validasi field `tasks` |

## Struktur

```
assignment/11/2602157440/
├── __tests__/
│   ├── sortTasks.test.js
│   └── TaskItem.test.js
├── src/
│   ├── app/          layout.js, page.js, globals.css
│   ├── components/   Header.js, TaskForm.js, TaskItem.js
│   ├── context/      SettingsContext.js
│   ├── hooks/        useLocalStorage.js, useTasks.js
│   ├── i18n/         translations.js
│   ├── lib/          firebase.js
│   └── utils/        sortTasks.js
├── firestore.rules
├── jest.config.js
├── jest.setup.js
├── jsconfig.json
├── next.config.mjs
└── package.json
```

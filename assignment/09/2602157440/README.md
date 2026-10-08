# Assignment 09 - Setup Firebase & Advanced Features in Next.js

Alif Arya Ramadhan - 2602157440

Project Next.js (App Router) yang terhubung ke Cloud Firestore. Halaman `/posts`
menampilkan collection `posts`, ikut berubah secara real-time, dan bisa dicari
berdasarkan judul.

## Menjalankan

1. Isi `firebaseConfig` di `src/lib/firebase.js` dengan config dari Firebase Console.
2. Jalankan:

   ```bash
   npm install
   npm run dev
   ```

3. Buka http://localhost:3000/posts, lalu klik "Tambah 3 data contoh".

## Pemetaan ke soal

| Bagian | Implementasi |
| --- | --- |
| 1. Setup Firebase | `src/lib/firebase.js` (`initializeApp`, `getFirestore`) |
| 2. Data fetching | `fetchPosts()` di `src/lib/posts.js` memakai `getDocs`; data contoh lewat `seedPosts()` |
| 3. Real-time & query | `subscribePosts()` memakai `onSnapshot`; pencarian judul di `src/components/PostsView.jsx` |
| 4. UI states & error | loading dan error state di `PostsView.jsx`; `ErrorBoundary.jsx` + `ErrorFallback.jsx` |

Struktur dokumen `posts`: `title` (string), `content` (string), `createdAt` (timestamp).

Tombol "Simulasikan runtime error" di halaman `/posts` sengaja melempar error
untuk memperlihatkan Error Boundary dan fallback UI.

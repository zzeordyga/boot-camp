# Day 10 — Authentication, Authorization & Route Protection with Firebase

React (Vite) + React Router + Firebase Authentication + Cloud Firestore.

## Fitur

| Requirement | Implementasi |
|---|---|
| Register & login email/password | `src/context/AuthContext.jsx` (`createUserWithEmailAndPassword`, `signInWithEmailAndPassword`) — hashing password ditangani Firebase |
| Role disimpan di Firestore | Saat register dibuat dokumen `users/{uid}` dengan `role: "user"` |
| Ambil role setelah login | `onAuthStateChanged` → `getDoc(users/{uid})` |
| `/user/profile` hanya untuk user login | `ProtectedRoute` tanpa `allowedRoles` |
| `/admin/dashboard` hanya untuk admin | `ProtectedRoute allowedRoles={["admin"]}` → redirect ke `/unauthorized` jika bukan admin |
| Security Rules berbasis role | `firestore.rules` — user hanya baca dokumennya sendiri, admin baca semua & ubah role, user tidak bisa daftar sebagai admin / mengubah role sendiri |
| Validasi form | HTML5 (`required`, `type=email`, `minLength`, `pattern`) + validasi manual di `src/utils/validation.js` + validasi di Security Rules |
| Logout | Tombol Logout di navbar (`signOut`) |
| Persistence | Checkbox "Ingat saya": `browserLocalPersistence` vs `browserSessionPersistence` |
| Routing | React Router v6 |

## Struktur

```
├── firestore.rules          # Firebase Security Rules (RBAC + validasi)
├── firebase.json
├── .env.example
└── src/
    ├── firebase.js
    ├── context/AuthContext.jsx
    ├── components/
    │   ├── ProtectedRoute.jsx   # route guard (auth + role)
    │   ├── GuestRoute.jsx       # login/register hanya untuk guest
    │   └── Navbar.jsx
    ├── pages/
    │   ├── Home.jsx  Login.jsx  Register.jsx
    │   ├── Profile.jsx          # /user/profile
    │   ├── AdminDashboard.jsx   # /admin/dashboard
    │   ├── Unauthorized.jsx  NotFound.jsx
    └── utils/validation.js
```

## Cara menjalankan

1. Buat project di [Firebase Console](https://console.firebase.google.com).
2. **Authentication → Sign-in method →** aktifkan **Email/Password**.
3. **Firestore Database →** Create database.
4. **Project settings → Your apps →** tambahkan Web app, salin config.
5. Copy `.env.example` menjadi `.env` lalu isi nilainya.
6. Pasang Security Rules: salin isi `firestore.rules` ke **Firestore → Rules → Publish**
   (atau `npm i -g firebase-tools && firebase login && firebase use <project-id> && firebase deploy --only firestore:rules`).
7. Jalankan:
   ```bash
   npm install
   npm run dev
   ```

## Membuat admin pertama

Semua akun baru otomatis `role: "user"` dan Security Rules melarang user mengubah role sendiri.
Untuk admin pertama: register akun → buka **Firestore → users → {uid}** → ubah field `role` menjadi `admin`.
Setelah itu admin bisa mengubah role user lain dari halaman `/admin/dashboard`.

## Skenario uji

1. Akses `/user/profile` tanpa login → diarahkan ke `/login`.
2. Login sebagai user biasa → akses `/admin/dashboard` → diarahkan ke `/unauthorized`.
3. Login sebagai admin → `/admin/dashboard` menampilkan daftar semua user.
4. User biasa mencoba membaca `users` milik orang lain langsung lewat SDK → ditolak (`permission-denied`) oleh Security Rules.
5. Submit form kosong / email salah / password lemah → muncul pesan validasi.

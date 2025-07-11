# Assignment 09 – NIM 2540115540

## Setup
1. Buat Firebase project & Web App.
2. Copy config → `firebaseConfig.js`.
3. Jalankan `npm install` → `npm run dev`.

## Fitur
- Tampilkan daftar posts dari Firestore.
- Real-time sync via onSnapshot.
- Filter berdasarkan keyword di judul.
- Loading & error state.
- Error Boundary untuk UI fallback.

## Firestore Setup
Buat collection `posts`, tambahkan dokumen contoh:
- `title`: string
- `content`: string
- `createdAt`: Timestamp (`firebase.firestore.FieldValue.serverTimestamp()`)

Contoh dokumen manual.

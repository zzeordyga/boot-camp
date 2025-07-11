// lib/firebaseConfig.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqVNZOvDLC6JqKWBN0rbU0JfIt5eP9HIc",
  authDomain: "my-app-27-b3779.firebaseapp.com",
  projectId: "my-app-27-b3779",
  storageBucket: "my-app-27-b3779.firebasestorage.app",
  messagingSenderId: "114016270124",
  appId: "1:114016270124:web:3a401fa52035c9d138de89"
};

// Cegah inisialisasi ulang saat HMR (Fast Refresh)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Pastikan `db` adalah Firestore yang valid
const db = getFirestore(app);

export { db };

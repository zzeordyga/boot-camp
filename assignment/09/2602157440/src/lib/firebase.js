import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Config web Firebase memang bersifat publik; keamanan data diatur lewat Firestore Rules.
const firebaseConfig = {
  apiKey: "AIzaSyD25qhJIY5gf0t0RITTgYiJDvzKxSxlKVc",
  authDomain: "bootcamp-assignment-09-21780.firebaseapp.com",
  projectId: "bootcamp-assignment-09-21780",
  storageBucket: "bootcamp-assignment-09-21780.firebasestorage.app",
  messagingSenderId: "558959487029",
  appId: "1:558959487029:web:daade3ef6926c2fb5e697c",
};

export const isConfigured = !firebaseConfig.apiKey.startsWith("GANTI");

// getApps() mencegah inisialisasi ganda saat hot reload.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);

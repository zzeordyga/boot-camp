import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAssM8m3077bHUJv1Qvu2R9n8thDQaVFLE",
  authDomain: "vincent-hungadi.firebaseapp.com",
  projectId: "vincent-hungadi",
  storageBucket: "vincent-hungadi.firebasestorage.app",
  messagingSenderId: "799463791913",
  appId:"1:799463791913:web:6d8839a716aaf7f909eb38",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
let analytics;

if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { db, analytics };
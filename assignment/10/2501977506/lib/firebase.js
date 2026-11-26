import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB6EfdA_1xK4rteGQYetBCiO5BcdClFRA8",
  authDomain: "nextjs-firebase-assignment.firebaseapp.com",
  projectId: "nextjs-firebase-assignment",
  storageBucket: "nextjs-firebase-assignment.firebasestorage.app",
  messagingSenderId: "929300710650",
  appId: "1:929300710650:web:a37fac5e596d54daf97543"
};

// Avoid re-initializing during Next.js hot reload
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);


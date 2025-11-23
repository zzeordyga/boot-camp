// src/firebase.js
// Uses npm-installed firebase SDK (imported by name)
import { initializeApp } from "firebase/app";
import {
  getAuth,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";
import {
  getFirestore,
  serverTimestamp
} from "firebase/firestore";

import { ENV } from "../env.local.js"; // ensure env.local.js exists (and .gitignored)

const firebaseConfig = {
  apiKey: ENV.apiKey,
  authDomain: ENV.authDomain,
  projectId: ENV.projectId,
  storageBucket: ENV.storageBucket,
  messagingSenderId: ENV.messagingSenderId,
  appId: ENV.appId
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Set default persistence to local (keeps login between sessions)
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.error('Failed to set persistence', err);
});

export { serverTimestamp };

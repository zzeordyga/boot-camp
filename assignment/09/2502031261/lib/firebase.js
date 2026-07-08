

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiPh-0yQkI0TtTYrOPl_fmxBU5Rj1_dVg",
  authDomain: "project-assignment9.firebaseapp.com",
  projectId: "project-assignment9",
  storageBucket: "project-assignment9.firebasestorage.app",
  messagingSenderId: "89844423926",
  appId: "1:89844423926:web:e2840becc87c2fbad9e0d7"

};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;

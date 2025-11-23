import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCfhA37MEG-UsKce40xOxRFLHaiia446c4",
  authDomain: "assignment9-efa40.firebaseapp.com",
  projectId: "assignment9-efa40",
  storageBucket: "assignment9-efa40.firebasestorage.app",
  messagingSenderId: "302438013962",
  appId: "1:302438013962:web:cd2c70f502dba77a7413f3",
  measurementId: "G-C98T8N39X3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
// Run: npm run seed   (reads .env.local)
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});
const db = getFirestore(app);

const samples = [
  { title: "Getting started with Firebase", content: "Create a project, add a web app, and copy the firebaseConfig into your env file." },
  { title: "Fetching data with getDocs", content: "getDocs reads a collection once. Good for initial loads and one-off reads." },
  { title: "Real-time updates with onSnapshot", content: "onSnapshot keeps a listener open so the UI updates the moment data changes." },
];

const existing = await getDocs(collection(db, "posts"));
if (existing.size >= 3) {
  console.log(`posts already has ${existing.size} documents, skipping seed.`);
} else {
  for (const p of samples) {
    const ref = await addDoc(collection(db, "posts"), { ...p, createdAt: serverTimestamp() });
    console.log("added", ref.id, "-", p.title);
  }
}
process.exit(0);

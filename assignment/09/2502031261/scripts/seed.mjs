import { config } from "dotenv";
config({ path: ".env.local" });

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiPh-0yQkI0TtTYrOPl_fmxBU5Rj1_dVg",
  authDomain: "project-assignment9.firebaseapp.com",
  projectId: "project-assignment9",
  storageBucket: "project-assignment9.firebasestorage.app",
  messagingSenderId: "89844423926",
  appId: "1:89844423926:web:e2840becc87c2fbad9e0d7"
};

const missingKeys = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingKeys.length > 0) {
  console.error(
    "Missing Firebase config values:",
    missingKeys.join(", "),
    "\nMake sure .env.local exists in the project root and has all NEXT_PUBLIC_FIREBASE_* values filled in."
  );
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const samplePosts = [
  {
    title: "Getting Started with Next.js",
    content:
      "Next.js is a React framework that makes it easy to build fast, server-rendered web applications with file-based routing.",
  },
  {
    title: "Understanding Firestore Collections",
    content:
      "Firestore stores data in documents, which are grouped into collections. Each document contains a set of key-value pairs.",
  },
  {
    title: "Real-time Updates with onSnapshot",
    content:
      "Firestore's onSnapshot listener lets your app receive live updates whenever data changes, without needing to manually refetch.",
  },
];

async function seed() {
  console.log("Seeding 'posts' collection...");
  const postsRef = collection(db, "posts");

  for (const post of samplePosts) {
    const docRef = await addDoc(postsRef, {
      ...post,
      createdAt: serverTimestamp(),
    });
    console.log(`Added post "${post.title}" with id: ${docRef.id}`);
  }

  console.log("Done seeding. You can now visit /posts to see the data.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Error seeding posts:", err);
  process.exit(1);
});

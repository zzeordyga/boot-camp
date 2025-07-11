// assignment/09/2440011961/populateFirestore.js

// Make sure the path to firebase.js is correct relative to this file
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Load environment variables (you might need a helper for this in a standalone script)
// For a quick script, you might temporarily hardcode config or
// ensure your Node.js environment has these vars set.
// A better way for Node.js scripts is to use 'dotenv' package.
// Since this is for a Next.js project, we'll assume the .env.local values are used.
// If running with `node`, these won't be auto-loaded like in Next.js.
// So, for a standalone Node.js script, you'd typically need a dotenv setup:
// npm install dotenv
// require('dotenv').config({ path: '../../.env.local' }); // Path to your .env.local

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addSamplePosts() {
  try {
    console.log("Adding sample posts...");
    await addDoc(collection(db, "posts"), {
      title: "Exploring Next.js with Firebase",
      content: "This post discusses integrating Next.js and Firebase for powerful web applications.",
      createdAt: serverTimestamp()
    });
    await addDoc(collection(db, "posts"), {
      title: "Understanding Real-time Data Sync",
      content: "Learn how to leverage Firestore's real-time capabilities with onSnapshot.",
      createdAt: serverTimestamp()
    });
    await addDoc(collection(db, "posts"), {
      title: "Mastering UI States and Error Handling",
      content: "Best practices for managing loading, error, and success states in React applications.",
      createdAt: serverTimestamp()
    });
    console.log("3 sample posts added successfully!");
  } catch (e) {
    console.error("Error adding sample posts: ", e);
  } finally {
    // You might want to exit the process after completion
    process.exit();
  }
}

addSamplePosts();
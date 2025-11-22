import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAhxzKr4iclCPaQdDcunFJhjycihofl80A",
  authDomain: "sesi9-667dc.firebaseapp.com",
  projectId: "sesi9-667dc",
  storageBucket: "sesi9-667dc.firebasestorage.app",
  messagingSenderId: "631544445122",
  appId: "1:631544445122:web:e5e1ed89da76af4927a35b",
  measurementId: "G-2YKS2JVFJK",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const samplePosts = [
  {
    title: "Getting Started with Next.js",
    content: "Next.js is a powerful React framework for building modern web applications...",
    createdAt: Timestamp.now()
  },
  {
    title: "Firebase Firestore Tutorial",
    content: "Learn how to use Firestore as a real-time database for your applications...",
    createdAt: Timestamp.now()
  },
  {
    title: "Building Real-time Apps",
    content: "Real-time synchronization makes your apps feel responsive and collaborative...",
    createdAt: Timestamp.now()
  }
];

async function seedData() {
  try {
    console.log('Starting to seed data...');
    
    for (const post of samplePosts) {
      const docRef = await addDoc(collection(db, 'posts'), post);
      console.log('✓ Added post:', post.title, '| ID:', docRef.id);
    }
    
    console.log('\n🎉 All posts added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seedData();
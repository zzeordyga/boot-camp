import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  writeBatch,
  doc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

const postsRef = collection(db, 'posts');
const postsQuery = query(postsRef, orderBy('createdAt', 'desc'));

const samplePosts = [
  {
    title: 'Getting started with Firebase',
    content: 'Create a project in the Firebase console, register a web app, and copy its config into your Next.js environment variables.',
  },
  {
    title: 'Reading data with getDocs',
    content: 'getDocs runs a one-time query against a collection and resolves with a snapshot of every matching document.',
  },
  {
    title: 'Real-time updates with onSnapshot',
    content: 'onSnapshot keeps a listener open so the page re-renders whenever a document in the collection is added, changed, or removed.',
  },
  {
    title: 'Handling errors in React',
    content: 'Error boundaries catch exceptions thrown while rendering and show a fallback UI instead of a blank screen.',
  },
];

function toPost(snapshot) {
  const data = snapshot.data({ serverTimestamps: 'estimate' });
  return {
    id: snapshot.id,
    title: data.title ?? '',
    content: data.content ?? '',
    createdAt: data.createdAt?.toDate?.() ?? null,
  };
}

const writeTimeoutMs = 10_000;

function firestoreError(code, message) {
  return Object.assign(new Error(message), { code });
}

function confirmWrite(promise) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(
      () => reject(firestoreError('deadline-exceeded', 'Firestore did not confirm the write in time.')),
      writeTimeoutMs,
    );
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export async function fetchPosts() {
  if (!isFirebaseConfigured) {
    throw firestoreError('not-configured', 'Firebase config is missing.');
  }
  const snapshot = await getDocs(postsQuery);
  if (snapshot.metadata.fromCache) {
    throw firestoreError('unavailable', 'Could not reach Firestore.');
  }
  return snapshot.docs.map(toPost);
}

export function subscribeToPosts(onChange, onError) {
  return onSnapshot(
    postsQuery,
    { includeMetadataChanges: true },
    (snapshot) => onChange(snapshot.docs.map(toPost), !snapshot.metadata.fromCache),
    onError,
  );
}

export function createPost({ title, content }) {
  return confirmWrite(addDoc(postsRef, { title, content, createdAt: serverTimestamp() }));
}

export function seedPosts() {
  const batch = writeBatch(db);
  const now = Date.now();
  samplePosts.forEach((post, index) => {
    batch.set(doc(postsRef), {
      ...post,
      createdAt: Timestamp.fromMillis(now - index * 60_000),
    });
  });
  return confirmWrite(batch.commit());
}

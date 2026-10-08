import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

const postsRef = collection(db, 'posts');
const postsQuery = query(postsRef, orderBy('createdAt', 'desc'));

// Mengubah dokumen Firestore menjadi objek biasa yang mudah dipakai di komponen.
const toPost = (doc) => {
  const data = doc.data({ serverTimestamps: 'estimate' });
  return {
    id: doc.id,
    title: data.title ?? '',
    content: data.content ?? '',
    createdAt: data.createdAt?.toDate?.() ?? null,
  };
};

// Bagian 2: ambil data satu kali dengan getDocs.
export async function fetchPosts() {
  const snapshot = await getDocs(postsQuery);
  return snapshot.docs.map(toPost);
}

// Bagian 3: dengarkan perubahan secara real-time dengan onSnapshot.
// Mengembalikan fungsi unsubscribe untuk dipanggil saat komponen dilepas.
export function subscribePosts(onData, onError) {
  return onSnapshot(
    postsQuery,
    (snapshot) => onData(snapshot.docs.map(toPost)),
    onError
  );
}

export function addPost({ title, content }) {
  return addDoc(postsRef, { title, content, createdAt: serverTimestamp() });
}

const SAMPLE_POSTS = [
  {
    title: 'Belajar Next.js App Router',
    content: 'Routing berbasis folder, layout bersarang, dan server component.',
  },
  {
    title: 'Mengenal Cloud Firestore',
    content: 'Database NoSQL berbasis collection dan document dari Firebase.',
  },
  {
    title: 'Real-time dengan onSnapshot',
    content: 'Listener yang memperbarui tampilan setiap kali data berubah.',
  },
];

// Menambahkan 3 dokumen contoh secara terprogram.
export function seedPosts() {
  return Promise.all(SAMPLE_POSTS.map(addPost));
}

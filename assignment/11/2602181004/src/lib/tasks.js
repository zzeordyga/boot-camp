import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

const tasksRef = collection(db, 'tasks');
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

function toTask(snapshot) {
  const data = snapshot.data({ serverTimestamps: 'estimate' });
  return {
    id: snapshot.id,
    title: data.title ?? '',
    description: data.description ?? '',
    priority: data.priority ?? 'medium',
    completed: Boolean(data.completed),
    createdAt: data.createdAt?.toDate?.() ?? null,
  };
}

export function subscribeToTasks(onChange, onError) {
  if (!isFirebaseConfigured) {
    onError(firestoreError('not-configured', 'Firebase config is missing.'));
    return () => {};
  }
  return onSnapshot(
    tasksRef,
    { includeMetadataChanges: true },
    (snapshot) => onChange(snapshot.docs.map(toTask), !snapshot.metadata.fromCache),
    onError,
  );
}

export function createTask({ title, description, priority }) {
  return confirmWrite(
    addDoc(tasksRef, {
      title,
      description,
      priority,
      completed: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }),
  );
}

export function updateTask(id, fields) {
  return confirmWrite(updateDoc(doc(tasksRef, id), { ...fields, updatedAt: serverTimestamp() }));
}

export function deleteTask(id) {
  return confirmWrite(deleteDoc(doc(tasksRef, id)));
}

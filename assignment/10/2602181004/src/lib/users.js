import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

const usersRef = collection(db, 'users');

function toProfile(snapshot) {
  const data = snapshot.data({ serverTimestamps: 'estimate' });
  return {
    uid: snapshot.id,
    name: data.name ?? '',
    email: data.email ?? '',
    role: data.role ?? 'user',
    createdAt: data.createdAt?.toDate?.() ?? null,
  };
}

export function createProfile(user, name) {
  return setDoc(doc(usersRef, user.uid), {
    name,
    email: user.email,
    role: 'user',
    createdAt: serverTimestamp(),
  });
}

export function subscribeToProfile(uid, onChange, onError) {
  return onSnapshot(
    doc(usersRef, uid),
    (snapshot) => onChange(snapshot.exists() ? toProfile(snapshot) : null),
    onError,
  );
}

export function subscribeToUsers(onChange, onError) {
  return onSnapshot(
    query(usersRef, orderBy('createdAt', 'asc')),
    (snapshot) => onChange(snapshot.docs.map(toProfile)),
    onError,
  );
}

export function updateName(uid, name) {
  return updateDoc(doc(usersRef, uid), { name });
}

export function setRole(uid, role) {
  return updateDoc(doc(usersRef, uid), { role });
}

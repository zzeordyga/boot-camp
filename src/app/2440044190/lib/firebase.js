import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBX34zMGMUH0FD_p_uDZPeQWU0bX7S0yZ4',
  authDomain: 'assignment-09-290a7.firebaseapp.com',
  projectId: 'assignment-09-290a7',
  storageBucket: 'assignment-09-290a7.firebasestorage.app',
  messagingSenderId: '1068957922327',
  appId: '1:1068957922327:web:0a5d9d6389078b75479852',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
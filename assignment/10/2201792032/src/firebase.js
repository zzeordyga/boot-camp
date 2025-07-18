import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBrMFOCpzzw2DvCqn8L_DIrKvVO2Y959_M",
  authDomain: "assigment-10-f2734.firebaseapp.com",
  projectId: "assigment-10-f2734",
  storageBucket: "assigment-10-f2734.firebasestorage.app",
  messagingSenderId: "713175996467",
  appId: "1:713175996467:web:6db38d5135c33682812b46"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); 

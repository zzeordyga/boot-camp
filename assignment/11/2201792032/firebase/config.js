// firebase/config.js

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD61HYhdgDSfzgJfOXEKFByKYzGj3vxEpQ",
  authDomain: "assigment-11-eb03d.firebaseapp.com",
  projectId: "assigment-11-eb03d",
  storageBucket: "assigment-11-eb03d.firebasestorage.app",
  messagingSenderId: "361649221144",
  appId: "1:361649221144:web:c08c21decb212a361cdd6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db

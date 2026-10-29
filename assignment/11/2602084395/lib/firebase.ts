import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCEYEedpQo51ENZqhrYwXD3zHFJSDUzGmI",
  authDomain: "bootcamp-session-11-tasks.firebaseapp.com",
  projectId: "bootcamp-session-11-tasks",
  storageBucket: "bootcamp-session-11-tasks.firebasestorage.app",
  messagingSenderId: "1071214742643",
  appId: "1:1071214742643:web:64d429512aa756b970ee06"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)

export { app, db }
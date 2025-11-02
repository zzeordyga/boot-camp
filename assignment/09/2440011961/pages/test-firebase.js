// assignment/09/<your-NIM>/pages/test-firebase.js
import { useEffect, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust path if needed based on your directory structure

function TestFirebase() {
  const [message, setMessage] = useState('Testing Firestore connection...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        await addDoc(collection(db, "testCollection"), {
          timestamp: new Date(),
          status: "success"
        });
        setMessage('Firestore connection successful! A document was added to "testCollection".');
      } catch (e) {
        console.error("Error adding document: ", e);
        setMessage(`Firestore connection failed: ${e.message}`);
      }
    };

    testConnection();
  }, []);

  return (
    <div>
      <h1>Firebase Connection Test</h1>
      <p>{message}</p>
    </div>
  );
}

export default TestFirebase;
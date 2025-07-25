import { db } from 'lib/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default async function handler(req, res) {
  const postsRef = collection(db, 'posts');
  
  const samplePosts = [
    { title: 'First Post', content: 'This is my first post', createdAt: serverTimestamp() },
    { title: 'Second Post', content: 'This is another post', createdAt: serverTimestamp() },
    { title: 'Third Post', content: 'Yet another post here', createdAt: serverTimestamp() }
  ];

  try {
    for (const post of samplePosts) {
      await addDoc(postsRef, post);
    }
    res.status(200).json({ message: 'Posts added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding posts' });
  }
}
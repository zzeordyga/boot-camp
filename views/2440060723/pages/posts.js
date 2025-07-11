// pages/posts.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
const [keyword, setKeyword] = useState("");

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "posts"));
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
useEffect(() => {
  const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
    const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(result);
  });

  return () => unsub();
}, []);

const filteredPosts = posts.filter(post =>
  post.title.toLowerCase().includes(keyword.toLowerCase())
);

<input
  type="text"
  placeholder="Search by title"
  value={keyword}
  onChange={(e) => setKeyword(e.target.value)}
/>

const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  setLoading(true);
  try {
    const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsub();
  } catch (err) {
    setError("Failed to load posts");
    setLoading(false);
  }
}, []);

if (loading) return <p>Loading...</p>;
if (error) return <p>{error}</p>;
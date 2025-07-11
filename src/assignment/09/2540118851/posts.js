import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export async function fetchPosts() {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

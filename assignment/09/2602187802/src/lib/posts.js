import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

const POSTS_COLLECTION = "posts";

function mapSnapshot(snapshot) {
  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .sort((a, b) => {
      const timeA = a.createdAt?.toMillis?.() ?? 0;
      const timeB = b.createdAt?.toMillis?.() ?? 0;
      return timeB - timeA;
    });
}

export async function fetchPosts() {
  const snapshot = await getDocs(collection(db, POSTS_COLLECTION));
  return mapSnapshot(snapshot);
}

export async function fetchPostById(id) {
  const snapshot = await getDoc(doc(db, POSTS_COLLECTION, id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

export function subscribeToPosts(onData, onError) {
  return onSnapshot(
    collection(db, POSTS_COLLECTION),
    (snapshot) => onData(mapSnapshot(snapshot)),
    onError
  );
}

export function formatPostDate(createdAt) {
  if (!createdAt) return "-";
  const date =
    typeof createdAt.toDate === "function"
      ? createdAt.toDate()
      : new Date(createdAt);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}


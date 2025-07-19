import { doc, getDoc } from "firebase/firestore";
import getConfig from "@/firebase/config";

import UserDetailView from "./user-detail-view";
import { doc, getDoc } from "firebase/firestore";

export default async function UserDetailPage({ params }) {
  const { slug } = params;

  const { db } = getConfig();
  const userRef = doc(db, "users", slug);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    return <div>User not found</div>;
  }

  return <UserDetailView user={userSnapshot.data()} />;
}

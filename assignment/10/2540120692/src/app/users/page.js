import { collection, getDocs } from "firebase/firestore";
import getConfig from "@/firebase/config";
import UserListView from "./user-list-view";

export default async function UsersPage() {
  const { db } = getConfig();
  const usersCol = collection(db, "users");
  const usersSnapshot = await getDocs(usersCol);
  const userList = usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return <UserListView users={userList} />;
}

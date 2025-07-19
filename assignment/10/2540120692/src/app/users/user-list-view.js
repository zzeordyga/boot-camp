"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./user-list-view.module.css";

import AddUserModal from "@/components/add-user-modal";

export default function UserListView({ users }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleAddUser = () => {
    setShowModal(true);
  };

  const goToDetail = (userId) => {
    router.push(`/users/${userId}`)
  }

  return (
    <div className={styles.page}>
      <button className={styles.addButton} onClick={handleAddUser}>
        Add User
      </button>
      <h3 className={styles.title}>Users List</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.header}>ID</th>
            <th className={styles.header}>Name</th>
            <th className={styles.header}>Email</th>
            <th className={styles.header}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className={styles.row} key={user.id}>
              <td className={styles.cell}>{user.id}</td>
              <td className={styles.cell}>{user.name}</td>
              <td className={styles.cell}>{user.email}</td>
              <td className={`${styles.cell} ${styles.actions}`}>
                <button className={styles.button} onClick={() => goToDetail(user.id)}>View Detail</button>
                <button className={styles.button}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && <AddUserModal setShowModal={setShowModal} />}
    </div>
  );
}

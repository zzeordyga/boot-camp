"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import getConfig from "@/firebase/config";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import Loading from "@/components/loading";
import Error403 from "@/components/error403";

export default function User() {
  const { db } = getConfig();
  const { role, loading } = useAuthGuard();
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(data);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (role !== "admin") {
    return (
      <div className={styles.page}>
        <Error403 />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: "30%" }}>UID</th>
              <th style={{ width: "30%" }}>Username</th>
              <th style={{ width: "30%" }}>Email</th>
              <th style={{ width: "10%" }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

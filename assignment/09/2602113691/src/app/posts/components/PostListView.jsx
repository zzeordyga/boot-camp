"use client";

import React, { useEffect, useState } from "react";
import styles from "./components.module.css";
import getDatabase from "@/firebase/config";
import { query, orderBy, onSnapshot, collection } from "firebase/firestore";
import { useSearchParams } from "next/navigation";

export default function PostListView() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("search");
  const [debounceKeyword, setDebounceKeyword] = useState(keyword);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const db = getDatabase();
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toLocaleString(),
        }));

        setPosts(data);
      });

      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebounceKeyword(keyword)
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [keyword]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(debounceKeyword.toLowerCase()),
  );

  if (loading) return <div className={styles.main}>loading posts...</div>;

  return (
    <div className={styles.main}>
      {filteredPosts.map((post) => {
        return (
          <div key={post.id} className={styles.card}>
            <h1 className={styles["title-text"]}>{post.title}</h1>
            <p className={styles["time-stamp"]}>{post.createdAt}</p>
            <p className={styles["content-text"]}>{post.content}</p>
          </div>
        );
      })}
    </div>
  );
}

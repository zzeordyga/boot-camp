"use client";

import React from "react";
import { db } from "../lib/firebase.js";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { ErrorBoundary } from "../lib/ErrorBoundary.js";

export default function AssignmentWeek9() {
  const [posts, setPosts] = React.useState([]);
  const [searchVal, setSearchVal] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const samples = [
    {
      title: "Welcome to the blog",
      content: "This is the first post.",
      createdAt: serverTimestamp(),
    },
    {
      title: "How to use Firestore",
      content: "Realtime updates with onSnapshot explained.",
      createdAt: serverTimestamp(),
    },
    {
      title: "Client-side search",
      content: "Filtering posts using JS on the client.",
      createdAt: serverTimestamp(),
    },
  ];

  async function addData() {
    try {
      for (const item of samples) {
        await addDoc(collection(db, "posts"), item);
      }
      alert("Add data successful");
    } catch (error) {
      alert("Add data failed: ", error);
    }
  }

  async function getData() {
    try {
      const response = await getDocs(collection(db, "posts"));
      const datas = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return datas;
    } catch (error) {
      alert("Get data failed: ", error);
    }
  }

  onSnapshot(
    collection(db, "posts"),
    (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(posts);
    },
    (error) => {
      alert("Snapshot error:", error);
    }
  );

  React.useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);

      const postsData = await getData();
      setPosts(postsData);

      setIsLoading(false);
    };

    fetch();
  }, []);

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <div>
          {posts.length === 0 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                addData();
              }}
            >
              Populate Posts Collection Data
            </button>
          )}

          <input
            type="text"
            placeholder="Search..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />

          <table>
            <thead>
              <tr>
                <td>Title</td>
                <td>Content</td>
                <td>Created At</td>
              </tr>
            </thead>
            <tbody>
              {posts
                .filter((post) => {
                  if (!searchVal) return true;
                  return post.title
                    .toLowerCase()
                    .includes(searchVal.toLowerCase());
                })
                .map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.content}</td>
                    <td>
                      {post.createdAt?.seconds
                        ? new Date(
                            post.createdAt.seconds * 1000
                          ).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </ErrorBoundary>
  );
}

const ErrorFallback = () => {
  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Something went wrong.</h2>
      <p>Please refresh the page or try again later.</p>
    </div>
  );
};

"use client";

import { useCallback, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import Link from "next/link";

import PostCard from "./_components/post-card";
import PostCardLoader from "./_components/post-card-loader";
import getDatabase from "../_libs/db";
import { debounce } from "../_libs/utils";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const [isPostUpdated, setIsPostUpdated] = useState(false);
  const [postUpdatedAt, setPostUpdatedAt] = useState(null);

  const getPosts = async () => {
    try {
      const db = getDatabase();
      const postCollection = collection(db, "posts");
      const postSnapshot = await getDocs(postCollection);
      const postList = postSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postList);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPostsByTitle = async (title) => {
    try {
      const db = getDatabase();
      const postCollection = collection(db, "posts");
      const postQuery = query(
        postCollection,
        where("title", ">=", title),
        where("title", "<=", title + "~")
      );
      const postSnapshot = await getDocs(postQuery);
      const postList = postSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postList);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const debouncedGetPostsByTitle = useCallback(
    debounce((value) => {
      getPostsByTitle(value);
    }, 500),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value || "";
    setSearch(value);
    debouncedGetPostsByTitle(value);
  };

  const handleSubscribe = useCallback(() => {
    const db = getDatabase();
    const postCollection = collection(db, "posts");
    const postQuery = query(
      postCollection,
      where("title", ">=", search),
      where("title", "<=", search + "~")
    );

    const unsubscribe = onSnapshot(postQuery, (snapshot) => {
      const postList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postList);
      setPostUpdatedAt(
        new Date(Date.now()).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setIsPostUpdated(true);
    });
    return () => unsubscribe();
  }, [search]);

  useEffect(() => {
    handleSubscribe();
  }, [handleSubscribe]);

  useEffect(() => {
    if (isPostUpdated) {
      setTimeout(() => {
        setIsPostUpdated(false);
      }, 3000);
    }
  }, [isPostUpdated]);

  if (error) {
    throw error;
  }

  return (
    <div className="flex flex-col gap-10">
      <Link
        href="/assignment/09/2501995345"
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-fit"
      >
        {"< Kembali"}
      </Link>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-blue-500 uppercase">Posts</h1>
        <input
          type="text"
          placeholder="Search"
          value={search}
          className="border border-gray-300 rounded-md p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleSearch}
        />
      </div>

      {isPostUpdated && (
        <div className="bg-green-500 p-4 rounded-md flex flex-col gap-2">
          <p className="font-bold text-white">Post Diperbarui!</p>
          <p className="text-white">{postUpdatedAt}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <PostCardLoader key={index} />
          ))}

        {!isLoading && posts.length === 0 && (
          <p className="text-gray-600">No posts found</p>
        )}

        {!isLoading &&
          posts.length > 0 &&
          posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              content={post.content}
              createdAt={new Date(
                post.createdAt.seconds * 1000
              ).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
          ))}
      </div>
    </div>
  );
}

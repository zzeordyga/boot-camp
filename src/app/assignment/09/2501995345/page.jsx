"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import getDatabase from "./_libs/db";
import { collection, doc, setDoc } from "firebase/firestore";

export default function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      setError(null);

      e.preventDefault();

      const db = getDatabase();
      const postCollection = collection(db, "posts");
      const postDoc = doc(postCollection);

      await setDoc(postDoc, { title, content, createdAt: new Date() });
      setIsSuccess(true);
    } catch (error) {
      setError(error);
    } finally {
      setTitle("");
      setContent("");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }
  }, [isSuccess]);

  if (error) {
    throw error;
  }

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-2xl font-bold text-blue-500 uppercase">
        Tambah Post
      </h1>
      <Link
        href="/assignment/09/2501995345/posts"
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-fit"
      >
        Lihat Post
      </Link>
      <form
        className="flex flex-col gap-4 bg-white p-4 rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        {isSuccess && (
          <div className="w-full bg-green-500 p-4 rounded-md">
            <p className="font-bold text-white">Post berhasil ditambahkan!</p>
          </div>
        )}
        <input
          name="title"
          required
          type="text"
          placeholder="Title"
          disabled={isLoading}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-md p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="content"
          required
          type="text"
          placeholder="Content"
          disabled={isLoading}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 rounded-md p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-fit cursor-pointer"
        >
          Tambah
        </button>
      </form>
    </div>
  );
}

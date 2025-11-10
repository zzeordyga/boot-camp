"use client";
import { useEffect, useState } from "react";

export default function Details() {
  const id = localStorage.getItem("postId");
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res) => res.json())
        .then(setData);
    }
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
}

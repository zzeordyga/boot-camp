"use client";

import { useEffect } from "react";


export default function PostsError({ error, reset }) {
  useEffect(() => {
    console.error("Error di halaman posts:", error);
  }, [error]);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 text-center border rounded-lg bg-red-50">
      <h2 className="text-lg font-bold text-red-700">Oops, ada yang salah</h2>
      <p className="text-sm text-gray-600 mt-2">
        Halaman gagal dimuat.
      </p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Coba Lagi
      </button>
    </div>
  );
}
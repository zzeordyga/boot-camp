"use client";

export default function Error() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-dvh">
      <h1 className="text-2xl font-bold text-blue-500 uppercase">Error</h1>
      <p className="text-gray-600">
        Terjadi kesalahan saat mengambil data. Silakan coba lagi.
      </p>
    </div>
  );
}

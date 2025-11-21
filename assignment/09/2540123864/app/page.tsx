import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <Link href="/posts">
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded">Click Here to Go to the Posts Page!</button>
        </Link>
    </div>
  );
}

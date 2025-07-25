"use client";
import { useRouter } from "next/navigation";
import ErrorBoundary from "./components/ErrorBoundary";

function Home() {
  const router = useRouter();

  return (
    <ErrorBoundary>
      <div>
        <button
          onClick={() => router.push("/assignment/09/2540124324/posts")}
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go to Posts Page
        </button>
      </div>
    </ErrorBoundary>
  );
}

export default Home;

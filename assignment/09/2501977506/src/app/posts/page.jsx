import Link from "next/link";
import ErrorBoundary from "@/components/ErrorBoundary";
import PostsView from "@/components/PostsView";

export default function PostsPage() {
  return (
    <main>
      <p><Link href="/">Home</Link></p>
      <h1>Posts</h1>
      <p className="sub">Live from Firestore. Search filters by title.</p>
      <ErrorBoundary>
        <PostsView />
      </ErrorBoundary>
    </main>
  );
}

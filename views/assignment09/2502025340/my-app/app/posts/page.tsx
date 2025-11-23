"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import PostsPage from "./PostsPage";

export default function Page() {
  return (
    <ErrorBoundary>
      <PostsPage />
    </ErrorBoundary>
  );
}

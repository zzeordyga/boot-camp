import PostsManager from "../../components/PostsManager";
import ErrorBoundary from "../../components/ErrorBoundary";

export default function PostsPage() {
  return (
    <ErrorBoundary>
      <PostsManager />
    </ErrorBoundary>
  );
}
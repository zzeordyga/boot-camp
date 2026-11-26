import PostsPage from "../../../assignment/09/2602191024/PostsPage";
import ErrorBoundary from "../../../assignment/09/2602191024/ErrorBoundary";
import "./posts.css";

export default function Page() {
  return (
    <ErrorBoundary>
      <PostsPage />
    </ErrorBoundary>
  );
}
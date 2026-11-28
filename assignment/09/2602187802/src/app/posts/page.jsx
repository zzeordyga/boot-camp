import ErrorBoundary from "../../components/ErrorBoundary";
import PostsFeed from "../../components/PostsFeed";
import styles from "./posts.module.css";

export default function PostsPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Daftar Posts</h1>
      <ErrorBoundary>
        <PostsFeed />
      </ErrorBoundary>
    </main>
  );
}


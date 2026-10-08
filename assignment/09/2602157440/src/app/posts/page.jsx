import ErrorBoundary from '@/components/ErrorBoundary';
import PostsView from '@/components/PostsView';

export const metadata = { title: 'Posts - Assignment 09' };

export default function PostsPage() {
  return (
    <section>
      <h1>Posts</h1>
      <ErrorBoundary>
        <PostsView />
      </ErrorBoundary>
    </section>
  );
}

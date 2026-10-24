import ErrorBoundary from '@/components/ErrorBoundary';
import PostsFeed from '@/components/PostsFeed';

export const metadata = {
  title: 'Posts · 2602181004',
};

export default function PostsPage() {
  return (
    <ErrorBoundary>
      <PostsFeed />
    </ErrorBoundary>
  );
}

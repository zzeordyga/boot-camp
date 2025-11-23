'use client';

import { Suspense, useMemo } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import PostList from '../components/PostList';
import Loading from '../components/Loading';

export default function PostsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Posts Dashboard
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Real-time data synchronized with Firebase Firestore. Search and filter posts instantly as they update.
        </p>
      </div>

      <ErrorBoundary>
        <Suspense fallback={<Loading message="Loading posts..." />}>
          <PostList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
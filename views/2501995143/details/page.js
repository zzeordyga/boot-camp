'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function DetailsPage() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  useEffect(() => {
    if (!postId) {
      router.push('/2501995143');
      return;
    }

    const abortController = new AbortController();
    
    const fetchData = async () => {
      try {
        // Fetch post details
        const postResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`,
          { signal: abortController.signal }
        );
        
        if (!postResponse.ok) throw new Error('Failed to fetch post');
        
        const postData = await postResponse.json();
        setPost(postData);

        // Fetch comments for this post
        const commentsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
          { signal: abortController.signal }
        );
        
        if (!commentsResponse.ok) throw new Error('Failed to fetch comments');
        
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [postId, router]);

  // Memoized truncated body text
  const truncatedBody = useMemo(() => {
    if (!post) return '';
    const words = post.body.split(' ');
    return words.length > 50 
      ? words.slice(0, 50).join(' ') + '...'
      : post.body;
  }, [post]);

  if (!postId) return null;
  
  if (isLoading) return (
    <div className="flex justify-center items-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 text-red-700 p-4 rounded-lg">
      Error: {error}
    </div>
  );

  if (!post) return (
    <div className="text-center py-12">
      <p className="text-gray-600">Post not found</p>
      <button 
        onClick={() => router.push('/2501995143')}
        className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
      >
        ← Back to posts
      </button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-indigo-600 p-6 text-white">
        <button 
          onClick={() => router.back()}
          className="flex items-center mb-4 hover:text-indigo-100 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">{post.title}</h1>
          <span className="text-indigo-200 bg-indigo-800 px-3 py-1 rounded-full text-sm">
            User ID: {post.userId}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="prose max-w-none text-gray-700">
          <p className="text-lg leading-relaxed whitespace-pre-line">
            {truncatedBody}
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Comments ({comments.length})
          </h2>
          
          {comments.length === 0 ? (
            <p className="text-gray-500 italic">No comments available for this post</p>
          ) : (
            <div className="space-y-4">
              {comments.slice(0, 5).map(comment => (
                <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-800">{comment.name}</h3>
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                      {comment.email}
                    </span>
                  </div>
                  <p className="text-gray-600">{comment.body}</p>
                </div>
              ))}
              
              {comments.length > 5 && (
                <p className="text-gray-500 italic mt-2">
                  Showing first 5 of {comments.length} comments
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
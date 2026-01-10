// Post Card Component
// Displays a single post with title, content, and timestamp

import React from 'react';

export default function PostCard({ post }) {
  // Format the date nicely
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    
    // Convert Firestore timestamp to JavaScript Date
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{
      background: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    }}>
      {/* Post Title */}
      <h3 style={{
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '12px',
        borderBottom: '2px solid #16a34a',
        paddingBottom: '8px'
      }}>
        {post.title}
      </h3>

      {/* Post Content */}
      <p style={{
        fontSize: '15px',
        color: '#4b5563',
        lineHeight: '1.6',
        marginBottom: '16px'
      }}>
        {post.content}
      </p>

      {/* Post Date */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '13px',
        color: '#9ca3af'
      }}>
        <span>📅</span>
        <span>{formatDate(post.createdAt)}</span>
      </div>
    </div>
  );
}

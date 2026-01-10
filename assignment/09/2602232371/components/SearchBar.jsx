// Search Bar Component
// Simple search input to filter posts by title

import React from 'react';

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div style={{
      marginBottom: '24px',
      padding: '20px',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <label style={{
        display: 'block',
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#374151'
      }}>
        🔍 Search Posts
      </label>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          fontSize: '16px',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          outline: 'none',
          transition: 'border-color 0.2s'
        }}
        onFocus={(e) => e.target.style.borderColor = '#16a34a'}
        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
      />
      {searchTerm && (
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}>
          Searching for: <strong>{searchTerm}</strong>
        </p>
      )}
    </div>
  );
}

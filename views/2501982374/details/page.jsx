import React, { useState, useEffect } from 'react';
import Layout from '../layout';

const DetailsPage = () => {
  const [fact, setFact] = useState('');

  useEffect(() => {
    fetch('https://catfact.ninja/fact')
      .then(res => res.json())
      .then(data => setFact(data.fact));
  }, []);

  return (
    <Layout>
      <div style={{
        fontFamily: 'Arial',
        maxWidth: 400,
        margin: '2rem auto',
        padding: 20,
        border: '1px solid #ccc',
        borderRadius: 8,
        background: '#fff',
        boxShadow: '0 2px 8px #0001'
      }}>
        <h2>Details Page</h2>
        <p>This is a nested route: <b>/2501982374/details</b></p>
        <div style={{
          marginTop: 24,
          padding: 12,
          background: '#f3e5f5',
          borderRadius: 6,
          fontStyle: 'italic'
        }}>
          <b>Random Cat Fact:</b> {fact || 'Loading...'}
        </div>
      </div>
    </Layout>
  );
};

export default DetailsPage;

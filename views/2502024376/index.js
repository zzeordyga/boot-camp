import React, { useState, useEffect } from 'react';
import Layout from './layout';

const IndexPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengambil data dari API
    fetch('https://api.adviceslip.com/advice')
      .then(response => response.json())
      .then(data => {
        setData(data.slip);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Layout>
      <h2>Advice of the Day</h2>
      {data && (
        <div>
          <h3>{data.advice}</h3>
        </div>
      )}
    </Layout>
  );
};

export default IndexPage;

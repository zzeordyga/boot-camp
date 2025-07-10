'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const HomePage = () => {
  const [article, setArticle] = useState([]);
  const currentPage = useRef(1);
  const itemsPerPage = 6;
  const [, forceRender] = useState(false); // Untuk trigger re-render manual

  // Fetch data dari API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setArticle(response.data);
      } catch (error) {
        console.log('Failed to process data:', error);
      }
    };

    fetchArticles();
  }, []);

  // Hitung total halaman
  const totalPages = useMemo(() => Math.ceil(article.length / itemsPerPage), [article]);

  // Ambil data sesuai halaman saat ini
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage.current - 1) * itemsPerPage;
    return article.slice(startIndex, startIndex + itemsPerPage);
  }, [article, currentPage.current]);

  // Navigasi halaman
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      currentPage.current = page;
      forceRender((prev) => !prev); // paksa render ulang
    }
  };

  return (
    <>
      <div className='space-y-5 mb-20'>
        <h1 className='text-3xl sm:text-4xl md:text-6xl text-center text-[var(--primary-color)]'>WordNest</h1>
        <p className='w-10/12 md:w-1/2 sm:text-lg md:text-xl text-center text-[var(--accent-color)] mx-auto'>
          Online article platform that provides readers with insightful, well-researched content across a variety of topics including technology, education, lifestyle, and current events.
        </p>
      </div>

      <div className='w-11/12 mx-auto text-center md:text-start mb-10'>
        <span className='text-2xl sm:text-3xl md:text-4xl text-[var(--accent-color)] font-bold'>New Articles</span>
      </div>

      <div className='w-11/12 mx-auto grid grid-cols-1 grid-rows-6 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 justify-items-center gap-y-12 md:gap-x-6 mb-10'>
        {paginatedArticles.map((item) => (
          <div key={item.id} className='w-11/12 border border-none bg-white/80 shadow-xl rounded-2xl p-4 space-y-4 transition duration-400 hover:shadow-2xl'>
            <h4 className='text-2xl font-bold text-[var(--text-color)] line-clamp-1'>{item.title}</h4>
            <span className='text-black text-sm/relaxed line-clamp-2'>{item.body}</span>
            <div className='flex justify-between mt-2'>
              <button>
                <Link href={`/article/${item.id}`} className='p-2 bg-[var(--text-color)] text-[var(--primary-color)] rounded-lg hover:bg-[var(--background-color)]'>View Detail</Link>
              </button>
              <span className='p-1 bg-[var(--background-color)] text-[var(--primary-color)] rounded-lg'>#{item.id}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 pb-20">
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => goToPage(currentPage.current - 1)}
          disabled={currentPage.current === 1}
        >
          Prev
        </button>

        <span className="px-4">Page {currentPage.current} of {totalPages}</span>

        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => goToPage(currentPage.current + 1)}
          disabled={currentPage.current === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default HomePage;

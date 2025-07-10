import Link from 'next/link';

export default async function ArticleDetailPage({ params }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const article = await res.json();

  return (
    <div className='w-10/12 mx-auto bg-[var(--text-color)] py-10 px-6 rounded'>
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-[var(--primary-color)] font-bold mb-4">
        {article.title}
      </h1>
      <p className="text-base sm:text-lg text-gray-100 text-justify leading-relaxed whitespace-pre-line mb-6">
        {article.body}
      </p>
      <div className="flex justify-end">
        <Link
          href="/"
          className="px-4 py-2 bg-[var(--accent-color)] text-black rounded-lg hover:bg-[var(--background-color)]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const articles = await res.json();

  return articles.map((article) => ({
    id: article.id.toString(),
  }));
}


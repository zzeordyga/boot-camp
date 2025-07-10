import Link from 'next/link';
import getDatabase from '../../../../firebase/config';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { notFound } from 'next/navigation';

export default async function ArticleDetailPage({ params }) {
  const db = getDatabase();
  const { id } = params;

  const docRef = doc(db, 'Article', id);
  const articleSnapshot = await getDoc(docRef);

  if (!articleSnapshot.exists()) {
    notFound(); // Tampilkan 404 jika artikel tidak ditemukan
  }

  const article = articleSnapshot.data();

  const date = article.createdAt?.toDate().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="w-10/12 mx-auto bg-[var(--text-color)] py-10 px-6 rounded">
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-[var(--primary-color)] font-bold mb-4">
        {article.title}
      </h1>
      <p className="text-base sm:text-lg text-gray-100 text-justify leading-relaxed whitespace-pre-line mb-6">
        {article.content}
      </p>
      <div className="flex justify-between">
        <span className="px-4 py-2 bg-[var(--background-color)] text-[var(--primary-color)] rounded-lg">
          {date}
        </span>
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
  const db = getDatabase();
  const querySnapshot = await getDocs(collection(db, 'Article'));

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
  }));
}

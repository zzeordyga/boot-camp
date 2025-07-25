import Link from 'next/link';
import '../styles/HomePage.css';

export default function Home() {
  return (
    <div className="home-container">
      <h1>FE - Assignment 9</h1>
      <Link href="/posts" className="home-button">
        Go to Posts
      </Link>
    </div>
  );
}
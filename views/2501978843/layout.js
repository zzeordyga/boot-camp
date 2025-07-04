import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Pokémon Browser</title>
        <meta name="description" content="A simple Pokémon browser" />
      </Head>
      <header>
        <h1>Pokémon Browser</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>Created by Charles Yansen - 2501978843</p>
      </footer>
    </div>
  );
}
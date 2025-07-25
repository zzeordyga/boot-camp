import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <div className="landing">
        <h1>Selamat Datang!</h1>
        <p>
          Ini adalah aplikasi autentikasi dan otorisasi menggunakan Firebase. Silakan login atau
          daftar untuk memulai.
        </p>
        <div className="landing-buttons">
          <Link href="/login">
            <button>Login</button>
          </Link>
          <Link href="/register">
            <button>Daftar</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
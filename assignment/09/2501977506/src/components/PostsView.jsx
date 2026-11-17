'use client';

import { useEffect, useMemo, useState } from 'react';
import { isConfigured } from '@/lib/firebase';
import { addPost, fetchPosts, seedPosts, subscribePosts } from '@/lib/posts';

const formatDate = (date) =>
  date
    ? date.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
    : 'Baru saja';

export default function PostsView() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [form, setForm] = useState({ title: '', content: '' });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);
  const [crash, setCrash] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (!isConfigured) {
      setError('Firebase belum dikonfigurasi. Isi firebaseConfig di src/lib/firebase.js.');
      setLoading(false);
      return;
    }

    let active = true;
    let unsubscribe = () => {};
    setLoading(true);
    setError(null);

    const handleError = (err) => {
      if (!active) return;
      setError(err.message || 'Gagal mengambil data dari Firestore.');
      setLoading(false);
    };

    // 1) Ambil data awal dengan getDocs.
    fetchPosts()
      .then((initial) => {
        if (!active) return;
        setPosts(initial);
        setLoading(false);
        // 2) Lanjutkan dengan onSnapshot agar perubahan berikutnya masuk otomatis.
        unsubscribe = subscribePosts((live) => active && setPosts(live), handleError);
      })
      .catch(handleError);

    return () => {
      active = false;
      unsubscribe();
    };
  }, [retry]);

  // Filter berdasarkan kata kunci di judul; dihitung ulang hanya saat data/kata kunci berubah.
  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((post) => post.title.toLowerCase().includes(q));
  }, [posts, keyword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = form.title.trim();
    const content = form.content.trim();
    if (!title || !content) {
      setFormError('Judul dan isi wajib diisi.');
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      await addPost({ title, content });
      setForm({ title: '', content: '' });
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan post.');
    } finally {
      setSaving(false);
    }
  };

  const handleSeed = async () => {
    setSaving(true);
    setFormError(null);
    try {
      await seedPosts();
    } catch (err) {
      setFormError(err.message || 'Gagal menambahkan data contoh.');
    } finally {
      setSaving(false);
    }
  };

  // Sengaja melempar error saat render untuk mendemokan Error Boundary.
  if (crash) {
    throw new Error('Simulasi runtime error dari PostsView.');
  }

  return (
    <div className="stack">
      <form className="card stack" onSubmit={handleSubmit}>
        <h2>Tambah post</h2>
        <label className="field">
          <span>Judul</span>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Judul post"
          />
        </label>
        <label className="field">
          <span>Isi</span>
          <textarea
            rows={3}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Tulis isi post"
          />
        </label>
        {formError && <p className="text-error" role="alert">{formError}</p>}
        <div className="row">
          <button className="btn" type="submit" disabled={saving || !!error}>
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button className="btn btn-ghost" type="button" onClick={handleSeed} disabled={saving || !!error}>
            Tambah 3 data contoh
          </button>
        </div>
      </form>

      <label className="field">
        <span>Cari berdasarkan judul</span>
        <input
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Ketik kata kunci..."
        />
      </label>

      {loading && (
        <div className="state" aria-live="polite">
          <span className="spinner" aria-hidden="true" />
          Memuat post...
        </div>
      )}

      {!loading && error && (
        <div className="state state-error" role="alert">
          <strong>Gagal memuat data</strong>
          <p>{error}</p>
          <button className="btn" onClick={() => setRetry((n) => n + 1)}>
            Coba lagi
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <p className="muted">
            <span className="live-dot" aria-hidden="true" /> Real-time &middot; {filtered.length} dari{' '}
            {posts.length} post
          </p>

          {posts.length === 0 && (
            <div className="state">Belum ada post. Tambahkan lewat form di atas.</div>
          )}

          {posts.length > 0 && filtered.length === 0 && (
            <div className="state">Tidak ada judul yang cocok dengan &quot;{keyword}&quot;.</div>
          )}

          <ul className="posts">
            {filtered.map((post) => (
              <li key={post.id} className="card">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <time className="muted">{formatDate(post.createdAt)}</time>
              </li>
            ))}
          </ul>
        </>
      )}

      <button className="btn btn-ghost btn-small" type="button" onClick={() => setCrash(true)}>
        Simulasikan runtime error
      </button>
    </div>
  );
}

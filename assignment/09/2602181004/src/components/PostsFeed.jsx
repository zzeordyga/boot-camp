'use client'
import { useState, useEffect, useMemo, useDeferredValue } from 'react';
import { isFirebaseConfigured } from '@/lib/firebase';
import { fetchPosts, subscribeToPosts, createPost, seedPosts } from '@/lib/posts';
import styles from '@/app/posts/posts.module.css';

const dateFormat = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' });

const errorHints = {
  'permission-denied': 'Firestore rejected the request. Check the security rules for the posts collection.',
  unavailable: 'Firestore could not be reached. Check your internet connection.',
  'failed-precondition': 'The query needs an index or the database is not set up yet.',
  'not-found': 'The Firestore database was not found. Create it in the Firebase console.',
  'deadline-exceeded': 'Firestore did not confirm the write in time. It will be sent once the connection is back.',
};

function describeError(error) {
  if (!isFirebaseConfigured) {
    return 'Firebase is not configured. Copy .env.local.example to .env.local and fill in your firebaseConfig values.';
  }
  return errorHints[error?.code] ?? error?.message ?? 'Unknown error.';
}

function Highlight({ text, keyword }) {
  if (!keyword) return text;
  const index = text.toLowerCase().indexOf(keyword.toLowerCase());
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark className={styles.mark}>{text.slice(index, index + keyword.length)}</mark>
      {text.slice(index + keyword.length)}
    </>
  );
}

function SkeletonList() {
  return (
    <ul className={styles.list} aria-hidden="true">
      {[0, 1, 2].map((key) => (
        <li key={key} className={`${styles.card} ${styles.skeleton}`}>
          <span className={styles.skeletonLine} style={{ width: '55%' }} />
          <span className={styles.skeletonLine} />
          <span className={styles.skeletonLine} style={{ width: '80%' }} />
        </li>
      ))}
    </ul>
  );
}

function CrashOnRender() {
  throw new Error('Simulated render error from the posts page.');
}

export default function PostsFeed() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [live, setLive] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [draft, setDraft] = useState({ title: '', content: '' });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [crash, setCrash] = useState(false);
  const deferredKeyword = useDeferredValue(keyword.trim());

  useEffect(() => {
    let cancelled = false;
    let unsubscribe = () => {};
    setStatus('loading');
    setError(null);

    fetchPosts()
      .then((initial) => {
        if (cancelled) return;
        setPosts(initial);
        setStatus('ready');
        unsubscribe = subscribeToPosts(
          (next, fromServer) => {
            setPosts(next);
            setLive(fromServer);
          },
          (err) => {
            setLive(false);
            setError(err);
            setStatus('error');
          },
        );
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err);
        setStatus('error');
      });

    return () => {
      cancelled = true;
      setLive(false);
      unsubscribe();
    };
  }, [reloadKey]);

  const filtered = useMemo(() => {
    if (!deferredKeyword) return posts;
    const needle = deferredKeyword.toLowerCase();
    return posts.filter((post) => post.title.toLowerCase().includes(needle));
  }, [posts, deferredKeyword]);

  const submitPost = async (event) => {
    event.preventDefault();
    const title = draft.title.trim();
    const content = draft.content.trim();
    if (!title || !content) {
      setSaveError('Both a title and some content are required.');
      return;
    }
    setSaving(true);
    setSaveError('');
    try {
      await createPost({ title, content });
      setDraft({ title: '', content: '' });
    } catch (err) {
      setSaveError(describeError(err));
    } finally {
      setSaving(false);
    }
  };

  const addSamples = async () => {
    setSaving(true);
    setSaveError('');
    try {
      await seedPosts();
    } catch (err) {
      setSaveError(describeError(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {crash && <CrashOnRender />}

      <div className={styles.titleRow}>
        <h2 className={styles.title}>Posts</h2>
        <span className={`${styles.badge} ${live ? styles.badgeLive : ''}`}>
          <span className={styles.dot} />
          {live ? 'Live' : status === 'error' ? 'Offline' : 'Connecting…'}
        </span>
      </div>

      <label className={styles.search}>
        <span className={styles.srOnly}>Search posts by title</span>
        <input
          type="search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Search by title…"
          className={styles.input}
          disabled={status === 'error'}
        />
      </label>

      {status === 'error' && (
        <div className={styles.error} role="alert">
          <div>
            <strong>Could not load posts.</strong> {describeError(error)}
          </div>
          <button className={styles.ghostButton} onClick={() => setReloadKey((key) => key + 1)}>
            Retry
          </button>
        </div>
      )}

      {status === 'loading' && <SkeletonList />}

      {status === 'ready' && posts.length === 0 && (
        <div className={styles.empty}>
          <p>The posts collection is empty.</p>
          <button className={styles.button} onClick={addSamples} disabled={saving || !live}>
            {saving ? 'Adding…' : 'Add sample posts'}
          </button>
        </div>
      )}

      {status === 'ready' && posts.length > 0 && (
        <>
          <p className={styles.count} aria-live="polite">
            {deferredKeyword
              ? `${filtered.length} of ${posts.length} posts match “${deferredKeyword}”`
              : `${posts.length} posts`}
          </p>
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <p>No post titles contain “{deferredKeyword}”.</p>
              <button className={styles.ghostButton} onClick={() => setKeyword('')}>
                Clear search
              </button>
            </div>
          ) : (
            <ul className={styles.list}>
              {filtered.map((post) => (
                <li key={post.id} className={styles.card}>
                  <h3 className={styles.cardTitle}>
                    <Highlight text={post.title} keyword={deferredKeyword} />
                  </h3>
                  <p className={styles.cardContent}>{post.content}</p>
                  <time className={styles.cardDate} dateTime={post.createdAt?.toISOString()}>
                    {post.createdAt ? dateFormat.format(post.createdAt) : 'No date'}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <h3 className={styles.sectionTitle}>New post</h3>
      <form className={styles.form} onSubmit={submitPost}>
        <input
          className={styles.input}
          placeholder="Title"
          value={draft.title}
          onChange={(event) => setDraft({ ...draft, title: event.target.value })}
          maxLength={120}
        />
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          placeholder="Content"
          rows={3}
          value={draft.content}
          onChange={(event) => setDraft({ ...draft, content: event.target.value })}
        />
        {saveError && <div className={styles.formError}>{saveError}</div>}
        <div className={styles.actions}>
          <button type="button" className={styles.ghostButton} onClick={() => setCrash(true)}>
            Simulate crash
          </button>
          <button type="submit" className={styles.button} disabled={saving || !live}>
            {saving ? 'Saving…' : 'Publish'}
          </button>
        </div>
      </form>
    </>
  );
}

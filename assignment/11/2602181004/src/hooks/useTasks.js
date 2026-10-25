'use client'
import { useEffect, useState } from 'react';
import { subscribeToTasks } from '@/lib/tasks';

const connectTimeoutMs = 10_000;

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('loading');
  const [live, setLive] = useState(false);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let synced = false;
    setStatus('loading');
    setError(null);

    const timer = setTimeout(() => {
      if (synced) return;
      setError(Object.assign(new Error('Could not reach Firestore.'), { code: 'unavailable' }));
      setStatus('error');
    }, connectTimeoutMs);

    const unsubscribe = subscribeToTasks(
      (next, fromServer) => {
        setLive(fromServer);
        if (!fromServer && !synced) return;
        synced = true;
        clearTimeout(timer);
        setTasks(next);
        setStatus('ready');
      },
      (err) => {
        clearTimeout(timer);
        setLive(false);
        setError(err);
        setStatus('error');
      },
    );

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [attempt]);

  return { tasks, status, live, error, retry: () => setAttempt((count) => count + 1) };
}

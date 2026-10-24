'use client'
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Pending } from '@/components/RequireAuth';
import { setRole, subscribeToUsers } from '@/lib/users';
import { describeError } from '@/lib/validation';
import styles from '../../auth.module.css';

const dateFormat = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' });

export default function DashboardPage() {
  const { profile } = useAuth();
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(null);
  const [actionError, setActionError] = useState('');

  useEffect(
    () =>
      subscribeToUsers(
        (next) => {
          setUsers(next);
          setStatus('ready');
        },
        (err) => {
          setError(err);
          setStatus('error');
        },
      ),
    [],
  );

  const counts = useMemo(
    () => ({
      total: users.length,
      admins: users.filter((user) => user.role === 'admin').length,
    }),
    [users],
  );

  const changeRole = async (user) => {
    setPending(user.uid);
    setActionError('');
    try {
      await setRole(user.uid, user.role === 'admin' ? 'user' : 'admin');
    } catch (err) {
      setActionError(`Could not change the role of ${user.email}. ${describeError(err)}`);
    } finally {
      setPending(null);
    }
  };

  return (
    <>
      <h1 className={styles.pageTitle}>Admin dashboard</h1>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{counts.total}</span>
          <span className={styles.statLabel}>registered users</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{counts.admins}</span>
          <span className={styles.statLabel}>admins</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{counts.total - counts.admins}</span>
          <span className={styles.statLabel}>regular users</span>
        </div>
      </div>

      {actionError && (
        <div className={styles.formError} role="alert">
          {actionError}
        </div>
      )}

      {status === 'loading' && <Pending text="Loading users…" />}

      {status === 'error' && (
        <div className={styles.formError} role="alert">
          Could not load users. {describeError(error)}
        </div>
      )}

      {status === 'ready' && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Joined</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const isSelf = user.uid === profile.uid;
                return (
                  <tr key={user.uid}>
                    <td data-label="User">
                      <strong>{user.name}</strong>
                      <span className={styles.muted}>{user.email}</span>
                    </td>
                    <td data-label="Role">
                      <span className={`${styles.badge} ${user.role === 'admin' ? styles.badgeAdmin : ''}`}>
                        {user.role}
                      </span>
                    </td>
                    <td data-label="Joined">{user.createdAt ? dateFormat.format(user.createdAt) : '—'}</td>
                    <td className={styles.actionCell}>
                      {isSelf ? (
                        <span className={styles.muted}>You</span>
                      ) : (
                        <button
                          className={styles.ghostButton}
                          onClick={() => changeRole(user)}
                          disabled={pending === user.uid}
                        >
                          {pending === user.uid ? 'Saving…' : user.role === 'admin' ? 'Make user' : 'Make admin'}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

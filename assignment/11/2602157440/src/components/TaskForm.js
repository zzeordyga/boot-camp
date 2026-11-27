'use client';

import { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';

export default function TaskForm({ onAdd }) {
  const { t } = useSettings();
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || submitting) return;
    setSubmitting(true);
    try {
      const ok = await onAdd(trimmed);
      if (ok !== false) setTitle('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="input"
        aria-label={t('addLabel')}
        placeholder={t('addPlaceholder')}
        value={title}
        maxLength={200}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="btn btn-primary" disabled={!title.trim() || submitting}>
        {submitting ? t('adding') : t('add')}
      </button>
    </form>
  );
}

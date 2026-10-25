'use client'
import { useId, useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { DESCRIPTION_MAX, PRIORITIES, TITLE_MAX, errorKey, validateTask } from '@/lib/taskUtils';
import styles from './tasks.module.css';

const emptyTask = { title: '', description: '', priority: 'medium' };
const priorityLabels = { low: 'priorityLow', medium: 'priorityMedium', high: 'priorityHigh' };

export default function TaskForm({ initialValues = emptyTask, onSubmit, onCancel, submitLabel, busyLabel, resetOnSubmit = false }) {
  const { t } = useSettings();
  const id = useId();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const change = (field) => (event) => {
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    if (errors[field]) setErrors(validateTask(next));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');
    const found = validateTask(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit({
        title: values.title.trim(),
        description: values.description.trim(),
        priority: values.priority,
      });
      if (resetOnSubmit) setValues(initialValues);
    } catch (error) {
      setSubmitError(t(errorKey(error)));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor={`${id}-title`} className={styles.label}>
          {t('title')}
        </label>
        <input
          id={`${id}-title`}
          className={`${styles.input} ${errors.title ? styles.inputInvalid : ''}`}
          placeholder={t('titlePlaceholder')}
          value={values.title}
          onChange={change('title')}
          maxLength={TITLE_MAX}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? `${id}-title-error` : undefined}
        />
        {errors.title && (
          <span id={`${id}-title-error`} className={styles.fieldError}>
            {t(errors.title)}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor={`${id}-description`} className={styles.label}>
          {t('description')}
        </label>
        <textarea
          id={`${id}-description`}
          className={`${styles.input} ${styles.textarea} ${errors.description ? styles.inputInvalid : ''}`}
          placeholder={t('descriptionPlaceholder')}
          rows={3}
          value={values.description}
          onChange={change('description')}
          maxLength={DESCRIPTION_MAX}
          aria-invalid={Boolean(errors.description)}
        />
        {errors.description && <span className={styles.fieldError}>{t(errors.description)}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor={`${id}-priority`} className={styles.label}>
          {t('priority')}
        </label>
        <select
          id={`${id}-priority`}
          className={`${styles.input} ${styles.select}`}
          value={values.priority}
          onChange={change('priority')}
        >
          {PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {t(priorityLabels[priority])}
            </option>
          ))}
        </select>
        {errors.priority && <span className={styles.fieldError}>{t(errors.priority)}</span>}
      </div>

      {submitError && (
        <div className={styles.formError} role="alert">
          {submitError}
        </div>
      )}

      <div className={styles.formActions}>
        {onCancel && (
          <button type="button" className={styles.ghostButton} onClick={onCancel} disabled={submitting}>
            {t('cancel')}
          </button>
        )}
        <button type="submit" className={styles.button} disabled={submitting}>
          {submitting ? busyLabel : submitLabel}
        </button>
      </div>
    </form>
  );
}

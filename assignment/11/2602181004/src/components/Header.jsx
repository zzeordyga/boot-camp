'use client'
import { useSettings } from '@/context/SettingsContext';
import { LANGUAGES } from '@/lib/i18n';
import { THEMES } from '@/lib/settings';
import styles from './tasks.module.css';

const themeLabels = { light: 'themeLight', dark: 'themeDark', system: 'themeSystem' };
const languageLabels = { en: 'English', id: 'Bahasa Indonesia' };

export default function Header() {
  const { theme, language, setTheme, setLanguage, t } = useSettings();

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.brand}>
          <span className={styles.name}>Ishvara Pranidhana Lakshmana</span>
          <span className={styles.nim}>2602181004 · Computer Science</span>
        </div>
        <div className={styles.settings}>
          <div className={styles.segmented} role="group" aria-label={t('theme')}>
            {THEMES.map((option) => (
              <button
                key={option}
                type="button"
                className={`${styles.segment} ${theme === option ? styles.segmentActive : ''}`}
                aria-pressed={theme === option}
                onClick={() => setTheme(option)}
              >
                {t(themeLabels[option])}
              </button>
            ))}
          </div>
          <label className={styles.languageLabel}>
            <span className={styles.srOnly}>{t('language')}</span>
            <select
              className={styles.select}
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              {LANGUAGES.map((option) => (
                <option key={option} value={option}>
                  {languageLabels[option]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </header>
  );
}

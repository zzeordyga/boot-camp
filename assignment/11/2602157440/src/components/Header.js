'use client';

import { useSettings } from '@/context/SettingsContext';
import { LANGUAGES } from '@/i18n/translations';

export default function Header() {
  const { t, theme, toggleTheme, language, setLanguage } = useSettings();
  const isDark = theme === 'dark';

  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <h1 className="brand-title">{t('appTitle')}</h1>
          <p className="brand-author">
            Alif Arya Ramadhan <span aria-hidden="true">·</span> 2602157440
          </p>
        </div>

        <div className="header-controls">
          <div className="lang-switch" role="group" aria-label={t('language')}>
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                type="button"
                className={`lang-btn${language === lang ? ' is-active' : ''}`}
                aria-pressed={language === lang}
                onClick={() => setLanguage(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="btn theme-btn"
            onClick={toggleTheme}
            aria-label={isDark ? t('switchToLight') : t('switchToDark')}
            title={isDark ? t('switchToLight') : t('switchToDark')}
          >
            <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

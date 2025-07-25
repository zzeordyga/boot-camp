import { useSettings } from '../context/SettingsContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useSettings();

  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 rounded-md transition-colors
        ${theme === 'dark' 
          ? 'bg-gray-700 hover:bg-gray-600' 
          : 'bg-gray-200 hover:bg-gray-300'}
        text-sm md:text-base`}
    >
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
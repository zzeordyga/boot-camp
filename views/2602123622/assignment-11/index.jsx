'use client';

import { SettingsProvider } from './SettingsContext';
import TaskApp from './TaskApp';
import styles from './styles.module.css';

export default function Assignment11() {
  return (
    <SettingsProvider>
      <TaskApp />
    </SettingsProvider>
  );
}

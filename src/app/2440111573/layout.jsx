"use client";

import './style.css';
import ThemeProvider from './context/themeContext';

export default function MyPageLayout({ children }) {
 
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
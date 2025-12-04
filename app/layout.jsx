'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import './globals.css';

// Theme context for dark/light mode
const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check localStorage on mount
    const saved = localStorage.getItem('theme');
    if (saved) {
      setIsDark(saved === 'dark');
    }
  }, []);

  useEffect(() => {
    // Update document class and localStorage
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark, toggle: () => setIsDark(!isDark) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>IjailbreakLLMs - AI Jailbreaking Research</title>
        <meta name="description" content="LLM jailbreaking research, prompt engineering vulnerabilities, and red team testing by Spiritual Spell (Vichaps)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-black text-white antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

'use client';

import Link from 'next/link';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/app/layout';

export function PageNav({ backUrl = '/', backText = 'Back to Home' }) {
  const { isDark, toggle } = useTheme();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-xl border-b ${isDark ? 'border-neutral-800/30' : 'border-neutral-200'} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href={backUrl}
          className={`inline-flex items-center gap-2 ${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors`}
        >
          <ArrowLeft size={18} />
          {backText}
        </Link>
        <button
          onClick={toggle}
          className={`p-2 rounded-lg ${isDark ? 'bg-neutral-950 hover:bg-neutral-900' : 'bg-neutral-100 hover:bg-neutral-200'} transition-colors`}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-yellow-600" />}
        </button>
      </div>
    </nav>
  );
}

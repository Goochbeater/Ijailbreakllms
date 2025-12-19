'use client';

import Link from 'next/link';
import { ArrowRight, Shield } from 'lucide-react';
import { useTheme } from '@/app/layout';
import { PageNav } from '@/components/page-nav';

export function ClientJailbreaksPage({ jailbreaks }) {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300`}>
      <PageNav />

      <main id="main-content" className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Shield className="text-yellow-500" size={40} />
            <h1 className="text-5xl md:text-6xl font-black">Jailbreak Articles</h1>
          </div>

          {jailbreaks.length === 0 ? (
            <p className={`${isDark ? 'text-neutral-400' : 'text-neutral-600'} text-lg`}>No jailbreak research yet. Check back soon!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jailbreaks.map((jailbreak) => (
                <Link
                  key={jailbreak.slug}
                  href={`/jailbreaks/${jailbreak.slug}`}
                  className={`group p-6 ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'} border hover:border-yellow-500 rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-500/20`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold text-yellow-500 uppercase tracking-wider">
                      {jailbreak.type || 'Research'}
                    </span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-xs text-neutral-500">{jailbreak.readingTime} min read</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-500 transition-colors">
                    {jailbreak.title}
                  </h3>
                  {jailbreak.date && (
                    <p className="text-sm text-neutral-500 mb-3">{jailbreak.date}</p>
                  )}
                  <p className="text-neutral-400 text-sm mb-4 line-clamp-3">
                    {jailbreak.excerpt || jailbreak.content.substring(0, 120) + '...'}
                  </p>
                  <div className="flex items-center gap-2 text-yellow-500 text-sm font-semibold">
                    Read more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

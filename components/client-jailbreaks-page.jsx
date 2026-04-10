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
                  className={`group relative overflow-hidden isolate ${!jailbreak.coverImage ? (isDark ? 'bg-neutral-950' : 'bg-neutral-50') : ''} border ${isDark ? 'border-neutral-800 hover:border-yellow-500' : 'border-neutral-200 hover:border-yellow-600'} rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-500/20`}
                >
                  {jailbreak.coverImage && (
                    <>
                      <img
                        src={jailbreak.coverImage}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700"
                      />
                      <div
                        aria-hidden="true"
                        className={`absolute inset-0 -z-10 ${isDark ? 'bg-black/40 group-hover:bg-black/25' : 'bg-white/40 group-hover:bg-white/25'} backdrop-blur-[3px] transition-colors duration-500`}
                      />
                    </>
                  )}
                  <div className="relative p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-semibold text-yellow-500 uppercase tracking-wider drop-shadow">
                        {jailbreak.type || 'Research'}
                      </span>
                      <span className="text-neutral-400">•</span>
                      <span className={`text-xs ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>{jailbreak.readingTime} min read</span>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 group-hover:text-yellow-500 transition-colors ${isDark ? 'text-white' : 'text-black'} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
                      {jailbreak.title}
                    </h3>
                    {jailbreak.date && (
                      <p className={`text-sm mb-3 ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>{jailbreak.date}</p>
                    )}
                    <p className={`text-sm mb-4 line-clamp-3 ${isDark ? 'text-neutral-200' : 'text-neutral-700'}`}>
                      {jailbreak.excerpt || jailbreak.content.substring(0, 120) + '...'}
                    </p>
                    <div className="flex items-center gap-2 text-yellow-500 text-sm font-semibold drop-shadow">
                      Read more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </div>
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

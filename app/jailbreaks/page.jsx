import { getAllJailbreaks } from '@/lib/posts';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Shield } from 'lucide-react';

export default function JailbreaksPage() {
  const jailbreaks = getAllJailbreaks();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-neutral-800/30">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-yellow-500 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Shield className="text-yellow-500" size={40} />
            <h1 className="text-5xl md:text-6xl font-black">Jailbreaks</h1>
          </div>

          {jailbreaks.length === 0 ? (
            <p className="text-neutral-400 text-lg">No jailbreak research yet. Check back soon!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jailbreaks.map((jailbreak) => (
                <Link
                  key={jailbreak.slug}
                  href={`/jailbreaks/${jailbreak.slug}`}
                  className="group p-6 bg-neutral-950 border border-neutral-800 hover:border-yellow-500 rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-500/20"
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
                    Read more <ArrowRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

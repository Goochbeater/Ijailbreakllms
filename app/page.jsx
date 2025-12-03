import { getAllPosts, getAllJailbreaks } from '@/lib/posts';
import Link from 'next/link';
import { ArrowRight, Shield, BookOpen } from 'lucide-react';

export default function HomePage() {
  const posts = getAllPosts();
  const jailbreaks = getAllJailbreaks();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
            VOID.blog
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-2xl mx-auto">
            Exploring the edges of AI, prompt engineering, and the art of breaking boundaries
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#blog"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl transition-colors inline-flex items-center gap-2"
            >
              Read Articles <ArrowRight size={18} />
            </a>
            <a
              href="#jailbreaks"
              className="px-8 py-4 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800/50 text-white font-bold rounded-xl transition-colors inline-flex items-center gap-2"
            >
              Jailbreak Research <Shield size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section id="blog" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <BookOpen className="text-emerald-400" size={32} />
            <h2 className="text-4xl md:text-5xl font-black">Latest Articles</h2>
          </div>

          {posts.length === 0 ? (
            <p className="text-neutral-400">No articles yet. Check back soon!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group p-6 bg-neutral-950 border border-neutral-800/50 rounded-xl hover:border-emerald-500/50 transition-all"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold text-emerald-400 uppercase">
                      {post.type || 'Article'}
                    </span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-xs text-neutral-500">{post.readingTime} min read</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt || post.content.substring(0, 120) + '...'}
                  </p>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                    Read more <ArrowRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Jailbreaks Section */}
      <section id="jailbreaks" className="py-20 px-6 bg-neutral-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Shield className="text-emerald-400" size={32} />
            <h2 className="text-4xl md:text-5xl font-black">Jailbreak Research</h2>
          </div>

          {jailbreaks.length === 0 ? (
            <p className="text-neutral-400">No jailbreak research yet. Check back soon!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jailbreaks.map((jailbreak) => (
                <Link
                  key={jailbreak.slug}
                  href={`/jailbreaks/${jailbreak.slug}`}
                  className="group p-6 bg-black border border-neutral-800/50 rounded-xl hover:border-emerald-500/50 transition-all"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold text-emerald-400 uppercase">
                      {jailbreak.type || 'Research'}
                    </span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-xs text-neutral-500">{jailbreak.readingTime} min read</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                    {jailbreak.title}
                  </h3>
                  <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                    {jailbreak.excerpt || jailbreak.content.substring(0, 120) + '...'}
                  </p>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                    Read more <ArrowRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-800/50">
        <div className="max-w-6xl mx-auto text-center text-neutral-500">
          <p>&copy; {new Date().getFullYear()} VOID.blog. Exploring the edges of AI.</p>
        </div>
      </footer>
    </div>
  );
}

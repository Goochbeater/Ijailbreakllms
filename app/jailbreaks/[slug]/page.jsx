import { getJailbreakBySlug, getAllJailbreaks } from '@/lib/posts';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, Clock, Calendar, Shield } from 'lucide-react';

export async function generateStaticParams() {
  const jailbreaks = getAllJailbreaks();
  return jailbreaks.map((post) => ({
    slug: post.slug,
  }));
}

export default function JailbreakPage({ params }) {
  const post = getJailbreakBySlug(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/jailbreaks" className="text-yellow-500 hover:underline">
            ← Back to Jailbreaks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-neutral-800/30">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            href="/jailbreaks"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-yellow-500 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Jailbreaks
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30">
                <Shield size={14} className="text-yellow-500" />
                <span className="text-sm font-semibold text-yellow-500">{post.type || 'Research'}</span>
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-neutral-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose-void max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-neutral-800/50">
            <Link
              href="/jailbreaks"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-950 border border-neutral-800/50 rounded-xl text-white hover:border-yellow-500/50 transition-colors"
            >
              <ArrowLeft size={18} />
              More Jailbreak Research
            </Link>
          </footer>
        </div>
      </article>
    </div>
  );
}

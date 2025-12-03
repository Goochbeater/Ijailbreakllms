import { getPostBySlug, getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Clock, Calendar, BookOpen } from 'lucide-react';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPage({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/#blog" className="text-emerald-400 hover:underline">
            ← Back to Blog
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
            href="/#blog"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                <BookOpen size={14} className="text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">{post.type || 'Article'}</span>
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
          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-white
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-neutral-300 prose-p:leading-relaxed
            prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-semibold
            prose-code:text-emerald-400 prose-code:bg-neutral-900 prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-neutral-950 prose-pre:border prose-pre:border-neutral-800/50
            prose-blockquote:border-emerald-500 prose-blockquote:text-neutral-400
            prose-li:text-neutral-300
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-neutral-800/50">
            <Link
              href="/#blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-950 border border-neutral-800/50 rounded-xl text-white hover:border-emerald-500/50 transition-colors"
            >
              <ArrowLeft size={18} />
              More Articles
            </Link>
          </footer>
        </div>
      </article>
    </div>
  );
}

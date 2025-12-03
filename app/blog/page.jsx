import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <BookOpen className="text-yellow-500" size={40} />
            <h1 className="text-5xl md:text-6xl font-black">Blog</h1>
          </div>

          {posts.length === 0 ? (
            <p className="text-neutral-400 text-lg">No articles yet. Check back soon!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group p-6 bg-neutral-950 border border-neutral-800 hover:border-yellow-500 rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-500/20"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold text-yellow-500 uppercase tracking-wider">
                      {post.type || 'Article'}
                    </span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-xs text-neutral-500">{post.readingTime} min read</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-500 transition-colors">
                    {post.title}
                  </h3>
                  {post.date && (
                    <p className="text-sm text-neutral-500 mb-3">{post.date}</p>
                  )}
                  <p className="text-neutral-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt || post.content.substring(0, 120) + '...'}
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

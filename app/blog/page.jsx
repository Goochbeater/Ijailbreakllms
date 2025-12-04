import { getAllPosts } from '@/lib/posts';
import { ClientBlogPage } from '@/components/client-blog-page';

export default function BlogPage() {
  const posts = getAllPosts();
  return <ClientBlogPage posts={posts} />;
}

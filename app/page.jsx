import { getAllPosts, getAllJailbreaks } from '@/lib/posts';
import { ClientHomePage } from '@/components/client-home-page';

export default function HomePage() {
  const posts = getAllPosts();
  const jailbreaks = getAllJailbreaks();

  return <ClientHomePage initialPosts={posts} initialJailbreaks={jailbreaks} />;
}

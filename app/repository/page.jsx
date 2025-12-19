import { RepositoryBrowser } from '@/components/repository-browser';

export const metadata = {
  title: 'Jailbreak Repo - Spiritual Spell',
  description: 'Live red-teaming repository explorer connected to GitHub.',
};

export default function RepositoryPage() {
  return <RepositoryBrowser />;
}

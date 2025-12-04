import { getAllJailbreaks } from '@/lib/posts';
import { ClientJailbreaksPage } from '@/components/client-jailbreaks-page';

export default function JailbreaksPage() {
  const jailbreaks = getAllJailbreaks();
  return <ClientJailbreaksPage jailbreaks={jailbreaks} />;
}

// app/flash/page.tsx
import FeedPage from '@/components/FeedPage';
import { useFlashFeed } from '@/lib/useFlashFeeds';
import { Zap } from 'lucide-react';

export default function FlashPage() {
  return (
    <FeedPage
      title="Flash Feed"
      badge="Quick Reads"
      icon={<Zap className="w-4 h-4" />}
      subtitle="Bite-sized stories for your coffee break."
      avgTime="3-5 min"
      dataHook={useFlashFeed}
    />
  );
}
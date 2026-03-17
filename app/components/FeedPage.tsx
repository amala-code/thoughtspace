// components/FeedPage.tsx
'use client';

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Zap } from 'lucide-react';
import Header from '@/components/Header';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '' 
}: { 
  src: string; 
  alt: string; 
  className?: string;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-gray-100">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};
type Props = {
  title: string;
  badge: string;
  icon: React.ReactNode;
  subtitle: string;
  avgTime: string;
  dataHook: () => any; // will be useFlashFeed or useDeepReads
};

export default function FeedPage({ title, badge, icon, subtitle, avgTime, dataHook }: Props) {
  const { data: blogs = [], isLoading } = dataHook();
  const [count, setCount] = useState(12);

  const loadMore = () => setCount(c => c + 12);
  const displayed = blogs.slice(0, count);
  const hasMore = count < blogs.length;

  const readTime = (c: string) => `${Math.ceil(c.split(' ').length / 200)} min`;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white">
        {/* Hero – same as yours */}
        <section className="relative bg-black text-white overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                {icon} <span className="text-sm">{badge}</span>
              </div>
              <h1 className="text-5xl sm:text-7xl font-bold">{title}</h1>
              <p className="text-xl text-gray-400 max-w-2xl">{subtitle}</p>
              <div className="flex items-center gap-8 pt-4">
                <div><div className="text-3xl font-bold">{blogs.length}</div><div className="text-sm text-gray-400">Articles</div></div>
                <div className="h-12 w-px bg-white/20" />
                <div><div className="text-3xl font-bold">{avgTime}</div><div className="text-sm text-gray-400">Avg Read</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          {isLoading ? <SkeletonGrid /> : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayed.map((blog: { id: Key | null | undefined; image: string; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; category: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; content: string; excerpt: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                  <Link key={blog.id} href={`/blog/${blog.id}`} className="group block rounded-xl overflow-hidden border-2 border-gray-200 hover:border-black bg-white">
                    <div className="aspect-[4/3] overflow-hidden">
                      <OptimizedImage src={blog.image} alt="loading image" className="group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2.5 py-1 bg-black text-white rounded-full">{blog.category}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {readTime(blog.content)}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold line-clamp-2">{blog.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{blog.excerpt}</p>
                      <div className="flex items-center gap-2 text-sm font-medium text-black">
                        Read now → 
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-16">
                  <button onClick={loadMore} className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800">
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_,i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/3] bg-gray-200 rounded-xl mb-4" />
          <div className="h-6 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mt-2" />
        </div>
      ))}
    </div>
  );
}
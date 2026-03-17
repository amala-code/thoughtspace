'use client';

import { useState, useEffect, SetStateAction } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Zap } from 'lucide-react';
import Header from '@/components/Header';

const INITIAL_BLOGS: SetStateAction<any[]> = [
  // Your INITIAL_BLOGS data here - placeholder for now
];

// Optimized Image component
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

export default function FlashFeedPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(12);

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('https://blog-backend-one-xi.vercel.app/api/blogs');
        if (!res.ok) throw new Error('Failed to fetch blogs');
        
        const data = await res.json();
        const transformed = data.map((blog: any) => ({
          id: blog.id,
          title: blog.title,
          category: blog.category || 'General',
          image: blog.cover_image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
          excerpt: blog.excerpt,
          content: blog.content,
        }));

        setBlogs(transformed);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setBlogs(INITIAL_BLOGS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const loadMore = () => {
    setDisplayCount(prev => prev + 12);
  };

  const displayedBlogs = blogs.slice(0, displayCount);
  const hasMore = displayCount < blogs.length;

  return (
    <>
    
          <Header />
    
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white">
      {/* Black Hero Section */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 border-2 border-white rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
          {/* Back Button */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          {/* Title */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Quick Reads</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Flash Feed
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl">
              Quick, digestible articles to keep you informed and inspired. 
              Perfect for your morning coffee or lunch break.
            </p>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold">{blogs.length}</div>
                <div className="text-sm text-gray-400">Articles</div>
              </div>
              <div className="h-12 w-px bg-white/20"></div>
              <div>
                <div className="text-3xl font-bold">3-5 min</div>
                <div className="text-sm text-gray-400">Average Read</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div> */}
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-gray-200 rounded-xl mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.id}`}
                  className="group block rounded-xl overflow-hidden border-2 border-gray-200 hover:border-black transition-all duration-300 bg-white"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <OptimizedImage
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2.5 py-1 bg-black text-white rounded-full font-medium uppercase tracking-wide">
                        {blog.category}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {calculateReadTime(blog.content)}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-black group-hover:text-gray-600 transition-colors leading-tight line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-medium text-black group-hover:gap-3 transition-all">
                      Read now
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-16">
                <button
                  onClick={loadMore}
                  className="px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all transform hover:scale-105"
                >
                  Load More Articles
                </button>
              </div>
            )}

            {/* End Message */}
            {!hasMore && blogs.length > 12 && (
              <div className="text-center mt-16 py-8 border-t border-gray-200">
                <p className="text-gray-500">You've reached the end of Flash Feed</p>
                <Link href="/" className="text-black font-medium hover:underline mt-2 inline-block">
                  ← Back to Home
                </Link>
              </div>
            )}
          </>
        )}
      </section>
    </div>

    </>
  );
}

// // 'use client';

// // import { useState, useEffect } from 'react';
// // import Link from 'next/link';
// // import { Compass } from 'lucide-react';
// // import { BLOGS as INITIAL_BLOGS } from '../lib/data';

// // export default function BlogGrid() {
// //   const [blogs, setBlogs] = useState(INITIAL_BLOGS);
// //   const [loading, setLoading] = useState(true);

// //   // Fetch blogs from API
// //   const fetchBlogs = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await fetch('http://localhost:8000/api/blogs');
      
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }
      
// //       const data = await response.json();
      
// //       // Transform API data to match our format
// //       const transformedBlogs = data.map((blog: { id: any; title: any; category: any; cover_image: any; excerpt: any; content: any; }) => ({
// //         id: blog.id,
// //         title: blog.title,
// //         category: blog.category || 'What to Do',
// //         image: blog.cover_image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop',
// //         excerpt: blog.excerpt,
// //         content: blog.content,
// //         featured: false // You can add a featured field to your API if needed
// //       }));
      
// //       if (transformedBlogs.length > 0) {
// //         setBlogs(transformedBlogs);
// //         // Also save to localStorage as backup
// //         localStorage.setItem('default_blogs', JSON.stringify(transformedBlogs));
// //       } else {
// //         // If no blogs from API, use initial blogs
// //         setBlogs(INITIAL_BLOGS);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching blogs from API:', error);
      
// //       // Fallback to localStorage or INITIAL_BLOGS
// //       const savedDefaultBlogs = localStorage.getItem('default_blogs');
// //       if (savedDefaultBlogs) {
// //         try {
// //           const defaultBlogs = JSON.parse(savedDefaultBlogs);
// //           setBlogs(defaultBlogs);
// //         } catch (parseError) {
// //           console.error('Error parsing saved blogs:', parseError);
// //           setBlogs(INITIAL_BLOGS);
// //         }
// //       } else {
// //         setBlogs(INITIAL_BLOGS);
// //         localStorage.setItem('default_blogs', JSON.stringify(INITIAL_BLOGS));
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Fetch blogs on mount
// //   useEffect(() => {
// //     fetchBlogs();
// //   }, []);

// //   // Listen for new blog additions/updates/deletions
// //   useEffect(() => {
// //     const handleStorageChange = () => {
// //       fetchBlogs(); // Re-fetch from API when blog is published
// //     };

// //     // Listen for custom event when blog is published/edited/deleted
// //     window.addEventListener('blogPublished', handleStorageChange);
    
// //     return () => {
// //       window.removeEventListener('blogPublished', handleStorageChange);
// //     };
// //   }, []);

// //   const featuredBlog = blogs.find(b => b.featured);
// //   const regularBlogs = blogs.filter(b => !b.featured);

// //   if (loading) {
// //     return (
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
// //         <div className="text-center py-12 text-gray-500">
// //           <div className="animate-pulse">Loading blogs...</div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (blogs.length === 0) {
// //     return (
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
// //         <div className="text-center py-12 text-gray-500">
// //           <p className="text-lg mb-4">No blogs yet!</p>
// //           <p className="text-sm">Start writing your first travel story.</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
// //       {/* Editor's Choice Section */}
// //       <div className="mb-12 sm:mb-16">
// //         <div className="flex items-center gap-2 mb-4 sm:mb-6">
// //           <h3 className="text-2xl sm:text-3xl font-light">Editor's Choice</h3>
// //           <Compass size={28} />
// //         </div>

// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
// //           {/* Featured Large Card */}
// //           {featuredBlog && (
// //             <Link
// //               href={`/blog/${featuredBlog.id}`}
// //               className="relative rounded-lg overflow-hidden cursor-pointer group sm:col-span-2 sm:row-span-2 h-72 sm:h-full"
// //             >
// //               <img
// //                 src={featuredBlog.image}
// //                 alt={featuredBlog.title}
// //                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
// //               />
// //               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
// //               <div className="absolute bottom-0 left-0 p-4 sm:p-8 text-white">
// //                 <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-white/20 rounded-full text-xs sm:text-sm mb-2 sm:mb-4">
// //                   {featuredBlog.category}
// //                 </span>
// //                 <h4 className="text-xl sm:text-3xl font-light mb-1 sm:mb-2">
// //                   {featuredBlog.title}
// //                 </h4>
// //                 <p className="text-gray-200 text-sm sm:text-base">
// //                   {featuredBlog.excerpt}
// //                 </p>
// //               </div>
// //             </Link>
// //           )}

// //           {/* Small Cards */}
// //           {regularBlogs.slice(0, 4).map((blog) => (
// //             <Link
// //               key={blog.id}
// //               href={`/blog/${blog.id}`}
// //               className="relative rounded-lg overflow-hidden cursor-pointer group h-48 sm:h-64"
// //             >
// //               <img
// //                 src={blog.image}
// //                 alt={blog.title}
// //                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
// //               />
// //               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
// //               <div className="absolute bottom-0 left-0 p-3 sm:p-4 text-white">
// //                 <span className="text-[10px] sm:text-xs bg-white/20 px-2 py-1 rounded-full mb-2 inline-block">
// //                   {blog.category}
// //                 </span>
// //                 <h4 className="font-light text-sm sm:text-base leading-tight">
// //                   {blog.title}
// //                 </h4>
// //               </div>
// //             </Link>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Latest Stories */}
// //       <div className="mb-12 sm:mb-16">
// //         <h3 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-6">Latest Stories</h3>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
// //           {blogs.map((blog) => (
// //             <Link
// //               key={blog.id}
// //               href={`/blog/${blog.id}`}
// //               className="cursor-pointer group"
// //             >
// //               <div className="rounded-lg overflow-hidden mb-3 sm:mb-4 h-40 sm:h-48">
// //                 <img
// //                   src={blog.image}
// //                   alt={blog.title}
// //                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
// //                 />
// //               </div>
// //               <span className="text-[10px] sm:text-xs text-gray-500 uppercase">{blog.category}</span>
// //               <h4 className="font-medium text-base sm:text-lg mb-1 sm:mb-2 group-hover:text-gray-600">{blog.title}</h4>
// //               <p className="text-gray-600 text-sm sm:text-base">{blog.excerpt}</p>
// //             </Link>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Compass } from 'lucide-react';
// import { BLOGS as INITIAL_BLOGS } from '../lib/data';

// export default function BlogGrid() {
//   // Step 1: Always start with SSR-safe data
//   const [blogs, setBlogs] = useState(INITIAL_BLOGS);
//   const [mounted, setMounted] = useState(false);

//   // Step 2: Only run localStorage + API logic after mount (client side)
//   useEffect(() => {
//     setMounted(true); // signals client render
//     const saved = localStorage.getItem('default_blogs');

//     if (saved) {
//       try {
//         setBlogs(JSON.parse(saved));
//       } catch {
//         console.warn('Invalid local storage data');
//       }
//     }

//     // Fetch blogs silently in background
//     const fetchBlogs = async () => {
//       try {
//         const res = await fetch('http://localhost:8000/api/blogs');
//         if (!res.ok) throw new Error('Failed to fetch blogs');
//         const data = await res.json();

//         const transformed = data.map((blog: any) => ({
//           id: blog.id,
//           title: blog.title,
//           category: blog.category || 'What to Do',
//           image:
//             blog.cover_image ||
//             'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop',
//           excerpt: blog.excerpt,
//           content: blog.content,
//           featured: false,
//         }));

//         if (transformed.length > 0) {
//           setBlogs(transformed);
//           localStorage.setItem('default_blogs', JSON.stringify(transformed));
//         }
//       } catch (err) {
//         console.error('Error fetching blogs:', err);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   // Step 3: Event listener for custom blog updates
//   useEffect(() => {
//     const handleStorageChange = () => {
//       const saved = localStorage.getItem('default_blogs');
//       if (saved) {
//         try {
//           setBlogs(JSON.parse(saved));
//         } catch {
//           console.error('Error reading cached blogs');
//         }
//       }
//     };

//     window.addEventListener('blogPublished', handleStorageChange);
//     return () => window.removeEventListener('blogPublished', handleStorageChange);
//   }, []);

//   const featuredBlog = blogs.find(b => b.featured);
//   const regularBlogs = blogs.filter(b => !b.featured);

//   // ✅ No hydration error — everything deterministic on SSR
//   return (
//     <div
//       className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-8 transition-opacity duration-300 ${
//         mounted ? 'opacity-100' : 'opacity-0'
//       }`}
//     >
//       {/* Editor's Choice */}
//       <div className="mb-12 sm:mb-16">
//         <div className="flex items-center gap-2 mb-4 sm:mb-6">
//           <h3 className="text-2xl sm:text-3xl font-light">Editor's Choice</h3>
//           <Compass size={28} />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//           {featuredBlog && (
//             <Link
//               href={`/blog/${featuredBlog.id}`}
//               className="relative rounded-lg overflow-hidden cursor-pointer group sm:col-span-2 sm:row-span-2 h-72 sm:h-full"
//             >
//               <img
//                 src={featuredBlog.image}
//                 alt={featuredBlog.title}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//               <div className="absolute bottom-0 left-0 p-4 sm:p-8 text-white">
//                 <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-white/20 rounded-full text-xs sm:text-sm mb-2 sm:mb-4">
//                   {featuredBlog.category}
//                 </span>
//                 <h4 className="text-xl sm:text-3xl font-light mb-1 sm:mb-2">
//                   {featuredBlog.title}
//                 </h4>
//                 <p className="text-gray-200 text-sm sm:text-base">
//                   {featuredBlog.excerpt}
//                 </p>
//               </div>
//             </Link>
//           )}

//           {regularBlogs.slice(0, 4).map(blog => (
//             <Link
//               key={blog.id}
//               href={`/blog/${blog.id}`}
//               className="relative rounded-lg overflow-hidden cursor-pointer group h-48 sm:h-64"
//             >
//               <img
//                 src={blog.image}
//                 alt={blog.title}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//               <div className="absolute bottom-0 left-0 p-3 sm:p-4 text-white">
//                 <span className="text-[10px] sm:text-xs bg-white/20 px-2 py-1 rounded-full mb-2 inline-block">
//                   {blog.category}
//                 </span>
//                 <h4 className="font-light text-sm sm:text-base leading-tight">
//                   {blog.title}
//                 </h4>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Latest Stories */}
//       <div className="mb-12 sm:mb-16">
//         <div className="flex items-center justify-between mb-4 sm:mb-6">
//           <h3 className="text-2xl sm:text-3xl font-light">Latest Stories</h3>
//           <span className="text-xs text-gray-400">Updated just now</span>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//           {blogs.map(blog => (
//             <Link key={blog.id} href={`/blog/${blog.id}`} className="cursor-pointer group">
//               <div className="rounded-lg overflow-hidden mb-3 sm:mb-4 h-40 sm:h-48">
//                 <img
//                   src={blog.image}
//                   alt={blog.title}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//               </div>
//               <span className="text-[10px] sm:text-xs text-gray-500 uppercase">
//                 {blog.category}
//               </span>
//               <h4 className="font-medium text-base sm:text-lg mb-1 sm:mb-2 group-hover:text-gray-600">
//                 {blog.title}
//               </h4>
//               <p className="text-gray-600 text-sm sm:text-base">{blog.excerpt}</p>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, TrendingUp } from 'lucide-react';
import { BLOGS as INITIAL_BLOGS } from '../lib/data';

// Skeleton Components - Match exact layout structure
const FeaturedBlogSkeleton = () => (
  <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 bg-gray-50 animate-pulse">
    <div className="aspect-[4/3] bg-gray-200"></div>
    <div className="p-8 space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded w-4/5"></div>
        <div className="h-8 bg-gray-200 rounded w-3/5"></div>
      </div>
      <div className="space-y-2">
        <div className="h-5 bg-gray-200 rounded w-full"></div>
        <div className="h-5 bg-gray-200 rounded w-4/5"></div>
      </div>
    </div>
  </div>
);

const SideStorySkeleton = () => (
  <div className="flex gap-6 pb-6 border-b border-gray-200 last:border-b-0 animate-pulse">
    <div className="flex-1 space-y-2">
      <div className="flex items-center gap-2">
        <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
        <div className="h-3 w-16 bg-gray-200 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="h-5 bg-gray-200 rounded w-full"></div>
        <div className="h-5 bg-gray-200 rounded w-4/5"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
    </div>
    <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0"></div>
  </div>
);

const BlogCardSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="aspect-[16/10] bg-gray-200 rounded-lg"></div>
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
        <div className="h-3 w-20 bg-gray-200 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="h-6 bg-gray-200 rounded w-full"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  </div>
);

// Optimized Image component with lazy loading
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

export default function BlogGrid() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Calculate read time based on content length
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  useEffect(() => {
    // Fetch blogs from API on mount
    const fetchBlogs = async () => {
      setIsLoading(true);
      setError(false);
      
      try {
        const res = await fetch('http://localhost:8000/api/blogs', {
          // Add cache control for faster subsequent loads
          cache: 'force-cache',
          next: { revalidate: 60 } // Revalidate every 60 seconds
        });
        
        if (!res.ok) throw new Error('Failed to fetch blogs');
        
        const data = await res.json();

        if (!data || data.length === 0) {
          // If API returns nothing, use fallback blogs
          setBlogs(INITIAL_BLOGS);
          setIsLoading(false);
          return;
        }

        const transformed = data.map((blog: any) => ({
          id: blog.id,
          title: blog.title,
          category: blog.category || 'What to Do',
          image: blog.cover_image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
          excerpt: blog.excerpt,
          content: blog.content,
          featured: blog.featured || false,
        }));

        setBlogs(transformed);
        
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(true);
        // Use fallback blogs on error
        setBlogs(INITIAL_BLOGS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Listen for blog updates (when new blog is published)
  useEffect(() => {
    const handleBlogUpdate = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/blogs');
        if (!res.ok) return;
        
        const data = await res.json();
        if (!data || data.length === 0) return;

        const transformed = data.map((blog: any) => ({
          id: blog.id,
          title: blog.title,
          category: blog.category || 'What to Do',
          image: blog.cover_image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
          excerpt: blog.excerpt,
          content: blog.content,
          featured: blog.featured || false,
        }));

        setBlogs(transformed);
      } catch (err) {
        console.error('Error updating blogs:', err);
      }
    };

    window.addEventListener('blogPublished', handleBlogUpdate);
    return () => window.removeEventListener('blogPublished', handleBlogUpdate);
  }, []);

  // Consistent structure: featured + side stories + grid
  const featuredBlog = blogs[0];
  const sideStories = blogs.slice(1, 4);
  const latestStories = blogs.slice(4);

  // Show skeleton loaders while loading - SAME STRUCTURE
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Featured Section Skeleton */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-6 h-6 text-gray-300" />
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Featured Blog Skeleton */}
            <FeaturedBlogSkeleton />

            {/* Side Stories Skeleton */}
            <div className="space-y-6">
              <SideStorySkeleton />
              <SideStorySkeleton />
              <SideStorySkeleton />
            </div>
          </div>
        </section>

        {/* Latest Stories Skeleton */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </div>
        </section>
      </div>
    );
  }

  // Show error state if API fails and no fallback
  if (error && blogs.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="text-center py-20">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">Unable to load blogs</h3>
          <p className="text-gray-500 mb-6">Please check your connection and try again</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      
      {/* Featured Section */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-6 h-6" />
          <h2 className="text-3xl font-bold text-black">Featured Story</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Featured Blog - Always First Blog */}
          {featuredBlog && (
            <Link 
              href={`/blog/${featuredBlog.id}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-xl border-2 border-transparent hover:border-black transition-all duration-300 bg-gray-50">
                <div className="aspect-[4/3] overflow-hidden">
                  <OptimizedImage
                    src={featuredBlog.image}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="px-3 py-1 bg-black text-white rounded-full font-medium">
                      {featuredBlog.category}
                    </span>
                    <span className="text-gray-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {calculateReadTime(featuredBlog.content)}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-black group-hover:text-gray-600 transition-colors leading-tight">
                    {featuredBlog.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed line-clamp-3">
                    {featuredBlog.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          )}

          {/* Side Stories - Always 3 Cards */}
          <div className="space-y-6">
            {sideStories.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.id}`}
                className="group flex gap-6 pb-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 -mx-4 px-4 py-4 rounded-lg transition-all"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2.5 py-1 bg-gray-200 text-black rounded-full font-medium">
                      {blog.category}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{calculateReadTime(blog.content)}</span>
                  </div>
                  <h4 className="text-lg font-bold text-black group-hover:text-gray-600 transition-colors leading-tight line-clamp-2">
                    {blog.title}
                  </h4>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {blog.excerpt}
                  </p>
                </div>
                <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                  <OptimizedImage
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Stories Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-black">Flash Feeds</h2>
          <span className="text-sm text-gray-400">
            {blogs.length} article{blogs.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {latestStories.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className="group block"
            >
              <article className="space-y-4">
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden rounded-lg border border-gray-200 group-hover:border-black transition-all">
                  <OptimizedImage
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs">
                    <span className="px-2.5 py-1 bg-gray-100 text-black rounded-full font-medium uppercase tracking-wide">
                      {blog.category}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {calculateReadTime(blog.content)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-black group-hover:text-gray-600 transition-colors leading-tight line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Read more */}
                  <div className="flex items-center gap-2 text-sm font-medium text-black group-hover:gap-3 transition-all">
                    Read article
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
              </article>
            </Link>
          ))}
        </div>
      </section>

           <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-black">Deep Reads</h2>
          <span className="text-sm text-gray-400">
            {blogs.length} article{blogs.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {latestStories.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className="group block"
            >
              <article className="space-y-4">
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden rounded-lg border border-gray-200 group-hover:border-black transition-all">
                  <OptimizedImage
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs">
                    <span className="px-2.5 py-1 bg-gray-100 text-black rounded-full font-medium uppercase tracking-wide">
                      {blog.category}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {calculateReadTime(blog.content)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-black group-hover:text-gray-600 transition-colors leading-tight line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Read more */}
                  <div className="flex items-center gap-2 text-sm font-medium text-black group-hover:gap-3 transition-all">
                    Read article
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
              </article>
            </Link>
          ))}
        </div>
      </section>


      {/* Flash Feed / Deep Reads Section */}
<section className="mb-20">
  <div className="flex items-center justify-between mb-8">
    <div className="flex items-center gap-3">
      <TrendingUp className="w-6 h-6 text-black" />
      <h2 className="text-2xl sm:text-3xl font-bold text-black">Flash Feed & Deep Reads</h2>
    </div>
    <Link
      href="/blogs"
      className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
    >
      See All Blogs →
    </Link>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {blogs.slice(0, 4).map((blog) => (
      <Link
        key={blog.id}
        href={`/blog/${blog.id}`}
        className="group block rounded-xl overflow-hidden border border-gray-200 hover:border-black transition-all duration-300 bg-white"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <OptimizedImage
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-[11px] text-gray-500 uppercase">
            <span className="bg-gray-100 px-2 py-1 rounded-full font-medium">
              {blog.category}
            </span>
            <span>•</span>
            <span>{calculateReadTime(blog.content)}</span>
          </div>

          <h3 className="text-base sm:text-lg font-semibold text-black group-hover:text-gray-700 leading-snug line-clamp-2">
            {blog.title}
          </h3>

          <p className="text-gray-600 text-sm leading-snug line-clamp-2">
            {blog.excerpt?.length > 90
              ? blog.excerpt.slice(0, 90) + '...'
              : blog.excerpt}
          </p>
        </div>
      </Link>
    ))}
  </div>
</section>


      {/* Load More Button - Only show if more than 10 blogs */}
      {blogs.length > 10 && (
        <div className="flex justify-center mt-16">
          <button className="px-8 py-3 border-2 border-black text-black font-medium rounded-lg hover:bg-black hover:text-white transition-all">
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
}
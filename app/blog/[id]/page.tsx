
// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import Header from '../../components/Header';
// import { BLOGS as INITIAL_BLOGS } from '../../lib/data';

// interface Blog {
//   id: number;
//   title: string;
//   category: string;
//   image: string;
//   excerpt: string;
//   content: string;
//   featured?: boolean;
// }

// export default function BlogPost() {
//   const params = useParams();
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const blogId = Number(params.id);
    
//     // Get all blogs (user blogs + initial blogs)
//     const savedBlogs = localStorage.getItem('user_blogs');
//     let allBlogs = [...INITIAL_BLOGS];
    
//     if (savedBlogs) {
//       try {
//         const userBlogs = JSON.parse(savedBlogs);
//         allBlogs = [...userBlogs, ...INITIAL_BLOGS];
//       } catch (error) {
//         console.error('Error loading blogs:', error);
//       }
//     }

//     // Find the blog by ID
//     const foundBlog = allBlogs.find(b => b.id === blogId);
//     setBlog(foundBlog || null);
//     setLoading(false);
//   }, [params.id]);

//   if (loading) {
//     return (
//       <>
//         <Header showBackButton={true} />
//         <div className="min-h-screen bg-white flex items-center justify-center">
//           <p className="text-gray-500">Loading...</p>
//         </div>
//       </>
//     );
//   }

//   if (!blog) {
//     return (
//       <>
//         <Header showBackButton={true} />
//         <div className="min-h-screen bg-white flex items-center justify-center">
//           <div className="text-center">
//             <h1 className="text-4xl font-light mb-4">Blog Not Found</h1>
//             <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Header showBackButton={true} />
//       <main className="min-h-screen bg-white">
//         <article className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
//           <div className="mb-6 sm:mb-8">
//             <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
//               {blog.category}
//             </span>
//             {blog.featured && (
//               <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
//                 Featured
//               </span>
//             )}
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mt-3 sm:mt-4 mb-4 sm:mb-6">
//               {blog.title}
//             </h1>
//             <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
//               {blog.excerpt}
//             </p>
//           </div>

//           <div className="rounded-lg overflow-hidden mb-8 sm:mb-12 h-64 sm:h-80 md:h-96">
//             <img
//               src={blog.image}
//               alt={blog.title}
//               className="w-full h-full object-cover"
//             />
//           </div>

//           <div
//             className="prose prose-sm sm:prose-base lg:prose-lg max-w-none"
//             dangerouslySetInnerHTML={{ __html: blog.content }}
//           />
//         </article>
//       </main>
//     </>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import { BLOGS as INITIAL_BLOGS } from '../../lib/data';

interface Blog {
  id: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  featured?: boolean;
}

export default function BlogPost() {
  const params = useParams();
  const blogId = params?.id as string | undefined;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!blogId) return; // 🛑 skip if no ID in route

    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/blogs/${blogId}`);
        if (response.ok) {
          const data = await response.json();
          const blogData: Blog = {
            id: data.id,
            title: data.title,
            category: data.category || 'What to Do',
            image:
              data.cover_image ||
              'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop',
            excerpt: data.excerpt,
            content: data.content,
            featured: false,
          };
          setBlog(blogData);
        } else {
          console.warn('Falling back to local data...');
          fallbackToLocal(blogId);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        fallbackToLocal(blogId);
      } finally {
        setLoading(false);
      }
    };

    const fallbackToLocal = (id: string) => {
      const savedBlogs = localStorage.getItem('default_blogs');
      let allBlogs = [...INITIAL_BLOGS];

      if (savedBlogs) {
        try {
          const apiBlogs = JSON.parse(savedBlogs);
          allBlogs = [...apiBlogs, ...INITIAL_BLOGS];
        } catch (e) {
          console.error('Error parsing saved blogs:', e);
        }
      }

      const found = allBlogs.find((b) => b.id === id);
      setBlog(found || null);
    };

    fetchBlog();
  }, [blogId]);

  if (!blogId) {
    return (
      <>
        <Header showBackButton={true} />
        <div className="min-h-screen flex items-center justify-center text-gray-600">
          Invalid blog ID.
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Header showBackButton={true} />
        <div className="min-h-screen flex items-center justify-center text-gray-500">
          Loading...
        </div>
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Header showBackButton={true} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-light mb-4">Blog Not Found</h1>
            <p className="text-gray-600">This blog doesn’t exist or failed to load.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header showBackButton={true} />
      <main className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          <div className="mb-6 sm:mb-8">
            <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
              {blog.category}
            </span>
            {blog.featured && (
              <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                Featured
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mt-3 sm:mt-4 mb-4 sm:mb-6">
              {blog.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {blog.excerpt}
            </p>
          </div>

          <div className="rounded-lg overflow-hidden mb-8 sm:mb-12 h-64 sm:h-80 md:h-96">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          </div>

          <div
            className="prose prose-sm sm:prose-base lg:prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </main>
    </>
  );
}

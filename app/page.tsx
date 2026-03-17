// 'use client';
// import Hero from './components/Hero';
// import BlogGrid from './components/BlogGrid';
// import Header from './components/Header';
// import Footer from './components/Footer';
//   import { useBlogs } from '@/lib/useBlog';


// export default function Home() {

//   const { data: blogs, isLoading, error } = useBlogs();
//   return (
//     <>
//       <Header />
//       <main className="min-h-screen bg-white">
//         <Hero />
//         {/* <BlogGrid /> */}
//         <BlogGrid
//       blogs={blogs ?? []}
//       isLoading={isLoading}
//       error={!!error}
//     />
//       </main>
//       {/* <Footer /> Add here */}

//     </>
//   );
// }

'use client';
import Hero from './components/Hero';
import BlogGrid from './components/BlogGrid';
import Header from './components/Header';
import Footer from './components/Footer';
import { useBlogs } from '@/lib/useBlog';

export default function Home() {
  const { data: blogs, isLoading, error, isFetching } = useBlogs();

  console.log('Blog fetch status:', { 
    isLoading, 
    isFetching, 
    error, 
    blogsCount: blogs?.length 
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <Hero />
        <BlogGrid
          blogs={blogs ?? []}
          isLoading={isLoading}
          error={!!error}
        />
      </main>
      <Footer />
    </>
  );
}
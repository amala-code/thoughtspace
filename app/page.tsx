import Hero from './components/Hero';
import BlogGrid from './components/BlogGrid';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <Hero />
        <BlogGrid />
      </main>
      {/* <Footer /> Add here */}

    </>
  );
}
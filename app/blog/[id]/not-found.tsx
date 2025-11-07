import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-light mb-4">Blog Not Found</h2>
        <p className="text-gray-600 mb-8">Sorry, we couldn't find that blog post.</p>
        <Link href="/" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
          Return Home
        </Link>
      </div>
    </div>
  );
}
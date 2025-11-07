'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '../lib/auth';
import { Shield } from 'lucide-react';

export default function Footer() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(isAuthenticated());
  }, []);

  return (
    <footer className="bg-black text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-1">Thought<span className=" text-italic">Space</span></h3>
            <p className="text-gray-400 text-sm">Quality content for curious minds.</p>
          </div>
          
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-gray-400 hover:text-white transition">
              Home
            </Link>
            <Link href="/reads" className="text-gray-400 hover:text-white transition">
              Deep Reads
            </Link>
            {/* {isAdmin ? (
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                <Shield size={16} />
                Dashboard
              </Link>
            ) : (
              <Link
                href="/admin/login"
                className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition"
              >
                <Shield size={16} />
                Admin
              </Link>
            )} */}

            <Link href="/feeds" className="text-gray-400 hover:text-white transition">
              Flash Feeds
            </Link>

               <Link href="/send" className="text-gray-400 hover:text-white transition">
              <button>Send a thought</button>
            </Link>



          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400 text-sm">
          © 2025 ThoughtSpace. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
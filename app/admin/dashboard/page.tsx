'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logout, getUser } from '../../lib/auth';
import { Edit, Trash2, Plus, LogOut, Eye, Settings } from 'lucide-react';
import Link from 'next/link';

interface Blog {
  id: number;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  featured?: boolean;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [user, setUser] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    setUser(getUser());
    loadBlogs();
  }, [router]);

  const loadBlogs = () => {
    const savedBlogs = localStorage.getItem('user_blogs');
    if (savedBlogs) {
      try {
        const userBlogs = JSON.parse(savedBlogs);
        setBlogs(userBlogs);
      } catch (error) {
        console.error('Error loading blogs:', error);
      }
    }
  };

  const handleDelete = (id: number) => {
    setBlogToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (blogToDelete === null) return;

    const updatedBlogs = blogs.filter(blog => blog.id !== blogToDelete);
    localStorage.setItem('user_blogs', JSON.stringify(updatedBlogs));
    setBlogs(updatedBlogs);
    
    // Notify other components
    window.dispatchEvent(new Event('blogPublished'));
    
    setShowDeleteModal(false);
    setBlogToDelete(null);
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/editor?id=${id}`);
  };

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user}</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <Eye size={18} />
                View Site
              </Link>
              <Link
                href="/admin/editor"
                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                <Plus size={18} />
                New Post
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Posts</h3>
            <p className="text-3xl font-bold">{blogs.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Featured Posts</h3>
            <p className="text-3xl font-bold">{blogs.filter(b => b.featured).length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Categories</h3>
            <p className="text-3xl font-bold">
              {new Set(blogs.map(b => b.category)).size}
            </p>
          </div>
        </div>

        {/* Blog List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Your Blog Posts</h2>
          </div>

          {blogs.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="mb-4">No blog posts yet</p>
              <Link
                href="/admin/editor"
                className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                <Plus size={18} />
                Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {blogs.map((blog) => (
                <div key={blog.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex gap-4">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-32 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{blog.title}</h3>
                            {blog.featured && (
                              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{blog.excerpt}</p>
                          <span className="text-xs text-gray-500">{blog.category}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(blog.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit size={18} className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 size={18} className="text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Delete Blog Post?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this blog post? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
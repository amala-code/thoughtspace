'use client';
import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Utensils, Compass, Edit, Save, Bold, Italic, List, ListOrdered, Quote, Upload, X, CheckCircle, Settings } from 'lucide-react';

// Initial blog data
const INITIAL_BLOGS = [
  {
    id: 1,
    title: "10 Best Restaurants in Paris",
    category: "Where to Eat",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=300&fit=crop",
    excerpt: "Discover the finest dining experiences in the City of Light",
    content: "<h2>Top Parisian Dining</h2><p>Paris offers an incredible culinary journey...</p>"
  },
  {
    id: 2,
    title: "Hidden Gems in Tokyo",
    category: "Places to Stay",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
    excerpt: "Explore unique accommodations off the beaten path",
    content: "<h2>Tokyo's Best Kept Secrets</h2><p>Beyond the usual tourist spots...</p>"
  },
  {
    id: 3,
    title: "Bucket List Travel: Top 50 Must-Visit Places in the World",
    category: "What to Do",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=400&fit=crop",
    excerpt: "What's on your travel bucket list? If you're like most...",
    featured: true
  },
  {
    id: 4,
    title: "Beach Paradise in Maldives",
    category: "Where to Go",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop",
    excerpt: "Crystal clear waters and pristine beaches await",
    content: "<h2>Maldives Paradise</h2><p>The ultimate beach destination...</p>"
  },
  {
    id: 5,
    title: "Adventure Activities in Cape Town",
    category: "What to Do",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&h=300&fit=crop",
    excerpt: "Thrilling experiences in South Africa's gem",
    content: "<h2>Cape Town Adventures</h2><p>From shark diving to mountain hiking...</p>"
  },
  {
    id: 6,
    title: "Street Food Guide: Mexico City",
    category: "Where to Eat",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
    excerpt: "Authentic flavors from local vendors",
    content: "<h2>Mexico City Street Food</h2><p>The best tacos, tortas, and more...</p>"
  }
];

const DESTINATIONS = [
  { name: 'Paris', icon: '🗼' },
  { name: 'Cairo', icon: '🏛️' },
  { name: 'Cape Town', icon: '🏔️' },
  { name: 'Mexico', icon: '🌮' },
  { name: 'Los Angeles', icon: '🌴' }
];

// Simple TipTap-style Editor Component
const BlogEditor = ({ content, onChange }) => {
  const [editorContent, setEditorContent] = useState(content || '');
  
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="flex gap-1 p-2 border-b bg-gray-50">
        <button
          onClick={() => execCommand('bold')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => execCommand('italic')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => execCommand('insertUnorderedList')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => execCommand('insertOrderedList')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </button>
        <button
          onClick={() => execCommand('formatBlock', 'blockquote')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Quote"
        >
          <Quote size={18} />
        </button>
      </div>
      <div
        contentEditable
        className="p-4 min-h-[400px] outline-none prose max-w-none"
        dangerouslySetInnerHTML={{ __html: editorContent }}
        onInput={(e) => {
          const html = e.currentTarget.innerHTML;
          setEditorContent(html);
          onChange(html);
        }}
      />
    </div>
  );
};

// Main App Component
const TravelGuiderApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState('');
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('imgbb_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);

    }

    fetchBlogs();

  }, []);

 const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://blog-backend-one-xi.vercel.app/api/blogs');
      const data = await response.json();
      console.log(data);
      
      // Transform API data to match our format
      const transformedBlogs = data.map(blog => ({
        id: blog.id,
        title: blog.title,
        category: blog.category || 'What to Do',
        image: blog.cover_image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop',
        excerpt: blog.excerpt,
        content: blog.content,
        featured: false
      }));
      
      setBlogs(transformedBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      // Keep using INITIAL_BLOGS as fallback
    } finally {
      setLoading(false);
    }
  };

  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('imgbb_api_key', key);
    setShowSettings(false);
    alert('API Key saved successfully!');
  };

  const HomePage = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Travel Guider</h1>
          <nav className="flex gap-8 text-sm">
            <a href="#" className="flex items-center gap-2 hover:text-gray-600">
              <MapPin size={16} /> Where to Go
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-gray-600">
              <Utensils size={16} /> Where to Eat
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-gray-600">
              <Camera size={16} /> Places to Stay
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-gray-600">
              <Compass size={16} /> What to Do
            </a>
          </nav>
          <div className="flex gap-4 items-center text-sm">
            <button className="hover:text-gray-600">Subscribe</button>
            <button className="hover:text-gray-600">Connect</button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 hover:bg-gray-100 rounded"
              title="Settings"
            >
              <Settings size={18} />
            </button>
            <button
              onClick={() => setCurrentView('editor')}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              <Edit size={16} /> Write
            </button>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Settings</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                ImgBB API Key
              </label>
              <p className="text-xs text-gray-600 mb-2">
                Get your free API key from{' '}
                <a 
                  href="https://api.imgbb.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 underline"
                >
                  imgbb.com/api
                </a>
              </p>
              <input
                type="text"
                placeholder="Paste your ImgBB API key here"
                defaultValue={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-2 border rounded outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => saveApiKey(apiKey)}
                className="flex-1 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Save
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex items-center gap-8 mb-8">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="w-16 h-20 bg-gray-200 rounded overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000000}?w=100&h=120&fit=crop`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-6xl font-light mb-8 text-center">Where Next?</h2>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search for the hotel, restaurant, destination..."
            className="w-full px-6 py-4 border rounded-full text-lg"
          />
        </div>

        {/* Quick Destinations */}
        <div className="flex justify-center gap-6 mb-16">
          {DESTINATIONS.map((dest) => (
            <button
              key={dest.name}
              className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-50"
            >
              <span>{dest.icon}</span>
              <span>{dest.name}</span>
            </button>
          ))}
        </div>

        {/* Editor's Choice Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-3xl font-light">Editor's Choicssse</h3>
            <Compass size={24} />
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Featured Large Card */}
            <div className="col-span-2 row-span-2 relative rounded-lg overflow-hidden cursor-pointer group">
              <img
                src={blogs.find(b => b.featured)?.image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                  {blogs.find(b => b.featured)?.category}
                </span>
                <h4 className="text-3xl font-light mb-2">
                  {blogs.find(b => b.featured)?.title}
                </h4>
                <p className="text-gray-200">
                  {blogs.find(b => b.featured)?.excerpt}
                </p>
              </div>
            </div>

            {/* Small Cards */}
            {blogs.filter(b => !b.featured).slice(0, 4).map((blog) => (
              <div
                key={blog.id}
                onClick={() => {
                  setSelectedBlog(blog);
                  setCurrentView('blog');
                }}
                className="relative rounded-lg overflow-hidden cursor-pointer group h-64"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full mb-2 inline-block">
                    {blog.category}
                  </span>
                  <h4 className="font-light text-sm leading-tight">{blog.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* More Blogs */}
        <div className="mt-16">
          <h3 className="text-3xl font-light mb-6">Latest Stories</h3>
          <div className="grid grid-cols-3 gap-6">
            {blogs.slice(0, 6).map((blog) => (
              <div
                key={blog.id}
                onClick={() => {
                  setSelectedBlog(blog);
                  setCurrentView('blog');
                }}
                className="cursor-pointer group"
              >
                <div className="rounded-lg overflow-hidden mb-4 h-48">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs text-gray-500 uppercase">{blog.category}</span>
                <h4 className="font-medium text-lg mb-2 group-hover:text-gray-600">{blog.title}</h4>
                <p className="text-gray-600 text-sm">{blog.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const BlogView = () => (
    <div className="min-h-screen bg-white">
      <header className="border-b px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setCurrentView('home')}
            className="text-sm hover:text-gray-600"
          >
            ← Back to Home
          </button>
          <h1 className="text-xl font-semibold">Travel Guider</h1>
          <button
            onClick={() => {
              setIsEditing(true);
              setEditingContent(selectedBlog?.content || '');
              setCurrentView('editor');
            }}
            className="flex items-center gap-2 text-sm hover:text-gray-600"
          >
            <Edit size={16} /> Edit
          </button>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-8 py-16">
        <div className="mb-8">
          <span className="text-sm text-gray-500 uppercase">{selectedBlog?.category}</span>
          <h1 className="text-5xl font-light mt-4 mb-6">{selectedBlog?.title}</h1>
          <p className="text-xl text-gray-600">{selectedBlog?.excerpt}</p>
        </div>

        <div className="rounded-lg overflow-hidden mb-12 h-96">
          <img
            src={selectedBlog?.image}
            alt={selectedBlog?.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: selectedBlog?.content }}
        />
      </article>
    </div>
  );

  const EditorView = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Where to Go');
    const [excerpt, setExcerpt] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [featured, setFeatured] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleImageSelect = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const uploadToImgBB = async () => {
      if (!imageFile) return;
      if (!apiKey) {
        alert('Please set your ImgBB API key in Settings first!');
        setShowSettings(true);
        return;
      }

      setUploading(true);
      const formData = new FormData();
      formData.append('image', imageFile);

      try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.success) {
          setImageUrl(data.data.url);
          alert('Image uploaded successfully!');
        } else {
          alert('Upload failed: ' + (data.error?.message || 'Unknown error'));
        }
      } catch (error) {
        alert('Upload failed: ' + error.message);
      } finally {
        setUploading(false);
      }
    };

    const clearImage = () => {
      setImageFile(null);
      setImagePreview('');
      setImageUrl('');
    };

    const handlePublish = () => {
      if (!title || !excerpt || !editingContent) {
        alert('Please fill in title, excerpt, and content!');
        return;
      }
      if (!imageUrl && !imagePreview) {
        alert('Please upload an image!');
        return;
      }

      const newBlog = {
        id: Date.now(),
        title,
        category,
        image: imageUrl || imagePreview,
        excerpt,
        content: editingContent,
        ...(featured && { featured: true })
      };

      // Add to blogs array
      setBlogs([newBlog, ...blogs]);
      
      // Reset form
      setTitle('');
      setCategory('Where to Go');
      setExcerpt('');
      setEditingContent('');
      setImageFile(null);
      setImagePreview('');
      setImageUrl('');
      setFeatured(false);
      
      alert('Blog published successfully! 🎉');
      setCurrentView('home');
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b px-8 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <button
              onClick={() => {
                setCurrentView('home');
                setIsEditing(false);
              }}
              className="text-sm hover:text-gray-600"
            >
              ← Cancel
            </button>
            <h1 className="text-xl font-semibold">Write Your Story</h1>
            <button 
              onClick={handlePublish}
              className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              <Save size={16} /> Publish
            </button>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-8 py-12">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <input
              type="text"
              placeholder="Article Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl font-light mb-4 outline-none border-b pb-4"
            />

            <div className="flex gap-4 mb-6 flex-wrap items-center">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 border rounded outline-none"
              >
                <option>Where to Go</option>
                <option>Where to Eat</option>
                <option>Places to Stay</option>
                <option>What to Do</option>
              </select>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>Featured Post</span>
              </label>

              {!apiKey && (
                <button
                  onClick={() => setShowSettings(true)}
                  className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Settings size={14} /> Set API Key
                </button>
              )}
            </div>

            {/* Image Upload Section */}
            <div className="mb-6 p-6 border-2 border-dashed rounded-lg bg-gray-50">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Upload size={18} /> Cover Image
              </h3>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="mb-3 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
              />

              {imagePreview && (
                <div className="relative mb-3">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full max-h-64 object-cover rounded"
                  />
                  <button
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {imageFile && !imageUrl && (
                <button
                  onClick={uploadToImgBB}
                  disabled={uploading}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 transition"
                >
                  {uploading ? 'Uploading...' : 'Upload to ImgBB'}
                </button>
              )}

              {imageUrl && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded">
                  <CheckCircle size={18} />
                  <p className="text-sm font-semibold">Image uploaded successfully!</p>
                </div>
              )}
            </div>

            {/* Excerpt */}
            <textarea
              placeholder="Brief excerpt (summary for preview)"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full p-4 border rounded outline-none mb-6 h-24"
            />

            <BlogEditor
              content={editingContent}
              onChange={(content) => setEditingContent(content)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentView === 'home' && <HomePage />}
      {currentView === 'blog' && <BlogView />}
      {currentView === 'editor' && <EditorView />}
    </div>
  );
};

export default TravelGuiderApp;
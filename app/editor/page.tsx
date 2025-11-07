// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Header from '../components/Header';
// import BlogEditor from '../components/BlogEditor';
// import { Save } from 'lucide-react';

// export default function Editor() {
//   const router = useRouter();
//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('Where to Go');
//   const [content, setContent] = useState('');

//   const handlePublish = () => {
//     // Here you would save to your database/API
//     console.log({ title, category, content });
//     alert('Blog published successfully!');
//     router.push('/');
//   };

//   return (
//     <>
//       <Header 
//         showBackButton={true}
//         rightButton={
//           <button 
//             onClick={handlePublish}
//             className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
//           >
//             <Save size={16} /> Publish
//           </button>
//         }
//       />
//       <main className="min-h-screen bg-gray-50">
//         <div className="max-w-5xl mx-auto px-8 py-12">
//           <div className="bg-white rounded-lg p-8 shadow-sm">
//             <input
//               type="text"
//               placeholder="Article Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full text-4xl font-light mb-4 outline-none border-b pb-4"
//             />

//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="mb-6 px-4 py-2 border rounded"
//             >
//               <option>Tech</option>
//               <option>Finance</option>
//               <option>Lifestyle</option>
//               <option>Mindset</option>
//               <option>News</option>

//             </select>

//             <BlogEditor content={content} onChange={setContent} />
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import BlogEditor from '../components/BlogEditor';
import { Save, Upload, X, CheckCircle } from 'lucide-react';

export default function EditorPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Where to Go');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);

  // Load API key from localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem('imgbb_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToImgBB = async () => {
    if (!imageFile) return;
    if (!apiKey) {
      alert('Please enter your ImgBB API key first!');
      setShowApiInput(true);
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
      alert('Upload failed: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const saveApiKey = () => {
    if (apiKey) {
      localStorage.setItem('imgbb_api_key', apiKey);
      setShowApiInput(false);
      alert('API Key saved successfully!');
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview('');
    setImageUrl('');
  };

  const handlePublish = () => {
    if (!title || !excerpt || !content) {
      alert('Please fill in title, excerpt, and content!');
      return;
    }
    if (!imageUrl && !imagePreview) {
      alert('Please upload an image!');
      return;
    }

    // Create new blog object
    const newBlog = {
      id: Date.now(),
      title,
      category,
      image: imageUrl || imagePreview,
      excerpt,
      content,
      ...(featured && { featured: true })
    };

    // Get existing user blogs from localStorage
    const savedBlogs = localStorage.getItem('user_blogs');
    let userBlogs = [];
    if (savedBlogs) {
      try {
        userBlogs = JSON.parse(savedBlogs);
      } catch (error) {
        console.error('Error parsing saved blogs:', error);
      }
    }

    // Add new blog to the beginning
    userBlogs.unshift(newBlog);

    // Save back to localStorage
    localStorage.setItem('user_blogs', JSON.stringify(userBlogs));

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('blogPublished'));

    alert('Blog published successfully! 🎉');
    
    // Redirect to home page
    router.push('/');
  };

  return (
    <>
      <Header 
        showBackButton={true}
        rightButton={
          <button 
            onClick={handlePublish}
            className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            <Save size={16} /> Publish
          </button>
        }
      />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-8 py-12">
          {/* API Key Input */}
          {showApiInput && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2">🔑 ImgBB API Key</h3>
              <p className="text-sm text-gray-600 mb-3">
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
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-2 border rounded outline-none mb-2"
              />
              <div className="flex gap-2">
                <button 
                  onClick={saveApiKey}
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  Save
                </button>
                <button 
                  onClick={() => setShowApiInput(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
            {/* Title */}
            <input
              type="text"
              placeholder="Article Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl font-light mb-4 outline-none border-b pb-4"
            />

            {/* Category and Featured */}
            <div className="flex gap-4 mb-6 flex-wrap items-center">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 border rounded outline-none"
              >
                <option>Where to Go</option>
                <option>Where to Eat</option>
                <option>What to Do</option>
                <option>Places to Stay</option>
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
                  onClick={() => setShowApiInput(true)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  📝 Set API Key
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
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Image uploaded successfully!</p>
                    <p className="text-xs text-gray-600 break-all">{imageUrl}</p>
                  </div>
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

            {/* Content Editor */}
            <BlogEditor content={content} onChange={setContent} />
          </div>
        </div>
      </main>
    </>
  );
}

// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { useRouter, useSearchParams } from 'next/navigation';
// // import { isAuthenticated, logout } from '../../lib/auth';
// // import { Save, Upload, X, CheckCircle, ArrowLeft, LogOut, Bold, Italic, List, Heading1, Heading2 } from 'lucide-react';

// // interface Blog {
// //   id: number;
// //   title: string;
// //   category: string;
// //   image: string;
// //   excerpt: string;
// //   content: string;
// //   featured?: boolean;
// // }

// // // Improved Editor Component
// // const BlogEditor = ({ content, onChange }: { content: string; onChange: (content: string) => void }) => {
// //   const [editorContent, setEditorContent] = useState(content || '');
// //   const editorRef = useRef<HTMLDivElement>(null);
// //   const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

// //   useEffect(() => {
// //     if (editorRef.current && !editorRef.current.innerHTML) {
// //       editorRef.current.innerHTML = editorContent;
// //     }
// //   }, []);

// //   const updateActiveFormats = () => {
// //     const formats = new Set<string>();
    
// //     if (document.queryCommandState('bold')) formats.add('bold');
// //     if (document.queryCommandState('italic')) formats.add('italic');
// //     if (document.queryCommandState('insertUnorderedList')) formats.add('ul');
    
// //     // Check for heading tags
// //     const selection = window.getSelection();
// //     if (selection && selection.anchorNode) {
// //       let node = selection.anchorNode.parentElement;
// //       while (node && node !== editorRef.current) {
// //         if (node.tagName === 'H1') formats.add('h1');
// //         if (node.tagName === 'H2') formats.add('h2');
// //         node = node.parentElement;
// //       }
// //     }
    
// //     setActiveFormats(formats);
// //   };

// //   const execCommand = (command: string, value: string | null = null) => {
// //     document.execCommand(command, false, value as any);
// //     editorRef.current?.focus();
// //     updateActiveFormats();
    
// //     // Update content after command
// //     if (editorRef.current) {
// //       const html = editorRef.current.innerHTML;
// //       setEditorContent(html);
// //       onChange(html);
// //     }
// //   };

// //   const toggleHeading = (level: 'h1' | 'h2') => {
// //     const selection = window.getSelection();
// //     if (!selection || !selection.rangeCount) return;

// //     const range = selection.getRangeAt(0);
// //     let container = range.commonAncestorContainer;
    
// //     // Get the parent element
// //     let element = container.nodeType === 3 ? container.parentElement : container as HTMLElement;
    
// //     // Find if we're inside a heading
// //     let currentHeading: HTMLElement | null = null;
// //     let temp: HTMLElement | null = element;
// //     while (temp && temp !== editorRef.current) {
// //       if (temp.tagName === 'H1' || temp.tagName === 'H2') {
// //         currentHeading = temp;
// //         break;
// //       }
// //       temp = temp.parentElement;
// //     }

// //     if (currentHeading && currentHeading.tagName.toLowerCase() === level) {
// //       // Remove heading - convert to paragraph
// //       const p = document.createElement('p');
// //       p.innerHTML = currentHeading.innerHTML;
// //       currentHeading.replaceWith(p);
// //     } else if (currentHeading) {
// //       // Change heading level
// //       const newHeading = document.createElement(level);
// //       newHeading.innerHTML = currentHeading.innerHTML;
// //       currentHeading.replaceWith(newHeading);
// //     } else {
// //       // Apply heading
// //       document.execCommand('formatBlock', false, level);
// //     }

// //     editorRef.current?.focus();
// //     updateActiveFormats();
    
// //     if (editorRef.current) {
// //       const html = editorRef.current.innerHTML;
// //       setEditorContent(html);
// //       onChange(html);
// //     }
// //   };

// //   return (
// //     <div className="border rounded-lg overflow-hidden bg-white">
// //       <div className="flex gap-1 p-2 border-b bg-gray-50 flex-wrap">
// //         <button
// //           onClick={() => execCommand('bold')}
// //           className={`p-2 rounded transition ${
// //             activeFormats.has('bold') 
// //               ? 'bg-blue-500 text-white' 
// //               : 'hover:bg-gray-200'
// //           }`}
// //           title="Bold (Ctrl+B)"
// //         >
// //           <Bold size={16} />
// //         </button>
        
// //         <button
// //           onClick={() => execCommand('italic')}
// //           className={`p-2 rounded transition ${
// //             activeFormats.has('italic') 
// //               ? 'bg-blue-500 text-white' 
// //               : 'hover:bg-gray-200'
// //           }`}
// //           title="Italic (Ctrl+I)"
// //         >
// //           <Italic size={16} />
// //         </button>

// //         <div className="w-px bg-gray-300 mx-1" />

// //         <button
// //           onClick={() => toggleHeading('h1')}
// //           className={`p-2 rounded transition ${
// //             activeFormats.has('h1') 
// //               ? 'bg-blue-500 text-white' 
// //               : 'hover:bg-gray-200'
// //           }`}
// //           title="Heading 1"
// //         >
// //           <Heading1 size={16} />
// //         </button>

// //         <button
// //           onClick={() => toggleHeading('h2')}
// //           className={`p-2 rounded transition ${
// //             activeFormats.has('h2') 
// //               ? 'bg-blue-500 text-white' 
// //               : 'hover:bg-gray-200'
// //           }`}
// //           title="Heading 2"
// //         >
// //           <Heading2 size={16} />
// //         </button>

// //         <div className="w-px bg-gray-300 mx-1" />

// //         <button
// //           onClick={() => execCommand('insertUnorderedList')}
// //           className={`p-2 rounded transition ${
// //             activeFormats.has('ul') 
// //               ? 'bg-blue-500 text-white' 
// //               : 'hover:bg-gray-200'
// //           }`}
// //           title="Bullet List"
// //         >
// //           <List size={16} />
// //         </button>
// //       </div>
      
// //       <div
// //         ref={editorRef}
// //         contentEditable
// //         className="p-4 min-h-[400px] outline-none prose max-w-none"
// //         onInput={(e) => {
// //           const html = e.currentTarget.innerHTML;
// //           setEditorContent(html);
// //           onChange(html);
// //         }}
// //         onKeyUp={updateActiveFormats}
// //         onMouseUp={updateActiveFormats}
// //         onClick={updateActiveFormats}
// //       />
// //     </div>
// //   );
// // };

// // export default function AdminEditorPage() {
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const editId = searchParams.get('id');
// //   const isEditMode = !!editId;

// //   // Add mounting state to prevent hydration mismatch
// //   const [isMounted, setIsMounted] = useState(false);
// //   const [isAuth, setIsAuth] = useState(false);

// //   const [title, setTitle] = useState('');
// //   const [category, setCategory] = useState('Where to Go');
// //   const [excerpt, setExcerpt] = useState('');
// //   const [content, setContent] = useState('');
// //   const [imageFile, setImageFile] = useState<File | null>(null);
// //   const [imagePreview, setImagePreview] = useState('');
// //   const [imageUrl, setImageUrl] = useState('');
// //   const [featured, setFeatured] = useState(false);
// //   const [uploading, setUploading] = useState(false);
// //   const [apiKey, setApiKey] = useState('');
// //   const [showApiInput, setShowApiInput] = useState(false);

// //   useEffect(() => {
// //     setIsMounted(true);
    
// //     // Check authentication
// //     if (!isAuthenticated()) {
// //       router.push('/admin/login');
// //       return;
// //     }
    
// //     setIsAuth(true);

// //     // Load API key
// //     const savedApiKey = localStorage.getItem('imgbb_api_key');
// //     if (savedApiKey) {
// //       setApiKey(savedApiKey);
// //     }

// //     // Load blog data if editing
// //     if (isEditMode && editId) {
// //       loadBlogData(Number(editId));
// //     }
// //   }, [editId, isEditMode, router]);

// //   const loadBlogData = (id: number) => {
// //     const savedBlogs = localStorage.getItem('user_blogs');
// //     if (savedBlogs) {
// //       try {
// //         const userBlogs: Blog[] = JSON.parse(savedBlogs);
// //         const blog = userBlogs.find(b => b.id === id);
// //         if (blog) {
// //           setTitle(blog.title);
// //           setCategory(blog.category);
// //           setExcerpt(blog.excerpt);
// //           setContent(blog.content);
// //           setImageUrl(blog.image);
// //           setImagePreview(blog.image);
// //           setFeatured(blog.featured || false);
// //         }
// //       } catch (error) {
// //         console.error('Error loading blog:', error);
// //       }
// //     }
// //   };

// //   const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       setImageFile(file);
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setImagePreview(reader.result as string);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const uploadToImgBB = async () => {
// //     if (!imageFile) return;
// //     if (!apiKey) {
// //       alert('Please enter your ImgBB API key first!');
// //       setShowApiInput(true);
// //       return;
// //     }

// //     setUploading(true);
// //     const formData = new FormData();
// //     formData.append('image', imageFile);

// //     try {
// //       const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
// //         method: 'POST',
// //         body: formData,
// //       });

// //       const data = await response.json();
// //       if (data.success) {
// //         setImageUrl(data.data.url);
// //         alert('Image uploaded successfully!');
// //       } else {
// //         alert('Upload failed: ' + (data.error?.message || 'Unknown error'));
// //       }
// //     } catch (error) {
// //       alert('Upload failed: ' + (error as Error).message);
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   const saveApiKey = () => {
// //     if (apiKey) {
// //       localStorage.setItem('imgbb_api_key', apiKey);
// //       setShowApiInput(false);
// //       alert('API Key saved successfully!');
// //     }
// //   };

// //   const clearImage = () => {
// //     setImageFile(null);
// //     setImagePreview('');
// //     setImageUrl('');
// //   };

// //   const handlePublishOld = () => {
// //     if (!title || !excerpt || !content) {
// //       alert('Please fill in title, excerpt, and content!');
// //       return;
// //     }
// //     if (!imageUrl && !imagePreview) {
// //       alert('Please upload an image!');
// //       return;
// //     }

// //     const savedBlogs = localStorage.getItem('user_blogs');
// //     let userBlogs: Blog[] = [];
// //     if (savedBlogs) {
// //       try {
// //         userBlogs = JSON.parse(savedBlogs);
// //       } catch (error) {
// //         console.error('Error parsing saved blogs:', error);
// //       }
// //     }

// //     if (isEditMode && editId) {
// //       // Update existing blog
// //       const blogIndex = userBlogs.findIndex(b => b.id === Number(editId));
// //       if (blogIndex !== -1) {
// //         userBlogs[blogIndex] = {
// //           ...userBlogs[blogIndex],
// //           title,
// //           category,
// //           image: imageUrl || imagePreview,
// //           excerpt,
// //           content,
// //           featured
// //         };
// //       }
// //     } else {
// //       // Create new blog
// //       const newBlog: Blog = {
// //         id: Date.now(),
// //         title,
// //         category,
// //         image: imageUrl || imagePreview,
// //         excerpt,
// //         content,
// //         ...(featured && { featured: true })
// //       };
// //       userBlogs.unshift(newBlog);
// //     }

// //     localStorage.setItem('user_blogs', JSON.stringify(userBlogs));
// //     window.dispatchEvent(new Event('blogPublished'));

// //     alert(isEditMode ? 'Blog updated successfully! 🎉' : 'Blog published successfully! 🎉');
// //     router.push('/admin/dashboard');
// //   };

// //   const handlePublish = () => {
// //     if (!title || !excerpt || !content) {
// //       alert('Please fill in title, excerpt, and content!');
// //       return;
// //     }
// //     if (!imageUrl && !imagePreview) {
// //       alert('Please upload an image!');
// //       return;
// //     }

// //     // Get existing default blogs (permanent storage)
// //     const savedDefaultBlogs = localStorage.getItem('default_blogs');
// //     let defaultBlogs: Blog[] = [];
    
// //     if (savedDefaultBlogs) {
// //       try {
// //         defaultBlogs = JSON.parse(savedDefaultBlogs);
// //       } catch (error) {
// //         console.error('Error parsing default blogs:', error);
// //         defaultBlogs = [];
// //       }
// //     }

// //     if (isEditMode && editId) {
// //       // Update existing blog in default_blogs
// //       const blogIndex = defaultBlogs.findIndex(b => b.id === Number(editId));
// //       if (blogIndex !== -1) {
// //         defaultBlogs[blogIndex] = {
// //           ...defaultBlogs[blogIndex],
// //           title,
// //           category,
// //           image: imageUrl || imagePreview,
// //           excerpt,
// //           content,
// //           featured
// //         };
// //       } else {
// //         // If not found in default_blogs, add it (edge case)
// //         defaultBlogs.unshift({
// //           id: Number(editId),
// //           title,
// //           category,
// //           image: imageUrl || imagePreview,
// //           excerpt,
// //           content,
// //           featured
// //         });
// //       }
// //     } else {
// //       // Create new blog and add to default_blogs
// //       const newBlog: Blog = {
// //         id: Date.now(),
// //         title,
// //         category,
// //         image: imageUrl || imagePreview,
// //         excerpt,
// //         content,
// //         featured: featured
// //       };
// //       defaultBlogs.unshift(newBlog);
// //     }

// //     // Save to default_blogs (permanent storage)
// //     localStorage.setItem('default_blogs', JSON.stringify(defaultBlogs));
    
// //     // Trigger update event
// //     window.dispatchEvent(new Event('blogPublished'));

// //     alert(isEditMode ? 'Blog updated successfully! 🎉' : 'Blog published successfully! 🎉');
// //     router.push('/admin/dashboard');
// //   };

// //   const handleLogout = () => {
// //     logout();
// //     router.push('/admin/login');
// //   };

// //   // Show nothing until mounted and authenticated
// //   if (!isMounted || !isAuth) {
// //     return null;
// //   }

// //   return (
// //     <>
// //       <header className="bg-white border-b sticky top-0 z-10">
// //         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// //           <div className="flex items-center justify-between">
// //             <button
// //               onClick={() => router.push('/admin/dashboard')}
// //               className="flex items-center gap-2 text-gray-600 hover:text-black"
// //             >
// //               <ArrowLeft size={18} />
// //               Back to Dashboard
// //             </button>
// //             <h1 className="text-xl font-semibold">
// //               {isEditMode ? 'Edit Post' : 'Create New Post'}
// //             </h1>
// //             <div className="flex gap-2">
// //               <button
// //                 onClick={handlePublish}
// //                 className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
// //               >
// //                 <Save size={16} />
// //                 {isEditMode ? 'Update' : 'Publish'}
// //               </button>
// //               <button
// //                 onClick={handleLogout}
// //                 className="p-2 hover:bg-gray-100 rounded-lg"
// //                 title="Logout"
// //               >
// //                 <LogOut size={18} />
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <main className="min-h-screen bg-gray-50">
// //         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //           {/* API Key Input */}
// //           {showApiInput && (
// //             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
// //               <h3 className="font-semibold mb-2">🔑 ImgBB API Key</h3>
// //               <p className="text-sm text-gray-600 mb-3">
// //                 Get your free API key from{' '}
// //                 <a 
// //                   href="https://api.imgbb.com/" 
// //                   target="_blank" 
// //                   rel="noopener noreferrer" 
// //                   className="text-blue-600 underline"
// //                 >
// //                   imgbb.com/api
// //                 </a>
// //               </p>
// //               <input
// //                 type="text"
// //                 placeholder="Paste your ImgBB API key here"
// //                 value={apiKey}
// //                 onChange={(e) => setApiKey(e.target.value)}
// //                 className="w-full px-4 py-2 border rounded outline-none mb-2"
// //               />
// //               <div className="flex gap-2">
// //                 <button 
// //                   onClick={saveApiKey}
// //                   className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
// //                 >
// //                   Save
// //                 </button>
// //                 <button 
// //                   onClick={() => setShowApiInput(false)}
// //                   className="px-4 py-2 border rounded hover:bg-gray-50"
// //                 >
// //                   Close
// //                 </button>
// //               </div>
// //             </div>
// //           )}

// //           <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
// //             {/* Title */}
// //             <input
// //               type="text"
// //               placeholder="Article Title"
// //               value={title}
// //               onChange={(e) => setTitle(e.target.value)}
// //               className="w-full text-3xl sm:text-4xl font-light mb-4 outline-none border-b pb-4"
// //             />

// //             {/* Category and Featured */}
// //             <div className="flex gap-4 mb-6 flex-wrap items-center">
// //               <select
// //                 value={category}
// //                 onChange={(e) => setCategory(e.target.value)}
// //                 className="px-4 py-2 border rounded outline-none"
// //               >
// //                 <option>Where to Go</option>
// //                 <option>Where to Eat</option>
// //                 <option>What to Do</option>
// //                 <option>Places to Stay</option>
// //               </select>

// //               <label className="flex items-center gap-2 cursor-pointer">
// //                 <input
// //                   type="checkbox"
// //                   checked={featured}
// //                   onChange={(e) => setFeatured(e.target.checked)}
// //                   className="w-4 h-4"
// //                 />
// //                 <span>Featured Post</span>
// //               </label>

// //               {!apiKey && (
// //                 <button
// //                   onClick={() => setShowApiInput(true)}
// //                   className="text-sm text-blue-600 hover:underline"
// //                 >
// //                   📝 Set API Key
// //                 </button>
// //               )}
// //             </div>

// //             {/* Image Upload Section */}
// //             <div className="mb-6 p-6 border-2 border-dashed rounded-lg bg-gray-50">
// //               <h3 className="font-semibold mb-3 flex items-center gap-2">
// //                 <Upload size={18} /> Cover Image
// //               </h3>

// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleImageSelect}
// //                 className="mb-3 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
// //               />

// //               {imagePreview && (
// //                 <div className="relative mb-3">
// //                   <img 
// //                     src={imagePreview} 
// //                     alt="Preview" 
// //                     className="w-full max-h-64 object-cover rounded"
// //                   />
// //                   {!isEditMode && (
// //                     <button
// //                       onClick={clearImage}
// //                       className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
// //                     >
// //                       <X size={16} />
// //                     </button>
// //                   )}
// //                 </div>
// //               )}

// //               {imageFile && !imageUrl && (
// //                 <button
// //                   onClick={uploadToImgBB}
// //                   disabled={uploading}
// //                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 transition"
// //                 >
// //                   {uploading ? 'Uploading...' : 'Upload to ImgBB'}
// //                 </button>
// //               )}

// //               {imageUrl && imageFile && (
// //                 <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded">
// //                   <CheckCircle size={18} />
// //                   <p className="text-sm font-semibold">Image uploaded successfully!</p>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Excerpt */}
// //             <textarea
// //               placeholder="Brief excerpt (summary for preview)"
// //               value={excerpt}
// //               onChange={(e) => setExcerpt(e.target.value)}
// //               className="w-full p-4 border rounded outline-none mb-6 h-24"
// //             />

// //             {/* Content Editor */}
// //             <BlogEditor content={content} onChange={setContent} />
// //           </div>
// //         </div>
// //       </main>
// //     </>
// //   );
// // }

// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { useRouter, useSearchParams } from 'next/navigation';
// // import { isAuthenticated, logout } from '../../lib/auth';
// // import { Save, Upload, X, CheckCircle, ArrowLeft, LogOut, Bold, Italic, List, Heading1, Heading2, Quote } from 'lucide-react';

// // interface Blog {
// //   id: number;
// //   title: string;
// //   category: string;
// //   image: string;
// //   excerpt: string;
// //   content: string;
// //   featured?: boolean;
// // }

// // // Improved Editor Component with Keyboard Shortcuts
// // const BlogEditor = ({ content, onChange }: { content: string; onChange: (content: string) => void }) => {
// //   const [editorContent, setEditorContent] = useState(content || '');
// //   const editorRef = useRef<HTMLDivElement>(null);
// //   const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
// //   const isInitialized = useRef(false);

// //   // Initialize editor content once
// //   useEffect(() => {
// //     if (editorRef.current && !isInitialized.current) {
// //       editorRef.current.innerHTML = content || '<p><br></p>';
// //       isInitialized.current = true;
// //     }
// //   }, [content]);

// //   const updateActiveFormats = () => {
// //     const formats = new Set<string>();
    
// //     try {
// //       // Check basic formatting
// //       if (document.queryCommandState('bold')) formats.add('bold');
// //       if (document.queryCommandState('italic')) formats.add('italic');
// //       if (document.queryCommandState('insertUnorderedList')) formats.add('ul');
      
// //       // Check for heading and blockquote tags
// //       const selection = window.getSelection();
// //       if (selection && selection.anchorNode) {
// //         let node: HTMLElement | null = selection.anchorNode.nodeType === 3 
// //           ? selection.anchorNode.parentElement 
// //           : selection.anchorNode as HTMLElement;
        
// //         while (node && node !== editorRef.current) {
// //           const tagName = node.tagName;
// //           if (tagName === 'H1') formats.add('h1');
// //           if (tagName === 'H2') formats.add('h2');
// //           if (tagName === 'BLOCKQUOTE') formats.add('blockquote');
// //           node = node.parentElement;
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error updating formats:', error);
// //     }
    
// //     setActiveFormats(formats);
// //   };

// //   const handleInput = () => {
// //     if (editorRef.current) {
// //       const html = editorRef.current.innerHTML;
// //       setEditorContent(html);
// //       onChange(html);
// //       // Update formats after a short delay to ensure DOM is updated
// //       setTimeout(updateActiveFormats, 10);
// //     }
// //   };

// //   const execCommand = (command: string, value: string | null = null) => {
// //     document.execCommand(command, false, value as any);
    
// //     if (editorRef.current) {
// //       editorRef.current.focus();
// //     }
    
// //     handleInput();
// //   };

// //   const toggleHeading = (level: 'h1' | 'h2') => {
// //     const selection = window.getSelection();
// //     if (!selection || !selection.rangeCount) return;

// //     const range = selection.getRangeAt(0);
// //     let container = range.commonAncestorContainer;
    
// //     let element = container.nodeType === 3 ? container.parentElement : container as HTMLElement;
    
// //     let currentHeading: HTMLElement | null = null;
// //     let temp: HTMLElement | null = element;
// //     while (temp && temp !== editorRef.current) {
// //       if (temp.tagName === 'H1' || temp.tagName === 'H2') {
// //         currentHeading = temp;
// //         break;
// //       }
// //       temp = temp.parentElement;
// //     }

// //     if (currentHeading && currentHeading.tagName.toLowerCase() === level) {
// //       const p = document.createElement('p');
// //       p.innerHTML = currentHeading.innerHTML;
// //       currentHeading.replaceWith(p);
      
// //       const newRange = document.createRange();
// //       newRange.selectNodeContents(p);
// //       newRange.collapse(false);
// //       selection.removeAllRanges();
// //       selection.addRange(newRange);
// //     } else if (currentHeading) {
// //       const newHeading = document.createElement(level);
// //       newHeading.innerHTML = currentHeading.innerHTML;
// //       currentHeading.replaceWith(newHeading);
      
// //       const newRange = document.createRange();
// //       newRange.selectNodeContents(newHeading);
// //       newRange.collapse(false);
// //       selection.removeAllRanges();
// //       selection.addRange(newRange);
// //     } else {
// //       document.execCommand('formatBlock', false, level);
// //     }

// //     editorRef.current?.focus();
// //     handleInput();
// //   };

// //   const toggleBlockquote = () => {
// //     const selection = window.getSelection();
// //     if (!selection || !selection.rangeCount) return;

// //     const range = selection.getRangeAt(0);
// //     let container = range.commonAncestorContainer;
// //     let element = container.nodeType === 3 ? container.parentElement : container as HTMLElement;
    
// //     let currentBlockquote: HTMLElement | null = null;
// //     let temp: HTMLElement | null = element;
// //     while (temp && temp !== editorRef.current) {
// //       if (temp.tagName === 'BLOCKQUOTE') {
// //         currentBlockquote = temp;
// //         break;
// //       }
// //       temp = temp.parentElement;
// //     }

// //     if (currentBlockquote) {
// //       const p = document.createElement('p');
// //       p.innerHTML = currentBlockquote.innerHTML;
// //       currentBlockquote.replaceWith(p);
// //     } else {
// //       document.execCommand('formatBlock', false, 'blockquote');
// //     }

// //     editorRef.current?.focus();
// //     handleInput();
// //   };

// //   // Handle keyboard shortcuts
// //   const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
// //     // Ctrl/Cmd + B for Bold
// //     if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
// //       e.preventDefault();
// //       execCommand('bold');
// //     }
// //     // Ctrl/Cmd + I for Italic
// //     else if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
// //       e.preventDefault();
// //       execCommand('italic');
// //     }
// //     // Ctrl/Cmd + Shift + 7 for Bullet List
// //     else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === '7') {
// //       e.preventDefault();
// //       execCommand('insertUnorderedList');
// //     }
// //   };

// //   return (
// //     <div className="border rounded-lg overflow-hidden bg-white">
// //       <div className="flex gap-1 p-2 border-b bg-gray-50 flex-wrap">
// //         <button
// //           type="button"
// //           onMouseDown={(e) => {
// //             e.preventDefault();
// //             execCommand('bold');
// //           }}
// //           className={`p-2 rounded transition ${
// //             activeFormats.has('bold') 
// //               ? 'bg-blue-500 text-white' 
// //               : 'hover:bg-gray-200'
// //           }`}
// //           title="Bold (Ctrl+B)"
// //         >
// //           <Bold size={16} />
// //         </button>
        
// //         <button
// //           type="button"
// //           onMouseDown={(e) => {
// //             e.preventDefault();
// //             execCommand('italic');
// //           }}
// //           className={`p-2 rounded transition ${
// //             activeFormats.has('italic') 
// //               ? 'bg-blue-500 text-white' 
// //               : 'hover:bg-gray-200'
// //           }`}
// //           title="Italic (Ctrl+I)"
// //         >
// //           <Italic size={16} />
// //         </button>

// //         <div className="w-px bg-gray-300 mx-1" />

// //         <button
// //           type="button"
// //           onMouseDown={(e) => {
// //             e.preventDefault();
// //             toggleHeading('h1');
// //           }}
// //           className={`p-2 rounded transition ${
// //             activeFormats.has('h1') 
// //               ? 'bg-blue-500 text-white' 
// //               : 'hover:bg-gray-200'
// //           }`}
// //           title="Heading 1"
// //         >
// //           <Heading1 size={16} />
// //         </button>

// //         <button
// //           type="button"
// //           onMouseDown={(e) => {
// //             e.preventDefault();
// //             toggleHeading('h2');
// //           }}
// //           className={`p-2 rounded transition ${
// //             activeFormats.has('h2') 
// //               ? 'bg-blue-500 text-white' 
// //               : 'hover:bg-gray-200'
// //           }`}
// //           title="Heading 2"
// //         >
// //           <Heading2 size={16} />
// //         </button>

// //         <div className="w-px bg-gray-300 mx-1" />

// //         <button
// //           type="button"
// //           onMouseDown={(e) => {
// //             e.preventDefault();
// //             execCommand('insertUnorderedList');
// //           }}
// //           className={`p-2 rounded transition ${
// //             activeFormats.has('ul') 
// //               ? 'bg-blue-500 text-white' 
// //               : 'hover:bg-gray-200'
// //           }`}
// //           title="Bullet List (Ctrl+Shift+7)"
// //         >
// //           <List size={16} />
// //         </button>

// //         <button
// //           type="button"
// //           onMouseDown={(e) => {
// //             e.preventDefault();
// //             toggleBlockquote();
// //           }}
// //           className={`p-2 rounded transition ${
// //             activeFormats.has('blockquote') 
// //               ? 'bg-blue-500 text-white' 
// //               : 'hover:bg-gray-200'
// //           }`}
// //           title="Quote"
// //         >
// //           <Quote size={16} />
// //         </button>
// //       </div>
      
// //       <div
// //         ref={editorRef}
// //         contentEditable
// //         className="p-4 min-h-[400px] outline-none prose prose-sm sm:prose-base max-w-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
// //         onInput={handleInput}
// //         onKeyDown={handleKeyDown}
// //         onKeyUp={updateActiveFormats}
// //         onMouseUp={updateActiveFormats}
// //         onClick={updateActiveFormats}
// //         onFocus={updateActiveFormats}
// //         suppressContentEditableWarning
// //         style={{
// //           // Ensure formatting is visible in editor
// //           lineHeight: '1.6'
// //         }}
// //       />
      
// //       {/* Add custom styles for better formatting visibility */}
// //       <style jsx>{`
// //         div[contenteditable] :global(h1) {
// //           font-size: 2em;
// //           font-weight: bold;
// //           margin: 0.67em 0;
// //         }
// //         div[contenteditable] :global(h2) {
// //           font-size: 1.5em;
// //           font-weight: bold;
// //           margin: 0.75em 0;
// //         }
// //         div[contenteditable] :global(strong),
// //         div[contenteditable] :global(b) {
// //           font-weight: bold;
// //         }
// //         div[contenteditable] :global(em),
// //         div[contenteditable] :global(i) {
// //           font-style: italic;
// //         }
// //         div[contenteditable] :global(ul) {
// //           list-style-type: disc;
// //           padding-left: 2em;
// //           margin: 1em 0;
// //         }
// //         div[contenteditable] :global(ol) {
// //           list-style-type: decimal;
// //           padding-left: 2em;
// //           margin: 1em 0;
// //         }
// //         div[contenteditable] :global(li) {
// //           margin: 0.5em 0;
// //         }
// //         div[contenteditable] :global(blockquote) {
// //           border-left: 4px solid #e5e7eb;
// //           padding-left: 1em;
// //           margin: 1em 0;
// //           font-style: italic;
// //           color: #6b7280;
// //         }
// //         div[contenteditable] :global(p) {
// //           margin: 0.5em 0;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default function AdminEditorPage() {
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const editId = searchParams.get('id');
// //   const isEditMode = !!editId;

// //   const [isMounted, setIsMounted] = useState(false);
// //   const [isAuth, setIsAuth] = useState(false);

// //   const [title, setTitle] = useState('');
// //   const [category, setCategory] = useState('Where to Go');
// //   const [excerpt, setExcerpt] = useState('');
// //   const [content, setContent] = useState('');
// //   const [imageFile, setImageFile] = useState<File | null>(null);
// //   const [imagePreview, setImagePreview] = useState('');
// //   const [imageUrl, setImageUrl] = useState('');
// //   const [featured, setFeatured] = useState(false);
// //   const [uploading, setUploading] = useState(false);
// //   const [apiKey, setApiKey] = useState('');
// //   const [showApiInput, setShowApiInput] = useState(false);

// //   useEffect(() => {
// //     setIsMounted(true);
    
// //     if (!isAuthenticated()) {
// //       router.push('/admin/login');
// //       return;
// //     }
    
// //     setIsAuth(true);

// //     const savedApiKey = localStorage.getItem('imgbb_api_key');
// //     if (savedApiKey) {
// //       setApiKey(savedApiKey);
// //     }

// //     if (isEditMode && editId) {
// //       loadBlogData(Number(editId));
// //     }
// //   }, [editId, isEditMode, router]);

// //   const loadBlogData = (id: number) => {
// //     const savedBlogs = localStorage.getItem('default_blogs');
// //     if (savedBlogs) {
// //       try {
// //         const userBlogs: Blog[] = JSON.parse(savedBlogs);
// //         const blog = userBlogs.find(b => b.id === id);
// //         if (blog) {
// //           setTitle(blog.title);
// //           setCategory(blog.category);
// //           setExcerpt(blog.excerpt);
// //           setContent(blog.content);
// //           setImageUrl(blog.image);
// //           setImagePreview(blog.image);
// //           setFeatured(blog.featured || false);
// //         }
// //       } catch (error) {
// //         console.error('Error loading blog:', error);
// //       }
// //     }
// //   };

// //   const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       setImageFile(file);
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setImagePreview(reader.result as string);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const uploadToImgBB = async () => {
// //     if (!imageFile) return;
// //     if (!apiKey) {
// //       alert('Please enter your ImgBB API key first!');
// //       setShowApiInput(true);
// //       return;
// //     }

// //     setUploading(true);
// //     const formData = new FormData();
// //     formData.append('image', imageFile);

// //     try {
// //       const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
// //         method: 'POST',
// //         body: formData,
// //       });

// //       const data = await response.json();
// //       if (data.success) {
// //         setImageUrl(data.data.url);
// //         alert('Image uploaded successfully!');
// //       } else {
// //         alert('Upload failed: ' + (data.error?.message || 'Unknown error'));
// //       }
// //     } catch (error) {
// //       alert('Upload failed: ' + (error as Error).message);
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   const saveApiKey = () => {
// //     if (apiKey) {
// //       localStorage.setItem('imgbb_api_key', apiKey);
// //       setShowApiInput(false);
// //       alert('API Key saved successfully!');
// //     }
// //   };

// //   const clearImage = () => {
// //     setImageFile(null);
// //     setImagePreview('');
// //     setImageUrl('');
// //   };

// //   const handlePublish = () => {
// //     if (!title || !excerpt || !content) {
// //       alert('Please fill in title, excerpt, and content!');
// //       return;
// //     }
// //     if (!imageUrl && !imagePreview) {
// //       alert('Please upload an image!');
// //       return;
// //     }

// //     const savedDefaultBlogs = localStorage.getItem('default_blogs');
// //     let defaultBlogs: Blog[] = [];
    
// //     if (savedDefaultBlogs) {
// //       try {
// //         defaultBlogs = JSON.parse(savedDefaultBlogs);
// //       } catch (error) {
// //         console.error('Error parsing default blogs:', error);
// //         defaultBlogs = [];
// //       }
// //     }

// //     if (isEditMode && editId) {
// //       const blogIndex = defaultBlogs.findIndex(b => b.id === Number(editId));
// //       if (blogIndex !== -1) {
// //         defaultBlogs[blogIndex] = {
// //           ...defaultBlogs[blogIndex],
// //           title,
// //           category,
// //           image: imageUrl || imagePreview,
// //           excerpt,
// //           content,
// //           featured
// //         };
// //       } else {
// //         defaultBlogs.unshift({
// //           id: Number(editId),
// //           title,
// //           category,
// //           image: imageUrl || imagePreview,
// //           excerpt,
// //           content,
// //           featured
// //         });
// //       }
// //     } else {
// //       const newBlog: Blog = {
// //         id: Date.now(),
// //         title,
// //         category,
// //         image: imageUrl || imagePreview,
// //         excerpt,
// //         content,
// //         featured: featured
// //       };
// //       defaultBlogs.unshift(newBlog);
// //     }

// //     localStorage.setItem('default_blogs', JSON.stringify(defaultBlogs));
// //     window.dispatchEvent(new Event('blogPublished'));

// //     alert(isEditMode ? 'Blog updated successfully! 🎉' : 'Blog published successfully! 🎉');
// //     router.push('/admin/dashboard');
// //   };

// //   const handleLogout = () => {
// //     logout();
// //     router.push('/admin/login');
// //   };

// //   if (!isMounted || !isAuth) {
// //     return null;
// //   }

// //   return (
// //     <>
// //       <header className="bg-white border-b sticky top-0 z-10">
// //         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// //           <div className="flex items-center justify-between">
// //             <button
// //               onClick={() => router.push('/admin/dashboard')}
// //               className="flex items-center gap-2 text-gray-600 hover:text-black"
// //             >
// //               <ArrowLeft size={18} />
// //               Back to Dashboard
// //             </button>
// //             <h1 className="text-xl font-semibold">
// //               {isEditMode ? 'Edit Post' : 'Create New Post'}
// //             </h1>
// //             <div className="flex gap-2">
// //               <button
// //                 onClick={handlePublish}
// //                 className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
// //               >
// //                 <Save size={16} />
// //                 {isEditMode ? 'Update' : 'Publish'}
// //               </button>
// //               <button
// //                 onClick={handleLogout}
// //                 className="p-2 hover:bg-gray-100 rounded-lg"
// //                 title="Logout"
// //               >
// //                 <LogOut size={18} />
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <main className="min-h-screen bg-gray-50">
// //         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //           {showApiInput && (
// //             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
// //               <h3 className="font-semibold mb-2">🔑 ImgBB API Key</h3>
// //               <p className="text-sm text-gray-600 mb-3">
// //                 Get your free API key from{' '}
// //                 <a 
// //                   href="https://api.imgbb.com/" 
// //                   target="_blank" 
// //                   rel="noopener noreferrer" 
// //                   className="text-blue-600 underline"
// //                 >
// //                   imgbb.com/api
// //                 </a>
// //               </p>
// //               <input
// //                 type="text"
// //                 placeholder="Paste your ImgBB API key here"
// //                 value={apiKey}
// //                 onChange={(e) => setApiKey(e.target.value)}
// //                 className="w-full px-4 py-2 border rounded outline-none mb-2"
// //               />
// //               <div className="flex gap-2">
// //                 <button 
// //                   onClick={saveApiKey}
// //                   className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
// //                 >
// //                   Save
// //                 </button>
// //                 <button 
// //                   onClick={() => setShowApiInput(false)}
// //                   className="px-4 py-2 border rounded hover:bg-gray-50"
// //                 >
// //                   Close
// //                 </button>
// //               </div>
// //             </div>
// //           )}

// //           <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
// //             <input
// //               type="text"
// //               placeholder="Article Title"
// //               value={title}
// //               onChange={(e) => setTitle(e.target.value)}
// //               className="w-full text-3xl sm:text-4xl font-light mb-4 outline-none border-b pb-4"
// //             />

// //             <div className="flex gap-4 mb-6 flex-wrap items-center">
// //               <select
// //                 value={category}
// //                 onChange={(e) => setCategory(e.target.value)}
// //                 className="px-4 py-2 border rounded outline-none"
// //               >
// //                 <option>Where to Go</option>
// //                 <option>Where to Eat</option>
// //                 <option>What to Do</option>
// //                 <option>Places to Stay</option>
// //               </select>

// //               <label className="flex items-center gap-2 cursor-pointer">
// //                 <input
// //                   type="checkbox"
// //                   checked={featured}
// //                   onChange={(e) => setFeatured(e.target.checked)}
// //                   className="w-4 h-4"
// //                 />
// //                 <span>Featured Post</span>
// //               </label>

// //               {!apiKey && (
// //                 <button
// //                   onClick={() => setShowApiInput(true)}
// //                   className="text-sm text-blue-600 hover:underline"
// //                 >
// //                   📝 Set API Key
// //                 </button>
// //               )}
// //             </div>

// //             <div className="mb-6 p-6 border-2 border-dashed rounded-lg bg-gray-50">
// //               <h3 className="font-semibold mb-3 flex items-center gap-2">
// //                 <Upload size={18} /> Cover Image
// //               </h3>

// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleImageSelect}
// //                 className="mb-3 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
// //               />

// //               {imagePreview && (
// //                 <div className="relative mb-3">
// //                   <img 
// //                     src={imagePreview} 
// //                     alt="Preview" 
// //                     className="w-full max-h-64 object-cover rounded"
// //                   />
// //                   {!isEditMode && (
// //                     <button
// //                       onClick={clearImage}
// //                       className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
// //                     >
// //                       <X size={16} />
// //                     </button>
// //                   )}
// //                 </div>
// //               )}

// //               {imageFile && !imageUrl && (
// //                 <button
// //                   onClick={uploadToImgBB}
// //                   disabled={uploading}
// //                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 transition"
// //                 >
// //                   {uploading ? 'Uploading...' : 'Upload to ImgBB'}
// //                 </button>
// //               )}

// //               {imageUrl && imageFile && (
// //                 <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded">
// //                   <CheckCircle size={18} />
// //                   <p className="text-sm font-semibold">Image uploaded successfully!</p>
// //                 </div>
// //               )}
// //             </div>

// //             <textarea
// //               placeholder="Brief excerpt (summary for preview)"
// //               value={excerpt}
// //               onChange={(e) => setExcerpt(e.target.value)}
// //               className="w-full p-4 border rounded outline-none mb-6 h-24"
// //             />

// //             <BlogEditor content={content} onChange={setContent} />
// //           </div>
// //         </div>
// //       </main>
// //     </>
// //   );
// // }

// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { useRouter, useSearchParams } from 'next/navigation';
// // import { isAuthenticated, logout } from '../../lib/auth';
// // import { Save, Upload, X, CheckCircle, ArrowLeft, LogOut, Bold, Italic, List, Heading1, Heading2, Quote } from 'lucide-react';

// // interface Blog {
// //   id: number;
// //   title: string;
// //   category: string;
// //   image: string;
// //   excerpt: string;
// //   content: string;
// //   featured?: boolean;
// // }

// // // Improved Editor Component with Keyboard Shortcuts
// // const BlogEditor = ({ content, onChange }: { content: string; onChange: (content: string) => void }) => {
// //   const [editorContent, setEditorContent] = useState(content || '');
// //   const editorRef = useRef<HTMLDivElement>(null);
// //   const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
// //   const isInitialized = useRef(false);

// //   // Initialize editor content once
// //   useEffect(() => {
// //     if (editorRef.current && !isInitialized.current) {
// //       editorRef.current.innerHTML = content || '<p><br></p>';
// //       isInitialized.current = true;
// //     }
// //   }, [content]);

// //   const updateActiveFormats = () => {
// //     const formats = new Set<string>();
    
// //     try {
// //       // Check basic formatting
// //       if (document.queryCommandState('bold')) formats.add('bold');
// //       if (document.queryCommandState('italic')) formats.add('italic');
// //       if (document.queryCommandState('insertUnorderedList')) formats.add('ul');
      
// //       // Check for heading and blockquote tags
// //       const selection = window.getSelection();
// //       if (selection && selection.anchorNode) {
// //         let node: HTMLElement | null = selection.anchorNode.nodeType === 3 
// //           ? selection.anchorNode.parentElement 
// //           : selection.anchorNode as HTMLElement;
        
// //         while (node && node !== editorRef.current) {
// //           const tagName = node.tagName;
// //           if (tagName === 'H1') formats.add('h1');
// //           if (tagName === 'H2') formats.add('h2');
// //           if (tagName === 'BLOCKQUOTE') formats.add('blockquote');
// //           node = node.parentElement;
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error updating formats:', error);
// //     }
    
// //     setActiveFormats(formats);
// //   };

// //   const handleInput = () => {
// //     if (editorRef.current) {
// //       const html = editorRef.current.innerHTML;
// //       setEditorContent(html);
// //       onChange(html);
// //       // Update formats after a short delay to ensure DOM is updated
// //       setTimeout(updateActiveFormats, 10);
// //     }
// //   };

// //   const execCommand = (command: string, value: string | null = null) => {
// //     document.execCommand(command, false, value as any);
    
// //     if (editorRef.current) {
// //       editorRef.current.focus();
// //     }
    
// //     handleInput();
// //   };

// //   const toggleHeading = (level: 'h1' | 'h2') => {
// //     const selection = window.getSelection();
// //     if (!selection || !selection.rangeCount) return;

// //     const range = selection.getRangeAt(0);
// //     let container = range.commonAncestorContainer;
    
// //     let element = container.nodeType === 3 ? container.parentElement : container as HTMLElement;
    
// //     let currentHeading: HTMLElement | null = null;
// //     let temp: HTMLElement | null = element;
// //     while (temp && temp !== editorRef.current) {
// //       if (temp.tagName === 'H1' || temp.tagName === 'H2') {
// //         currentHeading = temp;
// //         break;
// //       }
// //       temp = temp.parentElement;
// //     }

// //     if (currentHeading && currentHeading.tagName.toLowerCase() === level) {
// //       const p = document.createElement('p');
// //       p.innerHTML = currentHeading.innerHTML;
// //       currentHeading.replaceWith(p);
      
// //       const newRange = document.createRange();
// //       newRange.selectNodeContents(p);
// //       newRange.collapse(false);
// //       selection.removeAllRanges();
// //       selection.addRange(newRange);
// //     } else if (currentHeading) {
// //       const newHeading = document.createElement(level);
// //       newHeading.innerHTML = currentHeading.innerHTML;
// //       currentHeading.replaceWith(newHeading);
      
// //       const newRange = document.createRange();
// //       newRange.selectNodeContents(newHeading);
// //       newRange.collapse(false);
// //       selection.removeAllRanges();
// //       selection.addRange(newRange);
// //     } else {
// //       document.execCommand('formatBlock', false, level);
// //     }

// //     editorRef.current?.focus();
// //     handleInput();
// //   };

// //   const toggleBlockquote = () => {
// //     const selection = window.getSelection();
// //     if (!selection || !selection.rangeCount) return;

// //     const range = selection.getRangeAt(0);
// //     let container = range.commonAncestorContainer;
// //     let element = container.nodeType === 3 ? container.parentElement : container as HTMLElement;
    
// //     let currentBlockquote: HTMLElement | null = null;
// //     let temp: HTMLElement | null = element;
// //     while (temp && temp !== editorRef.current) {
// //       if (temp.tagName === 'BLOCKQUOTE') {
// //         currentBlockquote = temp;
// //         break;
// //       }
// //       temp = temp.parentElement;
// //     }

// //     if (currentBlockquote) {
// //       const p = document.createElement('p');
// //       p.innerHTML = currentBlockquote.innerHTML;
// //       currentBlockquote.replaceWith(p);
// //     } else {
// //       document.execCommand('formatBlock', false, 'blockquote');
// //     }

// //     editorRef.current?.focus();
// //     handleInput();
// //   };

// //   // Handle keyboard shortcuts
// //   const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
// //     // Ctrl/Cmd + B for Bold
// //     if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
// //       e.preventDefault();
// //       execCommand('bold');
// //     }
// //     // Ctrl/Cmd + I for Italic
// //     else if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
// //       e.preventDefault();
// //       execCommand('italic');
// //     }
// //     // Ctrl/Cmd + Shift + 7 for Bullet List
// //     else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === '7') {
// //       e.preventDefault();
// //       execCommand('insertUnorderedList');
// //     }
// //   };

// //   return (
// //     <div className="border rounded-lg overflow-hidden bg-white">
// //       <div className="flex gap-1 p-2 border-b bg-gray-50 flex-wrap">
// //         <button
// //           type="button"
// //           onMouseDown={(e) => {
// //             e.preventDefault();
// //             execCommand('bold');
// //           }}
// //           className={`p-2 rounded transition ${
// //             activeFormats.has('bold') 
// //               ? 'bg-blue-500 text-white' 
// //               : 'hover:bg-gray-200'
// //           }`}
// //           title="Bold (Ctrl+B)"
// //         >
// //           <Bold size={16} />
// //         </button>
        
// //         <button
// //           type="button"
// //           onMouseDown={(e) => {
// //             e.preventDefault();
// //             execCommand('italic');
// //           }}
// //           className={`p-2 rounded transition ${
// //             activeFormats.has('italic') 
// //               ? 'bg-blue-500 text-white' 
// //               : 'hover:bg-gray-200'
// //           }`}
// //           title="Italic (Ctrl+I)"
// //         >
// //           <Italic size={16} />
// //         </button>

// //         <div className="w-px bg-gray-300 mx-1" />

// //         <button
// //           type="button"
// //           onMouseDown={(e) => {
// //             e.preventDefault();
// //             toggleHeading('h1');
// //           }}
// //           className={`p-2 rounded transition ${
// //             activeFormats.has('h1') 
// //               ? 'bg-blue-500 text-white' 
// //               : 'hover:bg-gray-200'
// //           }`}
// //           title="Heading 1"
// //         >
// //           <Heading1 size={16} />
// //         </button>

// //         <button
// //           type="button"
// //           onMouseDown={(e) => {
// //             e.preventDefault();
// //             toggleHeading('h2');
// //           }}
// //           className={`p-2 rounded transition ${
// //             activeFormats.has('h2') 
// //               ? 'bg-blue-500 text-white' 
// //               : 'hover:bg-gray-200'
// //           }`}
// //           title="Heading 2"
// //         >
// //           <Heading2 size={16} />
// //         </button>

// //         <div className="w-px bg-gray-300 mx-1" />

// //         <button
// //           type="button"
// //           onMouseDown={(e) => {
// //             e.preventDefault();
// //             execCommand('insertUnorderedList');
// //           }}
// //           className={`p-2 rounded transition ${
// //             activeFormats.has('ul') 
// //               ? 'bg-blue-500 text-white' 
// //               : 'hover:bg-gray-200'
// //           }`}
// //           title="Bullet List (Ctrl+Shift+7)"
// //         >
// //           <List size={16} />
// //         </button>

// //         <button
// //           type="button"
// //           onMouseDown={(e) => {
// //             e.preventDefault();
// //             toggleBlockquote();
// //           }}
// //           className={`p-2 rounded transition ${
// //             activeFormats.has('blockquote') 
// //               ? 'bg-blue-500 text-white' 
// //               : 'hover:bg-gray-200'
// //           }`}
// //           title="Quote"
// //         >
// //           <Quote size={16} />
// //         </button>
// //       </div>
      
// //       <div
// //         ref={editorRef}
// //         contentEditable
// //         className="p-4 min-h-[400px] outline-none prose prose-sm sm:prose-base max-w-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
// //         onInput={handleInput}
// //         onKeyDown={handleKeyDown}
// //         onKeyUp={updateActiveFormats}
// //         onMouseUp={updateActiveFormats}
// //         onClick={updateActiveFormats}
// //         onFocus={updateActiveFormats}
// //         suppressContentEditableWarning
// //         style={{
// //           lineHeight: '1.6'
// //         }}
// //       />
      
// //       {/* Add custom styles for better formatting visibility */}
// //       <style jsx>{`
// //         div[contenteditable] :global(h1) {
// //           font-size: 2em;
// //           font-weight: bold;
// //           margin: 0.67em 0;
// //         }
// //         div[contenteditable] :global(h2) {
// //           font-size: 1.5em;
// //           font-weight: bold;
// //           margin: 0.75em 0;
// //         }
// //         div[contenteditable] :global(strong),
// //         div[contenteditable] :global(b) {
// //           font-weight: bold;
// //         }
// //         div[contenteditable] :global(em),
// //         div[contenteditable] :global(i) {
// //           font-style: italic;
// //         }
// //         div[contenteditable] :global(ul) {
// //           list-style-type: disc;
// //           padding-left: 2em;
// //           margin: 1em 0;
// //         }
// //         div[contenteditable] :global(ol) {
// //           list-style-type: decimal;
// //           padding-left: 2em;
// //           margin: 1em 0;
// //         }
// //         div[contenteditable] :global(li) {
// //           margin: 0.5em 0;
// //         }
// //         div[contenteditable] :global(blockquote) {
// //           border-left: 4px solid #e5e7eb;
// //           padding-left: 1em;
// //           margin: 1em 0;
// //           font-style: italic;
// //           color: #6b7280;
// //         }
// //         div[contenteditable] :global(p) {
// //           margin: 0.5em 0;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default function AdminEditorPage() {
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const editId = searchParams.get('id');
// //   const isEditMode = !!editId;

// //   // FIXED: Use a single mounting state to prevent hydration mismatch
// //   const [mounted, setMounted] = useState(false);

// //   const [title, setTitle] = useState('');
// //   const [category, setCategory] = useState('Where to Go');
// //   const [excerpt, setExcerpt] = useState('');
// //   const [content, setContent] = useState('');
// //   const [imageFile, setImageFile] = useState<File | null>(null);
// //   const [imagePreview, setImagePreview] = useState('');
// //   const [imageUrl, setImageUrl] = useState('');
// //   const [featured, setFeatured] = useState(false);
// //   const [uploading, setUploading] = useState(false);
// //   const [apiKey, setApiKey] = useState('');
// //   const [showApiInput, setShowApiInput] = useState(false);

// //   useEffect(() => {
// //     // Set mounted first
// //     setMounted(true);
    
// //     // Check authentication after component is mounted
// //     if (!isAuthenticated()) {
// //       router.push('/admin/login');
// //       return;
// //     }

// //     // Load API key from localStorage (only on client)
// //     const savedApiKey = localStorage.getItem('imgbb_api_key');
// //     if (savedApiKey) {
// //       setApiKey(savedApiKey);
// //     }

// //     // Load blog data if editing
// //     if (isEditMode && editId) {
// //       loadBlogData(Number(editId));
// //     }
// //   }, [editId, isEditMode, router]);

// //   const loadBlogData = (id: number) => {
// //     const savedBlogs = localStorage.getItem('default_blogs');
// //     if (savedBlogs) {
// //       try {
// //         const userBlogs: Blog[] = JSON.parse(savedBlogs);
// //         const blog = userBlogs.find(b => b.id === id);
// //         if (blog) {
// //           setTitle(blog.title);
// //           setCategory(blog.category);
// //           setExcerpt(blog.excerpt);
// //           setContent(blog.content);
// //           setImageUrl(blog.image);
// //           setImagePreview(blog.image);
// //           setFeatured(blog.featured || false);
// //         }
// //       } catch (error) {
// //         console.error('Error loading blog:', error);
// //       }
// //     }
// //   };

// //   const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       setImageFile(file);
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setImagePreview(reader.result as string);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const uploadToImgBB = async () => {
// //     if (!imageFile) return;
// //     if (!apiKey) {
// //       alert('Please enter your ImgBB API key first!');
// //       setShowApiInput(true);
// //       return;
// //     }

// //     setUploading(true);
// //     const formData = new FormData();
// //     formData.append('image', imageFile);

// //     try {
// //       const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
// //         method: 'POST',
// //         body: formData,
// //       });

// //       const data = await response.json();
// //       if (data.success) {
// //         setImageUrl(data.data.url);
// //         alert('Image uploaded successfully!');
// //       } else {
// //         alert('Upload failed: ' + (data.error?.message || 'Unknown error'));
// //       }
// //     } catch (error) {
// //       alert('Upload failed: ' + (error as Error).message);
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   const saveApiKey = () => {
// //     if (apiKey) {
// //       localStorage.setItem('imgbb_api_key', apiKey);
// //       setShowApiInput(false);
// //       alert('API Key saved successfully!');
// //     }
// //   };

// //   const clearImage = () => {
// //     setImageFile(null);
// //     setImagePreview('');
// //     setImageUrl('');
// //   };

// //   const handlePublish = () => {
// //     if (!title || !excerpt || !content) {
// //       alert('Please fill in title, excerpt, and content!');
// //       return;
// //     }
// //     if (!imageUrl && !imagePreview) {
// //       alert('Please upload an image!');
// //       return;
// //     }

// //     const savedDefaultBlogs = localStorage.getItem('default_blogs');
// //     let defaultBlogs: Blog[] = [];
    
// //     if (savedDefaultBlogs) {
// //       try {
// //         defaultBlogs = JSON.parse(savedDefaultBlogs);
// //       } catch (error) {
// //         console.error('Error parsing default blogs:', error);
// //         defaultBlogs = [];
// //       }
// //     }

// //     if (isEditMode && editId) {
// //       const blogIndex = defaultBlogs.findIndex(b => b.id === Number(editId));
// //       if (blogIndex !== -1) {
// //         defaultBlogs[blogIndex] = {
// //           ...defaultBlogs[blogIndex],
// //           title,
// //           category,
// //           image: imageUrl || imagePreview,
// //           excerpt,
// //           content,
// //           featured
// //         };
// //       } else {
// //         defaultBlogs.unshift({
// //           id: Number(editId),
// //           title,
// //           category,
// //           image: imageUrl || imagePreview,
// //           excerpt,
// //           content,
// //           featured
// //         });
// //       }
// //     } else {
// //       const newBlog: Blog = {
// //         id: Date.now(),
// //         title,
// //         category,
// //         image: imageUrl || imagePreview,
// //         excerpt,
// //         content,
// //         featured: featured
// //       };
// //       defaultBlogs.unshift(newBlog);
// //     }

// //     localStorage.setItem('default_blogs', JSON.stringify(defaultBlogs));
// //     window.dispatchEvent(new Event('blogPublished'));

// //     alert(isEditMode ? 'Blog updated successfully! 🎉' : 'Blog published successfully! 🎉');
// //     router.push('/admin/dashboard');
// //   };

// //   const handleLogout = () => {
// //     logout();
// //     router.push('/admin/login');
// //   };

// //   // FIXED: Show loading state instead of returning null
// //   // This prevents hydration mismatch by rendering the same structure on server and client
// //   if (!mounted) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-gray-600">Loading...</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <>
// //       <header className="bg-white border-b sticky top-0 z-10">
// //         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// //           <div className="flex items-center justify-between">
// //             <button
// //               onClick={() => router.push('/admin/dashboard')}
// //               className="flex items-center gap-2 text-gray-600 hover:text-black"
// //             >
// //               <ArrowLeft size={18} />
// //               Back to Dashboard
// //             </button>
// //             <h1 className="text-xl font-semibold">
// //               {isEditMode ? 'Edit Post' : 'Create New Post'}
// //             </h1>
// //             <div className="flex gap-2">
// //               <button
// //                 onClick={handlePublish}
// //                 className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
// //               >
// //                 <Save size={16} />
// //                 {isEditMode ? 'Update' : 'Publish'}
// //               </button>
// //               <button
// //                 onClick={handleLogout}
// //                 className="p-2 hover:bg-gray-100 rounded-lg"
// //                 title="Logout"
// //               >
// //                 <LogOut size={18} />
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <main className="min-h-screen bg-gray-50">
// //         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //           {showApiInput && (
// //             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
// //               <h3 className="font-semibold mb-2">🔑 ImgBB API Key</h3>
// //               <p className="text-sm text-gray-600 mb-3">
// //                 Get your free API key from{' '}
// //                 <a 
// //                   href="https://api.imgbb.com/" 
// //                   target="_blank" 
// //                   rel="noopener noreferrer" 
// //                   className="text-blue-600 underline"
// //                 >
// //                   imgbb.com/api
// //                 </a>
// //               </p>
// //               <input
// //                 type="text"
// //                 placeholder="Paste your ImgBB API key here"
// //                 value={apiKey}
// //                 onChange={(e) => setApiKey(e.target.value)}
// //                 className="w-full px-4 py-2 border rounded outline-none mb-2"
// //               />
// //               <div className="flex gap-2">
// //                 <button 
// //                   onClick={saveApiKey}
// //                   className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
// //                 >
// //                   Save
// //                 </button>
// //                 <button 
// //                   onClick={() => setShowApiInput(false)}
// //                   className="px-4 py-2 border rounded hover:bg-gray-50"
// //                 >
// //                   Close
// //                 </button>
// //               </div>
// //             </div>
// //           )}

// //           <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
// //             <input
// //               type="text"
// //               placeholder="Article Title"
// //               value={title}
// //               onChange={(e) => setTitle(e.target.value)}
// //               className="w-full text-3xl sm:text-4xl font-light mb-4 outline-none border-b pb-4"
// //             />

// //             <div className="flex gap-4 mb-6 flex-wrap items-center">
// //               <select
// //                 value={category}
// //                 onChange={(e) => setCategory(e.target.value)}
// //                 className="px-4 py-2 border rounded outline-none"
// //               >
// //                 <option>Where to Go</option>
// //                 <option>Where to Eat</option>
// //                 <option>What to Do</option>
// //                 <option>Places to Stay</option>
// //               </select>

// //               <label className="flex items-center gap-2 cursor-pointer">
// //                 <input
// //                   type="checkbox"
// //                   checked={featured}
// //                   onChange={(e) => setFeatured(e.target.checked)}
// //                   className="w-4 h-4"
// //                 />
// //                 <span>Featured Post</span>
// //               </label>

// //               {!apiKey && (
// //                 <button
// //                   onClick={() => setShowApiInput(true)}
// //                   className="text-sm text-blue-600 hover:underline"
// //                 >
// //                   📝 Set API Key
// //                 </button>
// //               )}
// //             </div>

// //             <div className="mb-6 p-6 border-2 border-dashed rounded-lg bg-gray-50">
// //               <h3 className="font-semibold mb-3 flex items-center gap-2">
// //                 <Upload size={18} /> Cover Image
// //               </h3>

// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleImageSelect}
// //                 className="mb-3 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
// //               />

// //               {imagePreview && (
// //                 <div className="relative mb-3">
// //                   <img 
// //                     src={imagePreview} 
// //                     alt="Preview" 
// //                     className="w-full max-h-64 object-cover rounded"
// //                   />
// //                   {!isEditMode && (
// //                     <button
// //                       onClick={clearImage}
// //                       className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
// //                     >
// //                       <X size={16} />
// //                     </button>
// //                   )}
// //                 </div>
// //               )}

// //               {imageFile && !imageUrl && (
// //                 <button
// //                   onClick={uploadToImgBB}
// //                   disabled={uploading}
// //                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 transition"
// //                 >
// //                   {uploading ? 'Uploading...' : 'Upload to ImgBB'}
// //                 </button>
// //               )}

// //               {imageUrl && imageFile && (
// //                 <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded">
// //                   <CheckCircle size={18} />
// //                   <p className="text-sm font-semibold">Image uploaded successfully!</p>
// //                 </div>
// //               )}
// //             </div>

// //             <textarea
// //               placeholder="Brief excerpt (summary for preview)"
// //               value={excerpt}
// //               onChange={(e) => setExcerpt(e.target.value)}
// //               className="w-full p-4 border rounded outline-none mb-6 h-24"
// //             />

// //             <BlogEditor content={content} onChange={setContent} />
// //           </div>
// //         </div>
// //       </main>
// //     </>
// //   );
// // }


// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { isAuthenticated, logout } from '../../lib/auth';
// import { Save, Upload, X, CheckCircle, ArrowLeft, LogOut, Bold, Italic, List, Heading1, Heading2, Quote } from 'lucide-react';

// interface Blog {
//   id: number;
//   title: string;
//   category: string;
//   image: string;
//   excerpt: string;
//   content: string;
//   featured?: boolean;
// }

// // Improved Editor Component with Keyboard Shortcuts and Inline Styles
// const BlogEditor = ({ content, onChange }: { content: string; onChange: (content: string) => void }) => {
//   const [editorContent, setEditorContent] = useState(content || '');
//   const editorRef = useRef<HTMLDivElement>(null);
//   const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
//   const isInitialized = useRef(false);

//   // Initialize editor content once
//   useEffect(() => {
//     if (editorRef.current && !isInitialized.current) {
//       editorRef.current.innerHTML = content || '<p><br></p>';
//       isInitialized.current = true;
//     }
//   }, [content]);

//   // Apply inline styles to ensure formatting is visible
//   useEffect(() => {
//     if (!editorRef.current) return;

//     const applyStylesToContent = () => {
//       const editor = editorRef.current;
//       if (!editor) return;

//       // Style all h1 elements
//       editor.querySelectorAll('h1').forEach((el) => {
//         (el as HTMLElement).style.fontSize = '2.25em';
//         (el as HTMLElement).style.fontWeight = '700';
//         (el as HTMLElement).style.margin = '0.67em 0';
//         (el as HTMLElement).style.lineHeight = '1.2';
//         (el as HTMLElement).style.display = 'block';
//       });

//       // Style all h2 elements
//       editor.querySelectorAll('h2').forEach((el) => {
//         (el as HTMLElement).style.fontSize = '1.75em';
//         (el as HTMLElement).style.fontWeight = '700';
//         (el as HTMLElement).style.margin = '0.75em 0';
//         (el as HTMLElement).style.lineHeight = '1.3';
//         (el as HTMLElement).style.display = 'block';
//       });

//       // Style all strong/b elements
//       editor.querySelectorAll('strong, b').forEach((el) => {
//         (el as HTMLElement).style.fontWeight = '700';
//       });

//       // Style all em/i elements
//       editor.querySelectorAll('em, i').forEach((el) => {
//         (el as HTMLElement).style.fontStyle = 'italic';
//       });

//       // Style all ul elements
//       editor.querySelectorAll('ul').forEach((el) => {
//         (el as HTMLElement).style.listStyleType = 'disc';
//         (el as HTMLElement).style.paddingLeft = '2em';
//         (el as HTMLElement).style.margin = '1em 0';
//         (el as HTMLElement).style.display = 'block';
//       });

//       // Style all ol elements
//       editor.querySelectorAll('ol').forEach((el) => {
//         (el as HTMLElement).style.listStyleType = 'decimal';
//         (el as HTMLElement).style.paddingLeft = '2em';
//         (el as HTMLElement).style.margin = '1em 0';
//         (el as HTMLElement).style.display = 'block';
//       });

//       // Style all li elements
//       editor.querySelectorAll('li').forEach((el) => {
//         (el as HTMLElement).style.margin = '0.5em 0';
//         (el as HTMLElement).style.display = 'list-item';
//       });

//       // Style all blockquote elements
//       editor.querySelectorAll('blockquote').forEach((el) => {
//         (el as HTMLElement).style.borderLeft = '4px solid #e5e7eb';
//         (el as HTMLElement).style.paddingLeft = '1em';
//         (el as HTMLElement).style.margin = '1.5em 0';
//         (el as HTMLElement).style.fontStyle = 'italic';
//         (el as HTMLElement).style.color = '#6b7280';
//         (el as HTMLElement).style.display = 'block';
//       });

//       // Style all p elements
//       editor.querySelectorAll('p').forEach((el) => {
//         (el as HTMLElement).style.margin = '0.5em 0';
//         (el as HTMLElement).style.display = 'block';
//       });
//     };

//     // Apply styles initially and after any changes
//     applyStylesToContent();
    
//     // Use MutationObserver to apply styles when content changes
//     const observer = new MutationObserver(applyStylesToContent);
//     observer.observe(editorRef.current, {
//       childList: true,
//       subtree: true,
//       characterData: true,
//     });

//     return () => observer.disconnect();
//   }, [editorContent]);

//   const updateActiveFormats = () => {
//     const formats = new Set<string>();
    
//     try {
//       if (document.queryCommandState('bold')) formats.add('bold');
//       if (document.queryCommandState('italic')) formats.add('italic');
//       if (document.queryCommandState('insertUnorderedList')) formats.add('ul');
      
//       const selection = window.getSelection();
//       if (selection && selection.anchorNode) {
//         let node: HTMLElement | null = selection.anchorNode.nodeType === 3 
//           ? selection.anchorNode.parentElement 
//           : selection.anchorNode as HTMLElement;
        
//         while (node && node !== editorRef.current) {
//           const tagName = node.tagName;
//           if (tagName === 'H1') formats.add('h1');
//           if (tagName === 'H2') formats.add('h2');
//           if (tagName === 'BLOCKQUOTE') formats.add('blockquote');
//           node = node.parentElement;
//         }
//       }
//     } catch (error) {
//       console.error('Error updating formats:', error);
//     }
    
//     setActiveFormats(formats);
//   };

//   const handleInput = () => {
//     if (editorRef.current) {
//       const html = editorRef.current.innerHTML;
//       setEditorContent(html);
//       onChange(html);
//       setTimeout(updateActiveFormats, 10);
//     }
//   };

//   const execCommand = (command: string, value: string | null = null) => {
//     document.execCommand(command, false, value as any);
    
//     if (editorRef.current) {
//       editorRef.current.focus();
//     }
    
//     handleInput();
//   };

//   const toggleHeading = (level: 'h1' | 'h2') => {
//     const selection = window.getSelection();
//     if (!selection || !selection.rangeCount) return;

//     const range = selection.getRangeAt(0);
//     let container = range.commonAncestorContainer;
    
//     let element = container.nodeType === 3 ? container.parentElement : container as HTMLElement;
    
//     let currentHeading: HTMLElement | null = null;
//     let temp: HTMLElement | null = element;
//     while (temp && temp !== editorRef.current) {
//       if (temp.tagName === 'H1' || temp.tagName === 'H2') {
//         currentHeading = temp;
//         break;
//       }
//       temp = temp.parentElement;
//     }

//     if (currentHeading && currentHeading.tagName.toLowerCase() === level) {
//       const p = document.createElement('p');
//       p.innerHTML = currentHeading.innerHTML;
//       currentHeading.replaceWith(p);
      
//       const newRange = document.createRange();
//       newRange.selectNodeContents(p);
//       newRange.collapse(false);
//       selection.removeAllRanges();
//       selection.addRange(newRange);
//     } else if (currentHeading) {
//       const newHeading = document.createElement(level);
//       newHeading.innerHTML = currentHeading.innerHTML;
//       currentHeading.replaceWith(newHeading);
      
//       const newRange = document.createRange();
//       newRange.selectNodeContents(newHeading);
//       newRange.collapse(false);
//       selection.removeAllRanges();
//       selection.addRange(newRange);
//     } else {
//       document.execCommand('formatBlock', false, level);
//     }

//     editorRef.current?.focus();
//     handleInput();
//   };

//   const toggleBlockquote = () => {
//     const selection = window.getSelection();
//     if (!selection || !selection.rangeCount) return;

//     const range = selection.getRangeAt(0);
//     let container = range.commonAncestorContainer;
//     let element = container.nodeType === 3 ? container.parentElement : container as HTMLElement;
    
//     let currentBlockquote: HTMLElement | null = null;
//     let temp: HTMLElement | null = element;
//     while (temp && temp !== editorRef.current) {
//       if (temp.tagName === 'BLOCKQUOTE') {
//         currentBlockquote = temp;
//         break;
//       }
//       temp = temp.parentElement;
//     }

//     if (currentBlockquote) {
//       const p = document.createElement('p');
//       p.innerHTML = currentBlockquote.innerHTML;
//       currentBlockquote.replaceWith(p);
//     } else {
//       document.execCommand('formatBlock', false, 'blockquote');
//     }

//     editorRef.current?.focus();
//     handleInput();
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
//     if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
//       e.preventDefault();
//       execCommand('bold');
//     }
//     else if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
//       e.preventDefault();
//       execCommand('italic');
//     }
//     else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === '7') {
//       e.preventDefault();
//       execCommand('insertUnorderedList');
//     }
//   };

//   return (
//     <div className="border rounded-lg overflow-hidden bg-white">
//       <div className="flex gap-1 p-2 border-b bg-gray-50 flex-wrap">
//         <button
//           type="button"
//           onMouseDown={(e) => {
//             e.preventDefault();
//             execCommand('bold');
//           }}
//           className={`p-2 rounded transition ${
//             activeFormats.has('bold') 
//               ? 'bg-blue-500 text-white' 
//               : 'hover:bg-gray-200'
//           }`}
//           title="Bold (Ctrl+B)"
//         >
//           <Bold size={16} />
//         </button>
        
//         <button
//           type="button"
//           onMouseDown={(e) => {
//             e.preventDefault();
//             execCommand('italic');
//           }}
//           className={`p-2 rounded transition ${
//             activeFormats.has('italic') 
//               ? 'bg-blue-500 text-white' 
//               : 'hover:bg-gray-200'
//           }`}
//           title="Italic (Ctrl+I)"
//         >
//           <Italic size={16} />
//         </button>

//         <div className="w-px bg-gray-300 mx-1" />

//         <button
//           type="button"
//           onMouseDown={(e) => {
//             e.preventDefault();
//             toggleHeading('h1');
//           }}
//           className={`p-2 rounded transition ${
//             activeFormats.has('h1') 
//               ? 'bg-blue-500 text-white' 
//               : 'hover:bg-gray-200'
//           }`}
//           title="Heading 1"
//         >
//           <Heading1 size={16} />
//         </button>

//         <button
//           type="button"
//           onMouseDown={(e) => {
//             e.preventDefault();
//             toggleHeading('h2');
//           }}
//           className={`p-2 rounded transition ${
//             activeFormats.has('h2') 
//               ? 'bg-blue-500 text-white' 
//               : 'hover:bg-gray-200'
//           }`}
//           title="Heading 2"
//         >
//           <Heading2 size={16} />
//         </button>

//         <div className="w-px bg-gray-300 mx-1" />

//         <button
//           type="button"
//           onMouseDown={(e) => {
//             e.preventDefault();
//             execCommand('insertUnorderedList');
//           }}
//           className={`p-2 rounded transition ${
//             activeFormats.has('ul') 
//               ? 'bg-blue-500 text-white' 
//               : 'hover:bg-gray-200'
//           }`}
//           title="Bullet List (Ctrl+Shift+7)"
//         >
//           <List size={16} />
//         </button>

//         <button
//           type="button"
//           onMouseDown={(e) => {
//             e.preventDefault();
//             toggleBlockquote();
//           }}
//           className={`p-2 rounded transition ${
//             activeFormats.has('blockquote') 
//               ? 'bg-blue-500 text-white' 
//               : 'hover:bg-gray-200'
//           }`}
//           title="Quote"
//         >
//           <Quote size={16} />
//         </button>
//       </div>
      
//       <div
//         ref={editorRef}
//         contentEditable
//         className="p-4 min-h-[400px] outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
//         onInput={handleInput}
//         onKeyDown={handleKeyDown}
//         onKeyUp={updateActiveFormats}
//         onMouseUp={updateActiveFormats}
//         onClick={updateActiveFormats}
//         onFocus={updateActiveFormats}
//         suppressContentEditableWarning
//         style={{
//           lineHeight: '1.6',
//           fontSize: '16px',
//         }}
//       />
//     </div>
//   );
// };

// export default function AdminEditorPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const editId = searchParams.get('id');
//   const isEditMode = !!editId;

//   const [mounted, setMounted] = useState(false);

//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('Where to Go');
//   const [excerpt, setExcerpt] = useState('');
//   const [content, setContent] = useState('');
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [featured, setFeatured] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [apiKey, setApiKey] = useState('');
//   const [showApiInput, setShowApiInput] = useState(false);

//   useEffect(() => {
//     setMounted(true);
    
//     if (!isAuthenticated()) {
//       router.push('/admin/login');
//       return;
//     }

//     const savedApiKey = localStorage.getItem('imgbb_api_key');
//     if (savedApiKey) {
//       setApiKey(savedApiKey);
//     }

//     if (isEditMode && editId) {
//       loadBlogData(Number(editId));
//     }
//   }, [editId, isEditMode, router]);

//   const loadBlogData = (id: number) => {
//     const savedBlogs = localStorage.getItem('default_blogs');
//     if (savedBlogs) {
//       try {
//         const userBlogs: Blog[] = JSON.parse(savedBlogs);
//         const blog = userBlogs.find(b => b.id === id);
//         if (blog) {
//           setTitle(blog.title);
//           setCategory(blog.category);
//           setExcerpt(blog.excerpt);
//           setContent(blog.content);
//           setImageUrl(blog.image);
//           setImagePreview(blog.image);
//           setFeatured(blog.featured || false);
//         }
//       } catch (error) {
//         console.error('Error loading blog:', error);
//       }
//     }
//   };

//   const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const uploadToImgBB = async () => {
//     if (!imageFile) return;
//     if (!apiKey) {
//       alert('Please enter your ImgBB API key first!');
//       setShowApiInput(true);
//       return;
//     }

//     setUploading(true);
//     const formData = new FormData();
//     formData.append('image', imageFile);

//     try {
//       const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();
//       if (data.success) {
//         setImageUrl(data.data.url);
//         alert('Image uploaded successfully!');
//       } else {
//         alert('Upload failed: ' + (data.error?.message || 'Unknown error'));
//       }
//     } catch (error) {
//       alert('Upload failed: ' + (error as Error).message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const saveApiKey = () => {
//     if (apiKey) {
//       localStorage.setItem('imgbb_api_key', apiKey);
//       setShowApiInput(false);
//       alert('API Key saved successfully!');
//     }
//   };

//   const clearImage = () => {
//     setImageFile(null);
//     setImagePreview('');
//     setImageUrl('');
//   };

//   const handlePublish = () => {
//     if (!title || !excerpt || !content) {
//       alert('Please fill in title, excerpt, and content!');
//       return;
//     }
//     if (!imageUrl && !imagePreview) {
//       alert('Please upload an image!');
//       return;
//     }

//     const savedDefaultBlogs = localStorage.getItem('default_blogs');
//     let defaultBlogs: Blog[] = [];
    
//     if (savedDefaultBlogs) {
//       try {
//         defaultBlogs = JSON.parse(savedDefaultBlogs);
//       } catch (error) {
//         console.error('Error parsing default blogs:', error);
//         defaultBlogs = [];
//       }
//     }

//     if (isEditMode && editId) {
//       const blogIndex = defaultBlogs.findIndex(b => b.id === Number(editId));
//       if (blogIndex !== -1) {
//         defaultBlogs[blogIndex] = {
//           ...defaultBlogs[blogIndex],
//           title,
//           category,
//           image: imageUrl || imagePreview,
//           excerpt,
//           content,
//           featured
//         };
//       } else {
//         defaultBlogs.unshift({
//           id: Number(editId),
//           title,
//           category,
//           image: imageUrl || imagePreview,
//           excerpt,
//           content,
//           featured
//         });
//       }
//     } else {
//       const newBlog: Blog = {
//         id: Date.now(),
//         title,
//         category,
//         image: imageUrl || imagePreview,
//         excerpt,
//         content,
//         featured: featured
//       };
//       defaultBlogs.unshift(newBlog);
//     }

//     localStorage.setItem('default_blogs', JSON.stringify(defaultBlogs));
//     window.dispatchEvent(new Event('blogPublished'));

//     alert(isEditMode ? 'Blog updated successfully! 🎉' : 'Blog published successfully! 🎉');
//     router.push('/admin/dashboard');
//   };

//   const handleLogout = () => {
//     logout();
//     router.push('/admin/login');
//   };

//   if (!mounted) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <header className="bg-white border-b sticky top-0 z-10">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={() => router.push('/admin/dashboard')}
//               className="flex items-center gap-2 text-gray-600 hover:text-black"
//             >
//               <ArrowLeft size={18} />
//               Back to Dashboard
//             </button>
//             <h1 className="text-xl font-semibold">
//               {isEditMode ? 'Edit Post' : 'Create New Post'}
//             </h1>
//             <div className="flex gap-2">
//               <button
//                 onClick={handlePublish}
//                 className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
//               >
//                 <Save size={16} />
//                 {isEditMode ? 'Update' : 'Publish'}
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="p-2 hover:bg-gray-100 rounded-lg"
//                 title="Logout"
//               >
//                 <LogOut size={18} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="min-h-screen bg-gray-50">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {showApiInput && (
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//               <h3 className="font-semibold mb-2">🔑 ImgBB API Key</h3>
//               <p className="text-sm text-gray-600 mb-3">
//                 Get your free API key from{' '}
//                 <a 
//                   href="https://api.imgbb.com/" 
//                   target="_blank" 
//                   rel="noopener noreferrer" 
//                   className="text-blue-600 underline"
//                 >
//                   imgbb.com/api
//                 </a>
//               </p>
//               <input
//                 type="text"
//                 placeholder="Paste your ImgBB API key here"
//                 value={apiKey}
//                 onChange={(e) => setApiKey(e.target.value)}
//                 className="w-full px-4 py-2 border rounded outline-none mb-2"
//               />
//               <div className="flex gap-2">
//                 <button 
//                   onClick={saveApiKey}
//                   className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
//                 >
//                   Save
//                 </button>
//                 <button 
//                   onClick={() => setShowApiInput(false)}
//                   className="px-4 py-2 border rounded hover:bg-gray-50"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           )}

//           <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
//             <input
//               type="text"
//               placeholder="Article Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full text-3xl sm:text-4xl font-light mb-4 outline-none border-b pb-4"
//             />

//             <div className="flex gap-4 mb-6 flex-wrap items-center">
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="px-4 py-2 border rounded outline-none"
//               >
//                 <option>Where to Go</option>
//                 <option>Where to Eat</option>
//                 <option>What to Do</option>
//                 <option>Places to Stay</option>
//               </select>

//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={featured}
//                   onChange={(e) => setFeatured(e.target.checked)}
//                   className="w-4 h-4"
//                 />
//                 <span>Featured Post</span>
//               </label>

//               {!apiKey && (
//                 <button
//                   onClick={() => setShowApiInput(true)}
//                   className="text-sm text-blue-600 hover:underline"
//                 >
//                   📝 Set API Key
//                 </button>
//               )}
//             </div>

//             <div className="mb-6 p-6 border-2 border-dashed rounded-lg bg-gray-50">
//               <h3 className="font-semibold mb-3 flex items-center gap-2">
//                 <Upload size={18} /> Cover Image
//               </h3>

//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageSelect}
//                 className="mb-3 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
//               />

//               {imagePreview && (
//                 <div className="relative mb-3">
//                   <img 
//                     src={imagePreview} 
//                     alt="Preview" 
//                     className="w-full max-h-64 object-cover rounded"
//                   />
//                   {!isEditMode && (
//                     <button
//                       onClick={clearImage}
//                       className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
//                     >
//                       <X size={16} />
//                     </button>
//                   )}
//                 </div>
//               )}

//               {imageFile && !imageUrl && (
//                 <button
//                   onClick={uploadToImgBB}
//                   disabled={uploading}
//                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 transition"
//                 >
//                   {uploading ? 'Uploading...' : 'Upload to ImgBB'}
//                 </button>
//               )}

//               {imageUrl && imageFile && (
//                 <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded">
//                   <CheckCircle size={18} />
//                   <p className="text-sm font-semibold">Image uploaded successfully!</p>
//                 </div>
//               )}
//             </div>

//             <textarea
//               placeholder="Brief excerpt (summary for preview)"
//               value={excerpt}
//               onChange={(e) => setExcerpt(e.target.value)}
//               className="w-full p-4 border rounded outline-none mb-6 h-24"
//             />

//             <BlogEditor content={content} onChange={setContent} />
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { isAuthenticated, logout } from '../../lib/auth';
import { Save, Upload, X, CheckCircle, ArrowLeft, LogOut, Bold, Italic, List, Heading1, Heading2, Quote } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  featured?: boolean;
}

// Improved Editor Component with Keyboard Shortcuts
const BlogEditor = ({ content, onChange }: { content: string; onChange: (content: string) => void }) => {
  const [editorContent, setEditorContent] = useState(content || '');
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const isInitialized = useRef(false);

  // Initialize editor content once
  useEffect(() => {
    if (editorRef.current && !isInitialized.current) {
      editorRef.current.innerHTML = content || '<p><br></p>';
      isInitialized.current = true;
    }
  }, [content]);

  const updateActiveFormats = () => {
    const formats = new Set<string>();
    
    try {
      // Check basic formatting
      if (document.queryCommandState('bold')) formats.add('bold');
      if (document.queryCommandState('italic')) formats.add('italic');
      if (document.queryCommandState('insertUnorderedList')) formats.add('ul');
      
      // Check for heading and blockquote tags
      const selection = window.getSelection();
      if (selection && selection.anchorNode) {
        let node: HTMLElement | null = selection.anchorNode.nodeType === 3 
          ? selection.anchorNode.parentElement 
          : selection.anchorNode as HTMLElement;
        
        while (node && node !== editorRef.current) {
          const tagName = node.tagName;
          if (tagName === 'H1') formats.add('h1');
          if (tagName === 'H2') formats.add('h2');
          if (tagName === 'BLOCKQUOTE') formats.add('blockquote');
          node = node.parentElement;
        }
      }
    } catch (error) {
      console.error('Error updating formats:', error);
    }
    
    setActiveFormats(formats);
  };

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setEditorContent(html);
      onChange(html);
      // Update formats after a short delay to ensure DOM is updated
      setTimeout(updateActiveFormats, 10);
    }
  };

  const execCommand = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value as any);
    
    if (editorRef.current) {
      editorRef.current.focus();
    }
    
    handleInput();
  };

  const toggleHeading = (level: 'h1' | 'h2') => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    let container = range.commonAncestorContainer;
    
    let element = container.nodeType === 3 ? container.parentElement : container as HTMLElement;
    
    let currentHeading: HTMLElement | null = null;
    let temp: HTMLElement | null = element;
    while (temp && temp !== editorRef.current) {
      if (temp.tagName === 'H1' || temp.tagName === 'H2') {
        currentHeading = temp;
        break;
      }
      temp = temp.parentElement;
    }

    if (currentHeading && currentHeading.tagName.toLowerCase() === level) {
      const p = document.createElement('p');
      p.innerHTML = currentHeading.innerHTML;
      currentHeading.replaceWith(p);
      
      const newRange = document.createRange();
      newRange.selectNodeContents(p);
      newRange.collapse(false);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else if (currentHeading) {
      const newHeading = document.createElement(level);
      newHeading.innerHTML = currentHeading.innerHTML;
      currentHeading.replaceWith(newHeading);
      
      const newRange = document.createRange();
      newRange.selectNodeContents(newHeading);
      newRange.collapse(false);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      document.execCommand('formatBlock', false, level);
    }

    editorRef.current?.focus();
    handleInput();
  };

  const toggleBlockquote = () => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    let container = range.commonAncestorContainer;
    let element = container.nodeType === 3 ? container.parentElement : container as HTMLElement;
    
    let currentBlockquote: HTMLElement | null = null;
    let temp: HTMLElement | null = element;
    while (temp && temp !== editorRef.current) {
      if (temp.tagName === 'BLOCKQUOTE') {
        currentBlockquote = temp;
        break;
      }
      temp = temp.parentElement;
    }

    if (currentBlockquote) {
      const p = document.createElement('p');
      p.innerHTML = currentBlockquote.innerHTML;
      currentBlockquote.replaceWith(p);
    } else {
      document.execCommand('formatBlock', false, 'blockquote');
    }

    editorRef.current?.focus();
    handleInput();
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Ctrl/Cmd + B for Bold
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      execCommand('bold');
    }
    // Ctrl/Cmd + I for Italic
    else if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
      e.preventDefault();
      execCommand('italic');
    }
    // Ctrl/Cmd + Shift + 7 for Bullet List
    else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === '7') {
      e.preventDefault();
      execCommand('insertUnorderedList');
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="flex gap-1 p-2 border-b bg-gray-50 flex-wrap">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand('bold');
          }}
          className={`p-2 rounded transition ${
            activeFormats.has('bold') 
              ? 'bg-blue-500 text-white' 
              : 'hover:bg-gray-200'
          }`}
          title="Bold (Ctrl+B)"
        >
          <Bold size={16} />
        </button>
        
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand('italic');
          }}
          className={`p-2 rounded transition ${
            activeFormats.has('italic') 
              ? 'bg-blue-500 text-white' 
              : 'hover:bg-gray-200'
          }`}
          title="Italic (Ctrl+I)"
        >
          <Italic size={16} />
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleHeading('h1');
          }}
          className={`p-2 rounded transition ${
            activeFormats.has('h1') 
              ? 'bg-blue-500 text-white' 
              : 'hover:bg-gray-200'
          }`}
          title="Heading 1"
        >
          <Heading1 size={16} />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleHeading('h2');
          }}
          className={`p-2 rounded transition ${
            activeFormats.has('h2') 
              ? 'bg-blue-500 text-white' 
              : 'hover:bg-gray-200'
          }`}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand('insertUnorderedList');
          }}
          className={`p-2 rounded transition ${
            activeFormats.has('ul') 
              ? 'bg-blue-500 text-white' 
              : 'hover:bg-gray-200'
          }`}
          title="Bullet List (Ctrl+Shift+7)"
        >
          <List size={16} />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockquote();
          }}
          className={`p-2 rounded transition ${
            activeFormats.has('blockquote') 
              ? 'bg-blue-500 text-white' 
              : 'hover:bg-gray-200'
          }`}
          title="Quote"
        >
          <Quote size={16} />
        </button>
      </div>
      
      <div
        ref={editorRef}
        contentEditable
        className="p-4 min-h-[400px] outline-none prose prose-sm sm:prose-base max-w-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onKeyUp={updateActiveFormats}
        onMouseUp={updateActiveFormats}
        onClick={updateActiveFormats}
        onFocus={updateActiveFormats}
        suppressContentEditableWarning
        style={{
          // Ensure formatting is visible in editor
          lineHeight: '1.6'
        }}
      />
      
      {/* Add custom styles for better formatting visibility */}
      <style jsx>{`
        div[contenteditable] :global(h1) {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }
        div[contenteditable] :global(h2) {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
        }
        div[contenteditable] :global(strong),
        div[contenteditable] :global(b) {
          font-weight: bold;
        }
        div[contenteditable] :global(em),
        div[contenteditable] :global(i) {
          font-style: italic;
        }
        div[contenteditable] :global(ul) {
          list-style-type: disc;
          padding-left: 2em;
          margin: 1em 0;
        }
        div[contenteditable] :global(ol) {
          list-style-type: decimal;
          padding-left: 2em;
          margin: 1em 0;
        }
        div[contenteditable] :global(li) {
          margin: 0.5em 0;
        }
        div[contenteditable] :global(blockquote) {
          border-left: 4px solid #e5e7eb;
          padding-left: 1em;
          margin: 1em 0;
          font-style: italic;
          color: #6b7280;
        }
        div[contenteditable] :global(p) {
          margin: 0.5em 0;
        }
      `}</style>
    </div>
  );
};

export default function AdminEditorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  const isEditMode = !!editId;

  const [isMounted, setIsMounted] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

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

  useEffect(() => {
    setIsMounted(true);
    
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    
    setIsAuth(true);

    const savedApiKey = localStorage.getItem('imgbb_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }

    if (isEditMode && editId) {
      loadBlogData(Number(editId));
    }
  }, [editId, isEditMode, router]);

  const loadBlogData = (id: number) => {
    const savedBlogs = localStorage.getItem('default_blogs');
    if (savedBlogs) {
      try {
        const userBlogs: Blog[] = JSON.parse(savedBlogs);
        const blog = userBlogs.find(b => b.id === id);
        if (blog) {
          setTitle(blog.title);
          setCategory(blog.category);
          setExcerpt(blog.excerpt);
          setContent(blog.content);
          setImageUrl(blog.image);
          setImagePreview(blog.image);
          setFeatured(blog.featured || false);
        }
      } catch (error) {
        console.error('Error loading blog:', error);
      }
    }
  };

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

    const savedDefaultBlogs = localStorage.getItem('default_blogs');
    let defaultBlogs: Blog[] = [];
    
    if (savedDefaultBlogs) {
      try {
        defaultBlogs = JSON.parse(savedDefaultBlogs);
      } catch (error) {
        console.error('Error parsing default blogs:', error);
        defaultBlogs = [];
      }
    }

    if (isEditMode && editId) {
      const blogIndex = defaultBlogs.findIndex(b => b.id === Number(editId));
      if (blogIndex !== -1) {
        defaultBlogs[blogIndex] = {
          ...defaultBlogs[blogIndex],
          title,
          category,
          image: imageUrl || imagePreview,
          excerpt,
          content,
          featured
        };
      } else {
        defaultBlogs.unshift({
          id: Number(editId),
          title,
          category,
          image: imageUrl || imagePreview,
          excerpt,
          content,
          featured
        });
      }
    } else {
      const newBlog: Blog = {
        id: Date.now(),
        title,
        category,
        image: imageUrl || imagePreview,
        excerpt,
        content,
        featured: featured
      };
      defaultBlogs.unshift(newBlog);
    }

    localStorage.setItem('default_blogs', JSON.stringify(defaultBlogs));
    window.dispatchEvent(new Event('blogPublished'));

    alert(isEditMode ? 'Blog updated successfully! 🎉' : 'Blog published successfully! 🎉');
    router.push('/admin/dashboard');
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  if (!isMounted || !isAuth) {
    return null;
  }

  return (
    <>
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-black"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </button>
            <h1 className="text-xl font-semibold">
              {isEditMode ? 'Edit Post' : 'Create New Post'}
            </h1>
            <div className="flex gap-2">
              <button
                onClick={handlePublish}
                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                <Save size={16} />
                {isEditMode ? 'Update' : 'Publish'}
              </button>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

          <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
            <input
              type="text"
              placeholder="Article Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-3xl sm:text-4xl font-light mb-4 outline-none border-b pb-4"
            />

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
                  {!isEditMode && (
                    <button
                      onClick={clearImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                    >
                      <X size={16} />
                    </button>
                  )}
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

              {imageUrl && imageFile && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded">
                  <CheckCircle size={18} />
                  <p className="text-sm font-semibold">Image uploaded successfully!</p>
                </div>
              )}
            </div>

            <textarea
              placeholder="Brief excerpt (summary for preview)"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full p-4 border rounded outline-none mb-6 h-24"
            />

            <BlogEditor content={content} onChange={setContent} />
          </div>
        </div>
      </main>
    </>
  );
}




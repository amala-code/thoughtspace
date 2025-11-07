// 'use client';

// import { motion } from 'framer-motion';
// import { useState } from 'react';

// export default function Hero() {
//   const [activeCategory, setActiveCategory] = useState('All');

//   const CATEGORIES = [
//     { name: 'All', count: '1.2K' },
//     { name: 'Tech', count: '234' },
//     { name: 'Finance', count: '189' },
//     { name: 'Lifestyle', count: '412' },
//     { name: 'Health', count: '298' },
//     { name: 'Mindset', count: '156' },
//   ];

//   return (
//     <section className="relative min-h-screen bg-white">
//       {/* Subtle geometric background */}
//       <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
//         <div className="absolute top-0 left-1/4 w-96 h-96 border border-black rounded-full"></div>
//         <div className="absolute bottom-0 right-1/4 w-80 h-80 border border-black rounded-full"></div>
//         <div className="absolute top-1/3 right-1/3 w-64 h-64 border border-black rotate-45"></div>
//       </div>

//       <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
//         {/* Main Content Grid */}
//         <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
//           {/* Left Column - Text Content */}
//           <div className="lg:col-span-5 space-y-10">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="space-y-6"
//             >
//               {/* Top Label */}
//               <div className="inline-flex items-center gap-2 px-4 py-2 border border-black/10 rounded-full">
//                 <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
//                 <span className="text-sm font-medium text-gray-700">Updated Daily</span>
//               </div>

//               {/* Main Headline */}
//               <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black leading-[1.1] tracking-tight">
//                 Read, Learn,
//                 <br />
//                 <span className="text-gray-400">Grow.</span>
//               </h1>

//               {/* Subheading */}
//               <p className="text-xl text-gray-600 leading-relaxed max-w-md">
//                 Explore curated articles across tech, finance, lifestyle, and more. 
//                 Quality content for curious minds.
//               </p>
//             </motion.div>

//             {/* Search Bar */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search articles..."
//                   className="w-full px-6 py-4 bg-white border-2 border-black/10 rounded-lg text-gray-800 placeholder-gray-400 focus:border-black focus:outline-none transition-colors"
//                 />
//                 <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
//                   Search
//                 </button>
//               </div>
//             </motion.div>

//             {/* Category Filters */}
//             {/* <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="space-y-4"
//             >
//               <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
//                 Browse by Category
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {CATEGORIES.map((cat) => (
//                   <button
//                     key={cat.name}
//                     onClick={() => setActiveCategory(cat.name)}
//                     className={`group px-5 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
//                       activeCategory === cat.name
//                         ? 'bg-black text-white border-black'
//                         : 'bg-white text-gray-700 border-gray-200 hover:border-black'
//                     }`}
//                   >
//                     {cat.name}
//                     <span className={`ml-2 text-xs ${
//                       activeCategory === cat.name ? 'text-gray-300' : 'text-gray-400'
//                     }`}>
//                       {cat.count}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </motion.div> */}

//             {/* Stats */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               className="pt-8 border-t border-gray-200"
//             >
//               <div className="grid grid-cols-3 gap-6">
//                 <div>
//                   <div className="text-3xl font-bold text-black">12K+</div>
//                   <div className="text-sm text-gray-500 mt-1">Articles</div>
//                 </div>
//                 <div>
//                   <div className="text-3xl font-bold text-black">50K+</div>
//                   <div className="text-sm text-gray-500 mt-1">Readers</div>
//                 </div>
//                 <div>
//                   <div className="text-3xl font-bold text-black">500+</div>
//                   <div className="text-sm text-gray-500 mt-1">Writers</div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Right Column - Creative Category Showcase */}
//           <div className="lg:col-span-7">
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="relative h-full"
//             >
              
//               {/* Large Typography Display */}
//               <div className="relative space-y-6">
                
//                 {/* Top Row - Featured Category */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8, delay: 0.3 }}
//                   whileHover={{ scale: 1.02 }}
//                   className="relative overflow-hidden rounded-2xl border-2 border-black bg-black text-white p-12 cursor-pointer group"
//                 >
//                   <div className="relative z-10">
//                     <div className="text-sm font-medium text-gray-400 mb-2">Most Popular</div>
//                     <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 group-hover:tracking-wider transition-all duration-500">
//                       Tech
//                     </h2>
//                     <div className="flex items-center gap-4 text-gray-300">
//                       <span className="text-2xl font-bold">234</span>
//                       <span className="text-sm">Articles</span>
//                     </div>
//                   </div>
                  
//                   {/* Abstract geometric decoration */}
//                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
//                   <div className="absolute bottom-0 right-12 w-32 h-32 border-2 border-white/20 rounded-full group-hover:scale-110 transition-transform"></div>
//                 </motion.div>

//                 {/* Middle Row - Two Categories */}
//                 <div className="grid grid-cols-2 gap-6">
//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.8, delay: 0.4 }}
//                     whileHover={{ y: -4 }}
//                     className="relative overflow-hidden rounded-xl border-2 border-gray-900 bg-white p-8 cursor-pointer group"
//                   >
//                     <div className="text-xs font-medium text-gray-500 mb-2">Explore</div>
//                     <h3 className="text-4xl sm:text-5xl font-bold mb-3 group-hover:text-gray-600 transition-colors">
//                       Finance
//                     </h3>
//                     <div className="text-xl font-bold text-gray-400">189</div>
                    
//                     {/* Decorative element */}
//                     <div className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-black rotate-12 group-hover:rotate-45 transition-transform"></div>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.8, delay: 0.5 }}
//                     whileHover={{ y: -4 }}
//                     className="relative overflow-hidden rounded-xl border-2 border-gray-300 bg-gray-50 p-8 cursor-pointer group"
//                   >
//                     <div className="text-xs font-medium text-gray-500 mb-2">Trending</div>
//                     <h3 className="text-4xl sm:text-5xl font-bold mb-3 group-hover:text-gray-600 transition-colors">
//                       Lifestyle
//                     </h3>
//                     <div className="text-xl font-bold text-gray-400">412</div>
                    
//                     {/* Decorative circle */}
//                     <div className="absolute -top-6 -right-6 w-20 h-20 border-4 border-gray-300 rounded-full group-hover:scale-125 transition-transform"></div>
//                   </motion.div>
//                 </div>

//                 {/* Bottom Row - Three Compact Categories */}
//                 <div className="grid grid-cols-3 gap-4">
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: 0.6 }}
//                     whileHover={{ scale: 1.05 }}
//                     className="relative overflow-hidden rounded-lg border border-gray-300 bg-white p-6 cursor-pointer group"
//                   >
//                     <div className="text-2xl font-bold mb-2 group-hover:scale-110 transition-transform">
//                       Health
//                     </div>
//                     <div className="text-sm text-gray-500">298 posts</div>
//                     <div className="absolute top-2 right-2 w-8 h-8 bg-black/5 rounded-full"></div>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: 0.7 }}
//                     whileHover={{ scale: 1.05 }}
//                     className="relative overflow-hidden rounded-lg border-2 border-black bg-black text-white p-6 cursor-pointer group"
//                   >
//                     <div className="text-2xl font-bold mb-2 group-hover:scale-110 transition-transform">
//                       Mindset
//                     </div>
//                     <div className="text-sm text-gray-400">156 posts</div>
//                     <div className="absolute bottom-2 right-2 w-6 h-6 border-2 border-white/30 rotate-45"></div>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: 0.8 }}
//                     whileHover={{ scale: 1.05 }}
//                     className="relative overflow-hidden rounded-lg border border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 p-6 cursor-pointer group"
//                   >
//                     <div className="text-2xl font-bold mb-2 group-hover:scale-110 transition-transform">
//                       More
//                     </div>
//                     <div className="text-sm text-gray-500">Explore all</div>
//                     <div className="absolute bottom-2 right-2">
//                       <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                       </svg>
//                     </div>
//                   </motion.div>
//                 </div>

//                 {/* Abstract floating elements */}
//                 <motion.div
//                   animate={{ 
//                     y: [0, -10, 0],
//                     rotate: [0, 5, 0]
//                   }}
//                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//                   className="absolute -top-8 right-12 w-40 h-40 border border-gray-200 rounded-full -z-10 opacity-50"
//                 />
                
//                 <motion.div
//                   animate={{ 
//                     y: [0, 10, 0],
//                     rotate: [0, -8, 0]
//                   }}
//                   transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//                   className="absolute -bottom-12 -left-8 w-32 h-32 border-2 border-black/10 rotate-45 -z-10"
//                 />

//                 <motion.div
//                   animate={{ 
//                     scale: [1, 1.1, 1],
//                   }}
//                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
//                   className="absolute top-1/2 -right-12 w-24 h-24 bg-black/5 rounded-full blur-2xl -z-10"
//                 />
//               </div>

//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.8 }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
//       >
//         <motion.div
//           animate={{ y: [0, 8, 0] }}
//           transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
//           className="flex flex-col items-center gap-2 text-gray-400"
//         >
//           <span className="text-xs uppercase tracking-wider font-medium">Scroll</span>
//           <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex items-start justify-center p-1">
//             <motion.div
//               animate={{ y: [0, 12, 0] }}
//               transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
//               className="w-1 h-2 bg-gray-400 rounded-full"
//             />
//           </div>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }


'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Hero() {
  const [activeCategory, setActiveCategory] = useState('All');

  const CATEGORIES = [
    { name: 'All', count: '1.2K' },
    { name: 'Tech', count: '234' },
    { name: 'Finance', count: '189' },
    { name: 'Lifestyle', count: '412' },
    { name: 'Health', count: '298' },
    { name: 'Mindset', count: '156' },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white">
      {/* Subtle geometric background */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.06]">
        <div className="absolute top-0 left-1/4 w-96 h-96 border-2 border-black rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 border-2 border-black rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 border-2 border-black rotate-45"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 border border-black rounded-full"></div>
      </div>
      
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Text Content */}
          <div className="lg:col-span-5 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Top Label */}
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-black/10 rounded-full">
                <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Updated Daily</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black leading-[1.1] tracking-tight">
                Read, Learn,
                <br />
                <span className="text-gray-400">Grow.</span>
              </h1>

              {/* Subheading */}
              <p className="text-xl text-gray-600 leading-relaxed max-w-md">
                Explore curated articles across tech, finance, lifestyle, and more. 
                Quality content for curious minds.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-6 py-4 bg-white border-2 border-black/10 rounded-lg text-gray-800 placeholder-gray-400 focus:border-black focus:outline-none transition-colors"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                  Search
                </button>
              </div>
            </motion.div>

            {/* Category Filters
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Browse by Category
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`group px-5 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                      activeCategory === cat.name
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-black'
                    }`}
                  >
                    {cat.name}
                    <span className={`ml-2 text-xs ${
                      activeCategory === cat.name ? 'text-gray-300' : 'text-gray-400'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div> */}

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-8 border-t border-gray-200"
            >
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-black">5K+</div>
                  <div className="text-sm text-gray-500 mt-1">Articles</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-black">2K+</div>
                  <div className="text-sm text-gray-500 mt-1">Readers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-black">10+</div>
                  <div className="text-sm text-gray-500 mt-1">Writers</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Creative Category Showcase */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-full"
            >
              
              {/* Large Typography Display */}
              <div className="relative space-y-6">
                
                {/* Top Row - Featured Category */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden rounded-2xl border-2 border-black bg-black text-white p-12 cursor-pointer group"
                >
                  <div className="relative z-10">
                    <div className="text-sm font-medium text-gray-400 mb-2">Most Popular</div>
                    <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 group-hover:tracking-wider transition-all duration-500">
                      Tech
                    </h2>
                    <div className="flex items-center gap-4 text-gray-300">
                      <span className="text-2xl font-bold">234</span>
                      <span className="text-sm">Articles</span>
                    </div>
                  </div>
                  
                  {/* Product Image */}
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 w-48 h-48 opacity-20 group-hover:opacity-30 transition-opacity">
                    <img 
                      src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=400&h=400&fit=crop&auto=format"
                      alt="Tech"
                      className="w-full h-full object-contain mix-blend-lighten"
                    />
                  </div>
                  
                  {/* Abstract geometric decoration */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
                  <div className="absolute bottom-0 right-12 w-32 h-32 border-2 border-white/20 rounded-full group-hover:scale-110 transition-transform"></div>
                </motion.div>

                {/* Middle Row - Two Categories */}
                <div className="grid grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    whileHover={{ y: -4 }}
                    className="relative overflow-hidden rounded-xl border-2 border-gray-900 bg-white p-8 cursor-pointer group"
                  >
                    <div className="relative z-10">
                      <div className="text-xs font-medium text-gray-500 mb-2">Explore</div>
                      <h3 className="text-4xl sm:text-5xl font-bold mb-3 group-hover:text-gray-600 transition-colors">
                        Finance
                      </h3>
                      <div className="text-xl font-bold text-gray-400">189</div>
                    </div>
                    
                    {/* Product Image */}
                    <div className="absolute right-4 bottom-4 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity">
                      <img 
                        src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=300&h=300&fit=crop&auto=format"
                        alt="Finance"
                        className="w-full h-full object-contain grayscale"
                      />
                    </div>
                    
                    {/* Decorative element */}
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-black rotate-12 group-hover:rotate-45 transition-transform"></div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    whileHover={{ y: -4 }}
                    className="relative overflow-hidden rounded-xl border-2 border-gray-300 bg-gray-50 p-8 cursor-pointer group"
                  >
                    <div className="relative z-10">
                      <div className="text-xs font-medium text-gray-500 mb-2">Trending</div>
                      <h3 className="text-4xl sm:text-5xl font-bold mb-3 group-hover:text-gray-600 transition-colors">
                        Lifestyle
                      </h3>
                      <div className="text-xl font-bold text-gray-400">412</div>
                    </div>
                    
                    {/* Product Image */}
                    <div className="absolute right-4 bottom-4 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity">
                      <img 
                        src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop&auto=format"
                        alt="Lifestyle"
                        className="w-full h-full object-contain grayscale"
                      />
                    </div>
                    
                    {/* Decorative circle */}
                    <div className="absolute -top-6 -right-6 w-20 h-20 border-4 border-gray-300 rounded-full group-hover:scale-125 transition-transform"></div>
                  </motion.div>
                </div>

                {/* Bottom Row - Three Compact Categories */}
                <div className="grid grid-cols-3 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative overflow-hidden rounded-lg border border-gray-300 bg-white p-6 cursor-pointer group"
                  >
                    <div className="relative z-10">
                      <div className="text-2xl font-bold mb-2 group-hover:scale-110 transition-transform">
                        Health
                      </div>
                      <div className="text-sm text-gray-500">298 posts</div>
                    </div>
                    
                    {/* Product Icon */}
                    <div className="absolute right-2 bottom-2 w-16 h-16 opacity-5 group-hover:opacity-15 transition-opacity">
                      <img 
                        src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop&auto=format"
                        alt="Health"
                        className="w-full h-full object-contain grayscale"
                      />
                    </div>
                    <div className="absolute top-2 right-2 w-8 h-8 bg-black/5 rounded-full"></div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative overflow-hidden rounded-lg border-2 border-black bg-black text-white p-6 cursor-pointer group"
                  >
                    <div className="relative z-10">
                      <div className="text-2xl font-bold mb-2 group-hover:scale-110 transition-transform">
                        Mindset
                      </div>
                      <div className="text-sm text-gray-400">156 posts</div>
                    </div>
                    
                    {/* Product Icon */}
                    <div className="absolute right-2 bottom-2 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                      <img 
                        src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=200&h=200&fit=crop&auto=format"
                        alt="Mindset"
                        className="w-full h-full object-contain mix-blend-lighten"
                      />
                    </div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-2 border-white/30 rotate-45"></div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative overflow-hidden rounded-lg border border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 p-6 cursor-pointer group"
                  >
                    <div className="text-2xl font-bold mb-2 group-hover:scale-110 transition-transform">
                      More
                    </div>
                    <div className="text-sm text-gray-500">Explore all</div>
                    <div className="absolute bottom-2 right-2">
                      <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </motion.div>
                </div>

                {/* Abstract floating elements */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-8 right-12 w-40 h-40 border border-gray-200 rounded-full -z-10 opacity-50"
                />
                
                <motion.div
                  animate={{ 
                    y: [0, 10, 0],
                    rotate: [0, -8, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-12 -left-8 w-32 h-32 border-2 border-black/10 rotate-45 -z-10"
                />

                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 -right-12 w-24 h-24 bg-black/5 rounded-full blur-2xl -z-10"
                />
              </div>

            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-xs uppercase tracking-wider font-medium">Scroll</span>
          <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 bg-gray-400 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
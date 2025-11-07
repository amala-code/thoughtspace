
// 'use client';

// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Camera, MapPin, Utensils, Compass, Edit, Menu, X } from 'lucide-react';
// import { useState } from 'react';

// interface HeaderProps {
//   showBackButton?: boolean;
//   rightButton?: React.ReactNode;
// }

// export default function Header({ showBackButton, rightButton }: HeaderProps) {
//   const router = useRouter();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="border-b px-4 sm:px-8 py-4 bg-white">
//       <div className="max-w-6xl mx-auto flex items-center justify-between">
//         {/* Left side: back button or logo */}
//         {showBackButton ? (
//           <button
//             onClick={() => router.back()}
//             className="text-sm hover:text-gray-600"
//           >
//             ← Back
//           </button>
//         ) : (
//           <Link href="/" className="text-xl sm:text-2xl font-semibold">
//           ThoughtSpace
//           </Link>
//         )}

//         {/* Desktop Nav */}
//         {/* {!showBackButton && (
//           <nav className="hidden md:flex gap-8 text-sm">
//             <Link href="#" className="flex items-center gap-2 hover:text-gray-600">
//               <MapPin size={16} /> Tech
//             </Link>
//             <Link href="#" className="flex items-center gap-2 hover:text-gray-600">
//               <Utensils size={16} /> Finance
//             </Link>
//             <Link href="#" className="flex items-center gap-2 hover:text-gray-600">
//               <Camera size={16} /> Lifestyle
//             </Link>
//             <Link href="#" className="flex items-center gap-2 hover:text-gray-600">
//               <Compass size={16} /> Mindset
//             </Link>
//           </nav>
//         )} */}

//         {/* Right side actions */}
//         <div className="hidden sm:flex gap-4 items-center text-sm">
//           {rightButton || (
//             <>
//             <Link href="/feeds" className="flex items-center gap-2 hover:text-gray-600">
//               <button className="hover:text-gray-600">Flash Feed</button> </Link>

//               <Link href="/reads" className="flex items-center gap-2 hover:text-gray-600">
//               <button className="hover:text-gray-600">Deep Reads</button></Link>
//               <Link
//                 href="/editor"
//                 className="flex items-center gap-2 bg-black text-white px-3 sm:px-4 py-2 rounded hover:bg-gray-800"
//               >
//                 <Edit size={16} /> Send Thought
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile menu toggle */}
//         {!showBackButton && (
//           <button
//             className="md:hidden p-2"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         )}
//       </div>

//       {/* Mobile Nav (Dropdown) */}
//       {menuOpen && !showBackButton && (
//         <div className="md:hidden mt-4 px-4 pb-4 space-y-4 border-t">
//           <Link href="#" className="flex items-center gap-2 hover:text-gray-600">
//             <MapPin size={16} /> Tech
//           </Link>
//           <Link href="#" className="flex items-center gap-2 hover:text-gray-600">
//             <Utensils size={16} /> Finance
//           </Link>
//           <Link href="#" className="flex items-center gap-2 hover:text-gray-600">
//             <Camera size={16} /> Lifestyle
//           </Link>
//           <Link href="#" className="flex items-center gap-2 hover:text-gray-600">
//             <Compass size={16} /> Mindset
//           </Link>

//           {/* Right actions also in mobile menu */}
//           <div className="flex flex-col gap-2 pt-2 border-t">
//             {rightButton || (
//               <>
//                 <button className="hover:text-gray-600 text-left">News</button>
//                 <button className="hover:text-gray-600 text-left">Blogs</button>
//                 <Link
//                   href="/editor"
//                   className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded hover:bg-gray-800"
//                 >
//                   <Edit size={16} /> Write
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Camera, MapPin, Utensils, Compass, Edit, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  showBackButton?: boolean;
  rightButton?: React.ReactNode;
}

export default function Header({ showBackButton, rightButton }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (path: string) =>
    `flex items-center gap-2 transition ${
      pathname === path
        ? 'text-black font-semibold underline underline-offset-4'
        : 'text-gray-600 hover:text-black'
    }`;

  return (
    <header className="border-b px-4 sm:px-8 py-4 bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left side: back button or logo */}
        {showBackButton ? (
          <button
            onClick={() => router.back()}
            className="text-sm hover:text-gray-600"
          >
            ← Back
          </button>
        ) : (
          <Link href="/" className="text-xl sm:text-2xl font-semibold">
            ThoughtSpace
          </Link>
        )}

        {/* Right side actions (Desktop) */}
        <div className="hidden sm:flex gap-4 items-center text-sm">
          {rightButton || (
            <>
              <Link href="/feeds" className={linkClass('/feeds')}>
                Flash Feed
              </Link>
              <Link href="/reads" className={linkClass('/reads')}>
                Deep Reads
              </Link>
              <Link
                href="/sendemail"
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded transition ${
                  pathname === '/sendemail'
                    ? 'bg-gray-800 text-white font-semibold'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                <Edit size={16} /> Send Thought
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        {!showBackButton && (
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
      </div>

      {/* Mobile Nav (Dropdown) */}
      {menuOpen && !showBackButton && (
        <div className="md:hidden mt-4 px-4 pb-4 space-y-4 border-t text-sm">
          <Link href="/feeds" className={linkClass('/feeds')}>
            <MapPin size={16} /> Flash Feed
          </Link>
          <Link href="/reads" className={linkClass('/reads')}>
            <Utensils size={16} /> Deep Reads
          </Link>

          <Link
            href="/sendemail"
            // className={`flex items-center gap-2 px-3 py-2 rounded ${
            //   pathname === '/editor'
            //     ? 'bg-gray-800 text-white font-semibold'
            //     : 'bg-black text-white hover:bg-gray-800'
            // }`}         // className={`flex items-center gap-2 px-3 py-2 rounded ${
            //   pathname === '/editor'
            //     ? 'bg-gray-800 text-white font-semibold'
            //     : 'bg-black text-white hover:bg-gray-800'
            // }`}
          >
            <Edit size={16} /> Send Thought
          </Link>
        </div>
      )}
    </header>
  );
}



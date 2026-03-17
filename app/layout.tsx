// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import './globals.css';
// import Footer from './components/Footer';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'ThoughtSpace',
//   description: 'Explore the world with our curated travel guides, restaurant recommendations, and destination insights.',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         {children}
//         <Footer />
//       </body>
//     </html>
//   );
// }

// app/layout.tsx   (root layout – only once)

'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import './globals.css';


export default function RootLayout({ children }: { children: ReactNode }) {
  // Create QueryClient inside useState to ensure it's only created once
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  }));

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
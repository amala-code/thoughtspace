// lib/useBlogs.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { BLOGS as INITIAL_BLOGS } from './data';

export const BLOG_QUERY_KEY = ['blogs'];

async function fetchBlogs() {
  try {
    const res = await fetch('https://blog-backend-one-xi.vercel.app/api/blogs', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch blogs');
    }

    const data = await res.json();

    if (!data || data.length === 0) {
      return INITIAL_BLOGS;
    }

    return data.map((blog: any) => ({
      id: blog.id,
      title: blog.title,
      category: blog.category || 'What to Do',
      image: blog.cover_image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
      excerpt: blog.excerpt,
      content: blog.content,
      featured: blog.featured || false,
    }));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    // Return fallback data on error
    return INITIAL_BLOGS;
  }
}

export function useBlogs() {
  return useQuery({
    queryKey: BLOG_QUERY_KEY,
    queryFn: fetchBlogs,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  });
}
// lib/useFlashFeed.ts
'use client';
import { useQuery } from '@tanstack/react-query';
import { transform } from './transform';

export const FLASH_KEY = ['flash-feed'] as const;

export function useFlashFeed() {
  return useQuery({
    queryKey: FLASH_KEY,
    queryFn: async () => {
      const res = await fetch('https://blog-backend-one-xi.vercel.app/api/blogs/feeds');
      if (!res.ok) throw new Error();
      const data = await res.json();
      return transform(data);
    },
    placeholderData: [], // or flash-specific fallback
    staleTime: 1000 * 30,
  });
}
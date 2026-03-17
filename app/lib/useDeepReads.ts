// lib/useDeepReads.ts
'use client';
import { useQuery } from '@tanstack/react-query';
import { transform } from './transform';

export const DEEP_KEY = ['deep-reads'] as const;

export function useDeepReads() {
  return useQuery({
    queryKey: DEEP_KEY,
    queryFn: async () => {
      const res = await fetch('https://blog-backend-one-xi.vercel.app/api/deep');
      if (!res.ok) throw new Error();
      const data = await res.json();
      return transform(data);
    },
    placeholderData: [],
    staleTime: 1000 * 60 * 5,
  });
}
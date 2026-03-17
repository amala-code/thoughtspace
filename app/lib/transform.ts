// lib/transform.ts  ← ONE transform function
export const transform = (blogs: any[]) =>
  blogs.map(b => ({
    id: b.id,
    title: b.title,
    category: b.category || 'General',
    image: b.cover_image || 'https://images.unsplash.com/...',
    excerpt: b.excerpt,
    content: b.content,
  }));
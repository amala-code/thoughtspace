'use client';

interface BlogContentProps {
  content: string;
  className?: string;
}

export default function BlogContent({ content, className = '' }: BlogContentProps) {
  return (
    <>
      <div 
        className={`blog-content ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      {/* Global styles for blog content */}
      <style jsx global>{`
        .blog-content {
          line-height: 1.6;
          color: #374151;
        }
        
        .blog-content h1 {
          font-size: 2em;
          font-weight: 700;
          margin: 0.67em 0;
          line-height: 1.2;
          color: #111827;
        }
        
        .blog-content h2 {
          font-size: 1.5em;
          font-weight: 700;
          margin: 0.75em 0;
          line-height: 1.3;
          color: #111827;
        }
        
        .blog-content h3 {
          font-size: 1.25em;
          font-weight: 700;
          margin: 0.83em 0;
          color: #111827;
        }
        
        .blog-content strong,
        .blog-content b {
          font-weight: 700;
        }
        
        .blog-content em,
        .blog-content i {
          font-style: italic;
        }
        
        .blog-content ul {
          list-style-type: disc;
          padding-left: 2em;
          margin: 1em 0;
        }
        
        .blog-content ol {
          list-style-type: decimal;
          padding-left: 2em;
          margin: 1em 0;
        }
        
        .blog-content li {
          margin: 0.5em 0;
          line-height: 1.6;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1em;
          margin: 1.5em 0;
          font-style: italic;
          color: #6b7280;
        }
        
        .blog-content p {
          margin: 1em 0;
          line-height: 1.6;
        }
        
        .blog-content a {
          color: #2563eb;
          text-decoration: underline;
        }
        
        .blog-content a:hover {
          color: #1d4ed8;
        }
        
        .blog-content code {
          background-color: #f3f4f6;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-size: 0.9em;
          font-family: monospace;
        }
        
        .blog-content pre {
          background-color: #f3f4f6;
          padding: 1em;
          border-radius: 6px;
          overflow-x: auto;
          margin: 1em 0;
        }
        
        .blog-content pre code {
          background-color: transparent;
          padding: 0;
        }
        
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1em 0;
        }
      `}</style>
    </>
  );
}
'use client';

import { Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2 } from 'lucide-react';

interface BlogEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function BlogEditor({ content, onChange }: BlogEditorProps) {
  const execCommand = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value || undefined);
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="flex gap-1 p-2 border-b bg-gray-50">
        <button
          onClick={() => execCommand('formatBlock', 'h2')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Heading 1"
          type="button"
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={() => execCommand('formatBlock', 'h3')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Heading 2"
          type="button"
        >
          <Heading2 size={18} />
        </button>
        <div className="w-px bg-gray-300 mx-2" />
        <button
          onClick={() => execCommand('bold')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bold"
          type="button"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => execCommand('italic')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Italic"
          type="button"
        >
          <Italic size={18} />
        </button>
        <div className="w-px bg-gray-300 mx-2" />
        <button
          onClick={() => execCommand('insertUnorderedList')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bullet List"
          type="button"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => execCommand('insertOrderedList')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Numbered List"
          type="button"
        >
          <ListOrdered size={18} />
        </button>
        <button
          onClick={() => execCommand('formatBlock', 'blockquote')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Quote"
          type="button"
        >
          <Quote size={18} />
        </button>
      </div>
      <div
        contentEditable
        className="p-4 min-h-[400px] outline-none prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
        onInput={(e) => {
          const html = e.currentTarget.innerHTML;
          onChange(html);
        }}
      />
    </div>
  );
}

// 'use client';

// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Heading from '@tiptap/extension-heading';
// import TextAlign from '@tiptap/extension-text-align';
// import Underline from '@tiptap/extension-underline';
// import Link from '@tiptap/extension-link';
// import { 
//   Bold, 
//   Italic, 
//   Strikethrough, 
//   Code, 
//   List, 
//   ListOrdered, 
//   Quote, 
//   Undo, 
//   Redo,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
//   Underline as UnderlineIcon,
//   Heading1,
//   Heading2,
//   Heading3
// } from 'lucide-react';
// import { useEffect } from 'react';

// interface TipTapEditorProps {
//   content: string;
//   onChange: (content: string) => void;
// }

// const MenuButton = ({ 
//   onClick, 
//   isActive = false, 
//   children, 
//   title 
// }: { 
//   onClick: () => void; 
//   isActive?: boolean; 
//   children: React.ReactNode; 
//   title: string;
// }) => (
//   <button
//     onClick={onClick}
//     type="button"
//     className={`p-2 rounded hover:bg-gray-200 transition ${
//       isActive ? 'bg-gray-300 text-black' : 'text-gray-700'
//     }`}
//     title={title}
//   >
//     {children}
//   </button>
// );

// export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         heading: false, // We'll use custom heading extension
//       }),
//       Heading.configure({
//         levels: [1, 2, 3],
//       }),
//       TextAlign.configure({
//         types: ['heading', 'paragraph'],
//       }),
//       Underline,
//       Link.configure({
//         openOnClick: false,
//         HTMLAttributes: {
//           class: 'text-blue-600 underline',
//         },
//       }),
//     ],
//     content: content,
//     editorProps: {
//       attributes: {
//         class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none min-h-[500px] p-6',
//       },
//     },
//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML());
//     },
//   });

//   // Update editor content when prop changes (for edit mode)
//   useEffect(() => {
//     if (editor && content !== editor.getHTML()) {
//       editor.commands.setContent(content);
//     }
//   }, [content, editor]);

//   if (!editor) {
//     return null;
//   }

//   return (
//     <div className="border rounded-lg overflow-hidden bg-white">
//       {/* Toolbar */}
//       <div className="border-b bg-gray-50 p-2 flex flex-wrap gap-1">
//         {/* Text Formatting */}
//         <div className="flex gap-1 border-r pr-2 mr-2">
//           <MenuButton
//             onClick={() => editor.chain().focus().toggleBold().run()}
//             isActive={editor.isActive('bold')}
//             title="Bold (Ctrl+B)"
//           >
//             <Bold size={18} />
//           </MenuButton>
//           <MenuButton
//             onClick={() => editor.chain().focus().toggleItalic().run()}
//             isActive={editor.isActive('italic')}
//             title="Italic (Ctrl+I)"
//           >
//             <Italic size={18} />
//           </MenuButton>
//           <MenuButton
//             onClick={() => editor.chain().focus().toggleUnderline().run()}
//             isActive={editor.isActive('underline')}
//             title="Underline (Ctrl+U)"
//           >
//             <UnderlineIcon size={18} />
//           </MenuButton>
//           <MenuButton
//             onClick={() => editor.chain().focus().toggleStrike().run()}
//             isActive={editor.isActive('strike')}
//             title="Strikethrough"
//           >
//             <Strikethrough size={18} />
//           </MenuButton>
//           <MenuButton
//             onClick={() => editor.chain().focus().toggleCode().run()}
//             isActive={editor.isActive('code')}
//             title="Code"
//           >
//             <Code size={18} />
//           </MenuButton>
//         </div>

//         {/* Headings */}
//         <div className="flex gap-1 border-r pr-2 mr-2">
//           <MenuButton
//             onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//             isActive={editor.isActive('heading', { level: 1 })}
//             title="Heading 1"
//           >
//             <Heading1 size={18} />
//           </MenuButton>
//           <MenuButton
//             onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//             isActive={editor.isActive('heading', { level: 2 })}
//             title="Heading 2"
//           >
//             <Heading2 size={18} />
//           </MenuButton>
//           <MenuButton
//             onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//             isActive={editor.isActive('heading', { level: 3 })}
//             title="Heading 3"
//           >
//             <Heading3 size={18} />
//           </MenuButton>
//         </div>

//         {/* Lists */}
//         <div className="flex gap-1 border-r pr-2 mr-2">
//           <MenuButton
//             onClick={() => editor.chain().focus().toggleBulletList().run()}
//             isActive={editor.isActive('bulletList')}
//             title="Bullet List"
//           >
//             <List size={18} />
//           </MenuButton>
//           <MenuButton
//             onClick={() => editor.chain().focus().toggleOrderedList().run()}
//             isActive={editor.isActive('orderedList')}
//             title="Numbered List"
//           >
//             <ListOrdered size={18} />
//           </MenuButton>
//           <MenuButton
//             onClick={() => editor.chain().focus().toggleBlockquote().run()}
//             isActive={editor.isActive('blockquote')}
//             title="Quote"
//           >
//             <Quote size={18} />
//           </MenuButton>
//         </div>

//         {/* Text Alignment */}
//         <div className="flex gap-1 border-r pr-2 mr-2">
//           <MenuButton
//             onClick={() => editor.chain().focus().setTextAlign('left').run()}
//             isActive={editor.isActive({ textAlign: 'left' })}
//             title="Align Left"
//           >
//             <AlignLeft size={18} />
//           </MenuButton>
//           <MenuButton
//             onClick={() => editor.chain().focus().setTextAlign('center').run()}
//             isActive={editor.isActive({ textAlign: 'center' })}
//             title="Align Center"
//           >
//             <AlignCenter size={18} />
//           </MenuButton>
//           <MenuButton
//             onClick={() => editor.chain().focus().setTextAlign('right').run()}
//             isActive={editor.isActive({ textAlign: 'right' })}
//             title="Align Right"
//           >
//             <AlignRight size={18} />
//           </MenuButton>
//         </div>

//         {/* Undo/Redo */}
//         <div className="flex gap-1">
//           <MenuButton
//             onClick={() => editor.chain().focus().undo().run()}
//             title="Undo (Ctrl+Z)"
//           >
//             <Undo size={18} />
//           </MenuButton>
//           <MenuButton
//             onClick={() => editor.chain().focus().redo().run()}
//             title="Redo (Ctrl+Y)"
//           >
//             <Redo size={18} />
//           </MenuButton>
//         </div>
//       </div>

//       {/* Editor Content */}
//       <EditorContent editor={editor} />
//     </div>
//   );
// }
import { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

interface PostPreviewModalProps {
  post: {
    id: string;
    title: string;
    author: string;
    date: string;
    content?: string;
  } | null;
  open: boolean;
  onClose: () => void;
}

const PostPreviewModal = ({ post, open, onClose }: PostPreviewModalProps) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Trap focus and close on Escape
  useEffect(() => {
    if (open && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!post) return null;
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-200 ${open ? 'opacity-40' : 'opacity-0'}`}
        onClick={onClose}
        aria-label="Close post preview modal"
      />
      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto p-6 z-10 transition-transform duration-300 ${open ? 'scale-100' : 'scale-95'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Post Preview"
        tabIndex={-1}
      >
        <button ref={closeBtnRef} onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500" aria-label="Close post preview modal">
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        <div className="text-gray-500 text-sm mb-4">By {post.author} • {post.date}</div>
        <div className="prose max-w-none text-gray-800 whitespace-pre-line">
          {post.content || <span className="text-gray-400">No content available.</span>}
        </div>
      </div>
    </div>
  );
};

export default PostPreviewModal; 
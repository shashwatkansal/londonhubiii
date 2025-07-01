"use client";
import { useEffect, useRef } from 'react';
import { User } from '@/app/database/models';
import { FaLinkedin, FaInstagram, FaLink, FaTimes } from 'react-icons/fa';
import Image from "next/image";

interface UserDetailsDrawerProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
}

const UserDetailsDrawer = ({ user, open, onClose }: UserDetailsDrawerProps) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Trap focus and close on Escape
  useEffect(() => {
    if (open && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
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

  if (!user) return null;
  return (
    <div className={`fixed inset-0 z-40 transition-all ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-200 ${open ? 'opacity-40' : 'opacity-0'}`}
        onClick={onClose}
        aria-label="Close user details drawer"
      />
      {/* Drawer */}
      <aside
        ref={drawerRef}
        className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-lg transform transition-transform duration-300
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="User Details"
        tabIndex={-1}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold">User Details</h3>
          <button ref={closeBtnRef} onClick={onClose} className="text-gray-500 hover:text-red-500" aria-label="Close user details drawer">
            <FaTimes size={20} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-4">
            {user.profilepic ? (
              <Image src={user.profilepic} alt="Profile" width={64} height={64} className="w-16 h-16 rounded-full object-cover border" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500">
                {user.name?.[0] || '?'}
              </div>
            )}
            <div>
              <div className="text-xl font-semibold">{user.name}</div>
              <div className="text-gray-500 text-sm">{user.email}</div>
              <div className="text-blue-700 font-medium capitalize">{user.role}</div>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-1">Bio</div>
            <div className="text-gray-700 whitespace-pre-line">{user.bio || <span className="text-gray-400">No bio</span>}</div>
          </div>
          <div className="flex gap-4 items-center">
            {user.linkedin && (
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900" title="LinkedIn" aria-label="LinkedIn profile">
                <FaLinkedin size={22} />
              </a>
            )}
            {user.instagram && (
              <a href={user.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800" title="Instagram" aria-label="Instagram profile">
                <FaInstagram size={22} />
              </a>
            )}
            {user.toplink && (
              <a href={user.toplink} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-900" title="Toplink" aria-label="Toplink profile">
                <FaLink size={22} />
              </a>
            )}
          </div>
          <div>
            <span className="font-semibold">External View Enabled: </span>
            {user.externalViewEnabled ? (
              <span className="text-green-600 font-semibold">Yes</span>
            ) : (
              <span className="text-gray-400">No</span>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default UserDetailsDrawer; 
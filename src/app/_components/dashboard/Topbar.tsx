import { FaBell, FaUserCircle, FaCog, FaSignOutAlt, FaHome, FaBook, FaLifeRing, FaPlus } from 'react-icons/fa';
import { useAuth } from '@/lib/auth';
import { useState, useRef, PropsWithChildren } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLinks, DashboardLink, getDynamicIcon } from './LinksContext';

const Topbar = ({ children }: PropsWithChildren) => {
  const { user, signout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [linksOpen, setLinksOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { links } = useLinks();

  // Split links for quick access and dropdown
  const quickLinks = links.slice(0, 4);
  const moreLinks = links.slice(4);

  return (
    <header className="w-full h-16 bg-white border-b flex items-center justify-between px-2 sm:px-4 md:px-6 shadow-sm z-10">
      <div className="flex items-center gap-2">
        <div className="font-semibold text-lg md:text-xl">Dashboard</div>
        {children}
      </div>
      {/* Quick links for desktop */}
      <nav className="hidden md:flex items-center gap-2 ml-4">
        {quickLinks.map((link: DashboardLink) => (
          <Link key={link.title} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="flex items-center gap-1 px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400">
            <span className="text-base">{getDynamicIcon(link.icon.lib, link.icon.name)}</span>
            <span className="hidden lg:inline">{link.title}</span>
          </Link>
        ))}
        {moreLinks.length > 0 && (
          <div className="relative">
            <button
              className="flex items-center gap-1 px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setLinksOpen(v => !v)}
              aria-label="Show more links"
            >
              <FaPlus />
              <span className="hidden lg:inline">More</span>
            </button>
            {linksOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg py-2 z-50 animate-fade-in-up">
                {moreLinks.map((link: DashboardLink) => (
                  <Link key={link.title} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm font-medium focus:outline-none" onClick={() => setLinksOpen(false)}>
                    <span>{getDynamicIcon(link.icon.lib, link.icon.name)}</span>
                    <span>{link.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>
      {/* Quick links menu for mobile */}
      <div className="md:hidden relative">
        <button
          className="p-2 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Open quick links menu"
          onClick={() => setLinksOpen(v => !v)}
        >
          <FaPlus size={20} />
        </button>
        {linksOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg py-2 z-50 animate-fade-in-up">
            {links.map((link: DashboardLink) => (
              <Link key={link.title} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm font-medium focus:outline-none" onClick={() => setLinksOpen(false)}>
                <span>{getDynamicIcon(link.icon.lib, link.icon.name)}</span>
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
        <button className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 p-2 rounded-full" title="Notifications" aria-label="Notifications">
          <FaBell size={20} />
        </button>
        <button
          className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 p-2 rounded-full"
          title="Settings"
          aria-label="Settings"
          onClick={() => setSettingsOpen(true)}
        >
          <FaCog size={20} />
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 p-1 md:p-2 rounded-full"
            onClick={() => setDropdownOpen((v) => !v)}
            aria-label="User menu"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            {user?.photoURL ? (
              <Image src={user.photoURL} alt="Avatar" width={32} height={32} className="rounded-full object-cover" />
            ) : (
              <FaUserCircle size={28} className="text-gray-400" />
            )}
            <span className="hidden sm:inline text-base font-medium text-gray-700 max-w-[120px] truncate">
              {user?.displayName || user?.email}
            </span>
          </button>
          {dropdownOpen && (
            <>
              {/* Backdrop for mobile UX */}
              <div
                className="fixed inset-0 z-40 bg-black bg-opacity-10 md:hidden"
                onClick={() => setDropdownOpen(false)}
                aria-hidden="true"
              />
              <div
                className={
                  "absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg py-2 z-50 animate-fade-in-up md:top-full md:mt-2 " +
                  "md:w-44 " +
                  "md:rounded-lg " +
                  "md:bottom-auto " +
                  "md:left-auto " +
                  "md:right-0 " +
                  "md:py-2 " +
                  "md:shadow-lg " +
                  "md:border " +
                  "md:bg-white " +
                  "md:animate-fade-in-up " +
                  "w-screen left-1/2 -translate-x-1/2 bottom-0 mb-2 rounded-t-lg md:translate-x-0 md:bottom-auto md:mb-0 " +
                  "md:absolute " +
                  "md:rounded-lg "
                }
                role="menu"
                aria-label="User menu"
              >
                <div className="px-4 py-2 text-sm text-gray-700 border-b hidden md:block">
                  Signed in as<br />
                  <span className="font-semibold">{user?.displayName || user?.email}</span>
                </div>
                <div className="px-4 py-2 text-sm text-gray-700 border-b md:hidden text-center">
                  {user?.displayName || user?.email}
                </div>
                <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 focus:bg-blue-100 focus:outline-none text-base md:text-sm" role="menuitem">Settings</button>
                <button className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 focus:bg-red-100 focus:outline-none flex items-center gap-2 text-base md:text-sm" onClick={signout} role="menuitem"><FaSignOutAlt /> Logout</button>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Settings Modal */}
      {settingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative animate-fade-in-up">
            <button
              className="absolute top-2 right-2 p-2 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Close settings"
              onClick={() => setSettingsOpen(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-gray-600 mb-4">This is a placeholder for settings. Add your settings form or links here.</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={() => setSettingsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Topbar; 
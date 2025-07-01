"use client";
import { FaPlus } from 'react-icons/fa';
import { useState, PropsWithChildren } from 'react';
import Link from 'next/link';
import { useLinks, DashboardLink, getDynamicIcon } from './LinksContext';

const Topbar = ({ children }: PropsWithChildren) => {
  const [linksOpen, setLinksOpen] = useState(false);
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
    </header>
  );
};

export default Topbar; 
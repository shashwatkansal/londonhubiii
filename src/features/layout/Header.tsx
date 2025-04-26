'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useHub } from '../hub/HubProvider';
import { useTheme } from '../theme/ThemeProvider';

export function Header() {
  const { hub } = useHub();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="fixed w-full bg-white dark:bg-gray-900 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src={hub.theme.logo}
                alt={hub.name}
                width={40}
                height={40}
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                {hub.name}
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {hub.features.blog && (
              <Link
                href="/blog"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              >
                Blog
              </Link>
            )}
            {hub.features.events && (
              <Link
                href="/events"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              >
                Events
              </Link>
            )}
            {hub.features.members && (
              <Link
                href="/members"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              >
                Members
              </Link>
            )}
            {hub.features.projects && (
              <Link
                href="/projects"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              >
                Projects
              </Link>
            )}
            {hub.features.impact && (
              <Link
                href="/impact"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              >
                Impact
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 
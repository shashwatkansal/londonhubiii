'use client';

import React from 'react';
import Link from 'next/link';
import { useHub } from '../hub/HubProvider';

export function Footer() {
  const { hub } = useHub();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">{hub.name}</h3>
            <p className="text-gray-400">{hub.description}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {hub.features.blog && (
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
              )}
              {hub.features.events && (
                <li>
                  <Link href="/events" className="text-gray-400 hover:text-white">
                    Events
                  </Link>
                </li>
              )}
              {hub.features.members && (
                <li>
                  <Link href="/members" className="text-gray-400 hover:text-white">
                    Members
                  </Link>
                </li>
              )}
              {hub.features.projects && (
                <li>
                  <Link href="/projects" className="text-gray-400 hover:text-white">
                    Projects
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${hub.contact.email}`}
                  className="text-gray-400 hover:text-white"
                >
                  {hub.contact.email}
                </a>
              </li>
              {hub.contact.address && (
                <li className="text-gray-400">{hub.contact.address}</li>
              )}
              {hub.contact.phone && (
                <li>
                  <a
                    href={`tel:${hub.contact.phone}`}
                    className="text-gray-400 hover:text-white"
                  >
                    {hub.contact.phone}
                  </a>
                </li>
              )}
            </ul>

            <div className="mt-4 flex space-x-4">
              {hub.socialLinks.instagram && (
                <a
                  href={hub.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  Instagram
                </a>
              )}
              {hub.socialLinks.linkedin && (
                <a
                  href={hub.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  LinkedIn
                </a>
              )}
              {hub.socialLinks.twitter && (
                <a
                  href={hub.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  Twitter
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {hub.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 
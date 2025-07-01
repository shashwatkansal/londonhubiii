"use client";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaUsers, FaFileAlt, FaChartBar, FaQuestionCircle, FaCog, FaBars, FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';

const navLinks = [
  { href: '/dashboard/users', label: 'Users', icon: <FaUsers className="mr-2" /> },
  { href: '/dashboard/posts', label: 'Posts', icon: <FaFileAlt className="mr-2" /> },
  { href: '/dashboard/impact', label: 'Impact', icon: <FaChartBar className="mr-2" /> },
  { href: '/dashboard/faqs', label: 'FAQs', icon: <FaQuestionCircle className="mr-2" /> },
  { href: '/dashboard/settings', label: 'Settings', icon: <FaCog className="mr-2" /> },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`h-full bg-white border-r flex flex-col transition-all duration-200 ${collapsed ? 'w-16' : 'w-64'} fixed md:static z-20`}> 
      <div className="flex items-center justify-between p-4 border-b">
        <span className={`font-bold text-xl transition-all duration-200 ${collapsed ? 'hidden' : 'block'}`}>Admin Dashboard</span>
        <button
          className="md:hidden block p-2 text-gray-600 hover:text-blue-600"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <FaBars /> : <FaChevronLeft />}
        </button>
        <button
          className="hidden md:block p-2 text-gray-600 hover:text-blue-600"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <FaBars /> : <FaChevronLeft />}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="mt-2">
          {navLinks.map(({ href, label, icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-150 cursor-pointer
                    ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-blue-50'}
                    ${collapsed ? 'justify-center' : ''}`}
                  title={label}
                >
                  {icon}
                  <span className={`${collapsed ? 'hidden' : 'inline'} transition-all duration-200`}>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar; 
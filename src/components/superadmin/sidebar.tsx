"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiMenu,
  FiX,
  FiHome,
  FiCalendar,
  FiTrendingUp,
  FiBookOpen,
} from 'react-icons/fi';
import { MdOutlineAssessment } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { AiOutlineFileSearch } from "react-icons/ai";

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState('');

  const menuItems = [
    { href: '/superadmin', label: 'Dashboard', icon: <FiHome className="flex-shrink-0" /> },
    { href: '/superadmin/users', label: 'Users', icon: <FiTrendingUp className="flex-shrink-0" /> },
    { href: '/superadmin/enrolled-students', label: 'Enrolled Students', icon: <HiOutlineDocumentReport className="flex-shrink-0" /> },
    { href: '/superadmin/', label: 'Lessons Management', icon: <FiBookOpen className="flex-shrink-0" /> },

    // A.Y. Management section
    { section: 'A.Y. Management' },
    { href: '/administrative/academic-year', label: 'A.Y Configuration', icon: <FiCalendar className="flex-shrink-0" /> },

    { section: 'Assessment Tool' },
    { href: '/faculty/create-assessment', label: 'Create Assessment', icon: <MdOutlineAssessment className="flex-shrink-0" /> },
    { href: '/faculty/student-submission', label: 'Student Submission', icon: <AiOutlineFileSearch className="flex-shrink-0" /> },
  ];

  useEffect(() => {
    const bestMatch =
      menuItems
        .filter(item => item.href && (pathname === item.href || pathname.startsWith(item.href + '/')))
        .sort((a, b) => (b.href?.length || 0) - (a.href?.length || 0))[0]?.href || '';
    setActiveHref(bestMatch);
  }, [pathname]);

  return (
    <aside
      className={`bg-gradient-to-b from-gray-800 to-gray-900 text-white h-screen fixed md:relative transition-all duration-300 ease-in-out pb-20
        ${collapsed ? 'w-20' : 'w-64'}
        ${isOpen ? 'absolute left-0 top-0 z-50' : 'hidden'} md:block`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} p-4 pb-2`}>
          {!collapsed && (
            <h2 className="text-xl font-bold text-white">
              MENU
            </h2>
          )}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors hidden md:block"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <FiMenu size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors md:hidden"
              aria-label="Close sidebar"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto pt-2 custom-scrollbar">
          <ul>
            {menuItems.map((item, index) => {
              if (item.section) {
                return !collapsed ? (
                  <li key={`section-${index}`} className="mt-4 mb-2 px-2">
                    <span className="text-xs uppercase text-gray-400 tracking-wide">{item.section}</span>
                  </li>
                ) : null;
              }

              const isActive = activeHref === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href!}
                    className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-lg transition-all
                      ${isActive
                        ? 'bg-blue-600/20 text-blue-400 border-l-4 border-blue-400'
                        : 'hover:bg-gray-700/50 hover:text-gray-200'}
                    `}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {!collapsed && <span className="font-medium">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

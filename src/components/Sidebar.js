'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname(); // Next.js equivalent of useLocation().pathname

  const sidebarLinks = [
    { label: 'Manage Orders', to: '/admin/orders' },
    { label: 'Manage Books', to: '/admin/manage-books' },
    { label: 'Manage Shipping', to: '/admin/shipping' },
    { label: 'Manage Payment', to: '/admin/payment' },
    { label: 'Manage Users', to: '/admin/manage-users' },
    { label: 'Manage Profiles', to: '/admin/usersinfo' },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col h-full md:h-screen md:min-h-screen">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-[#016AB3]">Admin Panel</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {sidebarLinks.map(({ label, to }) => {
          const isActive = pathname === to;

          return (
            <Link
              key={to}
              href={to}
              className={`block px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-[#016AB3] text-white'
                  : 'text-gray-700 hover:bg-[#016AB3] hover:text-white'
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import {
  FaShoppingCart,
  FaBook,
  FaTruck,
  FaCreditCard,
  FaUsers,
  FaUserCircle,
  FaClipboardList,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Card data matching the sidebar links
  const dashboardCards = [
    {
      title: 'Manage Orders',
      description: 'View and manage customer orders',
      icon: <FaShoppingCart className="text-2xl" />,
      path: '/admin/orders',
      color: 'bg-blue-500'
    },
    {
      title: 'Manage Books',
      description: 'View and manage all books',
      icon: <FaBook className="text-2xl" />,
      path: '/admin/manage-books',
      color: 'bg-purple-500'
    },
    {
      title: 'Manage Shipping',
      description: 'Manage shipping details and status',
      icon: <FaTruck className="text-2xl" />,
      path: '/admin/shipping',
      color: 'bg-green-500'
    },
    {
      title: 'Manage Payment',
      description: 'View and manage payment information',
      icon: <FaCreditCard className="text-2xl" />,
      path: '/admin/payment',
      color: 'bg-yellow-500'
    },
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      icon: <FaUsers className="text-2xl" />,
      path: '/admin/manage-users',
      color: 'bg-red-500'
    },
    {
      title: 'Manage Profiles',
      description: 'View and manage user profiles',
      icon: <FaUserCircle className="text-2xl" />,
      path: '/admin/usersinfo',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] to-[#fef6fb] font-sans">
        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-20 left-4 z-50 bg-[#016AB3] text-white p-3 rounded-lg shadow-lg hover:bg-[#0096CD] transition-colors duration-200"
          aria-label="Toggle Menu"
        >
          {isSidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>

        <div className="flex min-h-screen">
          {/* Sidebar Overlay for Mobile */}
          {isSidebarOpen && (
            <div
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={closeSidebar}
            ></div>
          )}

          {/* Sidebar */}
          <div
            className={`
              fixed md:static inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              md:translate-x-0 md:block
            `}
          >
            <div>
              <Sidebar />
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6 md:ml-0">
            {/* Dashboard Header */}
            <div className="mb-6 mt-16 md:mt-0">
              <h1 className="text-2xl md:text-3xl font-bold text-[#2A428C]">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome to your administration panel</p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="p-6">
                    <div
                      className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}
                    >
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h3>
                    <p className="text-gray-600 mb-4">{card.description}</p>
                    <Link
                      href={card.path}
                      className="inline-block px-4 py-2 bg-[#016AB3] text-white rounded-lg hover:bg-[#0096CD] transition-colors duration-200"
                      onClick={closeSidebar} // Close sidebar on mobile when clicking link
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
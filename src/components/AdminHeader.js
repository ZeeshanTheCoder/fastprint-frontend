'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Next.js equivalent of useNavigate
import FastPrintLogo from '@/assets/images/fastlogo.svg';
import useAuth from '@/hooks/useAuth'; // assuming you have this hook working in Next.js
import Image from 'next/image';

const AdminHeader = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login'); // Next.js navigation
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex justify-between items-center">
        {/* Left: Logo */}
        <div>
          <Image
            src={FastPrintLogo} 
            alt="Fast Print Guys Logo" 
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" 
          />
        </div>

        {/* Right: Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium border rounded-full transition-all duration-300 whitespace-nowrap"
          style={{
            color: '#0096CD',
            borderColor: '#0096CD',
            backgroundColor: 'white',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#2A428C';
            e.target.style.color = '#fff';
            e.target.style.borderColor = '#2A428C';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'white';
            e.target.style.color = '#0096CD';
            e.target.style.borderColor = '#0096CD';
          }}
        >
          Logout
        </button>
      </div>

      {/* Gradient Border */}
      <div className="w-full h-1 bg-gradient-to-r from-[#D15D9E] to-[#5D4495]"></div>
    </header>
  );
};

export default AdminHeader;
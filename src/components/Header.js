"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import useAuth from "../hooks/useAuth"; // ensure this works with Next.js
import Image from "next/image";
import FastPrintLogo from "@/assets/images/fastlogo.svg"; // Or place in /public

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourceOpen, setResourceOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const resourceRef = useRef();

  const { user, logout } = useAuth();
  const router = useRouter();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resourceRef.current && !resourceRef.current.contains(event.target)) {
        setResourceOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMobileLinkClick = () => {
    setMenuOpen(false);
    setResourceOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
    setMenuOpen(false);
  };

  const handleProfileClick = () => {
    router.push(user ? "/userdashboard" : "/login");
    setMenuOpen(false);
  };

  const handleCartClick = () => {
    router.push(user ? "/orders" : "/login");
    setMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={FastPrintLogo}
              alt="Fast Print Guys Logo"
              className="w-16 h-16 sm:w-20 transition-transform duration-200 hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-gray-700 text-sm xl:text-base">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About Us" },
              { href: "/products", label: "Products" },
              { href: "/calculator/printbook", label: "Pricing" },
              { href: "/print-shop", label: "Print Shop" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/services", label: "Services" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}

            {/* Resources Dropdown */}
            <div
              className="relative"
              ref={resourceRef}
              onMouseEnter={() => setResourceOpen(true)}
              onMouseLeave={() => setResourceOpen(false)}
            >
              <button className="hover:text-blue-600 flex items-center gap-1 transition-colors duration-200">
                Resources{" "}
                <IoIosArrowDown
                  className={`transition-transform duration-200 ${
                    resourceOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {resourceOpen && (
                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg z-20 min-w-52 border border-gray-100">
                  <div className="py-2">
                    {[
                      "guide-templates",
                      "blogs",
                      "publishing",
                      "contact-resources",
                      "hire-professional",
                      "plan-project",
                    ].map((slug) => (
                      <Link
                        key={slug}
                        href={`/resources/${slug}`}
                        className="block px-4 py-2 hover:bg-gray-50 transition-colors duration-200 text-sm"
                      >
                        {slug
                          .replace(/([a-z])([A-Z])/g, "$1 $2")
                          .replace(/^\w/, (c) => c.toUpperCase())}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 xl:px-6 py-2 text-xs xl:text-sm font-medium border rounded-full transition-all duration-300 text-[#0096CD] border-[#0096CD] bg-white hover:bg-[#2A428C] hover:text-white hover:border-[#2A428C]"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="px-4 xl:px-6 py-2 text-xs xl:text-sm font-medium border rounded-full transition-all duration-300 text-[#0096CD] border-[#0096CD] bg-white hover:bg-[#2A428C] hover:text-white hover:border-[#2A428C]"
              >
                Login
              </Link>
            )}

            {/* Cart */}
            <div
              className="relative cursor-pointer"
              onClick={handleCartClick}
              title="Cart"
            >
              <HiOutlineShoppingBag
                size={20}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center text-[10px] font-bold text-white bg-red-600 rounded-full w-4 h-4 min-w-[16px]">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Profile */}
            <FiUser
              size={20}
              className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-200"
              onClick={handleProfileClick}
              title="Profile"
            />
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-3">
            <div
              className="relative cursor-pointer"
              onClick={handleCartClick}
              title="Cart"
            >
              <HiOutlineShoppingBag
                size={18}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center text-[9px] font-bold text-white bg-red-600 rounded-full w-3.5 h-3.5 min-w-[14px]">
                  {cartCount}
                </span>
              )}
            </div>

            <FiUser
              size={18}
              className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-200"
              onClick={handleProfileClick}
              title="Profile"
            />

            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            menuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <nav className="py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-1">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/products", label: "Products" },
                { href: "/calculator/printbook", label: "Pricing" },
                { href: "/print-shop", label: "Print Shop" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/services", label: "Services" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 rounded-md"
                  onClick={handleMobileLinkClick}
                >
                  {item.label}
                </Link>
              ))}

              {/* Resources Toggle for Mobile */}
              <div className="border-t border-gray-100 mt-2 pt-2">
                <button
                  onClick={() => setResourceOpen(!resourceOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 rounded-md"
                >
                  <span>Resources</span>
                  <IoIosArrowDown
                    className={`transition-transform duration-200 ${
                      resourceOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    resourceOpen
                      ? "max-h-screen opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <div className="pl-4 space-y-1">
                    {[
                      "guide-templates",
                      "blogs",
                      "publishing",
                      "contact-resources",
                      "hire-professional",
                      "plan-project",
                    ].map((slug) => (
                      <Link
                        key={slug}
                        href={`/resources/${slug}`}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 rounded-md"
                        onClick={handleMobileLinkClick}
                      >
                        {slug
                          .replace(/([a-z])([A-Z])/g, "$1 $2")
                          .replace(/^\w/, (c) => c.toUpperCase())}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Auth */}
              <div className="border-t border-gray-100 mt-4 pt-4 px-4">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm font-medium border rounded-full transition-all duration-300 text-[#0096CD] border-[#0096CD] bg-white"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="block w-full px-4 py-2 text-sm font-medium border rounded-full text-center transition-all duration-300 text-[#0096CD] border-[#0096CD] bg-white"
                    onClick={handleMobileLinkClick}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Gradient Border */}
      <div className="w-full h-1.5 bg-gradient-to-r from-pink-400 to-purple-600"></div>
    </header>
  );
};

export default Header;

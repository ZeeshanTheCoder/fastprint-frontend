"use client";

import {
  FaHome,
  FaBoxOpen,     // Products
  FaBlog,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaPaperPlane,
  FaYoutube,
  FaInfoCircle,   // About Us
  FaBriefcase,    // Portfolio
  FaConciergeBell // Services
} from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="w-full bg-gradient-to-r from-[#016AB3] via-[#0096CD] to-[#00AEDC] text-white"
    >
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
        {/* Left Section */}
        <div className="flex flex-col gap-6 md:w-1/2">
          {/* Top Icons */}
          <div className="flex flex-wrap gap-6 text-base font-medium">
            <div>
              <Link
                href="/"
                className="flex items-center gap-2 cursor-pointer hover:underline"
              >
                <FaHome />
                <span>Home</span>
              </Link>
            </div>
            <div>
              <Link
                href="/products"
                className="flex items-center gap-2 cursor-pointer hover:underline"
              >
                <FaBoxOpen />
                <span>Products</span>
              </Link>
            </div>

            <div>
              <Link
                href="/about"
                className="flex items-center gap-2 cursor-pointer hover:underline"
              >
                <FaInfoCircle />
                <span>About</span>
              </Link>
            </div>
            
            <div>
              <Link
                href="/portfolio"
                className="flex items-center gap-2 cursor-pointer hover:underline"
              >
                <FaBriefcase />
                <span>Portfolio</span>
              </Link>
            </div>
            <div>
              <Link
                href="/services"
                className="flex items-center gap-2 cursor-pointer hover:underline"
              >
                <FaConciergeBell />
                <span>Services</span>
              </Link>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 text-2xl mt-2">
            <a href="https://x.com/Fast_Print_Guys" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="cursor-pointer hover:text-yellow-400 transition" />
            </a>
            <a href="https://www.instagram.com/fastprintguys/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="cursor-pointer hover:text-yellow-400 transition" />
            </a>
            <a href="https://www.facebook.com/fastprintguys/" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="cursor-pointer hover:text-yellow-400 transition" />
            </a>
            <a href="https://www.linkedin.com/company/fast-print-guys" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="cursor-pointer hover:text-yellow-400 transition" />
            </a>
            <a href="https://www.youtube.com/@FastPrintGuys" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="cursor-pointer hover:text-yellow-400 transition" />
            </a>
            <a href="https://www.tiktok.com/@fastprintguys?lang=en" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
              <FaTiktok className="cursor-pointer hover:text-yellow-400 transition" />
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 mt-4">
            <FaPhoneAlt />
            <a href="tel:+14692777489" className="hover:underline">
              +1 469-277-7489
            </a>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt />
            <a
              href="https://www.google.com/maps/dir//2828+W+Parker+Rd+Suite+B103,+Plano,+TX+75075"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              2828 W Parker Rd Suite B103, Plano, TX 75075, United States
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-4 md:w-1/2">
          <p className="text-base leading-relaxed max-w-md">
            Subscribe now for exclusive offers and fast, top-quality
            printing services delivered to your door!
          </p>

          <h4 className="text-lg font-semibold mt-4">Subscribe</h4>

          <form className="flex flex-col sm:flex-row items-center gap-4 mt-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full sm:w-auto bg-white flex-grow rounded-full outline-none text-black text-sm"
              aria-label="Email Address"
              required
            />
            <button
              type="submit"
              className="p-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition"
              aria-label="Subscribe"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>

      {/* Yellow Line */}
      <div className="w-full border-t-4 border-yellow-400 mt-2" />

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 text-white text-sm max-w-7xl mx-auto gap-4 md:gap-0">
        <span>© 2025 Fast Print Guys, All Rights Reserved.</span>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="cursor-pointer hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="cursor-pointer hover:underline">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
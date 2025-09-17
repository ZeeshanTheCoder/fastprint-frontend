"use client"; // Required if this component uses interactive JS (it does)

import {
  FaHome,
  FaBoxOpen,
  FaBlog,
  FaPrint,
  FaShoppingBag,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="w-full relative"
      style={{
        background:
          "linear-gradient(90deg, #016AB3 16.41%, #0096CD 60.03%, #00AEDC 87.93%)",
      }}
    >
      {/* Main Content */}
      <div className="w-full px-10 py-10 flex flex-col md:flex-row justify-between text-white gap-10">
        {/* Left Section */}
        <div className="flex flex-col gap-6 md:w-1/2">
          {/* Top Icons */}
          <div className="flex flex-wrap gap-6 text-[16px] font-medium">
            <div className="flex items-center gap-2">
              <FaHome />
              <span>Home</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBoxOpen />
              <span>Products</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBlog />
              <span>Blog</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 text-xl mt-2">
            <FaTwitter className="cursor-pointer hover:text-yellow-300" />
            <FaInstagram className="cursor-pointer hover:text-yellow-300" />
            <FaFacebookF className="cursor-pointer hover:text-yellow-300" />
            <FaLinkedinIn className="cursor-pointer hover:text-yellow-300" />
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 mt-4">
            <FaPhoneAlt />
            <span>+1 469-277-7489</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt />
            <span>123 Main Street, Texas, USA</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-4 md:w-1/2">
          <p className="text-[16px] leading-[24px] max-w-md">
            This is a paragraph with more information about something important.
          </p>

          <h4 className="text-lg font-semibold mt-4">Subscribe</h4>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full max-w-[300px] rounded-full outline-none text-black bg-white text-sm"
            />
            <button className="p-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>

      {/* Yellow Line */}
      <div className="w-full border-t-4 border-yellow-400 mt-2" />

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row justify-between items-center px-10 py-4 text-white text-sm gap-2">
        <span>© 2025 Your Company</span>
        <div className="flex gap-4">
          <span className="cursor-pointer hover:underline">Privacy Policy</span>
          <span className="cursor-pointer hover:underline">
            Terms & Conditions
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

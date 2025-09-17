"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import imgx from "@/assets/images/img74.png";
import img75 from "@/assets/images/img75.jpeg";
import img76 from "@/assets/images/img76.jpeg";
import img77 from "@/assets/images/img77.jpeg";
import img78 from "@/assets/images/img78.jpeg";
import img79 from "@/assets/images/img79.jpeg";
import img80 from "@/assets/images/img80.jpeg";
import img81 from "@/assets/images/img81.jpeg";
import img82 from "@/assets/images/img82.jpeg";
import image37 from "@/assets/images/image37.png";
import image38 from "@/assets/images/image38.png";
import Faq from "@/components/Faq";

const cards = [
  {
    src: img75,
    title: "Banners and Posters",
    desc: "We make high-quality prints for events, exhibitions.",
  },
  {
    src: img76,
    title: "Business Cards",
    desc: "Building Brands That Speak. Let’s create something unforgettable.",
  },
  {
    src: img77,
    title: "Flyers",
    desc: "Big Ideas. Bold Results. Your success is our business. Designs That Captivate",
  },
  {
    src: img78,
    title: "Customized Products",
    desc: "Made Just for You. Because Ordinary Isn’t Your Style.",
  },
  {
    src: img79,
    title: "Customized Sticker",
    desc: "We make high-quality prints for events, exhibitions.",
  },
  {
    src: img80,
    title: "Invitation Cards",
    desc: "Building Brands That Speak. Let’s create something unforgettable.",
  },
  {
    src: img81,
    title: "T-Shirt Printing",
    desc: "Big Ideas. Bold Results. Your success is our business. Designs That Captivate",
  },
  {
    src: img82,
    title: "Personalized Book Printing",
    desc: "Made Just for You. Because Ordinary Isn’t Your Style.",
  },
];

const PrintShop = () => {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      {/* Top Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 relative z-10">
          {/* Left Content */}
          <div className="flex-1 text-white space-y-8">
            <div className="scroll-animate slide-in-left">
              <span className="inline-block px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium mb-4">
                Premium Print Shop Services
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Welcome to <span className="">Fast Print Guys Print Shop</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                Your neighborhood print shop delivering high-quality prints with
                speed and care. From custom business cards to large banners,
                we’re here to meet all your printing needs with expert
                craftsmanship.
              </p>
            </div>

            <div className="scroll-animate slide-in-left stagger-2 flex flex-wrap gap-4">
              <button
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-300 hover-lift pulse-hover"
                onClick={() => router.push("/about")}
              >
                About Us
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 scroll-animate slide-in-right max-w-md">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-300 to-purple-300 rounded-2xl blur opacity-30 float"></div>
              <img
                src={imgx.src}
                alt="Fast Print Guys Print Shop"
                className="relative w-full h-auto max-h-[400px] object-contain rounded-2xl shadow-2xl hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* New Card Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* Heading */}
        <div className="flex justify-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-center">
            <span className="text-blue-600">Fast Print Guys </span>
            <span className="text-black">Makes it Simple to Print.</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {cards.map(({ src, title, desc }, index) => {
            const gradients = [
              "from-blue-500 to-blue-600",
              "from-purple-500 to-purple-600",
              "from-orange-500 to-orange-600",
              "from-teal-500 to-teal-600",
            ];
            const bgGradients = [
              "from-blue-50 to-blue-100",
              "from-purple-50 to-purple-100",
              "from-orange-50 to-orange-100",
              "from-teal-50 to-teal-100",
            ];
            const icons = ["📦", "🚀", "🖨️", "✉️"];

            const gradient = gradients[index % gradients.length];
            const bgGradient = bgGradients[index % bgGradients.length];
            const icon = icons[index % icons.length];

            return (
              <div
                key={index}
                className={`group relative bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200/50 transition-all duration-700 hover:shadow-2xl cursor-pointer flex flex-col hover:-translate-y-3 animate-fadeInUp`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Gradient Overlay */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${bgGradient} rounded-full opacity-20 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700`}
                ></div>

                {/* Image Container */}
                <div className="relative overflow-hidden rounded-t-3xl">
                  <img
                    src={src.src}
                    alt={title}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Floating Icon */}
                  <div
                    className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-200`}
                  >
                    {icon}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 transform -translate-y-24 group-hover:translate-y-0 transition-transform duration-500 delay-300">
                    Premium
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className={`text-xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent animate-zoomIn group-hover:scale-105 transition-transform duration-300`}
                    >
                      {title}
                    </h3>
                    <div
                      className={`w-8 h-8 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-200`}
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow group-hover:text-gray-700 transition-colors duration-300">
                    {desc}
                  </p>
                </div>

                {/* Bottom Accent Line */}
                <div
                  className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                ></div>
                {/* Hover Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1200px] mx-auto">
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-6 leading-tight animate-bounceIn">
            <span className="text-gray-900">What Our </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
              Client Says
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12 px-2 sm:px-0 animate-fadeInUp stagger-2">
            Not only should you rely on our word-of-mouth recommendations; here
            are comments from customers on our printing capabilities:
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
            {/* Card 1 */}
            <div className="flex flex-col sm:flex-row bg-gray-50 rounded-xl shadow-md overflow-hidden transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 animate-slideUp card-hover">
              <div className="relative w-full sm:w-48 h-56 sm:h-auto group overflow-hidden flex-shrink-0">
                <img
                  src={image37.src}
                  alt="Client 1"
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 ease-in-out transform translate-y-full group-hover:translate-y-0"></div>
              </div>
              <div className="flex flex-col justify-center p-6 flex-grow">
                <p className="text-gray-700 mb-4 animate-fadeInLeft stagger-2">
                  Having self-published, I have used several printers. The best
                  mix of speed, cost, and quality among Fast Print Guys is found
                  here. My books look great!
                </p>
                <p className="font-semibold animate-zoomIn stagger-3">
                  Michael T.
                </p>
                <p className="text-sm text-gray-500 animate-fadeInUp stagger-4">
                  Author
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col sm:flex-row bg-gray-50 rounded-xl shadow-md overflow-hidden transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 animate-slideUp stagger-2 card-hover">
              <div className="relative w-full sm:w-48 h-56 sm:h-auto group overflow-hidden flex-shrink-0">
                <img
                  src={image38.src}
                  alt="Client 2"
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 ease-in-out transform translate-y-full group-hover:translate-y-0"></div>
              </div>
              <div className="flex flex-col justify-center p-6 flex-grow">
                <p className="text-gray-700 mb-4 animate-fadeInLeft stagger-2">
                  Fast Print Guys rescued my event! In six hours, I needed 500
                  flyers, and they produced PERFECT printing on schedule.
                  Unbelievably excellent service!
                </p>
                <p className="font-semibold animate-zoomIn stagger-3">Sarah</p>
                <p className="text-sm text-gray-500 animate-fadeInUp stagger-4">
                  Director of Marketing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <Faq />

      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation-name: fadeInUp;
          animation-duration: 0.6s;
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-zoomIn {
          animation-name: zoomIn;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
        }
      `}</style>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes bounceIn {
          0%,
          20%,
          40%,
          60%,
          80%,
          100% {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
          }
          0% {
            opacity: 0;
            transform: scale3d(0.3, 0.3, 0.3);
          }
          20% {
            transform: scale3d(1.1, 1.1, 1.1);
          }
          40% {
            transform: scale3d(0.9, 0.9, 0.9);
          }
          60% {
            opacity: 1;
            transform: scale3d(1.03, 1.03, 1.03);
          }
          80% {
            transform: scale3d(0.97, 0.97, 0.97);
          }
          100% {
            opacity: 1;
            transform: scale3d(1, 1, 1);
          }
        }
        .animate-bounceIn {
          animation-name: bounceIn;
          animation-duration: 1s;
          animation-fill-mode: both;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation-name: slideUp;
          animation-duration: 0.7s;
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
        }

        .animate-fadeInLeft {
          opacity: 0;
          transform: translateX(-20px);
          animation-name: fadeInLeft;
          animation-duration: 0.6s;
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
        }
        @keyframes fadeInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default PrintShop;

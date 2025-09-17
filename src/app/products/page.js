'use client';

import React from 'react';
import { useRouter } from 'next/navigation';


import pro from "@/assets/images/pro.png";
import arr from "@/assets/images/arr.png";

import img46 from "@/assets/images/img46.png";
import img47 from "@/assets/images/img47.png";
import img48 from "@/assets/images/img48.png";
import img49 from "@/assets/images/img49.png";
import img50 from "@/assets/images/img50.png";
import img51 from "@/assets/images/img51.png";
import img52 from "@/assets/images/img52.png";
import img53 from "@/assets/images/img53.png";
import img54 from "@/assets/images/img54.png";
import img55 from "@/assets/images/img55.png";
import img56 from "@/assets/images/img56.png";
import img57 from "@/assets/images/img57.png";
import img58 from "@/assets/images/img58.png";
import img59 from "@/assets/images/img59.png";

import img61 from "@/assets/images/img61.jpeg";
import img62 from "@/assets/images/img62.jpeg";
import img63 from "@/assets/images/img63.jpeg";
import img64 from "@/assets/images/img64.jpeg";

import img66 from "@/assets/images/img66.png";
import img67 from "@/assets/images/img67.png";
import img68 from "@/assets/images/img68.png";
import img69 from "@/assets/images/img69.png";

import img70 from "@/assets/images/img70.png";
import img71 from "@/assets/images/img71.png";
import img72 from "@/assets/images/img72.png";

const Products = () => {
  const router = useRouter();

  return (
    <>

      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px"
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 relative z-10">
          {/* Left Content */}
          <div className="flex-1 text-white space-y-8">
            <div className="scroll-animate slide-in-left">
              <span className="inline-block px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium mb-4">
                Quality You Can Count On
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Our {' '}
                <span className="">
                  Premium Products
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                Explore our diverse range of printing products crafted with precision and care. From custom prints to large-scale orders, we deliver excellence every time.
              </p>
            </div>

            <div className="scroll-animate slide-in-left stagger-2 flex flex-wrap gap-4">
              <button
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-300 hover-lift pulse-hover"
                onClick={() => router.push("/portfolio")}
              >
                View Our Portfolio
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 scroll-animate slide-in-right">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur opacity-30 float"></div>
              <img
                src={pro.src} // Using .src because it's a Next.js imported image
                alt="Premium Printing Products"
                className="relative w-full max-w-lg h-auto object-cover rounded-2xl shadow-2xl hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Book Types Section */}
      <section
        className="w-full bg-gradient-to-br from-gray-50 via-white to-blue-50/30 px-8 py-20 relative overflow-hidden"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100/40 rounded-full translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-orange-100/30 rounded-full animate-pulse"></div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce"></div>
        <div
          className="absolute top-40 right-32 w-3 h-3 bg-purple-400/60 rounded-full animate-bounce"
          style={{ animationDelay: '0.5s' }}
        ></div>
        <div
          className="absolute bottom-32 left-1/3 w-2 h-2 bg-orange-400/60 rounded-full animate-bounce"
          style={{ animationDelay: '1s' }}
        ></div>

        {/* Header & CTA */}
        <div
          className="max-w-[1440px] mx-auto mb-16 flex flex-col md:flex-row md:items-center md:justify-between relative z-10"
          data-animate
          id="products-header"
        >
          <div className="relative">
            {/* Decorative Line */}
            <div className="absolute -top-4 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>

            <h2 className="text-5xl md:text-6xl font-extrabold text-left mb-6 animate-bounceIn leading-tight">
              <span className="text-gray-900">Book Types You Can </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                Make On
              </span>
            </h2>
            <p className="text-gray-700 text-xl max-w-3xl animate-fadeInUp stagger-2 leading-relaxed">
              Explore customized printing services for a wide variety of books, designed to fit your unique style and needs.
            </p>

            {/* Stats */}
            <div className="flex items-center space-x-8 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">3K+</div>
                <div className="text-sm text-gray-600">Combinations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">500+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">24h</div>
                <div className="text-sm text-gray-600">Fast Delivery</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {[
            {
              title: "Print Book",
              description:
                "Personalized book printing for memoirs, novels, cookbooks, workbooks, children's books, and much more is our specialty.",
              img: img46,
              gradient: "from-blue-500 to-blue-600",
              bgGradient: "from-blue-50 to-blue-100",
              icon: "📚",
              route: "/calculator/printbook",
            },
            {
              title: "Yearbook",
              description:
                "Creating a yearbook that captures memories of an entire academic year with beautiful design.",
              img: img53,
              gradient: "from-emerald-500 to-emerald-600",
              bgGradient: "from-emerald-50 to-emerald-100",
              icon: "🎓",
              route: "/calculator/yearbook",
            },
            {
              title: "Photo Book",
              description:
                "A photo book beautifully captures cherished memories through carefully curated images.",
              img: img47,
              gradient: "from-purple-500 to-purple-600",
              bgGradient: "from-purple-50 to-purple-100",
              icon: "📷",
              route: "/calculator/photobook",
            },
            {
              title: "E-book",
              description:
                "An e-book offers a convenient and accessible way to read, allowing users to enjoy literature on various devices.",
              img: img48,
              gradient: "from-orange-500 to-orange-600",
              bgGradient: "from-orange-50 to-orange-100",
              icon: "📱",
              route: "/calculator/printbook",
            },
            {
              title: "Wall Calendar",
              description:
                "Perfect for tracking dates and showcasing photos or artwork with customizable layouts and sizes.",
              img: img49,
              gradient: "from-teal-500 to-teal-600",
              bgGradient: "from-teal-50 to-teal-100",
              icon: "📅",
              route: "/calculator/calender",
            },
            {
              title: "Comic Book",
              description:
                "Expert comic book printing to realize unique stories combining words and graphics that captivate readers.",
              img: img50,
              gradient: "from-red-500 to-red-600",
              bgGradient: "from-red-50 to-red-100",
              icon: "📖",
              route: "/calculator/comicbook",
            },
            {
              title: "Magazine",
              description:
                "Professional printing services to design your magazine in any volume, from single copies to large orders.",
              img: img51,
              gradient: "from-pink-500 to-pink-600",
              bgGradient: "from-pink-50 to-pink-100",
              icon: "📰",
              route: "/calculator/magazine",
            },
            {
              title: "Cookbook",
              description:
                "Compile your expert-caliber recipes in a personal or self-published cookbook beautifully printed.",
              img: img52,
              gradient: "from-indigo-500 to-indigo-600",
              bgGradient: "from-indigo-50 to-indigo-100",
              icon: "🍳",
              route: "/calculator/printbook",
            },
          ].map(({ title, description, img, gradient, bgGradient, icon, route }, index) => (
            <div
              key={title}
              className={`group relative bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200/50 transition-all duration-700 hover:shadow-2xl cursor-pointer flex flex-col hover:-translate-y-3 animate-rotateIn stagger-${index + 1} backdrop-blur-sm`}
            >
              {/* Background Gradient Overlay */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${bgGradient} rounded-full opacity-20 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700`}
              ></div>

              {/* Image Container */}
              <div className="relative overflow-hidden rounded-t-3xl">
                <img
                  src={img.src}
                  alt={title}
                  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Image Overlay */}
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
                    className={`text-xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent animate-zoomIn stagger-2 group-hover:scale-105 transition-transform duration-300`}
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow animate-fadeInUp stagger-3 group-hover:text-gray-700 transition-colors duration-300">
                  {description}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => router.push(route)}
                    className={`w-full py-3 bg-gradient-to-r ${gradient} text-white font-medium rounded-xl opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-300 hover:scale-105`}
                  >
                    Learn More
                  </button>
                </div>
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
          ))}
        </div>
      </section>

      {/* Book Bindings Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-center mb-6">
          <h2 className="text-5xl md:text-6xl font-extrabold animate-bounceIn leading-tight -mt-8">
            <span className="text-gray-900">Book </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
              Bindings
            </span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-12 md:gap-20">
          {/* Left Image */}
          <div className="md:w-2/5 rounded-lg overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-105">
            <img src={img54.src} alt="Book Binding" className="w-full h-auto object-cover" />
          </div>

          {/* Right Text and Images */}
          <div className="md:w-3/5 flex flex-col h-full">
            <div className="flex-grow">
              <h3 className="text-blue-600 text-3xl font-semibold mb-4 tracking-wide">Paperback Perfect Bound</h3>
              <p className="text-gray-600 font-medium mb-6">32-800 pages</p>
              <hr className="border-gray-300 mb-8" />

              <p className="text-gray-700 leading-relaxed mb-10 text-lg">
                The industry term for traditional paperback binding, perfect bound is the most cost-efficient and popular way to bind on-demand products. Suitable for most projects.
              </p>

              {/* Image grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[img55, img56, img57, img58].map((imgSrc, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-md overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:scale-110"
                    style={{ willChange: 'transform' }}
                  >
                    <img
                      src={imgSrc.src}
                      alt={`Binding option ${idx + 1}`}
                      className="w-full h-24 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-600 origin-left scale-x-0 transition-transform duration-300 pointer-events-none group-hover:scale-x-100"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interior Color Options Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-center animate-bounceIn">
            <span className="text-black">Interior Color </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
              Options
            </span>
          </h2>
        </div>

        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {[
            {
              img: img61,
              title: "Standard Black & White",
              desc: "Standard black & white printing for novels, memoirs, and other text-heavy books.",
              gradient: "from-blue-500 to-blue-600",
              bgGradient: "from-blue-50 to-blue-100",
              icon: "🖤",
              route: "/calculator/standardbw",
            },
            {
              img: img62,
              title: "Premium Black & White",
              desc: "Heavy ink coverage great for books with black & white images, graphs, or other graphics.",
              gradient: "from-purple-500 to-purple-600",
              bgGradient: "from-purple-50 to-purple-100",
              icon: "💜",
              route: "/calculator/premiumbw",
            },
            {
              img: img63,
              title: "Standard Color",
              desc: "If your book is predominantly text but has a few color images, standard color is the right option for you.",
              gradient: "from-orange-500 to-orange-600",
              bgGradient: "from-orange-50 to-orange-100",
              icon: "🧡",
              route: "/calculator/standardcolor",
            },
            {
              img: img64,
              title: "Premium Color",
              desc: "The best color printing on every page with rich colors and heavy ink coverage.",
              gradient: "from-teal-500 to-teal-600",
              bgGradient: "from-teal-50 to-teal-100",
              icon: "💚",
              route: "/calculator/premiumcolor",
            },
          ].map(({ img, title, desc, gradient, bgGradient, icon, route }, index) => (
            <div
              key={title}
              className={`group relative bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200/50 transition-all duration-700 hover:shadow-2xl cursor-pointer flex flex-col hover:-translate-y-3 animate-rotateIn stagger-${index + 1} backdrop-blur-sm`}
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${bgGradient} rounded-full opacity-20 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700`}
              ></div>

              <div className="relative overflow-hidden rounded-t-3xl">
                <img
                  src={img.src}
                  alt={title}
                  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div
                  className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-200`}
                >
                  {icon}
                </div>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 transform -translate-y-24 group-hover:translate-y-0 transition-transform duration-500 delay-300">
                  Premium
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`text-xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent animate-zoomIn stagger-2 group-hover:scale-105 transition-transform duration-300`}
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow animate-fadeInUp stagger-3 group-hover:text-gray-700 transition-colors duration-300">
                  {desc}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100"></div>
              </div>

              <div
                className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
              ></div>
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              ></div>
            </div>
          ))}
        </div>
      </section>

      {/* Paper Types Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-center animate-bounceIn">
            <span className="text-black">Paper</span>
            <span className="text-blue-600"> Types</span>
          </h2>
        </div>

        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {[
            {
              img: img66,
              title: "60# Cream Uncoated",
              desc: "Traditional cream paper most frequently used for black & white novels and workbooks.",
              gradient: "from-blue-500 to-blue-600",
              bgGradient: "from-blue-50 to-blue-100",
              icon: "📄",
              route: "/calculator/60-cream-uncoated",
            },
            {
              img: img67,
              title: "60# White Uncoated",
              desc: "Versatile and economical white paper commonly found in a wide range of books.",
              gradient: "from-emerald-500 to-emerald-600",
              bgGradient: "from-emerald-50 to-emerald-100",
              icon: "📃",
              route: "/calculator/60-white-uncoated",
            },
            {
              img: img68,
              title: "80# White Coated",
              desc: "Ultra-smooth, high opacity bright white paper used for photo books, magazines, and comic books.",
              gradient: "from-purple-500 to-purple-600",
              bgGradient: "from-purple-50 to-purple-100",
              icon: "📑",
              route: "/calculator/80-white-coated",
            },
            {
              img: img69,
              title: "100# White Coated",
              desc: "The heaviest available stock, used to create durable, vibrant calendars.",
              gradient: "from-pink-500 to-pink-600",
              bgGradient: "from-pink-50 to-pink-100",
              icon: "📚",
              route: "/calculator/100-white-coated",
            },
          ].map(({ img, title, desc, gradient, bgGradient, icon, route }, index) => (
            <div
              key={title}
              className={`group relative bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200/50 transition-all duration-700 hover:shadow-2xl cursor-pointer flex flex-col hover:-translate-y-3 animate-rotateIn stagger-${index + 1} backdrop-blur-sm`}
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${bgGradient} rounded-full opacity-20 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700`}
              ></div>

              <div className="relative overflow-hidden rounded-t-3xl">
                <img
                  src={img.src}
                  alt={title}
                  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div
                  className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-200`}
                >
                  {icon}
                </div>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 transform -translate-y-24 group-hover:translate-y-0 transition-transform duration-500 delay-300">
                  Premium
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`text-xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent animate-zoomIn stagger-2 group-hover:scale-105 transition-transform duration-300`}
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow animate-fadeInUp stagger-3 group-hover:text-gray-700 transition-colors duration-300">
                  {desc}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100"></div>
              </div>

              <div
                className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
              ></div>
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              ></div>
            </div>
          ))}
        </div>
      </section>

      {/* Cover Finish Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex justify-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-center animate-bounceIn">
            <span className="text-black">Cover </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
              Finish
            </span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-10 max-w-4xl mx-auto">
          {/* Glossy Card */}
          <div className="group relative bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col max-w-sm w-full transition-all duration-700 hover:shadow-2xl cursor-pointer hover:-translate-y-3 animate-fadeInUp">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full opacity-20 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative overflow-hidden rounded-t-3xl">
              <img
                src={img70.src}
                alt="Glossy Finish"
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 transform translate-y-0 transition-transform duration-500">
                Premium
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow relative z-10">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">Glossy</h3>
              <p className="text-gray-600 flex-grow leading-relaxed">
                Stiff cover stock with a glossy coating finish. Glossy covers withstand wear and tear well while emphasizing the cover imagery.
              </p>
            </div>
          </div>

          {/* Matte Card */}
          <div className="group relative bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col max-w-sm w-full transition-all duration-700 hover:shadow-2xl cursor-pointer hover:-translate-y-3 animate-fadeInUp">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-50 to-purple-100 rounded-full opacity-20 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative overflow-hidden rounded-t-3xl">
              <img
                src={img71.src}
                alt="Matte Finish"
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 transform translate-y-0 transition-transform duration-500">
                Premium
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow relative z-10">
              <h3 className="text-2xl font-semibold mb-4 text-purple-600">Matte</h3>
              <p className="text-gray-600 flex-grow leading-relaxed">
                A matte finish gives your cover a more subdued, natural look. Used most often with novels and notebooks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Calculator Section */}
      <section
        className="w-full py-16"
        style={{
          background: "linear-gradient(90deg, #a8d8ff 0%, #ffd6e8 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          {/* Left Image */}
          <div className="flex-1 overflow-hidden rounded-lg shadow-lg">
            <img
              src={img72.src}
              alt="Book Pricing Calculator"
              className="w-full h-auto object-cover transform transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>

          {/* Right Text */}
          <div className="flex-1 text-left">
            <h2 className="text-4xl font-bold text-black leading-tight">
              Book Pricing
            </h2>
            <h3 className="text-3xl font-semibold text-blue-600 mb-4">
              Calculator
            </h3>
            <p className="text-lg text-black mb-6 leading-relaxed">
              Quality book printing at a reasonable price. Check pricing, format
              variations, retail pricing, and shipping for custom books or calendars.
            </p>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition duration-200"
              onClick={() => router.push('/calculator/printbook')}
            >
              Print Your Book
            </button>
          </div>
        </div>
      </section>


      {/* Global Animation Styles */}
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

        .animation-delay-[calc(0.1s*var(--i))] {
          animation-delay: calc(0.1s * var(--i));
        }
      `}</style>
    </>
  );
};

export default Products;
"use client"

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import abt from "@/assets/images/abt.svg";
import image45 from "@/assets/images/image45.png";
import image37 from "@/assets/images/image37.png";
import image38 from "@/assets/images/image38.png";
import bg1 from "@/assets/images/bg1.png";
import bg2 from "@/assets/images/bg2.png";
import bg3 from "@/assets/images/bg3.png";

const About = () => {
  const router = useRouter();

  const observerRef = useRef(null);
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    awards: 0,
  });

  useEffect(() => {
    // Enhanced Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");

            // Trigger counter animation for stats section
            if (entry.target.classList.contains("stats-section")) {
              animateCounters();
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Observe all elements with scroll-animate class
    const animateElements = document.querySelectorAll(".scroll-animate");
    animateElements.forEach((el) => observerRef.current.observe(el));

    // Add CSS animations
    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
      }
      
      @keyframes slideInRight {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0); }
      }
      
      @keyframes slideInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes fadeInScale {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      .animate-in {
        animation-fill-mode: forwards;
      }
      
      .slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
      .slide-in-right { animation: slideInRight 0.8s ease-out forwards; }
      .slide-in-up { animation: slideInUp 0.6s ease-out forwards; }
      .fade-scale { animation: fadeInScale 0.7s ease-out forwards; }
      .float { animation: float 3s ease-in-out infinite; }
      .pulse-hover:hover { animation: pulse 0.6s ease-in-out; }
      
      .stagger-1 { animation-delay: 0.1s; }
      .stagger-2 { animation-delay: 0.2s; }
      .stagger-3 { animation-delay: 0.3s; }
      .stagger-4 { animation-delay: 0.4s; }
      .stagger-5 { animation-delay: 0.5s; }
      
      .hover-lift {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .hover-lift:hover {
        transform: translateY(-8px);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      }
      
      .glass-effect {
        backdrop-filter: blur(16px);
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .gradient-text {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      document.head.removeChild(style);
    };
  }, []);

  const animateCounters = () => {
    const targets = {
      projects: 1500,
      clients: 850,
      experience: 12,
      awards: 25,
    };
    const duration = 2000;

    Object.keys(targets).forEach((key) => {
      let start = 0;
      const increment = targets[key] / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= targets[key]) {
          start = targets[key];
          clearInterval(timer);
        }
        setCounters((prev) => ({ ...prev, [key]: Math.floor(start) }));
      }, 16);
    });
  };

  return (
    <>

      {/* Hero Section - Enhanced */}
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
                Trusted Since 2012
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                About{" "}
                <span className="gradient-text bg-gradient-to-r from-orange-400 to-pink-500">
                  Fast Print Guys
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                We're not just a printing company—we're your creative partners.
                With over a decade of experience, we transform ideas into
                stunning printed materials that make lasting impressions.
              </p>
            </div>

            <div className="scroll-animate slide-in-left stagger-2 flex flex-wrap gap-4">
              <button
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-300 hover-lift pulse-hover"
                onClick={() => router.push("/services")}
              >
                Explore Services
              </button>
              <button
                className="px-8 py-4 glass-effect text-white font-semibold rounded-full hover-lift transition-all duration-300"
                onClick={() => router.push("/portfolio")}
              >
                View Portfolio
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 scroll-animate slide-in-right">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur opacity-30 float"></div>
              <Image
                src={abt}
                alt="About Fast Print Guys"
                className="relative w-full max-w-lg h-auto object-cover rounded-2xl shadow-2xl hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - New */}
      <section className="scroll-animate stats-section py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { key: "projects", label: "Projects Completed", suffix: "+" },
              { key: "clients", label: "Happy Clients", suffix: "+" },
              { key: "experience", label: "Years Experience", suffix: "" },
              { key: "awards", label: "Awards Won", suffix: "+" },
            ].map((stat, index) => (
              <div
                key={stat.key}
                className={`text-center scroll-animate fade-scale stagger-${
                  index + 1
                }`}
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {counters[stat.key]}
                  {stat.suffix}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section - Enhanced */}
      <section className="scroll-animate py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 scroll-animate slide-in-right">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-200 rounded-full opacity-60 float"></div>
              <div
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-200 rounded-full opacity-40 float"
                style={{ animationDelay: "1s" }}
              ></div>
              <Image
                src={image45}
                alt="Our Story"
                className="relative w-full max-w-md h-auto object-cover rounded-2xl shadow-xl hover-lift"
              />
            </div>
          </div>

          <div className="flex-1 scroll-animate slide-in-left">
            <div className="space-y-6">
              <span className="text-orange-500 font-semibold text-lg">
                Our Journey
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                Crafting Excellence in Every Print
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Founded in 2012, Fast Print Guys began as a small local print
                shop with a big vision: to revolutionize the printing industry
                through innovation, quality, and exceptional customer service.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Today, we've grown into a leading printing solutions provider,
                serving thousands of businesses, authors, and individuals
                worldwide. Our state-of-the-art equipment and skilled team
                ensure that every project meets the highest standards of quality
                and precision.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center p-4 bg-white rounded-xl shadow-md hover-lift">
                  <div className="text-2xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-gray-600">Customer Support</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md hover-lift">
                  <div className="text-2xl font-bold text-green-600">99%</div>
                  <div className="text-sm text-gray-600">On-Time Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <div className="w-full min-h-screen flex justify-center items-center px-0 py-10 bg-transparent -mt-12 rounded-t-lg">
        <div
          className="w-full min-h-screen rounded-none backdrop-blur-[200px] bg-gradient-to-br from-blue-100 via-pink-100 to-blue-100 flex flex-col px-8 py-12 relative overflow-hidden"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          id="services-section"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating particles */}
            <div
              className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-pulse"
              style={{ animationDelay: "0s", animationDuration: "3s" }}
            ></div>
            <div
              className="absolute top-32 right-20 w-2 h-2 bg-blue-300/30 rounded-full animate-bounce"
              style={{ animationDelay: "1s", animationDuration: "4s" }}
            ></div>
            <div
              className="absolute top-60 left-32 w-3 h-3 bg-purple-300/25 rounded-full animate-pulse"
              style={{ animationDelay: "2s", animationDuration: "2.5s" }}
            ></div>
            <div
              className="absolute bottom-40 right-40 w-2 h-2 bg-emerald-300/30 rounded-full animate-bounce"
              style={{ animationDelay: "1.5s", animationDuration: "3.5s" }}
            ></div>
            <div
              className="absolute bottom-60 left-20 w-4 h-4 bg-pink-300/25 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s", animationDuration: "4s" }}
            ></div>

            {/* Geometric shapes */}
            <div
              className="absolute top-20 left-10 w-20 h-20 bg-blue-200/20 rounded-full animate-bounce"
              style={{ animationDelay: "1s", animationDuration: "6s" }}
            ></div>
            <div
              className="absolute top-40 right-20 w-12 h-12 bg-purple-200/20 rotate-45 animate-spin"
              style={{ animationDuration: "12s" }}
            ></div>
            <div
              className="absolute bottom-40 left-20 w-16 h-16 bg-emerald-200/20 rounded-lg animate-pulse"
              style={{ animationDelay: "2s", animationDuration: "4s" }}
            ></div>
            <div
              className="absolute top-1/2 right-10 w-8 h-8 bg-orange-200/20 rounded-full animate-ping"
              style={{ animationDelay: "3s", animationDuration: "3s" }}
            ></div>
          </div>

          {/* Top Row - Heading & Button */}
          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between mb-12 pl-12 md:pl-0 relative z-10">
            <div className="relative">
              <h2 className="text-5xl font-extrabold mb-4 text-gray-900 animate-fadeInLeft">
                <span className="inline-block hover:scale-110 transition-transform duration-300">
                  Our
                </span>
                <span className="ml-3 text-blue-600 inline-block hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent animate-pulse">
                  Services
                </span>
              </h2>
              {/* Animated underline */}
              <div
                className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-expandWidth"
                style={{ animation: "expandWidth 2s ease-out 0.5s forwards" }}
              ></div>
              <p
                className="text-gray-700 text-xl max-w-4xl leading-relaxed animate-fadeInLeft"
                style={{ animationDelay: "0.3s" }}
              >
                Whether you're a business owner, marketer, or writer, we provide
                the best printing services tailored to all your needs.
              </p>
            </div>
            <button
              onClick={() => router.push("/portfolio")}
              className="group mt-6 md:mt-0 flex justify-center items-center px-8 py-4 rounded-full text-white font-medium text-base shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-bounceIn relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(90deg, #016AB3 16.41%, #0096CD 60.03%, #00AEDC 87.93%)",
                animationDelay: "0.6s",
              }}
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <svg
                className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              View All
            </button>
          </div>

          {/* Service Cards Grid */}
          <div className="w-full flex justify-center px-6 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-[1440px]">
              {[
                {
                  title: "Book Printing",
                  description:
                    "Personalized book printing for memoirs, novels, cookbooks, workbooks, children's books, and more. Choose from hardcover, paperback, coil bound, or saddle stitch.",
                  icon: (
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  ),
                  gradient: "from-blue-500 to-blue-600",
                  bgGradient: "from-blue-50 to-blue-100",
                  hoverGradient: "from-blue-600 to-blue-700",
                },
                {
                  title: "Book Writing & Formatting",
                  description:
                    "Clear structure, engaging content, and proper formatting for readability with consistent fonts, margins, headers, and spacing.",
                  icon: (
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  ),
                  gradient: "from-emerald-500 to-emerald-600",
                  bgGradient: "from-emerald-50 to-emerald-100",
                  hoverGradient: "from-emerald-600 to-emerald-700",
                },
                {
                  title: "Book Cover Design",
                  description:
                    "Compelling covers with striking images, vibrant colors, and balanced typography that fit your genre perfectly.",
                  icon: (
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                  gradient: "from-purple-500 to-purple-600",
                  bgGradient: "from-purple-50 to-purple-100",
                  hoverGradient: "from-purple-600 to-purple-700",
                },
                {
                  title: "Book Publishing Services",
                  description:
                    "Guidance for both traditional and self-publishing, ensuring your manuscript is polished, formatted, and reader-ready.",
                  icon: (
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  ),
                  gradient: "from-orange-500 to-orange-600",
                  bgGradient: "from-orange-50 to-orange-100",
                  hoverGradient: "from-orange-600 to-orange-700",
                },
              ].map(
                (
                  {
                    title,
                    description,
                    icon,
                    gradient,
                    bgGradient,
                    hoverGradient,
                  },
                  index
                ) => (
                  <div
                    key={title}
                    className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/50 p-8 flex flex-col justify-between text-left transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 hover:rotate-1 animate-slideUp overflow-hidden`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    {/* Animated Background Patterns */}
                    <div
                      className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${bgGradient} rounded-full opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-150 group-hover:opacity-20 transition-all duration-700`}
                    ></div>
                    <div
                      className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr ${bgGradient} rounded-full opacity-10 transform -translate-x-6 translate-y-6 group-hover:scale-125 transition-all duration-700`}
                    ></div>

                    {/* Floating particles on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div
                        className={`absolute top-4 right-4 w-1 h-1 bg-gradient-to-r ${gradient} rounded-full animate-ping`}
                        style={{ animationDelay: "0s" }}
                      ></div>
                      <div
                        className={`absolute top-12 right-8 w-1 h-1 bg-gradient-to-r ${gradient} rounded-full animate-ping`}
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                      <div
                        className={`absolute bottom-8 left-4 w-1 h-1 bg-gradient-to-r ${gradient} rounded-full animate-ping`}
                        style={{ animationDelay: "1s" }}
                      ></div>
                    </div>

                    {/* Icon Container */}
                    <div
                      className={`relative z-10 w-20 h-20 bg-gradient-to-br ${gradient} group-hover:bg-gradient-to-br group-hover:${hoverGradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                    >
                      <div className="group-hover:scale-110 transition-transform duration-300">
                        {icon}
                      </div>
                      {/* Icon glow effect */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`}
                      ></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 group-hover:scale-105 transform origin-left">
                        {title}
                      </h3>
                      <p className="text-gray-600 text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {description}
                      </p>
                    </div>

                    {/* Interactive Elements */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-200/50 transition-all duration-500"></div>
                    <div
                      className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl`}
                    ></div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                    {/* Click ripple effect container */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden">
                      <div className="absolute inset-0 bg-white/20 transform scale-0 group-active:scale-100 transition-transform duration-150 rounded-full"></div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Additional CSS Keyframes would need to be added to your CSS file */}
          <style jsx>{`
            @keyframes expandWidth {
              from {
                width: 0;
              }
              to {
                width: 200px;
              }
            }

            @keyframes fadeInLeft {
              from {
                opacity: 0;
                transform: translateX(-30px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
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

            @keyframes bounceIn {
              from {
                opacity: 0;
                transform: scale(0.8);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }

            .animate-fadeInLeft {
              animation: fadeInLeft 0.8s ease-out forwards;
            }

            .animate-slideUp {
              animation: slideUp 0.8s ease-out forwards;
              opacity: 0;
            }

            .animate-bounceIn {
              animation: bounceIn 0.6s ease-out forwards;
            }

            .animate-expandWidth {
              animation: expandWidth 2s ease-out 0.5s forwards;
            }
          `}</style>
        </div>
      </div>

      {/* Enhanced Testimonials Section */}
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
              {/* Image */}
              <div className="relative w-full sm:w-48 h-56 sm:h-auto group overflow-hidden flex-shrink-0">
                <Image
                  src={image37}
                  alt="Client 1"
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 ease-in-out transform translate-y-full group-hover:translate-Y-0"></div>
              </div>
              {/* Text */}
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
              {/* Image */}
              <div className="relative w-full sm:w-48 h-56 sm:h-auto group overflow-hidden flex-shrink-0">
                <Image
                  src={image38}
                  alt="Client 2"
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 ease-in-out transform translate-y-full group-hover:translate-Y-0"></div>
              </div>
              {/* Text */}
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

      {/* Call to Action - Enhanced */}
      <section className="scroll-animate py-20 bg-gradient-to-r from-pink-200 via-blue-200 to-blue-400">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="scroll-animate slide-in-up">
            <h2 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Ready to Start Your Next Project?
            </h2>
            <p className="text-xl text-black/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Fast Print Guys
              for their printing needs. Let's bring your vision to life with
              premium quality and lightning-fast service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-10 py-4 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 hover-lift pulse-hover text-lg"
                onClick={() => router.push("/calculator/printbook")}
              >
                Get Free Quote
              </button>
              <button className="px-10 py-4 glass-effect text-black font-semibold rounded-full hover-lift transition-all duration-300 text-lg">
                Call +1 469-277-7489
              </button>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default About;

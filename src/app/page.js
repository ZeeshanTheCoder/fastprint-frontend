"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Image imports
import bg1 from "@/assets/images/bg1.png";
import bg2 from "@/assets/images/bg2.png";
import bg3 from "@/assets/images/bg3.png";
import c1 from "@/assets/images/c1.png";
import c2 from "@/assets/images/c2.png";
import c3 from "@/assets/images/c3.png";
import c4 from "@/assets/images/c4.png";
import c5 from "@/assets/images/c5.png";
import c6 from "@/assets/images/c6.png";
import c7 from "@/assets/images/c7.png";
import c8 from "@/assets/images/c8.png";
import image32 from "@/assets/images/image-32.png";
import image33 from "@/assets/images/image-33.png";
import image29 from "@/assets/images/image-29.png";
import image30 from "@/assets/images/image-30.png";
import image31 from "@/assets/images/image-31.png";
import image34 from "@/assets/images/image34.jpg";
import image35 from "@/assets/images/image35.webp";
import image36 from "@/assets/images/image36.webp";
import image37 from "@/assets/images/image37.png";
import image38 from "@/assets/images/image38.png";
import image39 from "@/assets/images/image39.png";
import image40 from "@/assets/images/image40.png";
import image41 from "@/assets/images/image41.png";
import image42 from "@/assets/images/image42.png";
import image43 from "@/assets/images/image43.jpg";
import Image from "next/image";
import Faq from "@/components/Faq";

const Home = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState({});
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleQuoteClick = () => {
    router.push("/calculator/printbook");
  };

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative w-full h-[80vh] overflow-hidden"
        style={{ backgroundColor: "transparent" }}
      >
        <div className="book-bg"></div>
        <div className="overlay"></div>

        <div className="relative z-10 flex flex-col justify-start items-center text-center px-4 h-[60vh] pt-12">
          <h1
            className="animate-textBounce text-glow mb-1"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(3.5rem, 10vw, 6rem)",
              fontWeight: 900,
              background: "linear-gradient(135deg, #f59e0b, #f97316, #ef4444)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Fast Print Guys
          </h1>
          <h2
            className="text-[40px] leading-[48px] font-bold mb-2 animate-fadeInUpDelayed"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.25rem, 4vw, 2.5rem)",
              color: "#FFFFFF",
              lineHeight: "1.2",
            }}
          >
            Premium Printing Services
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Speed & Quality Combined
            </span>
          </h2>
          <p
            className="text-slate-300 text-base max-w-2xl mb-4 animate-fadeInUpDelayed"
            style={{ lineHeight: "1.4" }}
          >
            Experience lightning-fast, professional printing services with
            uncompromising quality. No hidden fees, no delays – just exceptional
            results delivered on time, every time.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-pulseScaleDelayed">
            <button
              onClick={handleQuoteClick}
              className="relative px-6 py-3 text-white rounded-full text-base font-semibold border border-transparent transition-all duration-500 cursor-pointer hover-lift overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #f97316)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                Get Instant Quote
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-center md:text-left wiggle pulse"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                fontFamily: "'Inter', sans-serif",
                color: "#fbbf24",
                fontWeight: 600,
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              10% Off First Order - Start Today!
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="w-full min-h-screen flex justify-center items-center px-0 py-10 bg-transparent -mt-12 rounded-t-lg">
        <div
          className="w-full min-h-screen rounded-none backdrop-blur-[200px] bg-gradient-to-br from-blue-100 via-pink-100 to-blue-100 flex flex-col sm:px-8 py-12 relative overflow-hidden"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          id="services-section"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between mb-12 pl-12 md:pl-0 px-8 relative z-10">
            <div className="relative">
              <h2 className="font-extrabold mb-4 text-gray-900 animate-fadeInLeft text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight sm:leading-snug md:leading-tight lg:leading-snug">
                <span className="inline-block hover:scale-110 transition-transform duration-300">
                  Our
                </span>
                <span className="hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent animate-pulse block sm:inline-block mt-0 sm:mt-0">
                  Services
                </span>
              </h2>
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
              onClick={() => router.push("/services")}
              className="group mt-6 md:mt-0 flex justify-center items-center px-8 py-4 rounded-full text-white font-medium text-base shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-bounceIn relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(90deg, #016AB3 16.41%, #0096CD 60.03%, #00AEDC 87.93%)",
                animationDelay: "0.6s",
              }}
            >
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
                    <div
                      className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${bgGradient} rounded-full opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-150 group-hover:opacity-20 transition-all duration-700`}
                    ></div>
                    <div
                      className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr ${bgGradient} rounded-full opacity-10 transform -translate-x-6 translate-y-6 group-hover:scale-125 transition-all duration-700`}
                    ></div>
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
                    <div
                      className={`relative z-10 w-20 h-20 bg-gradient-to-br ${gradient} group-hover:bg-gradient-to-br group-hover:${hoverGradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                    >
                      <div className="group-hover:scale-110 transition-transform duration-300">
                        {icon}
                      </div>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`}
                      ></div>
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 group-hover:scale-105 transform origin-left">
                        {title}
                      </h3>
                      <p className="text-gray-600 text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {description}
                      </p>
                    </div>
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-200/50 transition-all duration-500"></div>
                    <div
                      className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl`}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                    <div className="absolute inset-0 rounded-3xl overflow-hidden">
                      <div className="absolute inset-0 bg-white/20 transform scale-0 group-active:scale-100 transition-transform duration-150 rounded-full"></div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Book Printing Section */}
      <section className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 -mt-6 py-16">
        <div className="max-w-[1400px] mx-auto rounded-3xl overflow-hidden p-6 space-y-12">
          <div
            className="group relative w-full flex flex-col md:flex-row items-center text-white p-8 md:p-12 rounded-3xl min-h-[240px] animate-slideInScale hover-lift overflow-hidden shadow-2xl"
            style={{
              background:
                "linear-gradient(195.35deg, #F8C20A 19.33%, #EE831E 81.45%)",
            }}
            data-animate
            id="book-printing-section"
          >
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/20 rounded-full translate-x-1/3 translate-y-1/3 group-hover:scale-125 transition-transform duration-1000"></div>
            <div className="absolute top-10 left-20 w-3 h-3 bg-white/30 rounded-full animate-bounce"></div>
            <div className="absolute top-32 right-24 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
            <div
              className="absolute bottom-16 left-32 w-4 h-4 bg-white/20 rounded-full animate-bounce"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="relative z-10 md:w-1/2 flex flex-col justify-center md:pr-8">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeInLeft leading-tight">
                Book Printing and
                <span className="block text-white/90">Publishing</span>
              </h2>
              <p className="text-lg md:text-xl leading-relaxed mb-8 animate-fadeInLeft stagger-2 text-white/95">
                Our book printing services provide high-quality prints for
                authors, publishers, and businesses. We offer customizable
                options for paper, binding, and finishes, ensuring your book is
                professionally produced and ready for distribution.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                  Custom Binding
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                  Quality Paper
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                  Fast Delivery
                </span>
              </div>
            </div>
            <div className="relative z-10 md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-2xl">
                  <Image
                    src={bg1}
                    alt="Book Printing"
                    className="w-full max-w-[480px] rounded-xl shadow-lg object-contain animate-fadeInRight hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-white text-orange-600 px-4 py-2 rounded-xl font-bold shadow-lg">
                  99% Quality
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white text-orange-600 px-4 py-2 rounded-xl font-bold shadow-lg">
                  24h Delivery
                </div>
              </div>
            </div>
          </div>

          <div
            className="group relative w-full flex flex-col md:flex-row-reverse items-center text-white p-8 md:p-12 rounded-3xl min-h-[240px] animate-slideInScale stagger-2 hover-lift overflow-hidden shadow-2xl"
            style={{
              background:
                "linear-gradient(90deg, #016AB3 16.41%, #0096CD 60.03%, #00AEDC 87.93%)",
            }}
            data-animate
            id="print-solutions-section"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-800/30 rounded-full -translate-x-1/3 translate-y-1/3 group-hover:scale-125 transition-transform duration-1000"></div>
            <div className="absolute top-20 right-32 w-8 h-8 border-2 border-white/30 rotate-45 animate-spin-slow"></div>
            <div className="absolute bottom-24 left-24 w-6 h-6 bg-white/20 rotate-12 animate-pulse"></div>
            <div className="relative z-10 md:w-1/2 flex flex-col justify-center md:pl-8">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeInRight leading-tight">
                Premium Print
                <span className="block text-white/90">Solutions</span>
              </h2>
              <p className="text-lg md:text-xl leading-relaxed mb-8 animate-fadeInRight stagger-2 text-white/95">
                Discover top-quality printing services tailored to your needs.
                From business essentials to custom creations, we deliver sharp,
                vibrant prints with fast turnaround times and competitive
                prices. Our commitment to excellence ensures every project makes
                a lasting impression.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-white/80">Projects</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <div className="text-2xl font-bold">24h</div>
                  <div className="text-sm text-white/80">Turnaround</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <div className="text-2xl font-bold">99%</div>
                  <div className="text-sm text-white/80">Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="relative z-10 md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-2xl">
                  <Image
                    src={bg2}
                    alt="Print Shop"
                    className="w-full max-w-[480px] rounded-xl shadow-lg object-contain animate-fadeInLeft hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                  <div className="text-white font-bold text-sm">
                    <svg
                      className="w-12 h-12 animate-spin-slow"
                      viewBox="0 0 50 50"
                    >
                      <circle
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="31.416"
                        strokeDashoffset="15.708"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="group relative w-full flex flex-col md:flex-row items-center text-white p-4 md:p-6 rounded-3xl min-h-[120px] animate-slideInScale stagger-3 hover-lift overflow-hidden shadow-2xl"
            style={{
              background:
                "linear-gradient(90deg, #D15D9E 38.04%, #5D4495 121.51%)",
            }}
            data-animate
            id="guides-section"
          >
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-900/20 rounded-full translate-x-1/2 translate-y-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
            <div className="absolute top-16 right-20 text-white/20 animate-bounce">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="absolute bottom-20 right-32 text-white/20 animate-pulse">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="relative z-10 md:w-2/5 flex flex-col justify-center md:pr-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fadeInLeft leading-tight">
                Guides &<span className="block text-white/90">Templates</span>
              </h2>
              <p className="text-md md:text-lg leading-relaxed mb-6 animate-fadeInLeft stagger-2 text-white/95">
                Explore our collection of helpful guides and templates to
                simplify your book creation process. From manuscript formatting
                to cover design, our resources provide step-by-step instructions
                to ensure your project is a success.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-white/90 text-sm">
                    Manuscript Formatting Guide
                  </span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-white/90 text-sm">
                    Cover Design Templates
                  </span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-white/90 text-sm">
                    Publishing Checklists
                  </span>
                </div>
              </div>
            </div>
            <div className="relative z-10 md:w-3/5 flex justify-center">
              <div className="relative">
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20 shadow-2xl">
                  <Image
                    src={bg3}
                    alt="Guides and Templates"
                    className="w-full max-w-[600px] rounded-xl shadow-lg object-contain animate-fadeInRight hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2 rounded-xl font-bold shadow-lg">
                  <div className="text-xl font-bold">50+</div>
                  <div className="text-xs">Resources</div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white text-purple-600 px-3 py-1.5 rounded-xl font-bold shadow-lg flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                  <span>Free</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <div
        className="w-full bg-gradient-to-br from-gray-50 via-white to-blue-50/30 px-8 py-20 relative overflow-hidden"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100/40 rounded-full translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-orange-100/30 rounded-full animate-pulse"></div>
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce"></div>
        <div
          className="absolute top-40 right-32 w-3 h-3 bg-purple-400/60 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/3 w-2 h-2 bg-orange-400/60 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>

        <div
          className="max-w-[1440px] mx-auto mb-16 flex flex-col md:flex-row md:items-center md:justify-between relative z-10"
          data-animate
          id="products-header"
        >
          <div className="relative">
            <div className="absolute -top-4 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-left mb-6 animate-bounceIn leading-tight">
              <span className="text-gray-900">Our </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                Products
              </span>
            </h2>
            <p className="text-gray-700 text-xl max-w-3xl animate-fadeInUp stagger-2 leading-relaxed">
              Offers custom book printing services with over
              <span className="font-bold text-blue-600"> 3,000 possible </span>
              sizes, paper types, and binding option combinations.
            </p>
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
          <button
            onClick={() => router.push("/products")}
            className="mt-8 md:mt-0 group relative flex justify-center items-center px-8 py-4 rounded-2xl text-white font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-105 animate-bounceIn stagger-3 shadow-lg hover:shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, #016AB3 0%, #0096CD 50%, #00AEDC 100%)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">View All Products</span>
            <svg
              className="relative z-10 w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
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
            <div className="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          </button>
        </div>

        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {[
            {
              title: "Print Book",
              description:
                "Personalized book printing for memoirs, novels, cookbooks, workbooks, children's books, and much more is our specialty.",
              img: c1,
              gradient: "from-blue-500 to-blue-600",
              bgGradient: "from-blue-50 to-blue-100",
              icon: "📚",
            },
            {
              title: "YearBook",
              description:
                "A children's book captivates young readers with imaginative stories and vibrant illustrations. It aims to entertain while imparting...",
              img: c2,
              gradient: "from-emerald-500 to-emerald-600",
              bgGradient: "from-emerald-50 to-emerald-100",
              icon: "🎓",
            },
            {
              title: "Photo Book",
              description:
                "A photo book beautifully captures cherished memories through carefully curated images, allowing you to tell your story..",
              img: c3,
              gradient: "from-purple-500 to-purple-600",
              bgGradient: "from-purple-50 to-purple-100",
              icon: "📷",
            },
            {
              title: "E-book",
              description:
                "An e-book offers a convenient and accessible way to read, allowing users to enjoy literature on various devices anytime, anywhere.",
              img: c4,
              gradient: "from-orange-500 to-orange-600",
              bgGradient: "from-orange-50 to-orange-100",
              icon: "📱",
            },
            {
              title: "Business Card",
              description:
                "A business card is a professional tool that presents your contact information and brand identity succinctly. It serves as a memorable",
              img: c5,
              gradient: "from-red-500 to-red-600",
              bgGradient: "from-red-50 to-red-100",
              icon: "💼",
            },
            {
              title: "Flyer",
              description:
                "A flyer is a cost-effective marketing tool designed to grab attention and convey essential information quickly. Ideal for promoting events..",
              img: c6,
              gradient: "from-teal-500 to-teal-600",
              bgGradient: "from-teal-50 to-teal-100",
              icon: "📄",
            },
            {
              title: "Brochures",
              description:
                "Brochures are informative printed materials that present detailed information about a company, product, or service in a visually..",
              img: c7,
              gradient: "from-pink-500 to-pink-600",
              bgGradient: "from-pink-50 to-pink-100",
              icon: "📋",
            },
            {
              title: "EDDM & DDM Marketing",
              description:
                "EDDM and DDM marketing are strategies that allow businesses to reach targeted audiences through physical mail.",
              img: c8,
              gradient: "from-indigo-500 to-indigo-600",
              bgGradient: "from-indigo-50 to-indigo-100",
              icon: "📮",
            },
          ].map(
            (
              { title, description, img, gradient, bgGradient, icon },
              index
            ) => (
              <div
                key={title}
                className={`group relative bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200/50 transition-all duration-700 hover:shadow-2xl cursor-pointer flex flex-col hover:-translate-y-3 animate-rotateIn stagger-${
                  index + 1
                } backdrop-blur-sm`}
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${bgGradient} rounded-full opacity-20 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700`}
                ></div>
                <div className="relative overflow-hidden rounded-t-3xl">
                  <Image
                    src={img}
                    alt={title}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div
                    className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-200`}
                  >
                    {icon}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 transform translate-y-[-100px] group-hover:translate-y-0 transition-transform duration-500 delay-300">
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow animate-fadeInUp stagger-3 group-hover:text-gray-700 transition-colors duration-300">
                    {description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => router.push("/products")}
                      className={`w-full py-3 bg-gradient-to-r ${gradient} text-white font-medium rounded-xl opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-300 hover:scale-105`}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
                <div
                  className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                ></div>
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>
              </div>
            )
          )}
        </div>

        <div className="max-w-[1440px] mx-auto mt-16 text-center relative z-10">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 rounded-3xl"></div>
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                Get personalized recommendations and instant quotes for your
                printing needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push("/calculator/printbook")}
                  className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Get Quote Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="w-full py-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full filter blur-3xl opacity-10"
            style={{ background: "linear-gradient(45deg, #ff6b6b, #ffa726)" }}
          ></div>
          <div
            className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full filter blur-3xl opacity-10"
            style={{ background: "linear-gradient(45deg, #4ecdc4, #44a08d)" }}
          ></div>
          <div
            className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full filter blur-2xl opacity-8"
            style={{
              background: "linear-gradient(45deg, #a8edea, #fed6e3)",
              animation: "float 8s ease-in-out infinite",
            }}
          ></div>
          <div
            className="absolute bottom-1/3 left-1/4 w-24 h-24 rotate-45 filter blur-xl opacity-10"
            style={{
              background: "linear-gradient(45deg, #d299c2, #fef9d7)",
              animation: "float 6s ease-in-out infinite reverse",
            }}
          ></div>
          <div
            className="absolute top-16 left-16 w-16 h-16 border-2 border-gray-200 opacity-20"
            style={{ animation: "rotate 25s linear infinite" }}
          ></div>
          <div
            className="absolute bottom-20 right-20 w-12 h-12 bg-gray-100 transform rotate-45 opacity-30"
            style={{ animation: "float 10s ease-in-out infinite" }}
          ></div>

          <div
            className="flex flex-col md:flex-row md:items-center md:justify-between mb-16 relative z-10"
            data-animate
            id="portfolio-header"
          >
            <div className="text-center md:text-left">
              <div className="inline-block mb-4">
                <span
                  className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg"
                  style={{ animation: "pulse 2s ease-in-out infinite" }}
                >
                  ✨ Premium Portfolio Collection
                </span>
              </div>
              <h2
                className="text-3xl md:text-5xl font-black mb-4 leading-tight"
                style={{
                  fontFamily: "Inter, -apple-system, sans-serif",
                  animation: "slideInScale 1s ease-out",
                }}
              >
                <span className="text-gray-800">Our </span>
                <span>Portfolio</span>
              </h2>
              <p
                className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto md:mx-0 leading-relaxed font-light"
                style={{ animation: "fadeInUp 1s ease-out 0.3s both" }}
              >
                Discover our exceptional book printing services where creativity
                meets premium quality. Each project represents our commitment to
                transforming visions into stunning reality.
              </p>
            </div>
            <button
              onClick={() => router.push("/portfolio")}
              className="mt-6 md:mt-0 relative group overflow-hidden px-8 py-3 text-white font-bold text-lg rounded-full transition-all duration-500 hover:scale-110 hover:rotate-1"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 8px 24px rgba(102, 126, 234, 0.35)",
                animation: "bounceIn 1s ease-out 0.6s both",
              }}
            >
              <span className="relative z-10 flex items-center justify-center">
                Explore All Works
                <svg
                  className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10 relative z-10">
            {[image29, image30, image31].map((img, i) => (
              <div
                key={i}
                className={`group relative rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-lg transition-all duration-700 hover:scale-105 hover:-translate-y-6 hover:shadow-2xl`}
                style={{
                  animation: `slideUp 0.8s ease-out ${(i + 1) * 0.2}s both`,
                }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={img}
                    alt={`Portfolio ${i + 1}`}
                    className="w-full h-64 object-cover transform transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                    style={{ filter: "brightness(0.9) contrast(1.1)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-6">
                    <div className="flex justify-end">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 transform translate-y-[-15px] group-hover:translate-y-0 transition-all duration-500">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-white text-xl font-bold mb-1">
                            Premium Project {i + 1}
                          </h3>
                          <p className="text-white/80 text-xs">
                            Professional book printing with exceptional quality
                            and modern design approach.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                          Print Design
                        </span>
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                          2024
                        </span>
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                          Premium
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-gray-800 font-semibold text-md">
                        Creative Excellence
                      </h4>
                      <p className="text-gray-600 text-xs">
                        Quality craftsmanship
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
            {[image32, image33].map((img, i) => (
              <div
                key={i}
                className={`group relative rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-lg transition-all duration-700 hover:scale-102 hover:-translate-y-4 hover:shadow-2xl`}
                style={{
                  animation: `slideUp 0.8s ease-out ${(i + 4) * 0.2}s both`,
                }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={img}
                    alt={`Portfolio ${i + 4}`}
                    className="w-full h-72 object-cover transform transition-all duration-700 group-hover:scale-110"
                    style={{ filter: "brightness(0.9) contrast(1.1)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-10">
                    <div className="flex justify-start">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold transform -translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        ⭐ Featured Work
                      </div>
                    </div>
                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                      <div className="flex items-start mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mr-6">
                          <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-white text-2xl font-bold mb-3">
                            Signature Project {i + 4}
                          </h3>
                          <p className="text-white/90 text-base leading-relaxed">
                            Comprehensive printing solution with premium
                            finishes, innovative design techniques, and
                            meticulous attention to detail that showcases our
                            commitment to excellence.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
                          Signature
                        </span>
                        <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
                          Premium Quality
                        </span>
                        <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
                          2024
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-gray-800 font-bold text-xl">
                          Masterpiece Collection
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Award-winning design & quality
                        </p>
                      </div>
                    </div>
                    <button
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                      onClick={() => router.push("/calculator/printbook")}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blogs Section */}
      <div className="relative w-full py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
          <div className="absolute top-32 left-20 w-3 h-3 bg-blue-500/30 rotate-45 animate-bounce"></div>
          <div className="absolute top-40 right-32 w-2 h-2 bg-purple-500/40 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-cyan-500/30 rotate-12 animate-bounce delay-300"></div>
        </div>
        <div className="relative max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
              <h2 className="relative text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">
                  Our Latest
                </span>
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent ml-3 relative">
                  Blogs
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-30"></div>
                </span>
              </h2>
              <p className="text-slate-600 max-w-2xl leading-relaxed text-lg opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
                Explore our latest blogs for insightful articles and engaging
                content on various topics.
                <br />
                <span className="text-blue-600 font-medium">
                  Stay updated with trends, tips, and expert advice
                </span>{" "}
                that can inspire and inform your journey!
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Benefits of Book Writing Services",
                desc: "Inner Blogs Advantages of Book Writing Services Many who aspire to writing their book find it an unachievable goal in…",
                img: image34,
                category: "Writing",
                date: "June 16, 2025",
                read: "5 min read",
                color: "blue",
              },
              {
                title: "Benefits of Book Publishing Services",
                desc: "Inner Blogs The Advantages of Book Publishing Services: Why Authors Need Professional Assistance Publishing a book can be an arduous…",
                img: image35,
                category: "Publishing",
                date: "June 16, 2025",
                read: "7 min read",
                color: "purple",
              },
              {
                title: "Benefits of EDDM and DMM Services",
                desc: "Inner Blogs In today's digital era, many businesses have transitioned their marketing activities online. Our guide to EDDM and DMM…",
                img: image36,
                category: "Marketing",
                date: "June 13, 2025",
                read: "6 min read",
                color: "cyan",
              },
            ].map((blog, i) => (
              <div
                key={i}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 card-hover opacity-0 animate-[slideUp_0.8s_ease-out_0.8s_forwards] border border-white/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-${blog.color}-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative overflow-hidden">
                  <Image
                    src={blog.img}
                    alt={blog.title}
                    className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span
                    className={`absolute top-4 left-4 bg-${blog.color}-500/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium`}
                  >
                    {blog.category}
                  </span>
                  <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-slate-700 text-sm px-3 py-1 rounded-full shadow-lg">
                    {blog.date}
                  </span>
                </div>
                <div className="relative p-6 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-3 text-xs text-slate-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {blog.read}
                  </div>
                  <h3
                    className={`text-slate-800 text-xl font-bold mb-3 group-hover:text-${blog.color}-600 transition-colors duration-300 leading-tight`}
                  >
                    {blog.title}
                  </h3>
                  <p className="text-slate-600 flex-grow mb-4 leading-relaxed">
                    {blog.desc}
                  </p>
                  <button
                    className={`group/btn relative self-start px-6 py-3 bg-gradient-to-r from-${
                      blog.color
                    }-600 to-${
                      blog.color === "cyan"
                        ? "blue"
                        : blog.color === "purple"
                        ? "pink"
                        : "cyan"
                    }-500 text-white font-medium text-sm rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-${
                        blog.color
                      }-700 to-${
                        blog.color === "cyan"
                          ? "blue"
                          : blog.color === "purple"
                          ? "pink"
                          : "cyan"
                      }-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300`}
                    ></div>
                    <span className="relative flex items-center gap-2">
                      Read More
                      <svg
                        className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-6 leading-tight animate-bounceIn">
            <span className="text-gray-900">What Our </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
              Client Says
            </span>
          </h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12 px-2 sm:px-0 animate-fadeInUp stagger-2">
            Not only should you rely on our word-of-mouth recommendations; here
            are comments from customers on our printing capabilities:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
            {[
              {
                name: "Michael T.",
                role: "Author",
                img: image37,
                text: "Having self-published, I have used several printers. The best mix of speed, cost, and quality among Fast Print Guys is found here. My books look great!",
              },
              {
                name: "Sarah",
                role: "Director of Marketing",
                img: image38,
                text: "Fast Print Guys rescued my event! In six hours, I needed 500 flyers, and they produced PERFECT printing on schedule. Unbelievably excellent service!",
              },
            ].map((client, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row bg-gray-50 rounded-xl shadow-md overflow-hidden transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 animate-slideUp stagger-${i + 1} card-hover"
              >
                <div className="relative w-full sm:w-48 h-56 sm:h-auto group overflow-hidden flex-shrink-0">
                  <Image
                    src={client.img}
                    alt={client.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 ease-in-out transform translate-y-full group-hover:translate-y-0"></div>
                </div>
                <div className="flex flex-col justify-center p-6 flex-grow">
                  <p className="text-gray-700 mb-4 animate-fadeInLeft stagger-2">
                    {client.text}
                  </p>
                  <p className="font-semibold animate-zoomIn stagger-3">
                    {client.name}
                  </p>
                  <p className="text-sm text-gray-500 animate-fadeInUp stagger-4">
                    {client.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners */}
      <section className="w-full py-32 bg-white">
        <div
          className="max-w-[1600px] mx-auto px-12"
          data-animate
          id="partners-section"
        >
          <h2 className="text-center text-5xl md:text-6xl font-extrabold mb-12 animate-bounceIn">
            <span className="text-black">Our </span>
            <span className="text-blue-600">Partner</span>
          </h2>
          <div className="overflow-hidden relative">
            <div className="flex animate-scroll will-change-transform space-x-24 hover:animation-play-state-paused">
              {[
                image43,
                image39,
                image40,
                image41,
                image43,
                image42,
                image39,
                image40,
                image41,
                image42,
                image43,
              ].map((logo, idx) => (
                <Image
                  key={idx}
                  src={logo}
                  alt={`Brand ${idx + 1}`}
                  className="h-32 w-auto object-contain hover:scale-110 transition-transform duration-300 wiggle"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <Faq />
    </>
  );
};

export default Home;

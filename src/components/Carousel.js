"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";

import ComicBook from "@/assets/images/comic.png";
import ThesisBook from "@/assets/images/thesis.png";
import YearBook from "@/assets/images/yearbook.png";
import Calendar from "@/assets/images/calender.png";
import Magazine from "@/assets/images/magzene.png";
import PrintBook from "@/assets/images/pnew.png";
import PhotoBook from "@/assets/images/myphoto.png";
import Image from "next/image";

const carouselData = [
  {
    name: "Print Book",
    image: PrintBook,
    link: "/calculator/printbook",
    description: "Professional book printing",
  },
  {
    name: "Comic Book",
    image: ComicBook,
    link: "/calculator/comicbook",
    description: "Vibrant comic printing",
  },
  {
    name: "Thesis Binding",
    image: ThesisBook,
    link: "/calculator/thesis-binding",
    description: "Academic binding service",
  },
  {
    name: "Year Book",
    image: YearBook,
    link: "/calculator/yearbook",
    description: "Memory book creation",
  },
  {
    name: "Calendar",
    image: Calendar,
    link: "/calculator/calendar",
    description: "Custom calendar design",
  },
  {
    name: "Magazine",
    image: Magazine,
    link: "/calculator/magazine",
    description: "Premium magazine printing",
  },
  {
    name: "Photo Book",
    image: PhotoBook,
    link: "/calculator/photobook",
    description: "Personalized photo albums",
  },
];

const Carousel = () => {
  const scrollRef = useRef(null);
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Tripled data for continuous scroll illusion
  const infiniteData = [
    ...carouselData,
    ...carouselData,
    ...carouselData,
    ...carouselData,
    ...carouselData,
    ...carouselData,
    ...carouselData,
  ];

  // Get card width with gap for scrolling (reduced sizes)
  const getCardWidth = () => {
    if (typeof window === "undefined") return 270; // Default for SSR
    const screenWidth = window.innerWidth;
    if (screenWidth < 640) return 200;
    if (screenWidth < 1024) return 240;
    return 270;
  };

  // On mount, scroll to middle set of cards for smooth start
  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = getCardWidth() + 24;
      scrollRef.current.scrollLeft = cardWidth * carouselData.length;
    }
  }, []);

  // Scroll with smooth behavior on button clicks
  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const cardWidth = getCardWidth() + 24;
    const scrollAmount =
      typeof window !== "undefined" && window.innerWidth < 640
        ? cardWidth
        : cardWidth * 2;

    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Handle card click navigation with slight delay for selected effect
  const handleCardClick = (item, originalIndex) => {
    if (item.link) {
      setSelectedIndex(originalIndex);
      setTimeout(() => {
        router.push(item.link);
      }, 200);
    }
  };

  return (
    <section className="relative py-12 px-4 w-full max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent mb-4">
          Our Services
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Choose from our comprehensive range of professional printing and
          binding services
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth py-4 px-12"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {infiniteData.map((item, idx) => {
            const originalIndex = idx % carouselData.length;
            const isHovered = hoveredIndex === originalIndex;
            const isSelected = selectedIndex === originalIndex;

            return (
              <div
                key={idx}
                onClick={() => handleCardClick(item, originalIndex)}
                onMouseEnter={() => setHoveredIndex(originalIndex)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  group min-w-[200px] sm:min-w-[240px] lg:min-w-[270px] 
                  max-w-[200px] sm:max-w-[240px] lg:max-w-[270px]
                  h-[200px] sm:h-[240px] lg:h-[270px]
                  flex flex-col relative overflow-hidden
                  bg-white rounded-2xl shadow-lg
                  transition-all duration-500 ease-out
                  ${item.link ? "cursor-pointer" : "cursor-default"}
                  ${isHovered ? "transform -translate-y-2 shadow-2xl" : ""}
                  ${isSelected ? "ring-4 ring-blue-500 ring-opacity-60" : ""}
                  hover:shadow-2xl border border-gray-100
                `}
              >
                {/* Image Container */}
                <div className="relative h-2/5 p-4 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className={`
                      w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain
                      transition-all duration-500 ease-out
                      ${isHovered ? "transform scale-110" : ""}
                      filter drop-shadow-lg
                    `}
                  />

                  {/* Hover Overlay */}
                  {item.link && (
                    <div
                      className={`
                        absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent
                        transition-opacity duration-300
                        ${isHovered ? "opacity-100" : "opacity-0"}
                      `}
                    >
                      <div className="absolute bottom-4 right-4">
                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-45">
                          <FiArrowRight className="text-blue-600 text-lg" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Container */}
                <div className="h-3/5 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-1 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Action Indicator */}
                  {item.link && (
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                        Calculate Now
                      </span>
                      <div
                        className={`transform transition-transform duration-300 ${
                          isHovered ? "translate-x-1" : ""
                        }`}
                      >
                        <FiArrowRight className="text-blue-600 text-xs" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Animated Background Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows - reduced size and outside card area */}
        <div
          className="flex w-full justify-between items-center absolute top-1/2 left-0 z-30 pointer-events-none"
          style={{ transform: "translateY(-50%)" }}
        >
          <div className="pointer-events-auto">
            <button
              onClick={() => scroll("left")}
              className={`
                w-7 h-7 sm:w-8 sm:h-8
                bg-white shadow-2xl rounded-full
                flex items-center justify-center
                transition-all duration-300 hover:scale-110
                border border-gray-200
                group
              `}
              style={{ marginLeft: "24px" }}
            >
              <FiChevronLeft className="text-gray-700 text-base sm:text-lg group-hover:text-blue-600 transition-colors duration-300" />
            </button>
          </div>
          <div className="pointer-events-auto">
            <button
              onClick={() => scroll("right")}
              className={`
                w-7 h-7 sm:w-8 sm:h-8
                bg-white shadow-2xl rounded-full
                flex items-center justify-center
                transition-all duration-300 hover:scale-110
                border border-gray-200
                group
              `}
              style={{ marginRight: "24px" }}
            >
              <FiChevronRight className="text-gray-700 text-base sm:text-lg group-hover:text-blue-600 transition-colors duration-300" />
            </button>
          </div>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 h-full w-8 lg:w-16 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 h-full w-8 lg:w-16 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Bottom Decorative Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {carouselData.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              selectedIndex === index ? "bg-blue-500 w-8" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>

      {/* CSS to hide scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Carousel;

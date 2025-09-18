"use client";
// app/start-project/page.jsx
import { useRouter, useSearchParams } from "next/navigation"; // Next.js v13+ hook for programmatic navigation
import { useState, useEffect } from "react";

// Images
import Image1 from "@/assets/images/startproject1.png";
import Image2 from "@/assets/images/startproject2.png";
import Image3 from "@/assets/images/startproject3.png";
import Image4 from "@/assets/images/startproject4.png";
import Image5 from "@/assets/images/startproject5.png";
import Image6 from "@/assets/images/startproject6.png";
import Image7 from "@/assets/images/startproject7.png";
import Image from "next/image";

// ✅ Product Cards
const productCards = [
  {
    id: 1,
    image: Image1,
    title: "Print Book",
    description:
      "Hardcover or paperback book using a wide range of paper, color, and binding options.",
    calculator: "PrintBookCalculator",
  },
  {
    id: 2,
    image: Image2,
    title: "Photo Book",
    description:
      "The most common print-on-demand book, perfect for a variety of projects.",
    calculator: "PhotoBookCalculator",
  },
  {
    id: 3,
    image: Image3,
    title: "Comic Book",
    description: "Perfect for comic lover who want to print in vibrant color.",
    calculator: "ComicBookCalculator",
  },
  {
    id: 4,
    image: Image4,
    title: "Magazine",
    description: "Publish magazines using modern and attractive layouts.",
    calculator: "MagazineCalculator",
  },
  {
    id: 5,
    image: Image5,
    title: "Year Book",
    description: "Create journals for personal reflection or business records.",
    calculator: "YearBookCalculator",
  },
  {
    id: 6,
    image: Image6,
    title: "Calendar",
    description: "Organize your daily, weekly, or monthly schedule.",
    calculator: "CalendarCalculator",
  },
  {
    id: 7,
    image: Image7,
    title: "e Book",
    description: "Showcase your work in a professional digital format.",
    calculator: "EBookCalculator",
  },
];

const StartProjectContent = () => {
  const router = useRouter(); // Use Next.js router
  const searchParams = useSearchParams();
  const [text, setText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const isEdit = searchParams.get("edit") === "true";

  useEffect(() => {
    const storedProjectData = localStorage.getItem("projectData");
    if (storedProjectData) {
      const projectData = JSON.parse(storedProjectData);
      if (projectData.projectId) {
        setSelectedId(projectData.projectId);
      }
      if (projectData.projectTitle) {
        setText(projectData.projectTitle);
      }
      if (projectData.language) {
        setSelectedLanguage(projectData.language);
      }
      if (projectData.category) {
        setSelectedCategory(projectData.category);
      }
      if (projectData.genre) {
        setSelectedGenre(projectData.genre);
      }
    }
  }, []);

  useEffect(() => {
    console.log("Selected Language:", selectedLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    console.log("Selected Category:", selectedCategory);
  }, [selectedCategory]);

  const handleButtonClick = () => {
    if (!text.trim()) {
      alert("Please enter project details.");
      return;
    }
    if (!selectedCategory) {
      alert("Please select a book category.");
      return;
    }

    const projectData = {
      projectId: selectedId,
      projectTitle: text,
      genre: selectedGenre,
      language: selectedLanguage,
      category: selectedCategory,
    };

    localStorage.setItem("projectData", JSON.stringify(projectData));
    const targetUrl = isEdit ? "/design-project?edit=true" : "/design-project";

    router.push(targetUrl);
  };

  return (
    <>
      {/* Navigation Tabs - Enhanced Responsive */}
      <div
        className="w-full h-auto min-h-[51px] flex items-center justify-center gap-2 sm:gap-4 md:gap-8 px-2 sm:px-4 py-2"
        style={{
          background:
            "linear-gradient(90deg, #016AB3 16.41%, #0096CD 60.03%, #00AEDC 87.93%)",
        }}
      >
        <span
          className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold cursor-pointer pb-1 px-2 py-1 border-b-2 sm:border-b-4 border-transparent hover:border-yellow-400 transition-all text-center whitespace-nowrap"
          onClick={() => router.push("/start-project")}
        >
          Start Project
        </span>
        <span
          className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold cursor-pointer pb-1 px-2 py-1 border-b-2 sm:border-b-4 border-transparent hover:border-yellow-400 transition-all text-center whitespace-nowrap"
          onClick={() => router.push("/design-project")}
        >
          Designs
        </span>
        <span
          className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold cursor-pointer pb-1 px-2 py-1 border-b-2 sm:border-b-4 border-transparent hover:border-yellow-400 transition-all text-center whitespace-nowrap"
          onClick={() => router.push("/book-preview")}
        >
          Book Preview
        </span>
      </div>

      <div
        className="w-full min-h-screen px-2 sm:px-4 lg:px-8"
        style={{
          background: "linear-gradient(135deg, #eef4ff, #fez6fb)",
          paddingTop: "10px",
          paddingBottom: "20px",
        }}
      >
        <div className="w-full sm:px-24 sm:py-10 flex justify-center items-start">
          <div
            className="rounded-xl sm:rounded-2xl shadow-lg pt-4 sm:pt-6 lg:pt-8 pb-6 sm:pb-8 lg:pb-10 px-2 sm:px-4 lg:px-8 flex flex-col gap-4 sm:gap-6 w-full max-w-7xl mx-auto"
            style={{
              background:
                "linear-gradient(to right, #ffe4ec, #fdfdfd, #e0f3ff)",
            }}
          >
            {/* Title Bar - Enhanced Responsive */}
            <div className="relative flex justify-center items-center px-2">
              <div
                className="absolute left-0 right-0 h-[2px] sm:h-[3px] lg:h-[4px]"
                style={{
                  background:
                    "linear-gradient(90deg, #D15D9E 38.04%, #5D4495 121.51%)",
                }}
              />
              <div
                className="h-[35px] sm:h-[42px] lg:h-[47px] w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[440px] mx-2 sm:mx-4 flex items-center justify-center text-white font-medium text-xs sm:text-sm lg:text-base z-10 px-2 sm:px-4"
                style={{
                  background:
                    "linear-gradient(90deg, #D15D9E 38.04%, #5D4495 121.51%)",
                  borderRadius: "120px",
                }}
              >
                Start Your Project
              </div>
            </div>

            {/* Section Heading - Enhanced Responsive */}
            <div className="w-full flex flex-col gap-1 sm:gap-2 mt-2 px-2">
              <h2 className="text-[#2A428C] text-lg sm:text-xl lg:text-2xl xl:text-[28px] font-bold text-center">
                Our Product Types
              </h2>
              <hr className="border-t border-[#2A428C] w-full" />
            </div>

            {/* Product Cards - Ultra Responsive Grid */}
            <div className="w-full flex justify-center py-2 sm:py-4 lg:py-8 px-1 sm:px-4">
              <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8 w-full max-w-7xl">
                {productCards.map((product, index) => (
                  <div
                    key={product.id}
                    className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-[1.02] sm:hover:scale-105 w-full max-w-[320px] sm:max-w-[280px] mx-auto border border-gray-100"
                    style={{
                      minHeight: "280px",
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-purple-600/0 group-hover:from-blue-400/5 group-hover:to-purple-600/5 transition-all duration-500 rounded-xl sm:rounded-2xl"></div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                    {/* Content container */}
                    <div className="relative z-10 flex flex-col items-center p-3 sm:p-4 lg:p-6 h-full">
                      {/* Image container */}
                      <div className="w-full h-[80px] sm:h-[100px] lg:h-[120px] xl:h-[140px] flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg sm:rounded-xl opacity-50 group-hover:opacity-30 transition-opacity duration-300"></div>
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={300}
                          className="relative z-10 max-w-full max-h-full object-contain transform group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-500 ease-out filter group-hover:brightness-110"
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-gray-800 font-bold text-sm sm:text-base lg:text-lg mb-2 sm:mb-3 text-center leading-tight group-hover:text-gray-900 transition-colors duration-300 line-clamp-2">
                        {product.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed flex-grow text-center px-1 sm:px-2 mb-2 sm:mb-4 group-hover:text-gray-700 transition-colors duration-300 line-clamp-3">
                        {product.description}
                      </p>

                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-0 w-0 h-[2px] sm:h-1 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-500 ease-out"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Details Section - Enhanced Responsive */}
            <hr className="border-t border-gray-300 mt-2 sm:mt-4 lg:mt-6 mx-2" />

            <div className="w-full flex flex-col gap-3 sm:gap-4 mt-2 sm:mt-4 px-2">
              <h2 className="text-[#2A428C] text-lg sm:text-xl lg:text-2xl xl:text-[28px] font-bold text-center">
                Book Details
              </h2>

              {/* Project Title + Book Genre - Enhanced Responsive Stack */}
              <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 w-full">
                {/* Project Title */}
                <div className="flex flex-col w-full lg:w-1/2">
                  <label className="text-black font-semibold text-sm sm:text-base mb-1 sm:mb-2">
                    Project Title
                  </label>
                  <textarea
                    maxLength={255}
                    rows={2}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter project title..."
                    className="w-full border border-gray-300 rounded-md p-2 sm:p-3 resize-none text-sm sm:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[60px] sm:min-h-[70px]"
                  ></textarea>
                  <div className="text-right text-gray-500 text-xs mt-1">
                    {text.length}/255
                  </div>
                </div>

                {/* Book Genre */}
                <div className="flex flex-col w-full lg:w-1/2">
                  <label className="text-black font-semibold text-sm sm:text-base mb-1 sm:mb-2">
                    Book Genre
                  </label>
                  <select
                    className="border border-gray-300 rounded-md p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-[60px] sm:h-[70px]"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                  >
                    <option value="">Select Genre</option>
                    <option value="fiction">Fiction</option>
                    <option value="non-fiction">Non-Fiction</option>
                    <option value="mystery">Mystery</option>
                    <option value="romance">Romance</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="science-fiction">Science Fiction</option>
                    <option value="biography">Biography</option>
                    <option value="history">History</option>
                    <option value="poetry">Poetry</option>
                    <option value="self-help">Self-Help</option>
                  </select>
                </div>
              </div>

              {/* Book Language and Category - Enhanced Responsive Stack */}
              <div className="flex flex-col lg:flex-row justify-between gap-3 sm:gap-4">
                <div className="flex flex-col w-full lg:w-1/2">
                  <label className="text-black font-semibold text-sm sm:text-base mb-1 sm:mb-2">
                    Book Language
                  </label>
                  <select
                    className="border border-gray-300 rounded-md p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                  >
                    <option value="">Select Language</option>
                    <option value="english">English</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="spanish">Spanish</option>
                    <option value="italian">Italian</option>
                    <option value="portuguese">Portuguese</option>
                    <option value="dutch">Dutch</option>
                    <option value="swedish">Swedish</option>
                    <option value="norwegian">Norwegian</option>
                    <option value="danish">Danish</option>
                    <option value="finnish">Finnish</option>
                    <option value="irish">Irish</option>
                    <option value="welsh">Welsh</option>
                    <option value="russian">Russian</option>
                    <option value="polish">Polish</option>
                    <option value="czech">Czech</option>
                    <option value="hungarian">Hungarian</option>
                    <option value="greek">Greek</option>
                    <option value="turkish">Turkish</option>
                    <option value="arabic">Arabic</option>
                    <option value="urdu">Urdu</option>
                    <option value="hindi">Hindi</option>
                    <option value="bengali">Bengali</option>
                    <option value="punjabi">Punjabi</option>
                    <option value="tamil">Tamil</option>
                    <option value="telugu">Telugu</option>
                    <option value="marathi">Marathi</option>
                    <option value="gujarati">Gujarati</option>
                    <option value="malayalam">Malayalam</option>
                    <option value="chinese">Chinese (Mandarin)</option>
                    <option value="cantonese">Chinese (Cantonese)</option>
                    <option value="japanese">Japanese</option>
                    <option value="korean">Korean</option>
                    <option value="thai">Thai</option>
                    <option value="vietnamese">Vietnamese</option>
                    <option value="indonesian">Indonesian</option>
                    <option value="malay">Malay</option>
                    <option value="filipino">Filipino / Tagalog</option>
                    <option value="swahili">Swahili</option>
                    <option value="zulu">Zulu</option>
                    <option value="xhosa">Xhosa</option>
                    <option value="amharic">Amharic</option>
                    <option value="somali">Somali</option>
                    <option value="hausa">Hausa</option>
                    <option value="yoruba">Yoruba</option>
                    <option value="igbo">Igbo</option>
                    <option value="hebrew">Hebrew</option>
                    <option value="persian">Persian (Farsi)</option>
                    <option value="pashto">Pashto</option>
                    <option value="kurdish">Kurdish</option>
                    <option value="armenian">Armenian</option>
                    <option value="georgian">Georgian</option>
                    <option value="latin">Latin</option>
                  </select>
                </div>

                <div className="flex flex-col w-full lg:w-1/2">
                  <label className="text-black font-semibold text-sm sm:text-base mb-1 sm:mb-2">
                    Book Category
                  </label>
                  <select
                    className="border border-gray-300 rounded-md p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {productCards.map((product) => (
                      <option key={product.id} value={product.title}>
                        {product.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Button - Enhanced Responsive */}
              <div className="flex justify-center mt-4 sm:mt-6 px-2">
                <button
                  className="text-white font-medium text-sm sm:text-base w-full sm:w-auto min-w-[200px] sm:min-w-[280px] lg:min-w-[400px] max-w-[500px]"
                  style={{
                    padding: "10px 16px",
                    background:
                      "linear-gradient(90deg, #0060A9 16.41%, #0080C0 38.41%, #0096CD 60.03%, #0000DC 87.93%)",
                    borderRadius: "100px",
                    textTransform: "capitalize",
                    cursor:
                      text.trim() && selectedCategory
                        ? "pointer"
                        : "not-allowed",
                    opacity: text.trim() && selectedCategory ? 1 : 0.6,
                  }}
                  onClick={handleButtonClick}
                  disabled={!text.trim() || !selectedCategory}
                >
                  Design Your Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles for Enhanced Responsiveness */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Extra small devices */
        @media (max-width: 375px) {
          .grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .max-w-[320px] {
            max-width: 100%;
          }
        }

        /* Small devices */
        @media (max-width: 640px) {
          .grid {
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          }
        }

        /* Medium devices */
        @media (min-width: 768px) and (max-width: 1024px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Large devices */
        @media (min-width: 1024px) and (max-width: 1280px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Extra large devices */
        @media (min-width: 1280px) {
          .max-w-7xl {
            max-width: 1400px;
          }
          .grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Ultra-wide screens */
        @media (min-width: 1536px) {
          .grid {
            grid-template-columns: repeat(4, 1fr);
            max-width: 1600px;
            margin: 0 auto;
          }
        }

        /* Landscape mobile orientation */
        @media (max-height: 500px) and (orientation: landscape) {
          .min-h-screen {
            min-height: auto;
          }

          .py-2 {
            padding-top: 0.25rem;
            padding-bottom: 0.25rem;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .hover\\:shadow-2xl {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }

          .group:hover .group-hover\\:scale-110 {
            transform: scale(1.05);
          }
        }
      `}</style>
    </>
  );
};
export default StartProjectContent;

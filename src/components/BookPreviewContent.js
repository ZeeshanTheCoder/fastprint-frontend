"use client";

import { useEffect, useState, useRef, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext } from "@/context/authContext";
import axios from "axios";
import { BASE_URL } from "@/services/baseUrl";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_BASE = `${BASE_URL}`;

const NavBar = ({ navigate }) => (
  <div
    className="w-full h-auto min-h-[51px] flex items-center justify-center gap-2 sm:gap-4 md:gap-8 px-2 sm:px-4 py-2"
    style={{
      background:
        "linear-gradient(90deg, #016AB3 16.41%, #0096CD 60.03%, #00AEDC 87.93%)",
    }}
  >
    <span
      className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold cursor-pointer pb-1 px-2 py-1 border-b-2 sm:border-b-4 border-transparent hover:border-yellow-400 transition-all text-center whitespace-nowrap"
      onClick={() => navigate("/start-project")}
    >
      Start Project
    </span>
    <span
      className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold cursor-pointer pb-1 px-2 py-1 border-b-2 sm:border-b-4 border-transparent hover:border-yellow-400 transition-all text-center whitespace-nowrap"
      onClick={() => navigate("/design-project")}
    >
      Designs
    </span>
    <span
      className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold cursor-pointer pb-1 px-2 py-1 border-b-2 sm:border-b-4 border-transparent hover:border-yellow-400 transition-all text-center whitespace-nowrap"
      onClick={() => navigate("/book-preview")}
    >
      Book Preview
    </span>
  </div>
);

let pdfjsLib = null;

const loadPdfLib = async () => {
  if (typeof window === "undefined") return null;
  if (pdfjsLib) return pdfjsLib;

  try {
    const lib = await import("pdfjs-dist");
    lib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.js";
    pdfjsLib = lib;
    return lib;
  } catch (err) {
    console.error("Failed to load PDF.js:", err);
    throw new Error("PDF processor failed to initialize.");
  }
};

const BookPreviewContent = () => {
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [pdfDataUrl, setPdfDataUrl] = useState(null);
  const [pdfDocument, setPdfDocument] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [renderedPages, setRenderedPages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const bookRef = useRef();

  // detect screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (numPages > 0) {
      if (isMobile) {
        setCurrentPage(1); // mobile -> ek hi page
      } else {
        setCurrentPage([1, numPages > 1 ? 2 : null]); // desktop -> left-right
      }
    }
  }, [numPages, isMobile]);

  useEffect(() => {
    const savedPdfDataUrl = localStorage.getItem("previewPdfDataUrl");
    const savedProjectData = localStorage.getItem("previewProjectData");

    if (savedPdfDataUrl) {
      setPdfDataUrl(savedPdfDataUrl);
    } else {
      alert("No PDF file found for preview. Please upload a file first.");
      router.push("/design-project");
    }

    if (savedProjectData) {
      JSON.parse(savedProjectData);
    }
  }, [router]);

  useEffect(() => {
    if (!pdfDataUrl) return;

    const loadAndRenderPdf = async () => {
      try {
        const pdfjs = await loadPdfLib();
        if (!pdfjs) throw new Error("PDF.js library not loaded.");

        const base64String = pdfDataUrl.split(",")[1];
        const binaryString = atob(base64String);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const loadingTask = pdfjs.getDocument({ data: bytes });
        const pdfDoc = await loadingTask.promise;
        setPdfDocument(pdfDoc);
        setNumPages(pdfDoc.numPages);

        const allPages = [];
        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
          const page = await pdfDoc.getPage(pageNum);
          const scale = 1.5;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport }).promise;
          allPages.push(canvas.toDataURL("image/png"));
        }

        // sirf md+ lg screens par hi "The End" page add karo
        if (!isMobile && pdfDoc.numPages % 2 !== 0) {
          allPages.push("cover");
        }

        setRenderedPages(allPages);
      } catch (error) {
        console.error("Error loading/rendering PDF:", error);
        alert("Failed to load the PDF preview. Please try again.");
      }
    };

    loadAndRenderPdf();
  }, [pdfDataUrl]);

  const handleFlip = (e) => {
    const pageIndex = e.data; // starts from 0
    if (isMobile) {
      // mobile: single page
      setCurrentPage(pageIndex + 1);
    } else {
      // desktop/tablet: two-page spread
      const leftPage = pageIndex + 1;
      const rightPage = pageIndex + 2 <= numPages ? pageIndex + 2 : null;
      setCurrentPage([leftPage, rightPage]);
    }
  };

  const handleSubmit = async () => {
    router.push("/shop");
  };

  if (!pdfDataUrl || !renderedPages[0]) {
    return (
      <>
        <NavBar navigate={router.push} />
        <div className="w-full min-h-screen flex items-center justify-center">
          <p>Loading PDF preview...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar navigate={router.push} />
      <div className="w-full min-h-screen px-4 md:px-6 py-6 md:py-10 bg-gradient-to-br from-[#eef4ff] to-[#fef6fb] font-sans">
        <div className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12 rounded-xl md:rounded-2xl shadow-xl bg-gradient-to-r from-[#ffe4ec] via-[#fdfdfd] to-[#e0f3ff] flex flex-col gap-6 md:gap-8 lg:gap-10">
          {/* Header */}
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
              Preview Book
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-[#2A428C]">
              Review Your Book
            </h1>
            <p className="text-gray-600 max-w-3xl">
              Use this preview to see how your book will look. Carefully review
              margins, layout, and content before continuing. Your book will
              print exactly as shown.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
            {/* Flipbook */}
            <div className="flex justify-center items-center mb-8">
              <HTMLFlipBook
                onFlip={handleFlip}
                width={isMobile ? 320 : 500}
                height={isMobile ? 450 : 700}
                size="stretch"
                minWidth={250}
                maxWidth={1000}
                minHeight={300}
                maxHeight={1400}
                maxShadowOpacity={0.5}
                showCover={false}
                mobileScrollSupport={true}
                className="shadow-2xl rounded-xl"
                ref={(book) => (bookRef.current = book)}
                flippingTime={600}
                useMouseEvents={true}
                startZIndex={5}
                autoSize={true}
              >
                {renderedPages.map((page, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-center rounded-lg border ${
                      page === "cover" ? "bg-black" : "bg-white p-2"
                    }`}
                  >
                    {page === "cover" ? (
                      <div className="flex justify-center items-center w-full h-full">
                        <span className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                          The End
                        </span>
                      </div>
                    ) : (
                      <img
                        src={page}
                        alt={`Page ${i + 1}`}
                        className="w-full h-auto object-contain"
                      />
                    )}
                  </div>
                ))}
              </HTMLFlipBook>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-6 mb-8">
              <button
                className="p-3 bg-[#2A428C] text-white rounded-full hover:bg-[#1d326c] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => bookRef.current.pageFlip().flipPrev()}
                disabled={isMobile ? currentPage === 1 : currentPage[0] === 1}
              >
                <ChevronLeft size={20} />
              </button>

              <span className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700">
                {isMobile ? (
                  <>
                    Page {currentPage} of {numPages}
                  </>
                ) : (
                  <>
                    Pages {currentPage[0]}
                    {currentPage[1] && currentPage[1] <= numPages
                      ? `-${currentPage[1]}`
                      : ""}{" "}
                    of {numPages}
                  </>
                )}
              </span>

              <button
                className="p-3 bg-[#2A428C] text-white rounded-full hover:bg-[#1d326c] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => bookRef.current.pageFlip().flipNext()}
                disabled={
                  isMobile
                    ? currentPage === numPages
                    : !currentPage[1] || currentPage[1] >= numPages
                }
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Important Info */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-[#2A428C] mb-4">
                Important Information About Your Book
              </h2>
              <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                <li>Ensure all text is visible and not cut off by margins</li>
                <li>Verify that images are clear and properly positioned</li>
                <li>Check that page numbering is correct and consistent</li>
                <li>
                  Confirm that all chapters and sections are in the right order
                </li>
                <li>Review the table of contents for accuracy</li>
              </ol>
            </div>

            <div className="flex flex-col items-center gap-4 md:gap-6 mt-6 md:mt-10">
              <button
                onClick={handleSubmit}
                className="w-full max-w-md md:max-w-lg lg:max-w-xl px-6 md:px-10 py-2 md:py-3 bg-gradient-to-r from-[#F8C20A] to-[#EE831E] text-white font-medium text-sm md:text-base rounded-full shadow-md hover:shadow-lg"
              >
                Print Your Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookPreviewContent;

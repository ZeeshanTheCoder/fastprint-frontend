"use client";

import { useEffect, useState, useRef, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PersonalIcon from "@/assets/images/newsletter.png";
import { AuthContext } from "@/context/authContext";
import axios from "axios";

// Frontend-only calculators and config
import {
  BOOK_SIZES,
  BINDING_RULES_BOOK,
  SPECIAL_SIZE_RULES,
  OPTIONS_CONFIG_BOOK,
  SIZE_SPECIFIC_PRICING_BOOK,
  COMIC_TRIM_SIZES,
  COMIC_INTERIOR_COLORS,
  COMIC_PAPER_TYPES,
  COMIC_COVER_FINISHES,
  SIMPLE_TRIM_SIZES,
  BINDING_CONFIGS_SIMPLE,
  OPTIONS_CONFIG_SIMPLE,
  CALENDAR_SIZES,
  CALENDAR_OPTIONS,
  DISCOUNTS,
} from "@/calculators/config";
import {
  getAvailableBindingsBook,
  calculatePriceBook,
  getAvailableBindingsComic,
  calculatePriceComic,
  getAvailableBindingsSimple,
  calculatePriceSimple,
  calculatePriceCalendar,
} from "@/calculators/pricing";
import { BASE_URL } from "@/services/baseUrl";

// PDF.js worker setup
// ✅ Move pdfjsLib loading to a dynamic import
let pdfjsLib = null;

const loadPdfLib = async () => {
  if (typeof window === "undefined") return null;
  if (pdfjsLib) return pdfjsLib;

  try {
    const lib = await import("pdfjs-dist");

    // ✅ Use public folder (works in dev & prod)
    lib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.js";

    pdfjsLib = lib;
    return lib;
  } catch (err) {
    console.error("Failed to load PDF.js:", err);
    throw new Error("PDF processor failed to initialize.");
  }
};

// Image imports - consolidated
import PerfectBoundImg from "@/assets/images/img58.png";
import CoilBoundImg from "@/assets/images/coill.jpg";
import SaddleImg from "@/assets/images/saddlee.jpg";
import CaseWrap from "@/assets/images/paperbackk.jpg";
import LinenWrap from "@/assets/images/linenn.jpg";
import WireOBoundImg from "@/assets/images/wireo.jpg";
import StandardBlackandWhite from "@/assets/images/pp1.jpg";
import PremiumBlackandWhite from "@/assets/images/pp2.jpg";
import StandardColor from "@/assets/images/pp3.jpg";
import PremiumColor from "@/assets/images/pp4.jpg";
import Creamuncoated from "@/assets/images/qa1.png";
import Whiteuncoated from "@/assets/images/qa2.png";
import Whitecoated from "@/assets/images/qa3.png";
import Whitecoatedd from "@/assets/images/qa4.png";
import Glossy from "@/assets/images/gggg.jpg";
import Matty from "@/assets/images/mmmm.jpg";
import Image from "next/image";

const API_BASE = `${BASE_URL}`;

// Configuration objects
const IMAGE_MAPS = {
  binding: {
    "Perfect Bound": PerfectBoundImg,
    "Coil Bound": CoilBoundImg,
    "Saddle Stitch": SaddleImg,
    "Case Wrap": CaseWrap,
    "Linen Wrap": LinenWrap,
    "Wire O": WireOBoundImg,
  },
  interiorColor: {
    "Standard Black and White": StandardBlackandWhite,
    "Standard Black & White": StandardBlackandWhite,
    "Premium Black and White": PremiumBlackandWhite,
    "Premium Black & White": PremiumBlackandWhite,
    "Standard Color": StandardColor,
    "Premium Color": PremiumColor,
  },
  paperType: {
    "60# Cream Uncoated": Creamuncoated,
    "60# Cream-Uncoated": Creamuncoated,
    "60# White Uncoated": Whiteuncoated,
    "60# White-Uncoated": Whiteuncoated,
    "70# White-Uncoated": Whitecoatedd,
    "80# White Coated": Whitecoated,
    "80# White-Coated": Whitecoated,
    "100# White Coated": Whitecoatedd,
    "100# White-Coated": Whitecoatedd,
  },
  coverFinish: {
    Gloss: Glossy,
    Glossy: Glossy,
    Matte: Matty,
  },
};

// Local helpers
const toOptions = (names) => names.map((name, idx) => ({ id: idx + 1, name }));
const toOptionsFromObjects = (arr) =>
  arr.map((o, idx) => ({ id: idx + 1, name: o.name, dbName: o.dbName }));

const getDiscountInfo = (qty) => {
  if (qty >= 1000) return { percent: 15 };
  if (qty >= 500) return { percent: 10 };
  if (qty >= 100) return { percent: 5 };
  return null;
};

// Reusable components
const OptionField = ({
  title,
  name,
  options,
  imageMap,
  form,
  handleChange,
  stepAccessible = true,
}) => (
  <fieldset className="mb-5 md:mb-6">
    <legend className="font-semibold text-[#2A428C] mb-3 md:mb-4 text-lg">
      {title}
    </legend>
    <div className="flex flex-wrap justify-start items-center gap-2 md:gap-3 lg:gap-4 max-w-3xl mx-auto">
      {Array.from(new Map(options.map((opt) => [opt.name, opt])).values()).map(
        (opt) => (
          <label
            key={opt.id}
            className={`relative cursor-pointer flex flex-col items-center w-20 md:w-24 lg:w-28 p-2 md:p-2.5 lg:p-3 border rounded-lg transition ${
              String(form[name]) === String(opt.id)
                ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                : "border-gray-300 bg-white"
            } ${!stepAccessible ? "opacity-40 cursor-not-allowed" : ""}`}
            role="radio"
            aria-checked={String(form[name]) === String(opt.id)}
            aria-disabled={!stepAccessible}
          >
            <input
              type="radio"
              name={name}
              value={opt.id}
              checked={String(form[name]) === String(opt.id)}
              onChange={stepAccessible ? handleChange : undefined}
              disabled={!stepAccessible}
              className="sr-only"
            />
            <span
              className={`absolute top-2 left-2 w-4 h-4 rounded-full border-2 ${
                String(form[name]) === String(opt.id)
                  ? "border-blue-600"
                  : "border-gray-400"
              }`}
            >
              <span
                className={`block m-[2px] w-2.5 h-2.5 rounded-full ${
                  String(form[name]) === String(opt.id)
                    ? "bg-blue-600"
                    : "bg-transparent"
                }`}
              ></span>
            </span>
            {(() => {
              const src =
                imageMap[opt.name] ||
                (opt.dbName ? imageMap[opt.dbName] : undefined);
              return src ? (
                <Image
                  src={src}
                  alt={opt.name}
                  className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain mb-1 md:mb-2"
                />
              ) : null;
            })()}
            <span className="text-center text-xs md:text-sm text-gray-700">
              {opt.name}
            </span>
          </label>
        )
      )}
    </div>
  </fieldset>
);

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

const ProjectDetails = ({ projectData }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
    <h2 className="text-[#2A428C] text-xl md:text-2xl font-bold mb-4 md:mb-6">
      Project Details
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {[
        { label: "Project Title", value: projectData.projectTitle },
        { label: "Language", value: projectData.language || "Not specified" },
        { label: "Category", value: projectData.category },
        { label: "Genre", value: projectData.genre || "Not specified" },
      ].map(({ label, value }) => (
        <div key={label} className="flex flex-col">
          <span className="text-[#2A428C] font-semibold text-xs md:text-sm uppercase tracking-wide">
            {label}
          </span>
          <span className="text-gray-800 text-sm md:text-base mt-1">
            {value}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const FileUpload = ({
  fileError,
  selectedFile,
  uploadStatus,
  uploadProgress,
  handleFileChange,
}) => (
  <div className="w-full">
    <h1 className="text-[#2A428C] text-lg md:text-[24px] font-bold">
      Interior File Upload
    </h1>
    <div className="w-full max-w-[675px] h-[160px] md:h-[206px] mx-auto border border-dashed border-[#2A428C] rounded-xl md:rounded-2xl flex flex-col items-center justify-center gap-2 md:gap-4 bg-white mt-4 md:mt-6 relative p-4">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
      />
      <div className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] flex items-center justify-center rounded-full bg-[#2A428C]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          className="md:w-5 md:h-5"
        >
          <path d="M5 20h14v-2H5v2zm7-18L5.33 9h3.67v4h4V9h3.67L12 2z" />
        </svg>
      </div>

      {uploadStatus === "uploading" && (
        <>
          <p className="text-[#2A428C] font-semibold text-sm md:text-[16px] text-center">
            Uploading... {uploadProgress}%
          </p>
          <div className="w-32 md:w-48 h-2 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </>
      )}

      {uploadStatus === "success" && selectedFile && (
        <>
          <p className="text-green-600 font-semibold text-sm md:text-[16px] text-center truncate w-full px-2">
            {selectedFile.name} uploaded successfully!
          </p>
          <div className="w-full flex justify-center mt-4">
            <button
              type="button"
              className="bg-[#2A428C] text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-[#1d326c] transition"
              onClick={() => {
                handleFileChange({ target: { files: [] } });
                document.querySelector(
                  'input[type="file"][accept="application/pdf"]'
                ).value = "";
              }}
            >
              Replace File
            </button>
          </div>
        </>
      )}

      {(uploadStatus === "idle" || uploadStatus === "error") && (
        <p className="text-[#2A428C] font-semibold text-sm md:text-[16px] text-center px-2">
          {selectedFile
            ? selectedFile.name
            : "Upload your PDF file or Drag & Drop it here"}
        </p>
      )}

      {fileError && (
        <>
          <p className="text-red-600 text-xs md:text-sm text-center mt-1 md:mt-2 px-2">
            {fileError}
          </p>
          <div className="w-full flex justify-center mt-2">
            <button
              type="button"
              className="bg-[#2A428C] text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-[#1d326c] transition"
              onClick={() => {
                handleFileChange({ target: { files: [] } });
                document.querySelector(
                  'input[type="file"][accept="application/pdf"]'
                ).value = "";
              }}
            >
              Replace File
            </button>
          </div>
        </>
      )}
    </div>
  </div>
);

const CoverDesign = ({
  coverFileInputRef,
  handleCoverFileChange,
  coverFile,
}) => (
  <div className="w-full mt-6 md:mt-10">
    <h2 className="text-[#2A428C] font-bold text-xl md:text-[36px] mb-2">
      Book Cover Design
    </h2>
    <hr className="border-t border-black w-full mb-4" />
    <div
      className="w-full border rounded-lg md:rounded-[20px] px-4 md:px-6 py-4 md:py-6 flex items-center gap-3 md:gap-4 shadow-sm mb-4 md:mb-6 bg-white border-[#ECECEC] cursor-pointer"
      onClick={() => coverFileInputRef.current?.click()}
    >
      <Image
        src={PersonalIcon}
        alt="Personal"
        className="h-8 w-8 md:h-[48px] md:w-[48px]"
      />
      <div>
        <h3 className="text-black font-semibold text-sm md:text-base">
          Upload Your Cover
        </h3>
        <p className="text-black text-xs md:text-sm">
          Upload a cover for your book
        </p>
      </div>
    </div>
    <input
      type="file"
      accept="image/jpeg,image/png,application/pdf"
      ref={coverFileInputRef}
      onChange={handleCoverFileChange}
      style={{ display: "none" }}
    />
    {coverFile && (
      <div className="flex items-center justify-between mb-4">
        <p className="text-green-600 text-center text-sm md:text-base">
          Selected cover: {coverFile.name}
        </p>
        <button
          type="button"
          className="bg-[#2A428C] text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-[#1d326c] transition ml-4"
          onClick={() => {
            handleCoverFileChange({ target: { files: [] } });
            if (coverFileInputRef.current) coverFileInputRef.current.value = "";
            coverFileInputRef.current?.click();
          }}
        >
          Replace Cover File
        </button>
      </div>
    )}
  </div>
);

const handlePrintAndSubmit = () => {
  handleSubmit(); // Call your existing submission logic
};

const DesignProjectPreview = () => {
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const coverFileInputRef = useRef(null);

  const isEditUrl = searchParams.get("edit") === "true";

  // State consolidation
  const [state, setState] = useState({
    fileError: "",
    selectedFile: null,
    uploadStatus: "idle",
    uploadProgress: 0,
    usedExpertCover: false,
    coverFile: null,
    projectData: null,
    dropdowns: {},
    bindings: [],
    initialBindings: [],
    initialBindingsLoaded: false,
    loading: false,
    availableBindings: [],
    result: null,
    calculating: false,
    form: {
      trim_size_id: "",
      page_count: "",
      binding_id: "",
      interior_color_id: "",
      paper_type_id: "",
      cover_finish_id: "",
      quantity: 1,
    },
  });

  const updateState = (updates) =>
    setState((prev) => ({ ...prev, ...updates }));
  const updateForm = (updates) =>
    setState((prev) => ({ ...prev, form: { ...prev.form, ...updates } }));

  // State for project data and ID
  const [hasProjectId, setHasProjectId] = useState(false);

  // ✅ FIXED: Get projectData from localStorage - client-side only
  useEffect(() => {
    try {
      // Check if we're in the browser
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("projectData");
        if (saved) {
          const data = JSON.parse(saved);
          updateState({ projectData: data }); // ✅ Fixed: Don't double-parse
          setHasProjectId(!!(data && data.projectId));
        } else {
          // Optional: Redirect if no data
          router.push("/start-project");
        }
      }
    } catch (e) {
      console.warn("No project data found in localStorage");
    }
  }, [router]);

  const isCalendarCategory = (category) =>
    category === "Calender" || category === "Calendar";

  const buildLocalConfig = (category) => {
    switch (category) {
      case "Print Book":
      case "Photo Book": {
        const trim_sizes = toOptions(BOOK_SIZES);
        const interior_colors = toOptionsFromObjects(
          OPTIONS_CONFIG_BOOK.interiorColor
        );
        const paper_types = toOptionsFromObjects(OPTIONS_CONFIG_BOOK.paperType);
        const cover_finishes = toOptionsFromObjects(
          OPTIONS_CONFIG_BOOK.coverFinish
        );
        const allBindings = [
          "Perfect Bound",
          "Saddle Stitch",
          "Case Wrap",
          "Linen Wrap",
          "Coil Bound",
        ];
        return {
          dropdowns: {
            trim_sizes,
            interior_colors,
            paper_types,
            cover_finishes,
          },
          allBindings: toOptions(allBindings),
        };
      }
      case "Comic Book": {
        const trim_sizes = COMIC_TRIM_SIZES.map((t) => ({
          id: t.id,
          name: t.name,
        }));
        const interior_colors = toOptionsFromObjects(COMIC_INTERIOR_COLORS);
        const paper_types = toOptionsFromObjects(COMIC_PAPER_TYPES);
        const cover_finishes = toOptionsFromObjects(COMIC_COVER_FINISHES);
        const allBindings = [
          "Perfect Bound",
          "Saddle Stitch",
          "Case Wrap",
          "Linen Wrap",
          "Coil Bound",
        ];
        return {
          dropdowns: {
            trim_sizes,
            interior_colors,
            paper_types,
            cover_finishes,
          },
          allBindings: toOptions(allBindings),
        };
      }
      case "Magazine":
      case "Year Book": {
        const trim_sizes = toOptions(SIMPLE_TRIM_SIZES);
        const interior_colors = toOptionsFromObjects(
          OPTIONS_CONFIG_SIMPLE.interiorColor
        );
        const paper_types = toOptionsFromObjects(
          OPTIONS_CONFIG_SIMPLE.paperType
        );
        const cover_finishes = toOptionsFromObjects(
          OPTIONS_CONFIG_SIMPLE.coverFinish
        );
        const allBindings = Object.keys(BINDING_CONFIGS_SIMPLE);
        return {
          dropdowns: {
            trim_sizes,
            interior_colors,
            paper_types,
            cover_finishes,
          },
          allBindings: toOptions(allBindings),
        };
      }
      case "Calender":
      case "Calendar": {
        const trim_sizes = toOptions(CALENDAR_SIZES);
        const interior_colors = toOptionsFromObjects(
          CALENDAR_OPTIONS.interiorColor
        );
        const paper_types = toOptionsFromObjects(CALENDAR_OPTIONS.paperType);
        const cover_finishes = toOptionsFromObjects(
          CALENDAR_OPTIONS.coverFinish
        );
        const allBindings = CALENDAR_OPTIONS.bindingType.map((o) => o.name);
        return {
          dropdowns: {
            trim_sizes,
            interior_colors,
            paper_types,
            cover_finishes,
          },
          allBindings: toOptions(allBindings),
        };
      }
      default:
        return {
          dropdowns: {
            trim_sizes: [],
            interior_colors: [],
            paper_types: [],
            cover_finishes: [],
          },
          allBindings: [],
        };
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    if (!state.projectData?.category) return;
    const cfg = buildLocalConfig(state.projectData?.category);
    updateState({
      dropdowns: cfg.dropdowns,
      initialBindings: cfg.allBindings,
      bindings: cfg.allBindings,
      availableBindings: cfg.allBindings.map((b) => b.name),
      initialBindingsLoaded: true,
      loading: false,
      result: null,
    });
  }, [state.projectData?.category, token, router]);

  useEffect(() => {
    if (!state.initialBindingsLoaded) return;

    const { trim_size_id, page_count } = state.form;
    const cat = state.projectData?.category;
    if (isCalendarCategory(cat)) {
      updateState({ bindings: state.initialBindings });
      return;
    }

    if (!trim_size_id || !page_count) {
      updateState({
        bindings: state.initialBindings,
        availableBindings: state.initialBindings.map((b) => b.name),
      });
      return;
    }

    let available = [];
    if (cat === "Print Book" || cat === "Photo Book") {
      const ts = state.dropdowns.trim_sizes.find(
        (t) => String(t.id) === String(trim_size_id)
      );
      available = getAvailableBindingsBook(Number(page_count), ts?.name || "");
    } else if (cat === "Comic Book") {
      available = getAvailableBindingsComic(Number(page_count));
    } else {
      available = getAvailableBindingsSimple(Number(page_count));
    }
    updateState({
      bindings: state.initialBindings,
      availableBindings: available,
    });
  }, [
    state.form.trim_size_id,
    state.form.page_count,
    state.initialBindingsLoaded,
    state.projectData?.category,
  ]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? (value === "" ? "" : Number(value)) : value;

    if (
      (name === "trim_size_id" || name === "page_count") &&
      state.projectData?.category !== "Calender"
    ) {
      updateForm({ [name]: val, binding_id: "" });
    } else {
      updateForm({ [name]: val });
    }

    if (name !== "quantity") {
      updateState({ result: null });
    }
  };

  const handlePriceCalculation = (e) => {
    if (e) e.preventDefault();

    const isCalendar = isCalendarCategory(state.projectData?.category);
    const requiredFields = isCalendar
      ? [
          "binding_id",
          "interior_color_id",
          "paper_type_id",
          "cover_finish_id",
          "quantity",
        ]
      : [
          "trim_size_id",
          "page_count",
          "binding_id",
          "interior_color_id",
          "paper_type_id",
          "cover_finish_id",
          "quantity",
        ];

    const missingFields = requiredFields.filter((field) => !state.form[field]);
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    const cat = state.projectData?.category;
    const qty = Number(state.form.quantity) || 1;
    let calc = null;
    if (cat === "Print Book" || cat === "Photo Book") {
      const ts = state.dropdowns.trim_sizes.find(
        (t) => String(t.id) === String(state.form.trim_size_id)
      )?.name;
      calc = calculatePriceBook({
        bookSize: ts,
        page_count: Number(state.form.page_count),
        binding_id: state.bindings.find(
          (b) => String(b.id) === String(state.form.binding_id)
        )?.name,
        interior_color_id:
          state.dropdowns.interior_colors.find(
            (o) => String(o.id) === String(state.form.interior_color_id)
          )?.dbName ||
          state.dropdowns.interior_colors.find(
            (o) => String(o.id) === String(state.form.interior_color_id)
          )?.name,
        paper_type_id:
          state.dropdowns.paper_types.find(
            (o) => String(o.id) === String(state.form.paper_type_id)
          )?.dbName ||
          state.dropdowns.paper_types.find(
            (o) => String(o.id) === String(state.form.paper_type_id)
          )?.name,
        cover_finish_id:
          state.dropdowns.cover_finishes.find(
            (o) => String(o.id) === String(state.form.cover_finish_id)
          )?.dbName ||
          state.dropdowns.cover_finishes.find(
            (o) => String(o.id) === String(state.form.cover_finish_id)
          )?.name,
        quantity: qty,
      });
    } else if (cat === "Comic Book") {
      calc = calculatePriceComic({
        trim_size_id: state.form.trim_size_id,
        page_count: Number(state.form.page_count),
        binding_id: state.bindings.find(
          (b) => String(b.id) === String(state.form.binding_id)
        )?.name,
        interior_color_id: state.dropdowns.interior_colors.find(
          (o) => String(o.id) === String(state.form.interior_color_id)
        )?.dbName,
        paper_type_id: state.dropdowns.paper_types.find(
          (o) => String(o.id) === String(state.form.paper_type_id)
        )?.dbName,
        cover_finish_id: state.dropdowns.cover_finishes.find(
          (o) => String(o.id) === String(state.form.cover_finish_id)
        )?.dbName,
        quantity: qty,
      });
    } else if (cat === "Magazine" || cat === "Year Book") {
      calc = calculatePriceSimple({
        page_count: Number(state.form.page_count),
        binding_id: state.bindings.find(
          (b) => String(b.id) === String(state.form.binding_id)
        )?.name,
        interior_color_id: state.dropdowns.interior_colors.find(
          (o) => String(o.id) === String(state.form.interior_color_id)
        )?.dbName,
        paper_type_id: state.dropdowns.paper_types.find(
          (o) => String(o.id) === String(state.form.paper_type_id)
        )?.dbName,
        cover_finish_id: state.dropdowns.cover_finishes.find(
          (o) => String(o.id) === String(state.form.cover_finish_id)
        )?.dbName,
        quantity: qty,
      });
    } else if (isCalendarCategory(cat)) {
      calc = calculatePriceCalendar({
        binding_id: state.bindings.find(
          (b) => String(b.id) === String(state.form.binding_id)
        )?.name,
        interior_color_id: state.dropdowns.interior_colors.find(
          (o) => String(o.id) === String(state.form.interior_color_id)
        )?.dbName,
        paper_type_id: state.dropdowns.paper_types.find(
          (o) => String(o.id) === String(state.form.paper_type_id)
        )?.dbName,
        cover_finish_id: state.dropdowns.cover_finishes.find(
          (o) => String(o.id) === String(state.form.cover_finish_id)
        )?.dbName,
        quantity: qty,
      });
    }
    if (!calc) {
      alert("Price calculation not available for selected options.");
      return;
    }
    const result = {
      cost_per_book: calc.unitPrice,
      original_total_cost: calc.totalPrice,
      total_cost: calc.finalPrice,
      discount_percent: calc.discountPercent,
      discount_amount: calc.discountAmount,
    };
    updateState({ result });
  };

  const handleContactExpert = () => {
    localStorage.setItem("designForm", JSON.stringify(state.form));
    localStorage.setItem("projectData", JSON.stringify(state.projectData));
    updateState({ usedExpertCover: true });
    router.push("/cover-expert");
  };

  useEffect(() => {
    loadPdfLib(); // Preload PDF.js in background
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    updateState({
      fileError: "",
      selectedFile: null,
      uploadStatus: "idle",
      uploadProgress: 0,
    });

    if (!file) return;
    if (file.type !== "application/pdf") {
      updateState({
        fileError: "Only PDF files are allowed.",
        uploadStatus: "error",
      });
      return;
    }

    updateState({ uploadStatus: "uploading" });

    try {
      // ✅ Load pdfjsLib only when needed, in the browser
      const pdfjs = await loadPdfLib();
      if (!pdfjs) {
        updateState({
          fileError: "PDF processor not available.",
          uploadStatus: "error",
        });
        return;
      }

      const fileReader = new FileReader();
      fileReader.onload = async function () {
        try {
          const typedarray = new Uint8Array(this.result);
          const pdf = await pdfjs.getDocument({ data: typedarray }).promise;
          const pageCount = pdf.numPages;

          if (pageCount < 2 || pageCount > 800) {
            updateState({
              fileError: "Page count must be between 2 and 800.",
              uploadStatus: "error",
            });
            return;
          }

          updateForm({ page_count: pageCount });
          updateState({ selectedFile: file, uploadStatus: "success" });
        } catch (err) {
          console.error("PDF parsing error:", err);
          updateState({
            fileError: "Invalid PDF file or corrupted.",
            uploadStatus: "error",
          });
        }
      };
      fileReader.readAsArrayBuffer(file);
    } catch (err) {
      console.error("PDF.js load error:", err);
      updateState({
        fileError: err.message || "Failed to initialize PDF processor.",
        uploadStatus: "error",
      });
    }
  };

  const handleCoverFileChange = (e) => {
    const file = e.target.files?.[0];
    updateState({ coverFile: null });

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      alert("Cover design must be a JPG, PNG, or PDF file.");
      return;
    }
    updateState({ coverFile: file });
  };

  const handleSubmit = async () => {
    // Determine if in edit mode
    const isEditMode = isEditUrl && hasProjectId;

    const isCalendar = state.projectData?.category === "Calender";

    // Upload or update based on mode
    if (isEditMode) {
      // Call update API
      await updateBook(projectData.projectId, isCalendar);
      return; // Exit after update
    }

    if (!state.selectedFile) return alert("Please upload your book PDF file");

    const requiredFields = isCalendar
      ? ["binding_id", "interior_color_id", "paper_type_id", "cover_finish_id"]
      : [
          "trim_size_id",
          "page_count",
          "binding_id",
          "interior_color_id",
          "paper_type_id",
          "cover_finish_id",
        ];

    if (!requiredFields.every((field) => state.form[field])) {
      return alert("Please complete all book configuration options");
    }

    if (
      !state.projectData?.category ||
      !state.projectData?.language ||
      !token
    ) {
      return alert(
        token
          ? "Please select a valid category and language."
          : "You must be logged in to submit the project."
      );
    }

    try {
      const formData = new FormData();
      formData.append("title", state.projectData.projectTitle || "");
      formData.append("category", state.projectData.category);
      formData.append("language", state.projectData.language);
      formData.append("pdf_file", state.selectedFile);
      if (state.coverFile) formData.append("cover_file", state.coverFile);

      const getOptionName = (options, id) =>
        options.find((opt) => opt.id === Number(id))?.name || "";

      formData.append(
        "binding_type",
        getOptionName(state.bindings, state.form.binding_id)
      );
      formData.append(
        "cover_finish",
        getOptionName(
          state.dropdowns.cover_finishes || [],
          state.form.cover_finish_id
        )
      );
      formData.append(
        "interior_color",
        getOptionName(
          state.dropdowns.interior_colors || [],
          state.form.interior_color_id
        )
      );
      formData.append(
        "paper_type",
        getOptionName(
          state.dropdowns.paper_types || [],
          state.form.paper_type_id
        )
      );

      if (!isCalendar)
        formData.append(
          "trim_size",
          getOptionName(
            state.dropdowns.trim_sizes || [],
            state.form.trim_size_id
          )
        );

      formData.append(
        "page_count",
        isCalendar ? state.form.page_count || 1 : state.form.page_count
      );

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) =>
          updateState({
            uploadProgress: Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            ),
          }),
      };

      const response = await axios.post(
        `${API_BASE}api/book/upload-book/`,
        formData,
        config
      );

      if (response.data?.status === "success") {
        alert("Project submitted successfully!");
        const quantity = state.form.quantity || 0;
        const originalTotalCost =
          state.result?.original_total_cost ??
          state.result?.cost_per_book * quantity;
        const finalTotalCost = state.result?.total_cost ?? originalTotalCost;

        // localStorage.removeItem("projectData");
        // localStorage.removeItem("designForm");

        localStorage.setItem(
          "shopData",
          JSON.stringify({
            originalTotalCost: state.result?.original_total_cost ?? 0,
            finalTotalCost: state.result?.total_cost ?? 0,
            totalCost: state.result?.total_cost ?? 0,
            initialQuantity: state.form.quantity,
            costPerBook: state.result?.cost_per_book ?? 0,
          })
        );

        router.push("/shop");
        // Optional: Use URL params or localStorage to pass cost data
      } else {
        alert(
          "Submission failed: " + (response.data.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while submitting your project."
      );
    }
  };

  const updateBook = async (projectId, isCalendar) => {
    if (!projectId) {
      alert("No project ID found for update.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", state.projectData.projectTitle || "");
      formData.append("category", state.projectData.category);
      formData.append("language", state.projectData.language);
      formData.append("pdf_file", state.selectedFile);
      if (state.coverFile) formData.append("cover_file", state.coverFile);

      const getOptionName = (options, id) =>
        options.find((opt) => opt.id === Number(id))?.name || "";

      formData.append(
        "binding_type",
        getOptionName(state.bindings, state.form.binding_id)
      );
      formData.append(
        "cover_finish",
        getOptionName(
          state.dropdowns.cover_finishes || [],
          state.form.cover_finish_id
        )
      );
      formData.append(
        "interior_color",
        getOptionName(
          state.dropdowns.interior_colors || [],
          state.form.interior_color_id
        )
      );
      formData.append(
        "paper_type",
        getOptionName(
          state.dropdowns.paper_types || [],
          state.form.paper_type_id
        )
      );

      if (!isCalendar)
        formData.append(
          "trim_size",
          getOptionName(
            state.dropdowns.trim_sizes || [],
            state.form.trim_size_id
          )
        );

      formData.append("page_count", state.form.page_count);

      const response = await axios.put(
        `${API_BASE}api/book/books/${projectId}/update/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) =>
            updateState({
              uploadProgress: Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              ),
            }),
        }
      );

      // localStorage.removeItem("projectData");

      if (response.data?.status === "success") {
        localStorage.setItem(
          "shopData",
          JSON.stringify({
            originalTotalCost: state.result?.original_total_cost ?? 0,
            finalTotalCost: state.result?.total_cost ?? 0,
            totalCost: state.result?.total_cost ?? 0,
            initialQuantity: state.form.quantity,
            costPerBook: state.result?.cost_per_book ?? 0,
          })
        );

        alert("Project updated successfully!");
        router.push("/shop");

        // Optionally, refresh or redirect
      } else {
        alert("Failed to update project.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating project.");
    }
  };

  const renderCalculatorOptions = () => {
    if (state.loading)
      return (
        <div className="text-center py-8 text-blue-700">
          Loading calculator options...
        </div>
      );

    const {
      interior_colors = [],
      paper_types = [],
      cover_finishes = [],
      trim_sizes = [],
    } = state.dropdowns;
    const isCalendar = state.projectData?.category === "Calender";

    if (!pdfjsLib && state.uploadStatus === "uploading") {
      return <p>Loading PDF processor...</p>;
    }

    return (
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
        {!isCalendar && (
          <div className="mb-6 md:mb-8 p-4 md:p-6 bg-gradient-to-r from-[#016AB3] via-[#0096CD] to-[#00AEDC] rounded-lg">
            <h3 className="text-white text-base md:text-lg font-semibold mb-3 md:mb-4">
              Book Size & Page Count
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-white text-xs md:text-sm font-medium mb-1 md:mb-2">
                  Trim Size
                </label>
                <select
                  name="trim_size_id"
                  value={state.form.trim_size_id}
                  onChange={handleChange}
                  className="w-full p-2 md:p-3 border border-gray-300 rounded-lg bg-white text-sm md:text-base"
                  required
                >
                  <option value="">Select Trim Size</option>
                  {trim_sizes.map((ts) => (
                    <option key={ts.id} value={ts.id}>
                      {ts.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white text-xs md:text-sm font-medium mb-1 md:mb-2">
                  Page Count
                </label>
                <input
                  type="number"
                  name="page_count"
                  value={state.form.page_count}
                  onChange={handleChange}
                  min="1"
                  max="800"
                  className="w-full p-2 md:p-3 border border-gray-300 rounded-lg bg-white text-sm md:text-base"
                  placeholder="Enter Page Count"
                  required
                />
              </div>
            </div>
          </div>
        )}

        <fieldset className="mb-6">
          <legend className="font-semibold text-[#2A428C] mb-4 text-lg">
            Binding Type
          </legend>
          <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#2A428C]">
            Paperback Options
          </h4>
          <div className="flex flex-wrap justify-start items-center gap-2 md:gap-3 lg:gap-4 max-w-3xl mx-auto mb-5 md:mb-6">
            {state.bindings
              .filter((opt) =>
                ["Coil Bound", "Saddle Stitch", "Perfect Bound"].includes(
                  opt.name
                )
              )
              .map((opt) => {
                const hasSize = Boolean(state.form.trim_size_id);
                const hasPage = Boolean(state.form.page_count);
                const isAvailable =
                  hasSize &&
                  hasPage &&
                  state.availableBindings.includes(opt.name);
                const isSelected =
                  String(state.form.binding_id) === String(opt.id);
                return (
                  <label
                    key={opt.id}
                    className={`relative cursor-pointer flex flex-col items-center w-20 md:w-24 lg:w-28 p-2 md:p-2.5 lg:p-3 border rounded-lg transition ${
                      isSelected
                        ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                        : "border-gray-300 bg-white"
                    } ${!isAvailable ? "opacity-40 cursor-not-allowed" : ""}`}
                    role="radio"
                    aria-checked={isSelected}
                    aria-disabled={!isAvailable}
                  >
                    <input
                      type="radio"
                      name="binding_id"
                      value={opt.id}
                      checked={isSelected}
                      onChange={isAvailable ? handleChange : undefined}
                      disabled={!isAvailable}
                      className="sr-only"
                    />
                    <span
                      className={`absolute top-2 left-2 w-4 h-4 rounded-full border-2 ${
                        isSelected ? "border-blue-600" : "border-gray-400"
                      }`}
                    >
                      <span
                        className={`block m-[2px] w-2.5 h-2.5 rounded-full ${
                          isSelected ? "bg-blue-600" : "bg-transparent"
                        }`}
                      ></span>
                    </span>
                    {(() => {
                      const src = IMAGE_MAPS.binding[opt.name];
                      return src ? (
                        <Image
                          src={src}
                          alt={opt.name}
                          className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain mb-1 md:mb-2"
                        />
                      ) : null;
                    })()}
                    <span className="text-center text-xs md:text-sm text-gray-700">
                      {opt.name}
                    </span>
                  </label>
                );
              })}
          </div>
          <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#2A428C]">
            Hardcover Options
          </h4>
          <div className="flex flex-wrap justify-start items-center gap-2 md:gap-3 lg:gap-4 max-w-3xl mx-auto">
            {state.bindings
              .filter((opt) => ["Case Wrap", "Linen Wrap"].includes(opt.name))
              .map((opt) => {
                const hasSize = Boolean(state.form.trim_size_id);
                const hasPage = Boolean(state.form.page_count);
                const isAvailable =
                  hasSize &&
                  hasPage &&
                  state.availableBindings.includes(opt.name);
                const isSelected =
                  String(state.form.binding_id) === String(opt.id);
                return (
                  <label
                    key={opt.id}
                    className={`relative cursor-pointer flex flex-col items-center w-20 md:w-24 lg:w-28 p-2 md:p-2.5 lg:p-3 border rounded-lg transition ${
                      isSelected
                        ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                        : "border-gray-300 bg-white"
                    } ${!isAvailable ? "opacity-40 cursor-not-allowed" : ""}`}
                    role="radio"
                    aria-checked={isSelected}
                    aria-disabled={!isAvailable}
                  >
                    <input
                      type="radio"
                      name="binding_id"
                      value={opt.id}
                      checked={isSelected}
                      onChange={isAvailable ? handleChange : undefined}
                      disabled={!isAvailable}
                      className="sr-only"
                    />
                    <span
                      className={`absolute top-2 left-2 w-4 h-4 rounded-full border-2 ${
                        isSelected ? "border-blue-600" : "border-gray-400"
                      }`}
                    >
                      <span
                        className={`block m-[2px] w-2.5 h-2.5 rounded-full ${
                          isSelected ? "bg-blue-600" : "bg-transparent"
                        }`}
                      ></span>
                    </span>
                    {(() => {
                      const src = IMAGE_MAPS.binding[opt.name];
                      return src ? (
                        <Image
                          src={src}
                          alt={opt.name}
                          className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain mb-1 md:mb-2"
                        />
                      ) : null;
                    })()}
                    <span className="text-center text-xs md:text-sm text-gray-700">
                      {opt.name}
                    </span>
                  </label>
                );
              })}
          </div>
        </fieldset>
        <OptionField
          title="Interior Color"
          name="interior_color_id"
          options={interior_colors}
          imageMap={IMAGE_MAPS.interiorColor}
          form={state.form}
          handleChange={handleChange}
          stepAccessible={Boolean(state.form.binding_id)}
        />
        <OptionField
          title="Paper Type"
          name="paper_type_id"
          options={paper_types}
          imageMap={IMAGE_MAPS.paperType}
          form={state.form}
          handleChange={handleChange}
          stepAccessible={Boolean(
            state.form.binding_id && state.form.interior_color_id
          )}
        />
        <OptionField
          title="Cover Finish"
          name="cover_finish_id"
          options={cover_finishes}
          imageMap={IMAGE_MAPS.coverFinish}
          form={state.form}
          handleChange={handleChange}
          stepAccessible={Boolean(
            state.form.binding_id &&
              state.form.interior_color_id &&
              state.form.paper_type_id
          )}
        />

        <div className="mt-6 md:mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
          <div className="flex gap-4 items-end flex-wrap">
            <div style={{ width: "240px", minWidth: 200 }}>
              <label className="block font-medium mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={state.form.quantity}
                onChange={handleChange}
                step={1}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <button
              onClick={handlePriceCalculation}
              disabled={state.calculating}
              className="flex-1 bg-[#F8C20A] hover:bg-[#ffd84a] text-[#2A428C] py-2 px-4 rounded font-bold transition min-w-[120px]"
            >
              {state.calculating ? "Calculating..." : "Calculate"}
            </button>
          </div>
          <div className="mt-4 p-3 bg-white border border-blue-100 rounded">
            <h4 className="font-semibold text-[#2A428C] mb-2">
              Bulk Discount Tiers
            </h4>
            <div className="space-y-1 text-sm">
              {DISCOUNTS.map((tier, idx) => {
                const min = tier.min;
                const next = DISCOUNTS[idx + 1]?.min;
                const label = next ? `${min}-${next - 1}` : `${min}+`;
                const q = Number(state.form.quantity) || 0;
                const active = q >= min && (!next || q < next);
                return (
                  <div
                    key={min}
                    className={`flex justify-between ${
                      active ? "font-semibold text-green-700" : "text-gray-700"
                    }`}
                  >
                    <span>{label} units:</span>
                    <span>{tier.percent}% off</span>
                  </div>
                );
              })}
            </div>
          </div>
          {state.result && (
            <div className="mt-4">
              <p>
                <strong>Cost per Book:</strong> $
                {Number(state.result.cost_per_book).toFixed(2)}
              </p>
              <p>
                <strong>Total (before discount):</strong> $
                {Number(
                  state.result.original_total_cost ?? state.result.total_cost
                ).toFixed(2)}
              </p>
              {state.result.discount_percent > 0 && (
                <>
                  <p className="text-green-700">
                    <strong>Bulk Discount:</strong>{" "}
                    {state.result.discount_percent}% (- $
                    {Number(state.result.discount_amount).toFixed(2)})
                  </p>
                  <p>
                    <strong>Final Total:</strong> $
                    {Number(state.result.total_cost).toFixed(2)}
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <NavBar navigate={router.push} />
      <div className="w-full min-h-screen px-4 md:px-6 py-6 md:py-10 bg-gradient-to-br from-[#eef4ff] to-[#fef6fb] font-sans">
        <div className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12 rounded-xl md:rounded-2xl shadow-xl bg-gradient-to-r from-[#ffe4ec] via-[#fdfdfd] to-[#e0f3ff] flex flex-col gap-6 md:gap-8 lg:gap-10">
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
              Design Your Project
            </div>
          </div>

          {state.projectData && (
            <ProjectDetails projectData={state.projectData} />
          )}

          <FileUpload
            fileError={state.fileError}
            selectedFile={state.selectedFile}
            uploadStatus={state.uploadStatus}
            uploadProgress={state.uploadProgress}
            handleFileChange={handleFileChange}
          />

          <div className="flex flex-col gap-3">
            <h2 className="text-[#2A428C] text-lg md:text-xl lg:text-[24px] font-bold">
              Book Configuration
            </h2>
            {renderCalculatorOptions()}
          </div>

          <CoverDesign
            coverFileInputRef={coverFileInputRef}
            handleCoverFileChange={handleCoverFileChange}
            coverFile={state.coverFile}
          />

          <div className="flex flex-col items-center gap-4 md:gap-6 mt-6 md:mt-10">
            <button
              onClick={handleContactExpert}
              disabled={!!state.coverFile}
              className={`w-full max-w-md md:max-w-lg lg:max-w-xl px-6 md:px-10 py-2 md:py-3 bg-gradient-to-r from-[#0a79f8] to-[#1e78ee] text-white font-medium text-sm md:text-base rounded-full shadow-md hover:shadow-lg transition ${
                state.coverFile ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Contact Cover Design Expert
            </button>

            <button
              onClick={() => {
                // Validate all required fields before proceeding
                const isCalendar = state.projectData?.category === "Calender";
                const requiredFields = isCalendar
                  ? [
                      "binding_id",
                      "interior_color_id",
                      "paper_type_id",
                      "cover_finish_id",
                    ]
                  : [
                      "trim_size_id",
                      "page_count",
                      "binding_id",
                      "interior_color_id",
                      "paper_type_id",
                      "cover_finish_id",
                    ];

                // Check if any required field is empty
                const missingFields = requiredFields.filter(
                  (field) => !state.form[field]
                );
                if (missingFields.length > 0) {
                  alert(
                    "Please complete all book configuration options before previewing."
                  );
                  return; // Stop execution if fields are missing
                }

                // Check if PDF file is uploaded
                if (!state.selectedFile) {
                  alert("Please upload your book PDF file first.");
                  return;
                }

                if (!state.coverFile) {
                  alert(
                    "Please upload your book cover design before previewing."
                  );
                  return;
                }

                // Save ALL necessary data to localStorage for the preview
                const reader = new FileReader();
                reader.onload = function (e) {
                  const pdfDataUrl = e.target.result; // This is the data URL

                  // Save PDF Data URL
                  localStorage.setItem("previewPdfDataUrl", pdfDataUrl);

                  // Save Form Data
                  localStorage.setItem(
                    "previewFormData",
                    JSON.stringify(state.form)
                  );

                  // Save Project Data
                  localStorage.setItem(
                    "previewProjectData",
                    JSON.stringify(state.projectData)
                  );

                  // Save shopData
                  const quantity = state.form.quantity || 0;
                  const originalTotalCost =
                    state.result?.original_total_cost ??
                    (state.result?.cost_per_book ?? 0) * quantity;
                  const finalTotalCost =
                    state.result?.total_cost ?? originalTotalCost;
                  localStorage.setItem(
                    "shopData",
                    JSON.stringify({
                      originalTotalCost: state.result?.original_total_cost ?? 0,
                      finalTotalCost: state.result?.total_cost ?? 0,
                      totalCost: state.result?.total_cost ?? 0,
                      initialQuantity: state.form.quantity,
                      costPerBook: state.result?.cost_per_book ?? 0,
                    })
                  );

                  // Save the actual File objects for final submission
                  window.tempBookFileForSubmission = state.selectedFile;
                  if (state.coverFile) {
                    window.tempCoverFileForSubmission = state.coverFile;
                  }

                  // Navigate to preview
                  const targetUrl = isEditUrl
                    ? "/book-preview?edit=true"
                    : "/book-preview";

                  router.push(targetUrl);
                };
                reader.onerror = function () {
                  alert("Failed to prepare PDF for preview.");
                };
                reader.readAsDataURL(state.selectedFile);
              }}
              className={`w-full max-w-md md:max-w-lg lg:max-w-xl px-6 md:px-10 py-2 md:py-3 bg-gradient-to-r from-[#0a79f8] to-[#1e78ee] text-white font-medium text-sm md:text-base rounded-full shadow-md hover:shadow-lg transition `}
            >
              Preview Your Book
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignProjectPreview;

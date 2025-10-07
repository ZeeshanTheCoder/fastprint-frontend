"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";

// Import images
import Book1 from "@/assets/images/book1.png";
import Book2 from "@/assets/images/Group.png";
import PerfectBoundImg from "@/assets/images/img58.png";
import CoilBoundImg from "@/assets/images/coill.jpg";
import SaddleImg from "@/assets/images/saddlee.jpg";
import CaseWrap from "@/assets/images/paperbackk.jpg";
import LinenWrap from "@/assets/images/linenn.jpg";
import StandardBlackandWhite from "@/assets/images/int1.png";
import PremiumBlackandWhite from "@/assets/images/in2.png";
import StandardColor from "@/assets/images/in3.png";
import PremiumColor from "@/assets/images/int4.png";
import Creamuncoated from "@/assets/images/pp1.jpg";
import Whiteuncoated from "@/assets/images/pp2.jpg";
import Whitecoated from "@/assets/images/pp3.jpg";
import Whitecoatedd from "@/assets/images/pp4.jpg";
import Glossy from "@/assets/images/gggg.jpg";
import Matty from "@/assets/images/mmmm.jpg";
import RightImage from "@/assets/images/right.png";

// Components
import Carousel from "@/components/Carousel";
import RedirectButton from "@/components/RedirectButton";

import ShippingEstimate from "@/components/ShippingEstimate";
import PricingBanner from "@/components/PricingBanner";

// Constants
const BOOK_SIZES = [
  "Pocket Book (4.25 x 6.875 in / 108 x 175 mm)",
  "Novella (5 x 8 in / 127 x 203 mm)",
  "Digest (5.5 x 8.5 in / 140 x 216 mm)",
  "A5 (5.83 x 8.27 in / 148 x 210 mm)",
  "US Trade (6 x 9 in / 152 x 229 mm)",
  "Royal (6.14 x 9.21 in / 156 x 234 mm)",
  "Executive (7 x 10 in / 178 x 254 mm)",
  "Crown Quarto (7.44 x 9.68 in / 189 x 246 mm)",
  "Small Square (7.5 x 7.5 in / 190 x 190 mm)",
  "A4 (8.27 x 11.69 in / 210 x 297 mm)",
  "Square (8.5 x 8.5 in / 216 x 216 mm)",
  "US Letter (8.5 x 11 in / 216 x 279 mm)",
  "Small Landscape (9 x 7 in / 229 x 178 mm)",
  "US Letter Landscape (11 x 8.5 in / 279 x 216 mm)",
  "A4 Landscape (11.69 x 8.27 in / 297 x 210 mm)",
];

const BINDING_RULES = {
  "Coil Bound": {
    minPages: 3,
    maxPages: 470,
    img: CoilBoundImg,
    type: "paperback",
  },
  "Saddle Stitch": {
    minPages: 4,
    maxPages: 48,
    img: SaddleImg,
    type: "paperback",
  },
  "Perfect Bound": {
    minPages: 32,
    maxPages: 800,
    img: PerfectBoundImg,
    type: "paperback",
  },
  "Case Wrap": {
    minPages: 24,
    maxPages: 800,
    img: CaseWrap,
    type: "hardcover",
  },
  "Linen Wrap": {
    minPages: 32,
    maxPages: 800,
    img: LinenWrap,
    type: "hardcover",
  },
};

const SPECIAL_SIZE_RULES = {
  "Small Landscape (9 x 7 in / 229 x 178 mm)": {
    "Saddle Stitch": { minPages: 4, maxPages: 48 },
  },
  "US Letter Landscape (11 x 8.5 in / 279 x 216 mm)": {
    "Perfect Bound": { minPages: 32, maxPages: 250 },
  },
  "A4 Landscape (11.69 x 8.27 in / 297 x 210 mm)": {
    "Perfect Bound": { minPages: 32, maxPages: 250 },
    "Saddle Stitch": { minPages: 4, maxPages: 48 },
  },
};

const OPTIONS_CONFIG = {
  interiorColor: [
    {
      name: "Standard Black and White",
      img: StandardBlackandWhite,
      dbName: "Standard Black & White",
    },
    {
      name: "Premium Black and White",
      img: PremiumBlackandWhite,
      dbName: "Premium Black & White",
    },
    { name: "Standard Color", img: StandardColor, dbName: "Standard Color" },
    { name: "Premium Color", img: PremiumColor, dbName: "Premium Color" },
  ],
  paperType: [
    {
      name: "60# Cream Uncoated",
      img: Creamuncoated,
      dbName: "60# Cream-Uncoated",
    },
    {
      name: "60# White Uncoated",
      img: Whiteuncoated,
      dbName: "60# White-Uncoated",
    },
    { name: "80# White Coated", img: Whitecoated, dbName: "80# White-Coated" },
    {
      name: "100# White Coated",
      img: Whitecoatedd,
      dbName: "100# White-Coated",
    },
  ],
  coverFinish: [
    { name: "Glossy", img: Glossy, dbName: "Gloss" },
    { name: "Matte", img: Matty, dbName: "Matte" },
  ],
};

const createPricing = (b, ic, pt, cf) => ({
  binding: b,
  interiorColor: ic,
  paperType: pt,
  coverFinish: cf,
});

const SIZE_SPECIFIC_PRICING = {
  "Pocket Book (4.25 x 6.875 in / 108 x 175 mm)": createPricing(
    {
      "Perfect Bound": 1.91,
      "Saddle Stitch": 3.59,
      "Case Wrap": 9.86,
      "Linen Wrap": 6.0,
      "Coil Bound": 5.9,
    },
    {
      "Standard Black & White": 0.01,
      "Premium Black & White": 0.02,
      "Standard Color": 0.03,
      "Premium Color": 0.04,
    },
    {
      "60# Cream-Uncoated": 0.01,
      "60# White-Uncoated": 0.01,
      "80# White-Coated": 0.02,
      "100# White-Coated": 0.02,
    },
    { Gloss: 0.1, Matte: 0.1 }
  ),
  "Novella (5 x 8 in / 127 x 203 mm)": createPricing(
    {
      "Perfect Bound": 1.97,
      "Saddle Stitch": 3.5,
      "Case Wrap": 9.8,
      "Linen Wrap": 0,
      "Coil Bound": 5.76,
    },
    {
      "Standard Black & White": 0.01,
      "Premium Black & White": 0.02,
      "Standard Color": 0.03,
      "Premium Color": 0.1,
    },
    {
      "60# Cream-Uncoated": 0.01,
      "60# White-Uncoated": 0.01,
      "80# White-Coated": 0.02,
      "100# White-Coated": 0.02,
    },
    { Gloss: 0, Matte: 0 }
  ),
  "Digest (5.5 x 8.5 in / 140 x 216 mm)": createPricing(
    {
      "Perfect Bound": 1.9,
      "Saddle Stitch": 3.5,
      "Case Wrap": 9.8,
      "Linen Wrap": 13.75,
      "Coil Bound": 5.95,
    },
    {
      "Standard Black & White": 0.01,
      "Premium Black & White": 0.02,
      "Standard Color": 0.03,
      "Premium Color": 0.1,
    },
    {
      "60# Cream-Uncoated": 0.01,
      "60# White-Uncoated": 0.01,
      "80# White-Coated": 0.02,
      "100# White-Coated": 0.02,
    },
    { Gloss: 0, Matte: 0 }
  ),
  "A5 (5.83 x 8.27 in / 148 x 210 mm)": createPricing(
    {
      "Perfect Bound": 1.9,
      "Saddle Stitch": 3.46,
      "Case Wrap": 9.8,
      "Linen Wrap": 13.75,
      "Coil Bound": 5.8,
    },
    {
      "Standard Black & White": 0.01,
      "Premium Black & White": 0.02,
      "Standard Color": 0.03,
      "Premium Color": 0.1,
    },
    {
      "60# Cream-Uncoated": 0.01,
      "60# White-Uncoated": 0.01,
      "80# White-Coated": 0.02,
      "100# White-Coated": 0.02,
    },
    { Gloss: 0, Matte: 0 }
  ),
  "US Trade (6 x 9 in / 152 x 229 mm)": createPricing(
    {
      "Perfect Bound": 1.71,
      "Saddle Stitch": 3.46,
      "Case Wrap": 9.96,
      "Linen Wrap": 13.5,
      "Coil Bound": 5.96,
    },
    {
      "Standard Black & White": 0.01,
      "Premium Black & White": 0.02,
      "Standard Color": 0.03,
      "Premium Color": 0.1,
    },
    {
      "60# Cream-Uncoated": 0.01,
      "60# White-Uncoated": 0.01,
      "80# White-Coated": 0.02,
      "100# White-Coated": 0.02,
    },
    { Gloss: 0, Matte: 0 }
  ),
  "Royal (6.14 x 9.21 in / 156 x 234 mm)": createPricing(
    {
      "Perfect Bound": 1.71,
      "Saddle Stitch": 3.46,
      "Case Wrap": 9.96,
      "Linen Wrap": 13.5,
      "Coil Bound": 5.96,
    },
    {
      "Standard Black & White": 0.01,
      "Premium Black & White": 0.02,
      "Standard Color": 0.03,
      "Premium Color": 0.1,
    },
    {
      "60# Cream-Uncoated": 0.01,
      "60# White-Uncoated": 0.01,
      "80# White-Coated": 0.02,
      "100# White-Coated": 0.02,
    },
    { Gloss: 0.2, Matte: 0.2 }
  ),
  "Executive (7 x 10 in / 178 x 254 mm)": createPricing(
    {
      "Perfect Bound": 2.0,
      "Saddle Stitch": 4.1,
      "Case Wrap": 10.0,
      "Linen Wrap": 13.95,
      "Coil Bound": 6.4,
    },
    {
      "Standard Black & White": 0.02,
      "Premium Black & White": 0.03,
      "Standard Color": 0.04,
      "Premium Color": 0.16,
    },
    {
      "60# Cream-Uncoated": 0.01,
      "60# White-Uncoated": 0.01,
      "80# White-Coated": 0.02,
      "100# White-Coated": 0.02,
    },
    { Gloss: 0, Matte: 0 }
  ),
  "Crown Quarto (7.44 x 9.68 in / 189 x 246 mm)": createPricing(
    {
      "Perfect Bound": 2.0,
      "Saddle Stitch": 4.1,
      "Case Wrap": 10.0,
      "Linen Wrap": 13.95,
      "Coil Bound": 6.4,
    },
    {
      "Standard Black & White": 0.02,
      "Premium Black & White": 0.03,
      "Standard Color": 0.04,
      "Premium Color": 0.16,
    },
    {
      "60# Cream-Uncoated": 0.01,
      "60# White-Uncoated": 0.01,
      "80# White-Coated": 0.02,
      "100# White-Coated": 0.02,
    },
    { Gloss: 0.05, Matte: 0.05 }
  ),
  "Small Square (7.5 x 7.5 in / 190 x 190 mm)": createPricing(
    {
      "Perfect Bound": 2.0,
      "Saddle Stitch": 4.1,
      "Case Wrap": 10.0,
      "Linen Wrap": 13.5,
      "Coil Bound": 6.4,
    },
    {
      "Standard Black & White": 0.02,
      "Premium Black & White": 0.03,
      "Standard Color": 0.04,
      "Premium Color": 0.16,
    },
    {
      "60# Cream-Uncoated": 0.01,
      "60# White-Uncoated": 0.01,
      "80# White-Coated": 0.03,
      "100# White-Coated": 0.03,
    },
    { Gloss: 0, Matte: 0 }
  ),
  "A4 (8.27 x 11.69 in / 210 x 297 mm)": createPricing(
    {
      "Perfect Bound": 2.1,
      "Saddle Stitch": 3.82,
      "Case Wrap": 9.75,
      "Linen Wrap": 13.8,
      "Coil Bound": 6.18,
    },
    {
      "Standard Black & White": 0.02,
      "Premium Black & White": 0.03,
      "Standard Color": 0.04,
      "Premium Color": 0.16,
    },
    {
      "60# Cream-Uncoated": 0.01,
      "60# White-Uncoated": 0.01,
      "80# White-Coated": 0.03,
      "100# White-Coated": 0.03,
    },
    { Gloss: 0.2, Matte: 0.2 }
  ),
  "Square (8.5 x 8.5 in / 216 x 216 mm)": createPricing(
    {
      "Perfect Bound": 2.0,
      "Saddle Stitch": 3.82,
      "Case Wrap": 9.75,
      "Linen Wrap": 13.8,
      "Coil Bound": 6.18,
    },
    {
      "Standard Black & White": 0.02,
      "Premium Black & White": 0.03,
      "Standard Color": 0.04,
      "Premium Color": 0.16,
    },
    {
      "60# Cream-Uncoated": 0.01,
      "60# White-Uncoated": 0.01,
      "80# White-Coated": 0.03,
      "100# White-Coated": 0.03,
    },
    { Gloss: 0.2, Matte: 0.2 }
  ),
  "US Letter (8.5 x 11 in / 216 x 279 mm)": createPricing(
    {
      "Perfect Bound": 2.0,
      "Saddle Stitch": 3.82,
      "Case Wrap": 9.75,
      "Linen Wrap": 13.8,
      "Coil Bound": 6.18,
    },
    {
      "Standard Black & White": 0.02,
      "Premium Black & White": 0.03,
      "Standard Color": 0.04,
      "Premium Color": 0.16,
    },
    {
      "60# Cream-Uncoated": 0.01,
      "60# White-Uncoated": 0.01,
      "80# White-Coated": 0.03,
      "100# White-Coated": 0.03,
    },
    { Gloss: 0.2, Matte: 0.2 }
  ),
  "Small Landscape (9 x 7 in / 229 x 178 mm)": createPricing(
    {
      "Perfect Bound": 2.0,
      "Saddle Stitch": 3.82,
      "Case Wrap": 9.75,
      "Linen Wrap": 13.8,
      "Coil Bound": 6.18,
    },
    {
      "Standard Black & White": 0.02,
      "Premium Black & White": 0.03,
      "Standard Color": 0.04,
      "Premium Color": 0.16,
    },
    {
      "60# Cream-Uncoated": 0.01,
      "60# White-Uncoated": 0.01,
      "80# White-Coated": 0.03,
      "100# White-Coated": 0.03,
    },
    { Gloss: 0.2, Matte: 0.2 }
  ),
  "US Letter Landscape (11 x 8.5 in / 279 x 216 mm)": createPricing(
    {
      "Perfect Bound": 2.0,
      "Saddle Stitch": 3.82,
      "Case Wrap": 9.75,
      "Linen Wrap": 18.0,
      "Coil Bound": 6.22,
    },
    {
      "Standard Black & White": 0.02,
      "Premium Black & White": 0.03,
      "Standard Color": 0.04,
      "Premium Color": 0.16,
    },
    {
      "60# Cream-Uncoated": 0.01,
      "60# White-Uncoated": 0.01,
      "80# White-Coated": 0.03,
      "100# White-Coated": 0.03,
    },
    { Gloss: 0.1, Matte: 0.1 }
  ),
  "A4 Landscape (11.69 x 8.27 in / 297 x 210 mm)": createPricing(
    {
      "Perfect Bound": 2.0,
      "Saddle Stitch": 5.0,
      "Case Wrap": 9.75,
      "Linen Wrap": 13.8,
      "Coil Bound": 6.18,
    },
    {
      "Standard Black & White": 0.02,
      "Premium Black & White": 0.03,
      "Standard Color": 0.04,
      "Premium Color": 0.16,
    },
    {
      "60# Cream-Uncoated": 0.01,
      "60# White-Uncoated": 0.01,
      "80# White-Coated": 0.03,
      "100# White-Coated": 0.03,
    },
    { Gloss: 0.1, Matte: 0.1 }
  ),
};

const DISCOUNTS = [
  { min: 1000, percent: 15 },
  { min: 500, percent: 10 },
  { min: 100, percent: 5 },
];

// Utility Functions
const getAvailableBindings = (pageCount, bookSize) => {
  if (!pageCount || pageCount < 2) return [];
  const specialRules = SPECIAL_SIZE_RULES[bookSize];
  return Object.entries(BINDING_RULES).reduce(
    (acc, [bindingName, generalRule]) => {
      const rule = specialRules?.[bindingName] || generalRule;
      if (pageCount >= rule.minPages && pageCount <= rule.maxPages)
        acc.push(bindingName);
      return acc;
    },
    []
  );
};

const calculatePrice = (formData) => {
  const {
    bookSize,
    page_count,
    binding_id,
    interior_color_id,
    paper_type_id,
    cover_finish_id,
    quantity,
  } = formData;
  if (
    !bookSize ||
    !page_count ||
    !binding_id ||
    !interior_color_id ||
    !paper_type_id ||
    !cover_finish_id
  )
    return null;

  const sizePricing = SIZE_SPECIFIC_PRICING[bookSize];
  if (!sizePricing) return null;

  const unitPrice =
    (sizePricing.binding[binding_id] || 0) +
    (sizePricing.interiorColor[interior_color_id] || 0) * page_count +
    (sizePricing.paperType[paper_type_id] || 0) * page_count +
    (sizePricing.coverFinish[cover_finish_id] || 0);

  const totalPrice = unitPrice * quantity;
  const discount = DISCOUNTS.find((d) => quantity >= d.min);
  const discountAmount = discount ? totalPrice * (discount.percent / 100) : 0;

  return {
    unitPrice: unitPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
    discount: discountAmount.toFixed(2),
    discountPercent: discount?.percent || 0,
    finalPrice: (totalPrice - discountAmount).toFixed(2),
  };
};

// Reusable Components
const OptionCard = ({
  item,
  fieldName,
  fieldValue,
  onSelect,
  isAvailable,
  stepAccessible,
  hasDbName = false,
}) => {
  const canSelect = isAvailable && stepAccessible;
  const opacity = !stepAccessible ? 0.3 : !isAvailable ? 0.5 : 1;
  const value = hasDbName ? item.dbName : item.name;

  return (
    <label
      className={`flex flex-col items-center cursor-pointer relative w-20 sm:w-24 ${
        !canSelect ? "cursor-not-allowed" : ""
      }`}
      style={{ opacity }}
    >
      <div className="relative w-full">
        <input
          type="radio"
          name={fieldName}
          value={value}
          checked={fieldValue === value}
          onChange={() => canSelect && onSelect(value)}
          disabled={!canSelect}
          className="absolute top-1 left-1 z-10 w-3 h-3"
        />
        <Image
          src={item.img}
          alt={item.name}
          className="w-full h-auto object-contain mb-2 mt-3 rounded"
          width={120}
          height={120}
          unoptimized
        />
      </div>
      <p className="text-xs sm:text-sm text-[#2A428C] text-center px-1">
        {item.name}
      </p>
    </label>
  );
};

const SectionTitle = ({ children }) => (
  <>
    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 text-[#2A428C]">
      {children}
    </h2>
    <div className="w-full h-0.5 bg-gray-200 mb-4 sm:mb-6"></div>
  </>
);

const OptionSection = ({
  title,
  options,
  fieldName,
  fieldValue,
  onSelect,
  isAvailable,
  stepAccessible,
  hasDbName = false,
}) => (
  <>
    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#2A428C]">
      {title}
    </h3>
    <div className="flex gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 flex-wrap">
      {options.map((item, idx) => (
        <OptionCard
          key={idx}
          item={item}
          fieldName={fieldName}
          fieldValue={fieldValue}
          onSelect={onSelect}
          isAvailable={
            typeof isAvailable === "function" ? isAvailable(item) : isAvailable
          }
          stepAccessible={stepAccessible}
          hasDbName={hasDbName}
        />
      ))}
    </div>
  </>
);

const FormSelect = ({
  name,
  value,
  onChange,
  options,
  placeholder,
  className = "",
}) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className={`w-full border px-3 py-2 rounded ${className}`}
    required
  >
    <option value="">{placeholder}</option>
    {options.map((option, idx) => (
      <option key={idx} value={option}>
        {option}
      </option>
    ))}
  </select>
);

const FormInput = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className = "",
  disabled = false,
  ...props
}) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full border px-3 py-2 rounded ${className} ${
      disabled ? "bg-gray-100" : "bg-white"
    }`}
    disabled={disabled}
    required
    {...props}
  />
);

const SummaryRow = ({ pairs }) => {
  const [leftPair, rightPair] = pairs;

  return (
    <div className="flex justify-between items-center mb-2 text-sm">
      {/* Left-aligned item */}
      <div>
        <p className="font-semibold text-gray-600">{leftPair[0]}</p>
        <p className="text-black">{leftPair[1]}</p>
      </div>

      {/* Right-aligned item */}
      <div className="text-right">
        <p className="font-semibold text-gray-600">{rightPair[0]}</p>
        <p className="text-black">{rightPair[1]}</p>
      </div>
    </div>
  );
};

const PhotoBookCalculator = () => {
  const [form, setForm] = useState({
    bookSize: "",
    page_count: "",
    binding_id: "",
    interior_color_id: "",
    paper_type_id: "",
    cover_finish_id: "",
    quantity: 1,
  });

  const [result, setResult] = useState(null);

  const availableBindings = useMemo(
    () => getAvailableBindings(Number(form.page_count), form.bookSize),
    [form.page_count, form.bookSize]
  );

  const stepAccessibility = useMemo(
    () => ({
      bookSize: true,
      pageCount: form.bookSize !== "",
      binding: form.bookSize !== "" && form.page_count !== "",
      interiorColor:
        form.bookSize !== "" &&
        form.page_count !== "" &&
        form.binding_id !== "",
      paperType:
        form.bookSize !== "" &&
        form.page_count !== "" &&
        form.binding_id !== "" &&
        form.interior_color_id !== "",
      coverFinish:
        form.bookSize !== "" &&
        form.page_count !== "" &&
        form.binding_id !== "" &&
        form.interior_color_id !== "" &&
        form.paper_type_id !== "",
    }),
    [form]
  );

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let val = value;

    if (type === "number") {
      val = value === "" ? "" : Number(value);
      // Clamp page_count to 800
      if (name === "page_count" && val > 800) {
        val = 800;
      }
    }

    const resetFields = {
      bookSize: [
        "page_count",
        "binding_id",
        "interior_color_id",
        "paper_type_id",
        "cover_finish_id",
      ],
      page_count: [
        "binding_id",
        "interior_color_id",
        "paper_type_id",
        "cover_finish_id",
      ],
      binding_id: ["interior_color_id", "paper_type_id", "cover_finish_id"],
      interior_color_id: ["paper_type_id", "cover_finish_id"],
      paper_type_id: ["cover_finish_id"],
    };
    setForm((prev) => {
      const newForm = { ...prev, [name]: val };
      resetFields[name]?.forEach((field) => {
        newForm[field] = "";
      });
      return newForm;
    });
    setResult(null);
  };

  const handleBindingSelect = (value) => {
    setForm((prev) => ({
      ...prev,
      binding_id: value,
      interior_color_id: "",
      paper_type_id: "",
      cover_finish_id: "",
    }));
    setResult(null);
  };

  useEffect(() => {
    if (form.binding_id && !availableBindings.includes(form.binding_id)) {
      setForm((prev) => ({
        ...prev,
        binding_id: "",
        interior_color_id: "",
        paper_type_id: "",
        cover_finish_id: "",
      }));
    }
  }, [availableBindings, form.binding_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.bookSize ||
      !form.page_count ||
      !form.binding_id ||
      !form.interior_color_id ||
      !form.paper_type_id ||
      !form.cover_finish_id ||
      form.quantity <= 0
    ) {
      alert(
        "Please fill in all required fields and ensure quantity is positive."
      );
      return;
    }
    setResult(calculatePrice(form));
  };

  // Group binding types by paperback and hardcover
  const paperbackBindings = Object.entries(BINDING_RULES)
    .filter(([, rule]) => rule.type === "paperback")
    .map(([name, rule]) => ({ name, img: rule.img }));

  const hardcoverBindings = Object.entries(BINDING_RULES)
    .filter(([, rule]) => rule.type === "hardcover")
    .map(([name, rule]) => ({ name, img: rule.img }));

  return (
    <>
      <PricingBanner />
      <Carousel />

      <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-8 flex flex-col xl:flex-row gap-6 xl:gap-8">
        {/* Left Side - Form */}
        <div className="w-full xl:w-3/5 bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 lg:p-8 rounded-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#2A428C]">
            Photo Book
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Book Size & Page Count */}
            <div className="flex flex-col gap-4 p-4 mb-8 bg-gradient-to-r from-[#016AB3] via-[#0096CD] to-[#00AEDC] rounded-2xl">
              <h3 className="text-white text-lg font-semibold">
                Book Size & Page Count
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2 flex flex-col">
                  <div className="h-5 mb-1">
                    <p className="text-xs text-white opacity-90">Book Size</p>
                  </div>
                  <FormSelect
                    name="bookSize"
                    value={form.bookSize}
                    onChange={handleChange}
                    options={BOOK_SIZES}
                    placeholder="Select Book Size"
                    className="h-12 bg-white"
                  />
                </div>
                <div className="w-full sm:w-1/2 flex flex-col">
                  <div className="h-5 mb-1">
                    <p className="text-xs text-white opacity-90">
                      {form.bookSize
                        ? "MIN-MAX: 2 - 800"
                        : "Select book size first"}
                    </p>
                  </div>
                  <FormInput
                    name="page_count"
                    value={form.page_count}
                    onChange={handleChange}
                    type="number"
                    placeholder="Enter Page Count"
                    min={2}
                    max={800} // already set
                    className="h-12 bg-white text-black rounded-md"
                    disabled={!stepAccessibility.pageCount}
                  />
                </div>
              </div>
            </div>

            {/* Binding Types */}
            <SectionTitle>Binding Types</SectionTitle>

            <OptionSection
              title="Paperback Options"
              options={paperbackBindings}
              fieldName="binding_id"
              fieldValue={form.binding_id}
              onSelect={handleBindingSelect}
              isAvailable={(item) => availableBindings.includes(item.name)}
              stepAccessible={stepAccessibility.binding}
            />

            <OptionSection
              title="Hardcover Options"
              options={hardcoverBindings}
              fieldName="binding_id"
              fieldValue={form.binding_id}
              onSelect={handleBindingSelect}
              isAvailable={(item) => availableBindings.includes(item.name)}
              stepAccessible={stepAccessibility.binding}
            />

            {/* Interior Color */}
            <SectionTitle>Interior Color</SectionTitle>
            <OptionSection
              options={OPTIONS_CONFIG.interiorColor}
              fieldName="interior_color_id"
              fieldValue={form.interior_color_id}
              onSelect={(value) =>
                setForm((prev) => ({ ...prev, interior_color_id: value }))
              }
              isAvailable={(item) =>
                SIZE_SPECIFIC_PRICING[form.bookSize]?.interiorColor[
                  item.dbName
                ] !== undefined
              }
              stepAccessible={stepAccessibility.interiorColor}
              hasDbName={true}
            />

            {/* Paper Type */}
            <SectionTitle>Paper Type</SectionTitle>
            <OptionSection
              options={OPTIONS_CONFIG.paperType}
              fieldName="paper_type_id"
              fieldValue={form.paper_type_id}
              onSelect={(value) =>
                setForm((prev) => ({ ...prev, paper_type_id: value }))
              }
              isAvailable={(item) =>
                SIZE_SPECIFIC_PRICING[form.bookSize]?.paperType[item.dbName] !==
                undefined
              }
              stepAccessible={stepAccessibility.paperType}
              hasDbName={true}
            />

            {/* Cover Finish */}
            <SectionTitle>Cover Finish</SectionTitle>
            <OptionSection
              options={OPTIONS_CONFIG.coverFinish}
              fieldName="cover_finish_id"
              fieldValue={form.cover_finish_id}
              onSelect={(value) =>
                setForm((prev) => ({ ...prev, cover_finish_id: value }))
              }
              isAvailable={(item) =>
                SIZE_SPECIFIC_PRICING[form.bookSize]?.coverFinish[
                  item.dbName
                ] !== undefined
              }
              stepAccessible={stepAccessibility.coverFinish}
              hasDbName={true}
            />

            {/* Quantity & Results */}
            <div className="flex flex-col gap-4 p-4 bg-gradient-to-r from-[#016AB3] via-[#0096CD] to-[#00aedc] rounded-2xl">
              <h3 className="text-white text-lg font-semibold">
                Quantity & Shipping Estimate
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <p className="text-xs text-white opacity-90 mb-1">Quantity</p>
                  <FormInput
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    type="number"
                    placeholder="Enter Quantity"
                    min="1"
                    className="h-12 bg-white text-black rounded-md"
                  />
                </div>
                <div className="w-full sm:w-1/2 flex items-end">
                  <button
                    type="submit"
                    className="w-full h-12 bg-[#F8C20A] hover:bg-yellow-500 text-black font-semibold rounded-md transition-colors"
                  >
                    Calculate Price
                  </button>
                </div>
              </div>

              {result && (
                <div className="bg-white/20 rounded-lg p-4 text-white">
                  <h4 className="font-semibold mb-2">Pricing Results:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Unit Price:</span>
                      <span>${result.unitPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total ({form.quantity} books):</span>
                      <span>${result.totalPrice}</span>
                    </div>
                    {result.discount > 0 && (
                      <>
                        <div className="flex justify-between text-green-200">
                          <span>Discount ({result.discountPercent}%):</span>
                          <span>-${result.discount}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-yellow-200">
                          <span>Final Price:</span>
                          <span>${result.finalPrice}</span>
                        </div>
                      </>
                    )}
                    {form.quantity >= 100 && (
                      <div className="mt-2 text-xs text-green-200">
                        ✓ Bulk discount applied!{" "}
                        {form.quantity >= 1000
                          ? " (15% off)"
                          : form.quantity >= 500
                          ? " (10% off)"
                          : " (5% off)"}
                      </div>
                    )}
                  </div>
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-semibold text-[#2A428C] mb-2">
                      Bulk Discount Tiers
                    </h3>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>100-499 books:</span>
                        <span
                          className={
                            form.quantity >= 100 && form.quantity < 500
                              ? "font-semibold text-green-600"
                              : ""
                          }
                        >
                          5% off
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>500-999 books:</span>
                        <span
                          className={
                            form.quantity >= 500 && form.quantity < 1000
                              ? "font-semibold text-green-600"
                              : ""
                          }
                        >
                          10% off
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>1000+ books:</span>
                        <span
                          className={
                            form.quantity >= 1000
                              ? "font-semibold text-green-600"
                              : ""
                          }
                        >
                          15% off
                        </span>
                      </div>
                    </div>
                  </div>
                  <ShippingEstimate bookSpecs={form} pricingResult={result} />{" "}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Right Side - Summary */}
        <div className="w-full xl:w-2/5">
          <div className="sticky top-8 bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg">
            <Image
              src={RightImage}
              alt="High Quality Book"
              className="w-full h-32 sm:h-40 lg:h-48 object-cover mb-4 rounded"
              width={400}
              height={160}
              unoptimized
            />
            <h2 className="text-lg sm:text-xl font-bold text-[#2A428C] mb-2 text-center">
              High-Quality Photo Book Printing
            </h2>
            <div className="w-full h-0.5 bg-gray-300 mb-4"></div>
            {[
              [
                ["Book Size", form.bookSize || "-"],
                ["Page Count", form.page_count || "-"],
              ],
              [
                ["Binding Type", form.binding_id || "-"],
                ["Interior Color", form.interior_color_id || "-"],
              ],
              [
                ["Paper Type", form.paper_type_id || "-"],
                ["Cover Finish", form.cover_finish_id || "-"],
              ],
            ].map((row, i) => (
              <React.Fragment key={i}>
                <SummaryRow pairs={row} />
                <div
                  className={`w-full h-px bg-gray-200 ${
                    i === 2 ? "my-4" : "my-2"
                  }`}
                ></div>
              </React.Fragment>
            ))}
            <div className="flex justify-center mt-6">
              <div className="w-full max-w-xs">
                <RedirectButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoBookCalculator;

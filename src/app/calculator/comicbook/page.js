"use client";

import React, { useState, useMemo, useEffect } from "react";

import PerfectBoundImg from "@/assets/images/img58.png";
import Book1 from "@/assets/images/book1.png";
import Book2 from "@/assets/images/Group.png";
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

import Carousel from "@/components/Carousel";

import RedirectButton from "@/components/RedirectButton";
import ShippingEstimate from "@/components/ShippingEstimate";
import PricingBanner from "@/components/PricingBanner";
import Image from "next/image";

// Hardcoded data based on your comic book logic
const COMIC_TRIM_SIZES = [
  { id: 1, name: "Comic Book (6.625 x 10.25 in / 168 x 260 mm)" },
  { id: 2, name: "Larger Deluxe: (7 x 10.875 in / 177.8 mm x 276.23 mm)" },
  {
    id: 3,
    name: "Manga (Japanese Style Comics): (5 x 7.5 in / 127 mm x 190.5 mm)",
  },
];

const INTERIOR_COLORS = [
  {
    id: 1,
    name: "Premium Black & White",
    price: 0.0325,
    dbName: "Premium Black & White",
  },
  { id: 2, name: "Premium Color", price: 0.19, dbName: "Premium Color" },
];

const PAPER_TYPES = [
  {
    id: 1,
    name: "70# White-Uncoated",
    price: 0.02,
    dbName: "70# White-Uncoated",
  },
  {
    id: 2,
    name: "60# Cream-Uncoated",
    price: 0.01,
    dbName: "60# Cream-Uncoated",
  },
  {
    id: 3,
    name: "60# White-Uncoated",
    price: 0.01,
    dbName: "60# White-Uncoated",
  },
  { id: 4, name: "80# White-Coated", price: 0.03, dbName: "80# White-Coated" },
];

const COVER_FINISHES = [
  { id: 1, name: "Gloss", price: 0.0, dbName: "Gloss" },
  { id: 2, name: "Matte", price: 0.0, dbName: "Matte" },
];

// Binding pricing based on trim size
const BINDING_PRICES = {
  1: {
    // Comic Book (6.625 x 10.25 in / 168 x 260 mm)
    "Perfect Bound": 2.5,
    "Saddle Stitch": 5.0,
    "Case Wrap": 9.75,
    "Linen Wrap": 13.8,
    "Coil Bound": 6.18,
  },
  2: {
    // Larger Deluxe: (7 x 10.875 in / 177.8 mm x 276.23 mm)
    "Perfect Bound": 3.0,
    "Saddle Stitch": 5.0,
    "Case Wrap": 9.75,
    "Linen Wrap": 13.8,
    "Coil Bound": 6.18,
  },
  3: {
    // Manga (Japanese Style Comics): (5 x 7.5 in / 127 mm x 190.5 mm)
    "Perfect Bound": 2.5,
    "Saddle Stitch": 5.0,
    "Case Wrap": 9.75,
    "Linen Wrap": 13.8,
    "Coil Bound": 6.18,
  },
};

// Binding availability rules based on page count
const BINDING_RULES = {
  "Coil Bound": { minPages: 3, type: "paperback" },
  "Saddle Stitch": { minPages: 4, type: "paperback" },
  "Perfect Bound": { minPages: 32, type: "paperback" },
  "Case Wrap": { minPages: 24, type: "hardcover" },
  "Linen Wrap": { minPages: 32, type: "hardcover" },
};

// Get available bindings based on page count
const getAvailableBindings = (pageCount) => {
  if (!pageCount || pageCount < 3) return [];

  const available = [];
  Object.entries(BINDING_RULES).forEach(([bindingName, rule]) => {
    if (pageCount >= rule.minPages) {
      available.push(bindingName);
    }
  });

  return available;
};

// Calculate price
const calculatePrice = (formData) => {
  const {
    trim_size_id,
    page_count,
    binding_id,
    interior_color_id,
    paper_type_id,
    cover_finish_id,
    quantity,
  } = formData;

  if (
    !trim_size_id ||
    !page_count ||
    !binding_id ||
    !interior_color_id ||
    !paper_type_id ||
    !cover_finish_id ||
    !quantity
  ) {
    return null;
  }

  // Get prices
  const bindingPrice = BINDING_PRICES[trim_size_id]?.[binding_id] || 0;
  const interiorColorPrice =
    INTERIOR_COLORS.find((ic) => ic.dbName === interior_color_id)?.price || 0;
  const paperTypePrice =
    PAPER_TYPES.find((pt) => pt.dbName === paper_type_id)?.price || 0;
  const coverFinishPrice =
    COVER_FINISHES.find((cf) => cf.dbName === cover_finish_id)?.price || 0;

  // Calculate unit price
  const unitPrice =
    bindingPrice +
    interiorColorPrice * page_count +
    paperTypePrice * page_count +
    coverFinishPrice;
  const totalPrice = unitPrice * quantity;

  // Calculate discount
  let discount = null;
  if (quantity >= 1000) discount = { percent: 15 };
  else if (quantity >= 500) discount = { percent: 10 };
  else if (quantity >= 100) discount = { percent: 5 };

  const discountAmount = discount ? (totalPrice * discount.percent) / 100 : 0;
  const finalPrice = totalPrice - discountAmount;

  return {
    unitPrice: unitPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
    discountAmount: discountAmount.toFixed(2),
    discountPercent: discount?.percent || 0,
    finalPrice: finalPrice.toFixed(2),
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

const SummaryRow = ({ pairs }) => (
  <div className="flex justify-between mb-2 text-sm">
    {pairs.map(([label, value], j) => (
      <div key={j}>
        <p className="font-semibold text-gray-600">{label}</p>
        <p className="text-black">{value}</p>
      </div>
    ))}
  </div>
);

const ComicBookCalculator = () => {
  const [form, setForm] = useState({
    trim_size_id: "",
    page_count: "",
    binding_id: "",
    interior_color_id: "",
    paper_type_id: "",
    cover_finish_id: "",
    quantity: 1,
  });
  const [result, setResult] = useState(null);

  // Get available bindings based on current page count
  const availableBindings = useMemo(() => {
    return getAvailableBindings(Number(form.page_count));
  }, [form.page_count]);

  const stepAccessibility = useMemo(
    () => ({
      trimSize: true,
      pageCount: form.trim_size_id !== "",
      binding: form.trim_size_id !== "" && form.page_count !== "",
      interiorColor:
        form.trim_size_id !== "" &&
        form.page_count !== "" &&
        form.binding_id !== "",
      paperType:
        form.trim_size_id !== "" &&
        form.page_count !== "" &&
        form.binding_id !== "" &&
        form.interior_color_id !== "",
      coverFinish:
        form.trim_size_id !== "" &&
        form.page_count !== "" &&
        form.binding_id !== "" &&
        form.interior_color_id !== "" &&
        form.paper_type_id !== "",
    }),
    [form]
  );

  const bindingOptions = useMemo(
    () => ({
      paperback: Object.entries(BINDING_RULES)
        .filter(([, rules]) => rules.type === "paperback")
        .map(([name, rules]) => ({
          name,
          img: {
            "Perfect Bound": PerfectBoundImg,
            "Coil Bound": CoilBoundImg,
            "Saddle Stitch": SaddleImg,
          }[name],
        })),
      hardcover: Object.entries(BINDING_RULES)
        .filter(([, rules]) => rules.type === "hardcover")
        .map(([name, rules]) => ({
          name,
          img: {
            "Case Wrap": CaseWrap,
            "Linen Wrap": LinenWrap,
          }[name],
        })),
    }),
    []
  );

  const interiorColorOptions = INTERIOR_COLORS.map((ic) => ({
    ...ic,
    img: {
      "Premium Black & White": StandardBlackandWhite,
      "Premium Color": PremiumColor,
    }[ic.name],
  }));

  const paperTypeOptions = PAPER_TYPES.map((pt) => ({
    ...pt,
    img: {
      "60# Cream-Uncoated": Creamuncoated,
      "60# White-Uncoated": Whiteuncoated,
      "70# White-Uncoated": Whitecoatedd,
      "80# White-Coated": Whitecoated,
    }[pt.name],
  }));

  const coverFinishOptions = COVER_FINISHES.map((cf) => ({
    ...cf,
    img: {
      Gloss: Glossy,
      Matte: Matty,
    }[cf.name],
  }));

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let val = value;

    if (type === "number") {
      // Convert to number if not empty
      val = value === "" ? "" : Number(value);
      // Enforce max limit
      if (name === "page_count" && val > 200) {
        val = 200;
      }
    }

    // reset other fields if needed
    const resetFields = {
      // your existing reset rules
    };

    setForm((prev) => {
      const newForm = { ...prev, [name]: val };
      // Reset dependent fields if necessary
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.trim_size_id ||
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

  // Helper functions for getting display names in summary
  const getTrimSizeName = (id) => {
    const trimSize = COMIC_TRIM_SIZES.find((ts) => ts.id === Number(id));
    return trimSize ? trimSize.name : "-";
  };

  const getInteriorColorName = (dbName) => {
    const interiorColor = INTERIOR_COLORS.find((ic) => ic.dbName === dbName);
    return interiorColor ? interiorColor.name : "-";
  };

  const getPaperTypeName = (dbName) => {
    const paperType = PAPER_TYPES.find((pt) => pt.dbName === dbName);
    return paperType ? paperType.name : "-";
  };

  const getCoverFinishName = (dbName) => {
    const coverFinish = COVER_FINISHES.find((cf) => cf.dbName === dbName);
    return coverFinish ? coverFinish.name : "-";
  };

  const getBindingName = (bindingName) => {
    if (Object.keys(BINDING_RULES).includes(bindingName)) {
      return bindingName;
    }
    return "-";
  };

  // Reset binding when it becomes unavailable
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

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);

  return (
    <>
      <PricingBanner />
      <Carousel />

      <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-8 flex flex-col xl:flex-row gap-6 xl:gap-8">
        <div className="w-full xl:w-3/5 bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 lg:p-8 rounded-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#2A428C]">
            Comic Book
          </h2>

          {/* Trim Size & Page Count */}
          <div className="flex flex-col gap-4 p-4 mb-8 bg-gradient-to-r from-[#016AB3] via-[#0096CD] to-[#00AEDC] rounded-2xl">
            <h3 className="text-white text-lg font-semibold">
              Comic Book Size & Page Count
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2 flex flex-col">
                <div className="h-5 mb-1">
                  <p className="text-xs text-white opacity-90">Trim Size</p>
                </div>
                <select
                  name="trim_size_id"
                  value={form.trim_size_id}
                  onChange={handleChange}
                  className="h-12 w-full border px-3 py-2 rounded bg-white"
                  required
                >
                  <option value="">Select Trim Size</option>
                  {COMIC_TRIM_SIZES.map((option, idx) => (
                    <option key={idx} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full sm:w-1/2 flex flex-col">
                <div className="h-5 mb-1">
                  <p className="text-xs text-white opacity-90">
                    {form.trim_size_id
                      ? "MIN-MAX: 3 - 200"
                      : "Select trim size first"}
                  </p>
                </div>
                <input
                  name="page_count"
                  value={form.page_count}
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter Page Count"
                  min="3"
                  max="200"
                  className="h-12 w-full border px-3 py-2 bg-white text-black rounded-md"
                  disabled={!stepAccessibility.pageCount}
                  required
                />
              </div>
            </div>
          </div>

          {/* Binding Types */}
          <SectionTitle>Binding Types</SectionTitle>

          {/* Paperback Options */}
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#2A428C]">
            Paperback Options
          </h3>
          <div className="flex gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 flex-wrap">
            {bindingOptions.paperback.map((item, idx) => (
              <OptionCard
                key={idx}
                item={item}
                fieldName="binding_id"
                fieldValue={form.binding_id}
                onSelect={handleBindingSelect}
                isAvailable={availableBindings.includes(item.name)}
                stepAccessible={stepAccessibility.binding}
              />
            ))}
          </div>

          {/* Hardcover Options */}
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#2A428C]">
            Hardcover Options
          </h3>
          <div className="flex gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 flex-wrap">
            {bindingOptions.hardcover.map((item, idx) => (
              <OptionCard
                key={idx}
                item={item}
                fieldName="binding_id"
                fieldValue={form.binding_id}
                onSelect={handleBindingSelect}
                isAvailable={availableBindings.includes(item.name)}
                stepAccessible={stepAccessibility.binding}
              />
            ))}
          </div>

          {/* Interior Color */}
          <SectionTitle>Interior Color</SectionTitle>
          <div className="flex gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 flex-wrap">
            {interiorColorOptions.map((item, idx) => (
              <OptionCard
                key={idx}
                item={item}
                fieldName="interior_color_id"
                fieldValue={form.interior_color_id}
                onSelect={(value) =>
                  setForm((prev) => ({ ...prev, interior_color_id: value }))
                }
                isAvailable={true}
                stepAccessible={stepAccessibility.interiorColor}
                hasDbName={true}
              />
            ))}
          </div>

          {/* Paper Type */}
          <SectionTitle>Paper Type</SectionTitle>
          <div className="flex gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 flex-wrap">
            {paperTypeOptions.map((item, idx) => (
              <OptionCard
                key={idx}
                item={item}
                fieldName="paper_type_id"
                fieldValue={form.paper_type_id}
                onSelect={(value) =>
                  setForm((prev) => ({ ...prev, paper_type_id: value }))
                }
                isAvailable={true}
                stepAccessible={stepAccessibility.paperType}
                hasDbName={true}
              />
            ))}
          </div>

          {/* Cover Finish */}
          <SectionTitle>Cover Finish</SectionTitle>
          <div className="flex gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 flex-wrap">
            {coverFinishOptions.map((item, idx) => (
              <OptionCard
                key={idx}
                item={item}
                fieldName="cover_finish_id"
                fieldValue={form.cover_finish_id}
                onSelect={(value) =>
                  setForm((prev) => ({ ...prev, cover_finish_id: value }))
                }
                isAvailable={true}
                stepAccessible={stepAccessibility.coverFinish}
                hasDbName={true}
              />
            ))}
          </div>

          {/* Quantity & Calculate */}
          <div className="flex flex-col gap-4 p-4 bg-gradient-to-r from-[#016AB3] via-[#0096CD] to-[#00AEDC] rounded-2xl">
            <h3 className="text-white text-lg font-semibold">
              Quantity & Shipping Estimate
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <p className="text-xs text-white opacity-90 mb-1">Quantity</p>
                <input
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter Quantity"
                  min="1"
                  className="h-12 w-full border px-3 py-2 rounded bg-white text-black rounded-md"
                  required
                />
              </div>
              <div className="w-full sm:w-1/2 flex items-end">
                <button
                  onClick={handleSubmit}
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
                  {result.discountAmount > 0 && (
                    <>
                      <div className="flex justify-between text-green-200">
                        <span>Discount ({result.discountPercent}%):</span>
                        <span>-${result.discountAmount}</span>
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
                        ? "(15% off)"
                        : form.quantity >= 500
                        ? "(10% off)"
                        : "(5% off)"}
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

                <ShippingEstimate />
              </div>
            )}
          </div>
        </div>

        {/* Summary Panel */}
        <div className="w-full xl:w-2/5">
          <div className="sticky top-8 bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg">
            <Image
              src={RightImage}
              alt="High Quality Comic Book"
              className="w-full h-32 sm:h-40 lg:h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-lg sm:text-xl font-bold text-[#2A428C] mb-2 text-center">
              High-Quality Comic Book Printing
            </h2>
            <div className="w-full h-0.5 bg-gray-300 mb-4"></div>
            {[
              [
                ["Trim Size", getTrimSizeName(form.trim_size_id)],
                ["Page Count", form.page_count || "-"],
              ],
              [
                ["Binding Type", getBindingName(form.binding_id)],
                [
                  "Interior Color",
                  getInteriorColorName(form.interior_color_id),
                ],
              ],
              [
                ["Paper Type", getPaperTypeName(form.paper_type_id)],
                ["Cover Finish", getCoverFinishName(form.cover_finish_id)],
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

export default ComicBookCalculator;

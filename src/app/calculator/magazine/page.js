"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";

import QuantityEstimateDropdown from "@/components/QuantityEstimateDropdown";

import Carousel from "@/components/Carousel";

import RedirectButton from "@/components/RedirectButton";
import ShippingEstimate from "@/components/ShippingEstimate";

// Import images
import Book1 from "@/assets/images/book1.png";
import Book2 from "@/assets/images/Group.png";
import PerfectBoundImg from "@/assets/images/img58.png";
import CoilBoundImg from "@/assets/images/coill.jpg";
import SaddleImg from "@/assets/images/saddlee.jpg";
import CaseWrap from "@/assets/images/paperbackk.jpg";
import LinenWrap from "@/assets/images/linenn.jpg";
import StandardBlackAndWhite from "@/assets/images/int1.png";
import PremiumBlackAndWhite from "@/assets/images/in2.png";
import StandardColor from "@/assets/images/in3.png";
import PremiumColor from "@/assets/images/int4.png";
import CreamUncoated from "@/assets/images/pp1.jpg";
import WhiteUncoated from "@/assets/images/pp2.jpg";
import WhiteCoated from "@/assets/images/pp3.jpg";
import WhiteCoated2 from "@/assets/images/pp4.jpg";
import Glossy from "@/assets/images/gggg.jpg";
import Matty from "@/assets/images/mmmm.jpg";
import RightImage from "@/assets/images/right.png";

// Constants
const TRIM_SIZES = [
  "A4 (8.27 x 11.69 in / 210 x 297 mm)",
  "US Letter (8.5 x 11 in / 216 x 279 mm)",
];

const BINDING_RULES = {
  3: ["Coil Bound"],
  4: ["Coil Bound", "Saddle Stitch"],
  24: ["Coil Bound", "Saddle Stitch", "Case Wrap"],
  32: [
    "Perfect Bound",
    "Coil Bound",
    "Saddle Stitch",
    "Case Wrap",
    "Linen Wrap",
  ],
};

const BINDING_CONFIGS = {
  "Perfect Bound": { img: PerfectBoundImg, price: 2.5 },
  "Coil Bound": { img: CoilBoundImg, price: 6.18 },
  "Saddle Stitch": { img: SaddleImg, price: 5.0 },
  "Case Wrap": { img: CaseWrap, price: 9.75 },
  "Linen Wrap": { img: LinenWrap, price: 13.8 },
};

const OPTIONS_CONFIG = {
  interiorColor: [
    {
      name: "Standard Black & White",
      img: StandardBlackAndWhite,
      dbName: "Standard Black & White",
      price: 0.015,
    },
    {
      name: "Premium Black & White",
      img: PremiumBlackAndWhite,
      dbName: "Premium Black & White",
      price: 0.03,
    },
    {
      name: "Standard Color",
      img: StandardColor,
      dbName: "Standard Color",
      price: 0.12,
    },
    {
      name: "Premium Color",
      img: PremiumColor,
      dbName: "Premium Color",
      price: 0.19,
    },
  ],
  paperType: [
    {
      name: "60# Cream-Uncoated",
      img: CreamUncoated,
      dbName: "60# Cream-Uncoated",
      price: 0.01,
    },
    {
      name: "60# White-Uncoated",
      img: WhiteUncoated,
      dbName: "60# White-Uncoated",
      price: 0.01,
    },
    {
      name: "70# White-Uncoated",
      img: WhiteCoated2,
      dbName: "70# White-Uncoated",
      price: 0.02,
    },
    {
      name: "80# White-Coated",
      img: WhiteCoated,
      dbName: "80# White-Coated",
      price: 0.03,
    },
  ],
  coverFinish: [
    { name: "Gloss", img: Glossy, dbName: "Gloss", price: 0.0 },
    { name: "Matte", img: Matty, dbName: "Matte", price: 0.0 },
  ],
};

const DISCOUNTS = [
  { min: 1000, percent: 15 },
  { min: 500, percent: 10 },
  { min: 100, percent: 5 },
];

// Utility Functions
const getAvailableBindings = (pageCount) => {
  if (!pageCount || pageCount < 3) return [];

  let availableBindings = [];

  if (pageCount >= 32) {
    availableBindings = BINDING_RULES[32];
  } else if (pageCount >= 24) {
    availableBindings = BINDING_RULES[24];
  } else if (pageCount >= 4) {
    availableBindings = BINDING_RULES[4];
  } else if (pageCount >= 3) {
    availableBindings = BINDING_RULES[3];
  }

  return availableBindings;
};

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

  const bindingPrice = BINDING_CONFIGS[binding_id]?.price || 0;
  const interiorColorOption = OPTIONS_CONFIG.interiorColor.find(
    (opt) => opt.dbName === interior_color_id
  );
  const paperTypeOption = OPTIONS_CONFIG.paperType.find(
    (opt) => opt.dbName === paper_type_id
  );
  const coverFinishOption = OPTIONS_CONFIG.coverFinish.find(
    (opt) => opt.dbName === cover_finish_id
  );

  const interiorColorPrice = (interiorColorOption?.price || 0) * page_count;
  const paperTypePrice = (paperTypeOption?.price || 0) * page_count;
  const coverFinishPrice = coverFinishOption?.price || 0;

  const unitPrice =
    bindingPrice + interiorColorPrice + paperTypePrice + coverFinishPrice;
  const totalPrice = unitPrice * quantity;

  const discount = DISCOUNTS.find((d) => quantity >= d.min);
  const discountAmount = discount ? totalPrice * (discount.percent / 100) : 0;
  const finalPrice = totalPrice - discountAmount;

  return {
    unitPrice: unitPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
    discount: discountAmount.toFixed(2),
    discountPercent: discount?.percent || 0,
    finalPrice: finalPrice.toFixed(2),
  };
};

// Reusable Components
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
      disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
    }`}
    disabled={disabled}
    required
    {...props}
  />
);

const FormSelect = ({
  name,
  value,
  onChange,
  options,
  placeholder,
  className = "",
  disabled = false,
}) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className={`w-full border px-3 py-2 rounded ${className} ${
      disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
    }`}
    disabled={disabled}
    required
  >
    <option value="">{placeholder}</option>
    {options.map((option, idx) => (
      <option
        key={idx}
        value={typeof option === "object" ? option.name : option}
      >
        {typeof option === "object" ? option.name : option}
      </option>
    ))}
  </select>
);

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
          unoptimized // for local static images
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

const MagazineCalculator = () => {
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

  const availableBindings = useMemo(
    () => getAvailableBindings(Number(form.page_count)),
    [form.page_count]
  );

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
    () =>
      Object.entries(BINDING_CONFIGS).map(([name, config]) => ({
        name,
        img: config.img,
      })),
    []
  );

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let val = value;

    if (type === "number") {
      val = value === "" ? "" : Number(value);
      // Clamp page_count to 200
      if (name === "page_count" && val > 200) {
        val = 200;
      }
    }

    const resetFields = {
      trim_size_id: [
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

  // Reset binding if it becomes unavailable
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

  return (
    <>
      {/* Pricing Banner */}
      <section className="relative w-full max-w-none h-auto rounded-[20px] border-[5px] border-white/50 backdrop-blur-xl px-4 sm:px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#016AB3] via-[#0096CD] to-[#00AEDC]">
        <div className="w-full md:w-1/2 text-white text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3">
            Pricing <span className="text-[#F8C20A]">Calculator</span>
          </h2>
          <p className="text-sm sm:text-base leading-relaxed px-2 md:px-0">
            Calculate your magazine's printing costs, see distribution options,
            estimate potential earnings, and download free templates with our
            magazine cost calculator.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center relative">
          <div className="flex items-center relative">
            <Image
              src={Book1}
              alt="Book1"
              className="w-32 sm:w-40 md:w-52 lg:w-60 h-auto object-contain z-10"
              style={{ marginRight: "-135px" }}
              width={240}
              height={300}
              unoptimized
            />
            <Image
              src={Book2}
              alt="Book2"
              className="w-36 sm:w-44 md:w-56 lg:w-64 h-auto object-contain rotate-[4deg] z-0"
              width={260}
              height={320}
              unoptimized
            />
          </div>
        </div>
      </section>

      <Carousel />

      <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-8 flex flex-col xl:flex-row gap-6 xl:gap-8">
        <div className="w-full xl:w-3/5 bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 lg:p-8 rounded-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#2A428C]">
            Magazine Book
          </h2>

          {/* Book Size & Page Count */}
          <div className="flex flex-col gap-4 p-4 mb-8 bg-gradient-to-r from-[#016AB3] via-[#0096CD] to-[#00AEDC] rounded-2xl">
            <h3 className="text-white text-lg font-semibold">
              Book Size & Page Count
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2 flex flex-col">
                <div className="h-5 mb-1">
                  <p className="text-xs text-white opacity-90">Trim Size</p>
                </div>
                <FormSelect
                  name="trim_size_id"
                  value={form.trim_size_id}
                  onChange={handleChange}
                  options={TRIM_SIZES}
                  placeholder="Select Book Size"
                  className="h-12 bg-white"
                />
              </div>
              <div className="w-full sm:w-1/2 flex flex-col">
                <div className="h-5 mb-1">
                  <p className="text-xs text-white opacity-90">
                    {form.trim_size_id
                      ? "MIN-MAX: 3-200"
                      : "Select book size first"}
                  </p>
                </div>
                <FormInput
                  name="page_count"
                  value={form.page_count}
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter Page Count"
                  min={3}
                  max={200} // already set
                  className="h-12 bg-white text-black rounded-md"
                  disabled={!stepAccessibility.pageCount}
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
          <div className="flex gap-3 sm:gap-4 lg:gap-6 mb-6 flex-wrap">
            {bindingOptions
              .filter((binding) =>
                ["Coil Bound", "Saddle Stitch", "Perfect Bound"].includes(
                  binding.name
                )
              )
              .map((binding, idx) => (
                <OptionCard
                  key={idx}
                  item={binding}
                  fieldName="binding_id"
                  fieldValue={form.binding_id}
                  onSelect={handleBindingSelect}
                  isAvailable={availableBindings.includes(binding.name)}
                  stepAccessible={stepAccessibility.binding}
                />
              ))}
          </div>

          {/* Hardcover Options */}
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#2A428C]">
            Hardcover Options
          </h3>
          <div className="flex gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 flex-wrap">
            {bindingOptions
              .filter((binding) =>
                ["Case Wrap", "Linen Wrap"].includes(binding.name)
              )
              .map((binding, idx) => (
                <OptionCard
                  key={idx}
                  item={binding}
                  fieldName="binding_id"
                  fieldValue={form.binding_id}
                  onSelect={handleBindingSelect}
                  isAvailable={availableBindings.includes(binding.name)}
                  stepAccessible={stepAccessibility.binding}
                />
              ))}
          </div>

          {/* Interior Color */}
          <SectionTitle>Interior Color</SectionTitle>
          <div className="flex gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 flex-wrap">
            {OPTIONS_CONFIG.interiorColor.map((item, idx) => (
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
            {OPTIONS_CONFIG.paperType.map((item, idx) => (
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
            {OPTIONS_CONFIG.coverFinish.map((item, idx) => (
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
              Quantity & Pricing
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
                    <span>Total ({form.quantity} magazines):</span>
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
                      ✓ Bulk discount applied!
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

                <ShippingEstimate />
              </div>
            )}
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="w-full xl:w-2/5">
          <div className="sticky top-8 bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg">
            <Image
              src={RightImage}
              alt="High-Quality Magazine"
              className="w-full h-32 sm:h-40 lg:h-48 object-cover mb-4 rounded"
              width={400}
              height={160}
              unoptimized
            />
            <h2 className="text-lg sm:text-xl font-bold text-[#2A428C] mb-2 text-center">
              High-Quality Magazine Printing
            </h2>
            <div className="w-full h-0.5 bg-gray-300 mb-4"></div>
            {[
              [
                ["Trim Size", form.trim_size_id || "-"],
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
                <SummaryRow pairs={row.filter(([label]) => label)} />
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

export default MagazineCalculator;

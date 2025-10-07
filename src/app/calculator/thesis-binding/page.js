"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";

// Components
import Carousel from "@/components/Carousel";
import PricingBanner from "@/components/PricingBanner";

import RedirectButton from "@/components/RedirectButton";
import ShippingEstimate from "@/components/ShippingEstimate";

// Local Images
import RightImage from "@/assets/images/right.png";
import lt1 from "@/assets/images/lt1.png";
import lt2 from "@/assets/images/lt2.png";
import lt3 from "@/assets/images/lt3.png";
import ltt1 from "@/assets/images/ltt1.png";
import ltt2 from "@/assets/images/ltt2.png";
import PremiumBlackandWhite from "@/assets/images/pp1.jpg";
import Premium from "@/assets/images/pp2.jpg";
import pg1 from "@/assets/images/qa1.png";
import pg2 from "@/assets/images/qa2.png";
import pg3 from "@/assets/images/qa3.png";
import pg4 from "@/assets/images/qa4.png";

// Consolidated data structure with image URLs
const OPTIONS = {
  binding: [
    {
      id: "leather_case_wrap",
      name: "Leather Case Wrap",
      price: 79.0,
      image: lt2,
    },
    {
      id: "faux_leather_case_wrap",
      name: "Faux Leather Case Wrap",
      price: 69.0,
      image: lt3,
    },
    {
      id: "polythin_rexine_case_wrap",
      name: "Polythin Rexine Case Wrap",
      price: 59.0,
      image: lt1,
    },
  ],
  spine: [
    {
      id: "round",
      name: "Round",
      price: 5.0,
      image: ltt1,
    },
    {
      id: "flat",
      name: "Flat",
      price: 0.0,
      image: ltt2,
    },
  ],
  exteriorColor: [
    {
      id: "black",
      name: "Black",
      price: 5.0,
      bg: "bg-black",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.eDT_6SV4EMT_EIvLNI1jZgHaFj?pid=Api&P=0&h=220",
    },
    {
      id: "brown",
      name: "Brown",
      price: 3.0,
      bg: "bg-amber-800",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.2MCU2S3LitdZbInyvu_4-QHaE8?pid=Api&P=0&h=220",
    },
    {
      id: "maroon",
      name: "Maroon",
      price: 5.0,
      bg: "bg-red-800",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.m096lDro6ncKKg4DwPmUUwHaEo?pid=Api&P=0&h=220",
    },
    {
      id: "dark_blue",
      name: "Dark Blue",
      price: 5.0,
      bg: "bg-blue-900",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.bdBwPN-71Sz4S2yShDWCaAHaEK?pid=Api&P=0&h=220",
    },
  ],
  foilStamping: [
    {
      id: "golden",
      name: "Golden",
      price: 10.0,
      bg: "bg-yellow-400",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.yN-LJTTQxlR-ZWO2YN_CIQHaHa?pid=Api&P=0&h=220",
    },
    {
      id: "silver",
      name: "Silver",
      price: 15.0,
      bg: "bg-gray-300",
      image:
        "https://i.pinimg.com/736x/fd/ac/b0/fdacb002da9862d86bc871f7ee160383.jpg",
    },
  ],
  screenStamping: [
    {
      id: "golden",
      name: "Golden",
      price: 10.0,
      bg: "bg-yellow-400",
      image:
        "https://www.48hrbooks.com/asset/index/213ba005-4db4-4ecd-a4cd-01f77b04994b",
    },
    {
      id: "silver",
      name: "Silver",
      price: 15.0,
      bg: "bg-gray-300",
      image:
        "https://smartpressblog.imgix.net/wp-content/uploads/2022/08/foil-perfect-bound-booklets_silver_02.png?auto=format%2Ccompress&ixlib=php-3.3.0&s=15005f4e66b0f086cf9041bef5b826cf&w=900",
    },
  ],
  cornerProtector: [
    {
      id: "gold_sharp_corner",
      name: "Gold Sharp Corner",
      price: 4.0,
      image: "https://m.media-amazon.com/images/I/610qEktwOCL._AC_SX569_.jpg",
    },
    {
      id: "gold_round_corner",
      name: "Gold Round Corner",
      price: 4.0,
      image:
        "https://m.media-amazon.com/images/I/51OxPftmiwL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    },
    {
      id: "vintage_designs_corner",
      name: "Vintage Designs Corner",
      price: 6.0,
      image:
        "https://m.media-amazon.com/images/I/81Cud1uamaL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    },
  ],
  interiorColor: [
    {
      id: "premium_bw",
      name: "Premium Black & White",
      pricePerPage: 0.03,
      image: PremiumBlackandWhite,
    },
    {
      id: "premium_color",
      name: "Premium Color",
      pricePerPage: 0.19,
      image: Premium,
    },
  ],
  paperType: [
    {
      id: "70_white_uncoated",
      name: "70# White-Uncoated",
      pricePerPage: 0.02,
      image: pg1,
    },
    {
      id: "60_cream_uncoated",
      name: "60# Cream-Uncoated",
      pricePerPage: 0.01,
      image: pg2,
    },
    {
      id: "60_white_uncoated",
      name: "60# White-Uncoated",
      pricePerPage: 0.01,
      image: pg3,
    },
    {
      id: "80_white_coated",
      name: "80# White-Coated",
      pricePerPage: 0.03,
      image: pg4,
    },
  ],
};

const BOOK_SIZES = [
  "A4 (8.27 x 11.69 in / 210 x 297 mm)",
  "US Letter (8.5 x 11 in / 216 x 279 mm)",
  "Comic Book (6.625 x 10.25 in / 168 x 260 mm)",
];

const DISCOUNT_TIERS = [
  { min: 1000, percent: 15 },
  { min: 500, percent: 10 },
  { min: 100, percent: 5 },
];

// Utility Components
const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  disabled,
  min,
  max,
}) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full border bg-white border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    disabled={disabled}
    min={min}
    max={max}
    required
  />
);

const Select = ({ name, value, onChange, options, placeholder }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className="w-full bg-white border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  >
    <option value="">{placeholder}</option>
    {options.map((opt, i) => (
      <option key={i} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

const OptionCard = ({
  item,
  fieldName,
  fieldValue,
  onSelect,
  accessible = true,
  hasImage = true,
}) => {
  const isSelected = fieldValue === item.id;
  const opacity = accessible ? 1 : 0.3;

  return (
    <label
      className={`flex flex-col items-center cursor-pointer relative w-20 sm:w-24 ${
        !accessible ? "cursor-not-allowed" : ""
      }`}
      style={{ opacity }}
    >
      <div className="relative w-full">
        <input
          type="radio"
          name={fieldName}
          value={item.id}
          checked={isSelected}
          onChange={() => accessible && onSelect(item.id)}
          disabled={!accessible}
          className="absolute top-1 left-1 z-10 w-3 h-3"
        />
        {hasImage ? (
          <div className="w-full h-16 bg-gray-200 mb-2 mt-3 rounded overflow-hidden flex items-center justify-center">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={64}
                className="w-full h-full object-cover"
                unoptimized // for external or local static images
              />
            ) : (
              <span className="text-xs text-gray-500">IMG</span>
            )}
          </div>
        ) : (
          <div
            className={`w-12 h-12 rounded border-2 mb-2 mx-auto mt-3 ${
              item.bg || "bg-gray-200"
            }`}
          ></div>
        )}
      </div>
      <p className="text-xs sm:text-sm text-[#2A428C] text-center px-1">
        {item.name}
      </p>
    </label>
  );
};

const Section = ({ title, children }) => (
  <>
    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 text-[#2A428C]">
      {title}
    </h2>
    <div className="w-full h-0.5 bg-gray-200 mb-4 sm:mb-6"></div>
    {children}
  </>
);

const OptionSection = ({
  title,
  options,
  fieldName,
  fieldValue,
  onSelect,
  accessible = true,
  hasImage = true,
}) => (
  <>
    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#2A428C]">
      {title}
    </h3>
    <div className="flex gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 flex-wrap">
      {options.map((item, i) => (
        <OptionCard
          key={i}
          item={item}
          fieldName={fieldName}
          fieldValue={fieldValue}
          onSelect={onSelect}
          accessible={accessible}
          hasImage={hasImage}
        />
      ))}
    </div>
  </>
);

const ThesisPricingCalculator = () => {
  const [form, setForm] = useState({
    bookSize: "",
    pageCount: "",
    quantity: 1,
    binding_id: "",
    spine_id: "",
    exterior_color_id: "",
    foil_stamping_id: "",
    screen_stamping_id: "",
    corner_protector_id: "",
    interior_color_id: "",
    paper_type_id: "",
  });

  const [result, setResult] = useState(null);

  // Step accessibility
  const fieldOrder = [
    "bookSize",
    "pageCount",
    "binding_id",
    "spine_id",
    "exterior_color_id",
    "foil_stamping_id",
    "screen_stamping_id",
    "corner_protector_id",
    "interior_color_id",
    "paper_type_id",
  ];

  const isStepAccessible = (step) => {
    const stepIndex = fieldOrder.indexOf(step);
    if (stepIndex === 0) return true;
    const prevStep = fieldOrder[stepIndex - 1];
    return form[prevStep] !== "";
  };

  // Calculate pricing
  const calculatePrice = useMemo(() => {
    const requiredFields = [
      "bookSize",
      "pageCount",
      "binding_id",
      "spine_id",
      "exterior_color_id",
      "foil_stamping_id",
      "screen_stamping_id",
      "corner_protector_id",
      "interior_color_id",
      "paper_type_id",
    ];

    if (
      !requiredFields.every((field) => form[field] !== "") ||
      form.quantity <= 0
    ) {
      return null;
    }

    const findOption = (type, id) =>
      OPTIONS[type]?.find((opt) => opt.id === id) || {};

    const binding = findOption("binding", form.binding_id);
    const spine = findOption("spine", form.spine_id);
    const exteriorColor = findOption("exteriorColor", form.exterior_color_id);
    const foilStamping = findOption("foilStamping", form.foil_stamping_id);
    const screenStamping = findOption(
      "screenStamping",
      form.screen_stamping_id
    );
    const cornerProtector = findOption(
      "cornerProtector",
      form.corner_protector_id
    );
    const interiorColor = findOption("interiorColor", form.interior_color_id);
    const paperType = findOption("paperType", form.paper_type_id);

    const basePrice = [
      binding,
      spine,
      exteriorColor,
      foilStamping,
      screenStamping,
      cornerProtector,
    ].reduce((sum, opt) => sum + (opt.price || 0), 0);

    const pageBasedCost =
      ((interiorColor.pricePerPage || 0) + (paperType.pricePerPage || 0)) *
      parseInt(form.pageCount || 0);
    const costPerBook = basePrice + pageBasedCost;
    const totalCost = costPerBook * form.quantity;

    const discount = DISCOUNT_TIERS.find((tier) => form.quantity >= tier.min);
    const discountAmount = discount ? totalCost * (discount.percent / 100) : 0;
    const finalAmount = totalCost - discountAmount;

    return {
      costPerBook: costPerBook.toFixed(2),
      totalCost: totalCost.toFixed(2),
      discountPercent: discount?.percent || 0,
      discountAmount: discountAmount.toFixed(2),
      finalAmount: finalAmount.toFixed(2),
    };
  }, [form]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let val = value;

    if (type === "number") {
      val = value === "" ? "" : Number(value);
      // Enforce maximum of 800 for pageCount
      if (name === "pageCount" && val > 800) {
        val = 800;
      }
    }

    setForm((prev) => {
      const newForm = { ...prev, [name]: val };
      // Optionally, reset subsequent fields
      const currentIndex = fieldOrder.indexOf(name);
      if (currentIndex !== -1) {
        fieldOrder.slice(currentIndex + 1).forEach((field) => {
          newForm[field] = "";
        });
      }
      return newForm;
    });
    setResult(null);
  };

  const handleSelect = (fieldName, value) => {
    setForm((prev) => {
      const newForm = { ...prev, [fieldName]: value };
      const currentIndex = fieldOrder.indexOf(fieldName);
      if (currentIndex !== -1) {
        fieldOrder.slice(currentIndex + 1).forEach((field) => {
          newForm[field] = "";
        });
      }
      return newForm;
    });
    setResult(null);
  };

  // Auto-calculate when form is complete
  useEffect(() => {
    if (calculatePrice) {
      setResult(calculatePrice);
    }
  }, [calculatePrice]);

  const getSummaryValue = (type, id) => {
    if (!id) return "-";
    const option = OPTIONS[type]?.find((opt) => opt.id === id);
    return option?.name || "-";
  };

  return (
    <>
      <PricingBanner />
      <Carousel />

      <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-8 flex flex-col xl:flex-row gap-6 xl:gap-8 bg-gray-50">
        {/* Main Form Section */}
        <div className="w-full xl:w-3/5 bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 lg:p-8 rounded-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#2A428C]">
            Thesis Binding Calculator
          </h2>

          <div className="flex flex-col gap-4 p-4 mb-8 bg-gradient-to-r from-[#016AB3] via-[#0096CD] to-[#00AEDC] rounded-2xl">
            <h3 className="text-white text-lg font-semibold">
              Book Size & Page Count
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2 flex flex-col">
                <p className="text-xs text-white opacity-90 mb-1">Book Size</p>
                <Select
                  name="bookSize"
                  value={form.bookSize}
                  onChange={handleChange}
                  options={BOOK_SIZES}
                  placeholder="Select Book Size"
                />
              </div>
              <div className="w-full sm:w-1/2 flex flex-col">
                <p className="text-xs text-white mb-1">
                  {form.bookSize ? "MAX-MIN: 1-800" : "Select book size first"}
                </p>
                <Input
                  name="pageCount"
                  value={form.pageCount}
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter Page Count"
                  min="3"
                  max="800" // already set
                  disabled={!isStepAccessible("pageCount")}
                />
              </div>
            </div>
          </div>

          {/* All Option Sections */}
          <Section title="Binding Type">
            <OptionSection
              title="Select Binding Type"
              options={OPTIONS.binding}
              fieldName="binding_id"
              fieldValue={form.binding_id}
              onSelect={(value) => handleSelect("binding_id", value)}
              accessible={isStepAccessible("binding_id")}
            />
          </Section>

          <Section title="Spine Type">
            <OptionSection
              title="Select Spine Type"
              options={OPTIONS.spine}
              fieldName="spine_id"
              fieldValue={form.spine_id}
              onSelect={(value) => handleSelect("spine_id", value)}
              accessible={isStepAccessible("spine_id")}
            />
          </Section>

          <Section title="Exterior Color">
            <OptionSection
              title="Select Exterior Color"
              options={OPTIONS.exteriorColor}
              fieldName="exterior_color_id"
              fieldValue={form.exterior_color_id}
              onSelect={(value) => handleSelect("exterior_color_id", value)}
              accessible={isStepAccessible("exterior_color_id")}
              hasImage={true}
            />
          </Section>

          <Section title="Foil Stamping">
            <OptionSection
              title="Select Foil Stamping"
              options={OPTIONS.foilStamping}
              fieldName="foil_stamping_id"
              fieldValue={form.foil_stamping_id}
              onSelect={(value) => handleSelect("foil_stamping_id", value)}
              accessible={isStepAccessible("foil_stamping_id")}
              hasImage={true}
            />
          </Section>

          <Section title="Screen Stamping">
            <OptionSection
              title="Select Screen Stamping"
              options={OPTIONS.screenStamping}
              fieldName="screen_stamping_id"
              fieldValue={form.screen_stamping_id}
              onSelect={(value) => handleSelect("screen_stamping_id", value)}
              accessible={isStepAccessible("screen_stamping_id")}
              hasImage={true}
            />
          </Section>

          <Section title="Corner Protector (Optional)">
            <OptionSection
              title="Select Corner Protector"
              options={OPTIONS.cornerProtector}
              fieldName="corner_protector_id"
              fieldValue={form.corner_protector_id}
              onSelect={(value) => handleSelect("corner_protector_id", value)}
              accessible={isStepAccessible("corner_protector_id")}
            />
          </Section>

          <Section title="Interior Color">
            <OptionSection
              title="Select Interior Color"
              options={OPTIONS.interiorColor}
              fieldName="interior_color_id"
              fieldValue={form.interior_color_id}
              onSelect={(value) => handleSelect("interior_color_id", value)}
              accessible={isStepAccessible("interior_color_id")}
            />
          </Section>

          <Section title="Paper Type">
            <OptionSection
              title="Select Paper Type"
              options={OPTIONS.paperType}
              fieldName="paper_type_id"
              fieldValue={form.paper_type_id}
              onSelect={(value) => handleSelect("paper_type_id", value)}
              accessible={isStepAccessible("paper_type_id")}
            />
          </Section>

          {/* Quantity & Results */}
          <div className="flex flex-col gap-4 p-4 bg-gradient-to-r from-[#016AB3] via-[#0096CD] to-[#00aedc] rounded-2xl">
            <h3 className="text-white text-lg font-semibold">
              Quantity and Shipping Estimate
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <p className="text-xs text-white opacity-90 mb-1">Quantity</p>
                <Input
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter Quantity"
                  min="1"
                />
              </div>
              <div className="w-full sm:w-1/2 flex items-end">
                <button className="w-full h-12 bg-[#F8C20A] hover:bg-yellow-500 text-black font-semibold rounded-md transition-colors">
                  Calculate Price
                </button>
              </div>
            </div>

            {/* Bulk Discount Tiers */}
            <div className="p-4 bg-gray-50 rounded-lg mb-4">
              <h3 className="text-sm font-semibold text-[#2A428C] mb-2">
                Bulk Discount Tiers
              </h3>
              <div className="space-y-1 text-xs text-gray-600">
                {DISCOUNT_TIERS.map((tier, i) => (
                  <div key={i} className="flex justify-between">
                    <span>
                      {tier.min}
                      {i < DISCOUNT_TIERS.length - 1
                        ? `-${DISCOUNT_TIERS[i + 1]?.min - 1}`
                        : "+"}{" "}
                      books:
                    </span>
                    <span
                      className={
                        form.quantity >= tier.min
                          ? "font-semibold text-green-600"
                          : ""
                      }
                    >
                      {tier.percent}% off
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            {result && (
              <div className="bg-white/20 rounded-lg p-4 text-white">
                <h4 className="font-semibold mb-2">Pricing Results:</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Cost per Book:</span>
                    <span>${result.costPerBook}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Cost ({form.quantity} books):</span>
                    <span>${result.totalCost}</span>
                  </div>
                  {result.discountPercent > 0 && (
                    <>
                      <div className="flex justify-between text-green-200">
                        <span>Discount ({result.discountPercent}%):</span>
                        <span>-${result.discountAmount}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-yellow-200">
                        <span>Final Price:</span>
                        <span>${result.finalAmount}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

                          <ShippingEstimate bookSpecs={form} pricingResult={result} />{" "}

        </div>

        {/* Summary Section */}
        <div className="w-full xl:w-2/5">
          <div className="sticky top-8 bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg">
            <div className="relative w-full h-32 sm:h-40 lg:h-48 bg-gray-200 mb-4 rounded overflow-hidden">
              <Image
                src={RightImage}
                alt="Professional Thesis Binding"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#2A428C] mb-2 text-center">
              Professional Thesis Binding
            </h2>
            <div className="w-full h-0.5 bg-gray-300 mb-4"></div>

            {/* Summary Grid */}
            <div className="space-y-2 text-sm mb-6">
              {[
                [
                  "Book Size",
                  form.bookSize || "-",
                  "Page Count",
                  form.pageCount || "-",
                ],
                [
                  "Binding Type",
                  getSummaryValue("binding", form.binding_id),
                  "Spine Type",
                  getSummaryValue("spine", form.spine_id),
                ],
                [
                  "Exterior Color",
                  getSummaryValue("exteriorColor", form.exterior_color_id),
                  "Foil Stamping",
                  getSummaryValue("foilStamping", form.foil_stamping_id),
                ],
                [
                  "Screen Stamping",
                  getSummaryValue("screenStamping", form.screen_stamping_id),
                  "Corner Protector",
                  getSummaryValue("cornerProtector", form.corner_protector_id),
                ],
                [
                  "Interior Color",
                  getSummaryValue("interiorColor", form.interior_color_id),
                  "Paper Type",
                  getSummaryValue("paperType", form.paper_type_id),
                ],
                [
                  "Quantity",
                  form.quantity.toString(),
                  "Total Pages",
                  (form.pageCount * form.quantity).toString() || "-",
                ],
              ].map(([label1, value1, label2, value2], i) => (
                <React.Fragment key={i}>
                  <div className="flex justify-between items-start mb-1 text-sm">
                    {/* LEFT COLUMN */}
                    <div className="text-left">
                      <p className="font-semibold text-gray-600">{label1}</p>
                      <p className="text-black">{value1}</p>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="text-right">
                      <p className="font-semibold text-gray-600">{label2}</p>
                      <p className="text-black">{value2}</p>
                    </div>
                  </div>

                  {/* Divider after each row except last */}
                  <div className="w-full h-px bg-gray-200 my-2"></div>
                </React.Fragment>
              ))}
            </div>

            {/* Button */}
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

export default ThesisPricingCalculator;

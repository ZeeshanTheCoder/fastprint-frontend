'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image'; // Import Next.js Image component

import Carousel from '@/components/Carousel';
import PricingBanner from '@/components/PricingBanner';
import RedirectButton from '@/components/RedirectButton';
import ShippingEstimate from '@/components/ShippingEstimate';

// Image imports
import WireOImg from '@/assets/images/wireo.jpg';
import PremiumColorImg from '@/assets/images/int4.png';
import WhiteCoatedImg from '@/assets/images/qa4.png';
import GlossImg from '@/assets/images/gggg.jpg';
import MatteImg from '@/assets/images/mmmm.jpg';
import RightImage from '@/assets/images/right.png';

// Calendar-specific constants based on the pricing sheet
const CALENDAR_SIZES = [
  'Comic Book (6.625 x 10.25 in / 168 x 260 mm)',
  'US Letter Landscape (11 x 8.5 in / 279 x 216 mm)',
  'A4 Landscape (11.69 x 8.27 in / 297 x 210 mm)',
  'Square (8.5 x 8.5 in / 216 x 216 mm)',
  'Small Square (7.5 x 7.5 in / 190 x 190 mm)'
];

// Hardcoded options configuration
const OPTIONS_CONFIG = {
  bindingType: [
    { name: "Wire O", img: WireOImg, dbName: "Wire O" }
  ],
  interiorColor: [
    { name: "Premium Color", img: PremiumColorImg, dbName: "Premium Color" }
  ],
  paperType: [
    { name: "100# White-Coated", img: WhiteCoatedImg, dbName: "100# White-Coated" }
  ],
  coverFinish: [
    { name: "Gloss", img: GlossImg, dbName: "Gloss" },
    { name: "Matte", img: MatteImg, dbName: "Matte" }
  ]
};

// Pricing logic based on the sheet
const CALENDAR_PRICING = {
  'Comic Book (6.625 x 10.25 in / 168 x 260 mm)': {
    binding: { 'Wire O': 12.00 },
    interiorColor: { 'Premium Color': 0.00 },
    paperType: { '100# White-Coated': 0.00 },
    coverFinish: { 'Gloss': 0.00, 'Matte': 0.00 }
  },
  'US Letter Landscape (11 x 8.5 in / 279 x 216 mm)': {
    binding: { 'Wire O': 12.00 },
    interiorColor: { 'Premium Color': 0.00 },
    paperType: { '100# White-Coated': 0.00 },
    coverFinish: { 'Gloss': 0.00, 'Matte': 0.00 }
  },
  'A4 Landscape (11.69 x 8.27 in / 297 x 210 mm)': {
    binding: { 'Wire O': 12.00 },
    interiorColor: { 'Premium Color': 0.00 },
    paperType: { '100# White-Coated': 0.00 },
    coverFinish: { 'Gloss': 0.00, 'Matte': 0.00 }
  },
  'Square (8.5 x 8.5 in / 216 x 216 mm)': {
    binding: { 'Wire O': 12.00 },
    interiorColor: { 'Premium Color': 0.00 },
    paperType: { '100# White-Coated': 0.00 },
    coverFinish: { 'Gloss': 0.00, 'Matte': 0.00 }
  },
  'Small Square (7.5 x 7.5 in / 190 x 190 mm)': {
    binding: { 'Wire O': 12.00 },
    interiorColor: { 'Premium Color': 0.00 },
    paperType: { '100# White-Coated': 0.00 },
    coverFinish: { 'Gloss': 0.00, 'Matte': 0.00 }
  }
};

// Discount logic - discounts above 100 quantity
const DISCOUNTS = [
  { min: 1000, percent: 15 },
  { min: 500, percent: 10 },
  { min: 100, percent: 5 }
];

// Page count is constant at 26 as per pricing sheet
const CONSTANT_PAGE_COUNT = 26;

// Utility Functions
const calculatePrice = (formData) => {
  const { calendarSize, binding_id, interior_color_id, paper_type_id, cover_finish_id, quantity } = formData;
  
  if (!calendarSize || !binding_id || !interior_color_id || !paper_type_id || !cover_finish_id) {
    return null;
  }

  const sizePricing = CALENDAR_PRICING[calendarSize];
  if (!sizePricing) return null;

  // Calculate unit price based on pricing logic
  const unitPrice = (sizePricing.binding[binding_id] || 0) + 
                   (sizePricing.interiorColor[interior_color_id] || 0) + 
                   (sizePricing.paperType[paper_type_id] || 0) + 
                   (sizePricing.coverFinish[cover_finish_id] || 0);

  const totalPrice = unitPrice * quantity;
  
  // Apply discount only for quantities above 100
  const discount = DISCOUNTS.find(d => quantity >= d.min);
  const discountAmount = discount ? totalPrice * (discount.percent / 100) : 0;
  
  return {
    unitPrice: unitPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
    discount: discountAmount.toFixed(2),
    discountPercent: discount?.percent || 0,
    finalPrice: (totalPrice - discountAmount).toFixed(2)
  };
};

// Reusable Components
const FormInput = ({ type = 'text', name, value, onChange, placeholder, className = "", disabled = false, ...props }) => (
  <input 
    type={type} 
    name={name} 
    value={value} 
    onChange={onChange} 
    placeholder={placeholder} 
    className={`w-full border px-3 py-2 rounded ${className}`} 
    disabled={disabled} 
    required 
    {...props} 
  />
);

const FormSelect = ({ name, value, onChange, options, placeholder, className = "" }) => (
  <select 
    name={name} 
    value={value} 
    onChange={onChange} 
    className={`w-full border px-3 py-2 rounded ${className}`} 
    required
  >
    <option value="">{placeholder}</option>
    {options.map((option, idx) => (
      <option key={idx} value={option}>{option}</option>
    ))}
  </select>
);

const OptionCard = ({ item, fieldName, fieldValue, onSelect, stepAccessible, hasDbName = false }) => {
  const canSelect = stepAccessible;
  const opacity = !stepAccessible ? 0.3 : 1;
  const value = hasDbName ? item.dbName : item.name;
  
  return (
    <label 
      className={`flex flex-col items-center cursor-pointer relative w-20 sm:w-24 ${!canSelect ? 'cursor-not-allowed' : ''}`} 
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
          unoptimized // since these are local static images, not from a Next.js image loader
        />
      </div>
      <p className="text-xs sm:text-sm text-[#2A428C] text-center px-1">{item.name}</p>
    </label>
  );
};

const SectionTitle = ({ children }) => (
  <>
    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 text-[#2A428C]">{children}</h2>
    <div className="w-full h-0.5 bg-gray-200 mb-4 sm:mb-6"></div>
  </>
);

const OptionSection = ({ title, options, fieldName, fieldValue, onSelect, stepAccessible, hasDbName = false }) => (
  <>
    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#2A428C]">{title}</h3>
    <div className="flex gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 flex-wrap">
      {options.map((item, idx) => (
        <OptionCard 
          key={idx} 
          item={item} 
          fieldName={fieldName} 
          fieldValue={fieldValue} 
          onSelect={onSelect} 
          stepAccessible={stepAccessible} 
          hasDbName={hasDbName} 
        />
      ))}
    </div>
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

const CalendarCalculator = () => {
  const [form, setForm] = useState({
    calendarSize: '',
    binding_id: '',
    interior_color_id: '',
    paper_type_id: '',
    cover_finish_id: '',
    quantity: 1
  });
  const [result, setResult] = useState(null);

  // Step accessibility logic
  const stepAccessibility = useMemo(() => ({
    calendarSize: true,
    binding: form.calendarSize !== '',
    interiorColor: form.calendarSize !== '' && form.binding_id !== '',
    paperType: form.calendarSize !== '' && form.binding_id !== '' && form.interior_color_id !== '',
    coverFinish: form.calendarSize !== '' && form.binding_id !== '' && form.interior_color_id !== '' && form.paper_type_id !== ''
  }), [form]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? (value === '' ? '' : Number(value)) : value;
    
    // Reset dependent fields when parent fields change
    const resetFields = {
      calendarSize: ['binding_id', 'interior_color_id', 'paper_type_id', 'cover_finish_id'],
      binding_id: ['interior_color_id', 'paper_type_id', 'cover_finish_id'],
      interior_color_id: ['paper_type_id', 'cover_finish_id'],
      paper_type_id: ['cover_finish_id']
    };

    setForm(prev => {
      const newForm = { ...prev, [name]: val };
      resetFields[name]?.forEach(field => {
        newForm[field] = '';
      });
      return newForm;
    });
    
    setResult(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.calendarSize || !form.binding_id || !form.interior_color_id || !form.paper_type_id || !form.cover_finish_id || form.quantity <= 0) {
      alert("Please fill in all required fields and ensure quantity is positive.");
      return;
    }
    
    setResult(calculatePrice(form));
  };

  // Prevent horizontal scroll
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = 'auto';
    };
  }, []);

  return (
    <>
      <PricingBanner />
      <Carousel />
      
      <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-8 flex flex-col xl:flex-row gap-6 xl:gap-8">
        {/* Left Side - Form */}
        <div className="w-full xl:w-3/5 bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 lg:p-8 rounded-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#2A428C]">Calendar</h2>
          
          {/* Calendar Size Selection */}
          <div className="flex flex-col gap-4 p-4 mb-8 bg-gradient-to-r from-[#016AB3] via-[#0096CD] to-[#00AEDC] rounded-2xl">
            <h3 className="text-white text-lg font-semibold">Calendar Size & Page Count</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2 flex flex-col">
                <div className="h-5 mb-1">
                  <p className="text-xs text-white opacity-90">Calendar Size</p>
                </div>
                <FormSelect 
                  name="calendarSize" 
                  value={form.calendarSize} 
                  onChange={handleChange} 
                  options={CALENDAR_SIZES} 
                  placeholder="Select Calendar Size" 
                  className="h-12 bg-white" 
                />
              </div>
              <div className="w-full sm:w-1/2 flex flex-col">
                <div className="h-5 mb-1">
                  <p className="text-xs text-white opacity-90">Page Count (Fixed)</p>
                </div>
                <div className="h-12 bg-white text-black rounded-md flex items-center justify-center font-semibold">
                  {CONSTANT_PAGE_COUNT} Pages
                </div>
              </div>
            </div>
          </div>

          {/* Binding Type */}
          <SectionTitle>Binding Type</SectionTitle>
          <OptionSection 
            title="Wire O Binding" 
            options={OPTIONS_CONFIG.bindingType} 
            fieldName="binding_id" 
            fieldValue={form.binding_id} 
            onSelect={(value) => setForm(prev => ({ ...prev, binding_id: value }))} 
            stepAccessible={stepAccessibility.binding} 
            hasDbName={true} 
          />

          {/* Interior Color */}
          <SectionTitle>Interior Color</SectionTitle>
          <div className="flex gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 flex-wrap">
            {OPTIONS_CONFIG.interiorColor.map((item, idx) => (
              <OptionCard 
                key={idx} 
                item={item} 
                fieldName="interior_color_id" 
                fieldValue={form.interior_color_id} 
                onSelect={(value) => setForm(prev => ({ ...prev, interior_color_id: value }))} 
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
                onSelect={(value) => setForm(prev => ({ ...prev, paper_type_id: value }))} 
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
                onSelect={(value) => setForm(prev => ({ ...prev, cover_finish_id: value }))} 
                stepAccessible={stepAccessibility.coverFinish} 
                hasDbName={true} 
              />
            ))}
          </div>

          {/* Quantity & Calculate */}
          <div className="flex flex-col gap-4 p-4 bg-gradient-to-r from-[#016AB3] via-[#0096CD] to-[#00aedc] rounded-2xl">
            <h3 className="text-white text-lg font-semibold">Quantity & Shipping Estimate</h3>
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
            
            {/* Results Display */}
            {result && (
              <div className="bg-white/20 rounded-lg p-4 text-white">
                <h4 className="font-semibold mb-2">Pricing Results:</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Unit Price:</span>
                    <span>${result.unitPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total ({form.quantity} calendars):</span>
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
                      {form.quantity >= 1000 ? ' (15% off)' : 
                       form.quantity >= 500 ? ' (10% off)' : ' (5% off)'}
                    </div>
                  )}
                </div>
                
                {/* Bulk Discount Table */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-[#2A428C] mb-2">Bulk Discount Tiers</h3>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>100-499 calendars:</span>
                      <span className={form.quantity >= 100 && form.quantity < 500 ? 'font-semibold text-green-600' : ''}>
                        5% off
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>500-999 calendars:</span>
                      <span className={form.quantity >= 500 && form.quantity < 1000 ? 'font-semibold text-green-600' : ''}>
                        10% off
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>1000+ calendars:</span>
                      <span className={form.quantity >= 1000 ? 'font-semibold text-green-600' : ''}>
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

        {/* Right Side - Summary */}
        <div className="w-full xl:w-2/5">
          <div className="sticky top-8 bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg">
            <Image 
              src={RightImage} 
              alt="Custom Calendar Printing" 
              className="w-full h-32 sm:h-40 lg:h-48 object-cover mb-4 rounded" 
              width={400}
              height={160}
              unoptimized
            />
            <h2 className="text-lg sm:text-xl font-bold text-[#2A428C] mb-2 text-center">
              Custom Calendar Printing
            </h2>
            <div className="w-full h-0.5 bg-gray-300 mb-4"></div>
            {/* Summary Information */}
            {[
              [['Calendar Size', form.calendarSize || '-'], ['Page Count', `${CONSTANT_PAGE_COUNT} (Fixed)`]],
              [['Binding Type', form.binding_id || '-'], ['Interior Color', form.interior_color_id || '-']],
              [['Paper Type', form.paper_type_id || '-'], ['Cover Finish', form.cover_finish_id || '-']],
              [['Quantity', form.quantity || '-'], ['Status', form.calendarSize && form.binding_id && form.interior_color_id && form.paper_type_id && form.cover_finish_id ? 'Ready to Calculate' : 'Fill Required Fields']]
            ].map((row, i) => (
              <React.Fragment key={i}>
                <SummaryRow pairs={row} />
                <div className={`w-full h-px bg-gray-200 ${i === 3 ? 'my-4' : 'my-2'}`}></div>
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

export default CalendarCalculator;
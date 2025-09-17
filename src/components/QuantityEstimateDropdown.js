'use client';
import React, { useState } from 'react';
import BulkDiscountTable from '@/components/BulkDiscountTable'; // Adjust path if needed
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// If you do not have a separate InputField, define it here (same as in your app)
const InputField = ({ label, name, value, onChange, type = 'text', placeholder }) => (
  <div>
    {label && <label className="block font-medium mb-1">{label}</label>}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full border px-3 py-2 rounded"
      placeholder={placeholder}
    />
  </div>
);

const QuantityEstimateDropdown = ({
  form,
  handleChange,
  handleSubmit,
  result,
  getDiscountInfo,
  calculating,
  loadingAvailableOptions
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-xl mx-auto my-6 border rounded shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(o => !o)}
        className="flex justify-between items-center w-full bg-blue-100 px-4 py-3 rounded cursor-pointer text-[#2A428C] font-semibold text-lg"
        aria-expanded={isOpen}
        aria-controls="quantity-estimate-panel"
      >
        <span>Quantity and Shipping Estimates</span>
        <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
      </button>

      {isOpen && (
        <div id="quantity-estimate-panel" className="p-4 bg-white border-t border-blue-200">
          <div className="flex gap-4 items-end flex-wrap">
            <BulkDiscountTable />
            <div style={{ width: '50%', minWidth: 200 }}>
              <InputField
                label="Quantity"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                type="number"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={calculating || loadingAvailableOptions}
              className="flex-1 bg-[#F8C20A] hover:bg-[#ffd84a] text-[#2A428C] py-2 px-4 rounded font-bold transition min-w-[120px]"
            >
              {calculating ? 'Calculating...' : 'Calculate'}
            </button>
          </div>

          {result && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
              <h3 className="font-semibold text-blue-700">💰 Result</h3>
              <p><strong>Cost per Book:</strong> ${Number(result.cost_per_book).toFixed(2)}</p>
              <p><strong>Original Total Cost:</strong> ${Number(result.total_cost).toFixed(2)}</p>

              {form.quantity >= 100 && (() => {
                const discount = getDiscountInfo(form.quantity);
                if (!discount) return null;
                const discountAmount = (discount.percent / 100) * result.total_cost;
                const discountedTotalCost = result.total_cost - discountAmount;
                return (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded">
                    <span className="font-semibold text-[#D8861A]">Bulk Discount Applied:</span>
                    <ul className="mt-1 text-[#2A428C] text-sm list-disc list-inside">
                      <li>Discount: {discount.percent}%</li>
                      <li>Discounted Price per Book: ${discount.price.toFixed(2)}</li>
                      <li>Discount Amount: ${discountAmount.toFixed(2)}</li>
                      <li><strong>Final Total Cost:</strong> ${discountedTotalCost.toFixed(2)}</li>
                    </ul>
                  </div>
                );
              })()}
        
            </div>
          )}
                
        </div>
      )}
      
    </div>
  );
};

export default QuantityEstimateDropdown;
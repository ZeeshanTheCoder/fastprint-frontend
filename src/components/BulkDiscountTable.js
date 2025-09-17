import React from "react";

const discountRanges = [
  { min: 100, max: 499, percent: 5, price: 20.04 },
  { min: 500, max: 999, percent: 10, price: 18.98 },
  { min: 1000, max: Infinity, percent: 15, price: 17.93 },
];

export default function BulkDiscountTable() {
  return (
    <div className="mb-6 p-4 bg-blue-50 rounded border border-blue-200 w-full max-w-md">
      <h4 className="text-lg font-semibold mb-2 text-[#2A428C]">
        Bulk Discount Ranges
      </h4>
      <table className="w-full text-sm text-[#2A428C]">
        <thead>
          <tr>
            <th className="text-left p-1">Book Quantity</th>
            <th className="text-left p-1">% Off</th>
            <th className="text-left p-1">Price per Book</th>
          </tr>
        </thead>
        <tbody>
          {discountRanges.map((range, idx) => (
            <tr key={idx}>
              <td className="p-1">
                {range.max === Infinity
                  ? `${range.min}+`
                  : `${range.min}-${range.max}`}
              </td>
              <td className="p-1">{range.percent}% OFF</td>
              <td className="p-1">{range.price.toFixed(2)} USD</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/services/baseUrl";

const ShippingEstimate = () => {
  const [address, setAddress] = useState({
    country: "",
    state: "",
    city: "",
    postal_code: "",
  });

  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get token from localStorage
  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("accessToken");
    }
    return null;
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchShippingRates = async () => {
    const { country, state, city, postal_code } = address;

    if (!country || !state || !city || !postal_code) {
      setShippingOptions([]);
      setSelectedOption(null);
      setError("");
      return;
    }

    const token = getToken();
    if (!token) {
      setError("You need to be logged in to calculate shipping rates.");
      return;
    }

    setLoading(true);
    setError("");
    setShippingOptions([]);
    setSelectedOption(null);

    try {
      const res = await axios.post(
        `${BASE_URL}api/shipping-rate/`,
        {
          ...address,
          account_type: "individual", // always send individual
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Backend returns available_services array
      // Map it to frontend expected fields: service, rate, estimated_days
      const services = res.data.available_services || [];

      if (services.length === 0) {
        setError("No shipping options available for this address.");
      }

      const options = services.map((s) => ({
        service: s.service_name,
        rate: s.total_charge,
        estimated_days: s.delivery_time,
        courier_name: s.courier_name,
      }));

      setShippingOptions(options);
    } catch (err) {
      console.error("Shipping fetch error:", err);
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.");
      } else {
        setError(
          err.response?.data?.error ||
            "Failed to fetch shipping options. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // debounce fetch on address change
    const timer = setTimeout(() => {
      fetchShippingRates();
    }, 500);

    return () => clearTimeout(timer);
  }, [address.country, address.state, address.city, address.postal_code]);

  return (
    <div className="mt-6 p-4 bg-white border border-blue-200 rounded-lg shadow-sm">
      <h3 className="font-semibold text-blue-700 text-lg mb-4">Shipping Estimate</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <input
          type="text"
          name="country"
          placeholder="Country (e.g., US)"
          value={address.country}
          onChange={handleAddressChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="state"
          placeholder="State (e.g., TX)"
          value={address.state}
          onChange={handleAddressChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleAddressChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="postal_code"
          placeholder="Postal Code"
          value={address.postal_code}
          onChange={handleAddressChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && (
        <div className="mt-4 flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
          <p className="text-blue-600 text-sm">Loading shipping options...</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {shippingOptions.length > 0 && (
        <div className="mt-5">
          <label className="block mb-2 font-medium text-gray-700 text-sm md:text-base">
            Select Shipping Option:
          </label>
          <select
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedOption?.service || ""}
            onChange={(e) => {
              const selected = shippingOptions.find(
                (opt) => opt.service === e.target.value
              );
              setSelectedOption(selected);
            }}
            disabled={loading}
          >
            <option value="">-- Select Shipping Method --</option>
            {shippingOptions.map((option, index) => (
              <option key={index} value={option.service}>
                {option.courier_name} - {option.service} — ${option.rate} —{" "}
                {option.estimated_days}
              </option>
            ))}
          </select>

          {selectedOption && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-blue-800 font-medium text-sm md:text-base">
                Shipping Rate: <span className="font-bold">${selectedOption.rate}</span>
              </p>
              <p className="text-blue-800 font-medium text-sm md:text-base">
                Estimated Delivery:{" "}
                <span className="font-bold">{selectedOption.estimated_days}</span>
              </p>
              <p className="text-blue-800 text-xs mt-2">
                Carrier: {selectedOption.courier_name}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShippingEstimate;
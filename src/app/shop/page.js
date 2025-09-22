"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/services/baseUrl";

const Shop = () => {
  const router = useRouter();

  // Get data from localStorage (passed from DesignProject)
  const [initialData, setInitialData] = useState({
    originalTotalCost: 0,
    finalTotalCost: 0,
    totalCost: 0,
    initialQuantity: 1,
    costPerBook: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem("shopData");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setInitialData({
          originalTotalCost: data.originalTotalCost ?? 0,
          finalTotalCost: data.finalTotalCost ?? 0,
          totalCost: data.totalCost ?? 0,
          initialQuantity: data.initialQuantity ?? 1,
          costPerBook: data.costPerBook ?? 0,
        });
      } catch (e) {
        console.warn("Invalid shopData in localStorage");
      }
    }
  }, []);

  // Destructure initial data
  const {
    originalTotalCost = 0,
    finalTotalCost = 0,
    totalCost = 0,
    initialQuantity = 1,
    costPerBook = 0,
  } = initialData;

  // Determine which total cost to use
  const displayTotalCost = finalTotalCost || totalCost || originalTotalCost;

  // Calculate cost per book
  const calculatedCostPerBook =
    displayTotalCost && initialQuantity
      ? displayTotalCost / initialQuantity
      : costPerBook;

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    company: "",
    address: "",
    apt_floor: "",
    country: "",
    state: "",
    city: "",
    postal_code: "",
    phone_number: "",
    account_type: "individual",
    has_resale_cert: false,
  });

  const [shippingRate, setShippingRate] = useState(null);
  const [tax, setTax] = useState(null);
  const [taxRate, setTaxRate] = useState(null);
  const [taxReason, setTaxReason] = useState(null);
  const [accountType, setAccountType] = useState("individual");
  const [courierName, setCourierName] = useState(null);
  const [estimatedDelivery, setEstimatedDelivery] = useState(null);
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shippingError, setShippingError] = useState(null);

  // Dynamic quantity state
  const [productQuantity, setProductQuantity] = useState(initialQuantity || 1);
  const productPrice = calculatedCostPerBook;
  const subtotal = finalTotalCost;

  const calculateTotal = () => {
    let total = subtotal;
    if (shippingRate !== null) total += shippingRate;
    if (tax !== null) total += tax;
    return total;
  };

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem("accessToken");
  };

  const deliveryHandler = async () => {
    const token = getToken();
    if (!token) {
      alert("You need to be logged in to proceed. Redirecting to login...");
      router.push("/login");
      return;
    }

    if (
      !form.first_name ||
      !form.last_name ||
      !form.address ||
      !form.country ||
      !form.city ||
      !form.phone_number
    ) {
      alert("Please fill all required fields.");
      return;
    }
    if (shippingRate === null) {
      alert("Please calculate shipping rate first.");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}api/save-shipping/`,
        {
          user_address: {
            first_name: form.first_name,
            last_name: form.last_name,
            company: form.company,
            address: form.address,
            apt_floor: form.apt_floor,
            country: form.country,
            state: form.state,
            city: form.city,
            postal_code: form.postal_code,
            phone_number: form.phone_number,
            account_type: form.account_type,
            has_resale_cert: form.has_resale_cert,
          },
          shipping_rate: shippingRate,
          tax: tax,
          product_quantity: productQuantity,
          product_price: productPrice,
          subtotal: subtotal,
          selected_service: selectedService,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Shipping information saved!");
      console.log("Sending to API:", {
        user_address: { ...form },
        shipping_rate: shippingRate,
        tax: tax,
        product_quantity: productQuantity,
        product_price: productPrice,
        subtotal: subtotal,
        selected_service: selectedService,
      });

      // Navigate to payment page with all calculated values
      localStorage.setItem(
        "paymentData",
        JSON.stringify({
          bookPrice: displayTotalCost || 0,
          productQuantity: productQuantity,
          subtotal: displayTotalCost || 0,
          shippingRate: shippingRate || 0,
          tax: tax || 0,
          totalAmount: calculateTotal(),
          selectedService: selectedService,
          taxRate: taxRate,
          accountType: accountType,
        })
      );

      // localStorage.removeItem('shopData');

      router.push("/payment");
    } catch (error) {
      console.error(
        "Shipping save error:",
        error.response?.data || error.message
      );
      alert(
        error.response?.status === 401
          ? "Session expired. Please log in again."
          : "Failed to save shipping info. Please try again."
      );
    }
  };

  const fetchShippingRate = async () => {
    const token = getToken();
    if (!token) {
      alert(
        "You need to be logged in to calculate shipping. Redirecting to login..."
      );
      router.push("/login");
      return;
    }

    const { country, state, city, postal_code } = form;
    if (!country || !state || !city || !postal_code) {
      alert("Please fill country, state, city, and postal code.");
      return;
    }

    setIsLoading(true);
    setShippingError(null);

    try {
      const res = await axios.post(
        `${BASE_URL}api/shipping-rate/`,
        {
          country: country.trim().toUpperCase(),
          state: state.trim().toUpperCase(),
          city: city.trim(),
          postal_code: postal_code.trim(),
          account_type: form.account_type,
          has_resale_cert: form.has_resale_cert,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const {
        shipping_rate = 0,
        tax: resTax = 0,
        tax_rate = "0.00%",
        tax_reason = "",
        account_type: resAccountType = "individual",
        courier_name = "",
        estimated_delivery = "",
        available_services = [],
      } = res.data;

      // Double the shipping rate from API
      const doubledShippingRate = shipping_rate * 2;

      setShippingRate(doubledShippingRate);
      setTax(resTax);
      setTaxRate(tax_rate);
      setTaxReason(tax_reason);
      setAccountType(resAccountType);
      setCourierName(courier_name);
      setEstimatedDelivery(estimated_delivery);

      // Double the shipping rates in available services
      const modifiedServices = (available_services || []).map((service) => ({
        ...service,
        total_charge: service.total_charge * 2,
      }));
      setAvailableServices(modifiedServices);

      if (modifiedServices && modifiedServices.length > 0) {
        const cheapestService = modifiedServices.reduce((prev, current) =>
          prev.total_charge < current.total_charge ? prev : current
        );
        setSelectedService(cheapestService);
      }
    } catch (error) {
      console.error("Rate error:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        setShippingError("Authentication failed. Please log in again.");
      } else {
        setShippingError(
          error.response?.data?.error?.includes("No DHL or FedEx")
            ? `No DHL or FedEx services available for this destination. Available couriers: ${
                error.response.data.available_couriers?.join(", ") || "None"
              }`
            : "Failed to fetch shipping rate. Please try again."
        );
      }
      [
        setShippingRate,
        setTax,
        setTaxRate,
        setTaxReason,
        setCourierName,
        setEstimatedDelivery,
        setSelectedService,
        setShippingError,
      ].forEach((fn) => fn(null));
      setAvailableServices([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceSelection = (service) => {
    setSelectedService(service);
    setShippingRate(service.total_charge);
    setCourierName(service.courier_name);
    setEstimatedDelivery(service.delivery_time);
    const newTax = shippingRate
      ? (tax / shippingRate) * service.total_charge
      : tax;
    setTax(newTax);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });

    if (
      [
        "country",
        "state",
        "city",
        "postal_code",
        "account_type",
        "has_resale_cert",
      ].includes(name)
    ) {
      [
        setShippingRate,
        setTax,
        setTaxRate,
        setTaxReason,
        setCourierName,
        setEstimatedDelivery,
        setSelectedService,
        setShippingError,
      ].forEach((fn) => fn(null));
      setAvailableServices([]);
    }
  };

  const inputClass =
    "w-full p-2 md:p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const buttonClass =
    "w-full py-2 md:py-3 text-white font-medium text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200";

  const handleEditClick = () => {
    router.push("/design-project");
  };

  return (
    <>
      <div
        className="w-full h-[51px] flex items-center px-4 md:px-6"
        style={{
          background:
            "linear-gradient(90deg, #016AB3 16.41%, #0096CD 60.03%, #00AEDC 87.93%)",
        }}
      >
        <h1 className="text-white text-base md:text-lg font-semibold">Shop</h1>
      </div>

      <div className="w-full min-h-screen bg-gradient-to-br from-[#eef4ff] to-[#fef6fb] px-4 md:px-6 py-6 md:py-10 font-sans relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 md:gap-10 relative">
          {/* Left Section */}
          <div className="w-full lg:w-[60%] bg-gradient-to-br from-[#f2f9ff] via-white to-[#fff0f5] rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 lg:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#2A428C] mb-4">
              Enter Your Shipping Address
            </h2>
            <hr className="mb-4 md:mb-6 border-[#2A428C]" />

            {/* Account Type Selection */}
            <div className="mb-4 md:mb-6 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-base md:text-lg font-semibold text-[#2A428C] mb-2 md:mb-3">
                Account Type
              </h3>
              <div className="flex flex-col md:flex-row gap-3 md:gap-6">
                {["individual", "enterprise"].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="account_type"
                      value={type}
                      checked={form.account_type === type}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm md:text-base font-medium">
                      {type === "enterprise"
                        ? "Enterprise/Business"
                        : "Individual"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Resale Certificate */}
            {form.account_type === "enterprise" && (
              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-green-50 rounded-lg border border-green-200">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="has_resale_cert"
                    checked={form.has_resale_cert}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm md:text-base font-medium text-green-800">
                    I have a valid resale certificate (tax exempt)
                  </span>
                </label>
              </div>
            )}

            {/* Form Fields */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4">
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleInputChange}
                placeholder="First Name"
                className={`${inputClass} md:w-1/2`}
              />
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleInputChange}
                placeholder="Last Name"
                className={`${inputClass} md:w-1/2`}
              />
            </div>

            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleInputChange}
              placeholder="Company/Organization Name (Optional)"
              className={`${inputClass} mb-4`}
            />
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleInputChange}
              placeholder="Street Address"
              className={`${inputClass} mb-4`}
            />
            <input
              type="text"
              name="apt_floor"
              value={form.apt_floor}
              onChange={handleInputChange}
              placeholder="Apt/Floor/Suite (Optional)"
              className={`${inputClass} mb-4`}
            />

            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4">
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleInputChange}
                placeholder="Country (e.g., US)"
                className={`${inputClass} md:w-1/2`}
              />
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleInputChange}
                placeholder="State (e.g., TX)"
                className={`${inputClass} md:w-1/2`}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4">
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleInputChange}
                placeholder="City"
                className={`${inputClass} md:w-1/2`}
              />
              <input
                type="text"
                name="postal_code"
                value={form.postal_code}
                onChange={handleInputChange}
                placeholder="Postal Code"
                className={`${inputClass} md:w-1/2`}
              />
            </div>

            <input
              type="text"
              name="phone_number"
              value={form.phone_number}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className={`${inputClass} mb-4`}
            />

            {/* Error Message */}
            {shippingError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm md:text-base">
                {shippingError}
              </div>
            )}

            {/* Calculate Rate */}
            <button
              className={`${buttonClass} mb-3 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#44c6ff] to-[#1786ff] hover:from-[#3bb5ff] hover:to-[#0f75ff]"
              }`}
              onClick={fetchShippingRate}
              disabled={isLoading}
            >
              {isLoading ? "Calculating..." : "Calculate Shipping Rate "}
            </button>

            {/* Available Services */}
            {availableServices && availableServices.length > 0 && (
              <div className="mb-4 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-base md:text-lg font-semibold text-[#2A428C] mb-2 md:mb-3">
                  Available Shipping Services
                </h3>
                <div className="space-y-2">
                  {availableServices.map((service, index) => (
                    <label
                      key={index}
                      className="flex items-center p-2 md:p-3 border rounded-lg hover:bg-blue-100 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="selected_service"
                        value={index}
                        checked={
                          selectedService?.courier_name ===
                            service.courier_name &&
                          selectedService?.service_name === service.service_name
                        }
                        onChange={() => handleServiceSelection(service)}
                        className="mr-2 md:mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                          <span className="font-medium text-sm md:text-base">
                            {service.courier_name}
                          </span>
                          <span className="font-bold text-[#2A428C] text-sm md:text-base">
                            ${service.total_charge.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-xs md:text-sm text-gray-600">
                          {service.service_name && (
                            <span>{service.service_name} • </span>
                          )}
                          <span>Delivery: {service.delivery_time}</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping Info Display */}
            {selectedService && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm md:text-base">
                <p>
                  <strong>Selected Service:</strong>{" "}
                  {selectedService.courier_name}
                </p>
                <p>
                  <strong>Service Type:</strong>{" "}
                  {selectedService.service_name || "Standard"}
                </p>
                <p>
                  <strong>Estimated Delivery:</strong>{" "}
                  {selectedService.delivery_time}
                </p>
                <p>
                  <strong>Account Type:</strong> {accountType}
                </p>
                <p>
                  <strong>Tax Rate:</strong> {taxRate}
                </p>
                {taxReason && (
                  <p>
                    <strong>Tax Reason:</strong> {taxReason}
                  </p>
                )}
              </div>
            )}

            {/* Save Info */}
            <button
              className={`${buttonClass} bg-gradient-to-r from-[#0a79f8] to-[#1e78ee] hover:from-[#0968d9] hover:to-[#1560d5]`}
              onClick={deliveryHandler}
            >
              Check Delivery Method
            </button>
          </div>

          {/* Right Section - Cart Summary */}
          <div className="w-full lg:w-[40%]">
            <div className="w-full bg-gradient-to-br from-[#e0f3ff] via-white to-[#ffe4ec] rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6">
              <div className="flex justify-between mb-4">
                <h3 className="text-[#2A428C] text-lg md:text-xl font-semibold">
                  Cart Summary
                </h3>
                <div
                  className="flex items-center gap-2 text-[#2A428C] font-semibold text-lg md:text-xl cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={handleEditClick}
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 17.25V21h3.75l11-11.03-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
                  </svg>
                </div>
              </div>

              <div className="bg-[#E5FBFF] rounded-xl p-3 md:p-4 flex gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="flex flex-col justify-center">
                  <h4 className="text-[#2A428C] font-bold text-lg md:text-xl mb-1">
                    Book
                  </h4>
                  <p className="text-[#2A428C] text-base md:text-lg font-semibold">
                    Total Price: $
                    {displayTotalCost ? displayTotalCost.toFixed(2) : "0.00"}
                  </p>
                </div>
              </div>

              <div className="text-sm space-y-2 md:space-y-3 mb-4 md:mb-6">
                <div className="flex justify-between font-medium">
                  <span className="text-gray-600">Subtotal </span>
                  <span className="text-[#2A428C]">
                    {" "}
                    ${displayTotalCost ? displayTotalCost.toFixed(2) : "0.00"}
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-600">
                    Shipping{" "}
                    {selectedService && `(${selectedService.courier_name})`}
                  </span>
                  <span
                    className={
                      shippingRate !== null ? "text-gray-900" : "text-gray-400"
                    }
                  >
                    {shippingRate !== null
                      ? `$${shippingRate.toFixed(2)}`
                      : "Calculate first"}
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-600">
                    Taxes {taxRate && `(${taxRate})`}
                  </span>
                  <span
                    className={tax !== null ? "text-gray-900" : "text-gray-400"}
                  >
                    {tax !== null ? `$${tax.toFixed(2)}` : "Calculate first"}
                  </span>
                </div>
                {taxReason && (
                  <div className="text-xs text-gray-500 italic pl-2">
                    {taxReason}
                  </div>
                )}
                <hr className="border-gray-200" />
                <div className="flex justify-between font-bold text-base md:text-lg">
                  <span className="text-[#2A428C]">Total</span>
                  <span className="text-[#2A428C]">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Account Type Badge */}
              {accountType && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-3 md:mb-4">
                  <p className="text-xs text-blue-800 text-center">
                    <strong>Account:</strong>{" "}
                    {accountType.charAt(0).toUpperCase() + accountType.slice(1)}
                    {form.account_type === "enterprise" &&
                      form.has_resale_cert &&
                      " (Tax Exempt)"}
                  </p>
                </div>
              )}

              {/* Shipping Status */}
              {shippingRate !== null && selectedService && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-2 md:p-3 mb-3 md:mb-4">
                  <p className="text-xs md:text-sm text-green-800">
                    <strong>Ready to checkout!</strong>{" "}
                    {selectedService.courier_name} shipping selected.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;

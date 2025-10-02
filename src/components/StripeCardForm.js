"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { BASE_URL } from "@/services/baseUrl";

const StripeCardForm = ({ amount, onSuccess, onError, disabled }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);
    
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("You need to be logged in to complete your purchase.");
        setIsProcessing(false);
        return;
      }
      
      // 1. Create PaymentIntent on backend
      const res = await axios.post(
        `${BASE_URL}api/create-payment-intent/`,
        { amount: Math.round(amount * 100), currency: "usd" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const clientSecret = res.data.clientSecret;
      
      // 2. Confirm card payment
      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
      
      if (result.error) {
        setError(result.error.message);
        onError && onError(result.error.message);
      } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
        onSuccess && onSuccess(result.paymentIntent);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Payment failed");
      onError && onError(err.response?.data?.error || err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement 
        options={{ 
          hidePostalCode: true,
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }} 
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {error && <div className="text-red-600 text-sm">{error}</div>}
      
      <button
        type="submit"
        disabled={!stripe || !elements || isProcessing || disabled}
        className={`w-full py-3 px-6 rounded-full font-medium text-white transition-all duration-200 ${
          isProcessing || disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 active:from-blue-800 active:to-blue-950 shadow-md hover:shadow-lg"
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.9996 2C11.4996 2 10.9996 2.3 10.7996 2.8L8.79961 7.2H5.59961C4.69961 7.2 3.99961 7.9 3.99961 8.8C3.99961 8.9 4.09961 9 4.19961 9.1L7.49961 14.5L5.49961 19.9C5.29961 20.4 5.49961 21 5.99961 21.3C6.29961 21.5 6.69961 21.5 6.99961 21.4L11.9996 19.4L16.9996 21.4C17.2996 21.5 17.6996 21.5 17.9996 21.3C18.4996 21 18.6996 20.4 18.4996 19.9L16.4996 14.5L19.7996 9.1C19.8996 9 19.9996 8.9 19.9996 8.8C19.9996 7.9 19.2996 7.2 18.3996 7.2H15.1996L13.1996 2.8C12.9996 2.3 12.4996 2 11.9996 2Z" />
            </svg>
            <span>Pay with Card</span>
          </div>
        )}
      </button>
    </form>
  );
};

export default StripeCardForm;
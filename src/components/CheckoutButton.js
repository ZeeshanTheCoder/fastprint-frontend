import { BASE_URL } from "@/services/baseUrl";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

import { useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51QbTz6RxiPcxiXelLov7aonk68MVy3OVLHYOsdTyOaTH1pQ3FfSql0TjE4WNd0pgzs5qyJUaBXtd3ar5GLP4ESP400FHqiRJF9"
);

const CheckoutButton = ({ lineItems }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("You need to be logged in to complete your purchase.");
        setIsLoading(false);
        return;
      }

      // Use BASE_URL for backend URL with authentication header
      const response = await axios.post(
        `${BASE_URL}api/create-checkout-session/`,
        {
          items: lineItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const session = response.data;

      if (session.error) {
        setError(session.error);
        setIsLoading(false);
        return;
      }

      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        setError(result.error.message);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.");
      } else {
        setError(
          "Currenlty This Payment Method is Disable Please Use Another Method"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full">
        <button
          onClick={handleClick}
          disabled={isLoading}
          className={`
          w-full py-3 px-6 rounded-full font-medium text-white transition-all duration-200
          ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 active:from-blue-800 active:to-blue-950 shadow-md hover:shadow-lg"
          }
        `}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.9996 2C11.4996 2 10.9996 2.3 10.7996 2.8L8.79961 7.2H5.59961C4.69961 7.2 3.99961 7.9 3.99961 8.8C3.99961 8.9 4.09961 9 4.19961 9.1L7.49961 14.5L5.49961 19.9C5.29961 20.4 5.49961 21 5.99961 21.3C6.29961 21.5 6.69961 21.5 6.99961 21.4L11.9996 19.4L16.9996 21.4C17.2996 21.5 17.6996 21.5 17.9996 21.3C18.4996 21 18.6996 20.4 18.4996 19.9L16.4996 14.5L19.7996 9.1C19.8996 9 19.9996 8.9 19.9996 8.8C19.9996 7.9 19.2996 7.2 18.3996 7.2H15.1996L13.1996 2.8C12.9996 2.3 12.4996 2 11.9996 2Z" />
              </svg>
              <span>Pay with Card</span>
            </div>
          )}
        </button>
      </div>
      {error && (
        <div className="mt-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}
    </>
  );
};

export default CheckoutButton;

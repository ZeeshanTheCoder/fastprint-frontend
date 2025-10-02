"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/services/baseUrl";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCardForm from "@/components/StripeCardForm";

const stripePromise = loadStripe(
  "pk_test_51QbTz6RxiPcxiXelLov7aonk68MVy3OVLHYOsdTyOaTH1pQ3FfSql0TjE4WNd0pgzs5qyJUaBXtd3ar5GLP4ESP400FHqiRJF9"
);

const Payment = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [projectData, setProjectData] = useState(null);
  
  // Load project data from localStorage
  useEffect(() => {
    const fetchLocalStorageData = () => {
      try {
        const data = localStorage.getItem("previewProjectData");
        if (data) {
          const parsedData = JSON.parse(data);
          setProjectData(parsedData);
        }
      } catch (e) {
        console.warn("Error accessing localStorage");
      }
    };

    fetchLocalStorageData();
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  // Get payment data from localStorage (passed from Shop)
  const [initialData, setInitialData] = useState({
    bookPrice: 0,
    productQuantity: 1,
    subtotal: 0,
    shippingRate: 0,
    tax: 0,
    totalAmount: 0,
    selectedService: null,
    taxRate: "0.00%",
    accountType: "individual",
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("paymentData");
      if (saved) {
        setInitialData(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("No valid payment data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const {
    bookPrice = 0,
    productQuantity = 1,
    subtotal = 0,
    shippingRate = 0,
    tax = 0,
    totalAmount = 0,
    selectedService = null,
    taxRate = "0.00%",
    accountType = "individual",
  } = initialData;

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [isPayPalLoading, setIsPayPalLoading] = useState(false);
  const [paypalError, setPaypalError] = useState(null);

  // Construct line items for Stripe, in cents, quantity as integer
  const lineItems = [];

  // Add Book item if price > 0
  if (bookPrice > 0) {
    lineItems.push({
      name: "Book",
      unit_amount: Math.round(bookPrice * 100),
      quantity: productQuantity,
    });
  }

  // Add shipping if cost > 0
  if (shippingRate > 0) {
    lineItems.push({
      name: selectedService
        ? `Shipping (${selectedService.courier_name})`
        : "Shipping",
      unit_amount: Math.round(shippingRate * 100),
      quantity: 1,
    });
  }

  // Add tax if cost > 0
  if (tax > 0) {
    lineItems.push({
      name: taxRate && taxRate !== "0.00%" ? `Tax (${taxRate})` : "Tax",
      unit_amount: Math.round(tax * 100),
      quantity: 1,
    });
  }

  // Stripe button handler
  const handleClick = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const stripe = await stripePromise;
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setErrorMessage("You need to be logged in to complete your purchase.");
        setIsLoading(false);
        return;
      }

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
        setErrorMessage(session.error);
        setIsLoading(false);
        return;
      }

      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        setErrorMessage(result.error.message);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      if (err.response?.status === 401) {
        setErrorMessage("Authentication failed. Please log in again.");
      } else {
        setErrorMessage(
          "Currently This Payment Method is Disabled Please Use Another Method"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // PayPal checkout handler
  const handlePayPalCheckout = async () => {
    if (!totalAmount || totalAmount <= 0) {
      setPaypalError("Invalid amount");
      return;
    }

    setIsPayPalLoading(true);
    setPaypalError(null);

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Please log in to continue");
      }

      // Create PayPal payment
      const response = await axios.post(
        `${BASE_URL}api/paypal/create-payment/`,
        {
          amount: totalAmount.toFixed(2),
          currency: "USD",
          return_url: `${window.location.origin}/payment/success`,
          cancel_url: `${window.location.origin}/payment/cancel`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { payment_id, approval_url } = response.data;

      if (approval_url) {
        // Store payment ID and order details for later use
        localStorage.setItem("paypal_payment_id", payment_id);
        localStorage.setItem(
          "order_details",
          JSON.stringify({
            subtotal,
            shipping: shippingRate,
            tax,
            total: totalAmount,
            selectedService,
          })
        );

        // Redirect to PayPal for approval
        window.location.href = approval_url;
      } else {
        throw new Error("No approval URL received from PayPal");
      }
    } catch (error) {
      console.error("PayPal checkout error:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to initiate PayPal checkout";
      setPaypalError(errorMessage);
    } finally {
      setIsPayPalLoading(false);
    }
  };

  // Cancel button handlers
  const handleEditClick = () => {
    router.back();
  };

  const handleEditClickCancel = () => {
    router.push("/start-project");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] to-[#fef6fb] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment information...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="w-full h-[51px] flex items-center px-4 sm:px-6"
        style={{
          background:
            "linear-gradient(90deg, #016AB3 16.41%, #0096CD 60.03%, #00AEDC 87.93%)",
        }}
      >
        <h1 className="text-white text-lg font-semibold">Payment</h1>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] to-[#fef6fb] px-4 py-6 sm:px-8 sm:py-10 font-sans">
        <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Section - Payment Info */}
          <div className="w-full lg:w-[58%] bg-gradient-to-br from-[#f2f9ff] via-white to-[#fff0f5] rounded-2xl shadow-xl p-6 md:p-10 flex flex-col justify-between min-h-[600px]">
            <div>
              <h2 className="text-2xl font-bold text-[#2A428C] mb-1">Payment Info</h2>
              <p className="text-sm text-gray-600 mb-6">All transactions are secure and encrypted</p>

              {/* Credit Card Option */}
              <div className="border p-4 rounded-lg mb-3 hover:bg-gray-50 cursor-pointer flex items-center">
                <label className="flex items-center gap-3 cursor-pointer w-full">
                  <input
                    type="radio"
                    name="payment"
                    value="credit_card"
                    checked={paymentMethod === "credit_card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-semibold">Credit Card</span>
                  <div className="flex gap-2 ml-auto">
                    <img 
                      src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg" 
                      alt="Visa" 
                      className="h-5 md:h-6" 
                    />
                    <img 
                      src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg" 
                      alt="Mastercard" 
                      className="h-5 md:h-6" 
                    />
                  </div>
                </label>
              </div>

              {/* PayPal Option */}
              <div className="border p-4 rounded-lg mb-5 hover:bg-gray-50 cursor-pointer flex items-center">
                <label className="flex items-center gap-3 cursor-pointer w-full">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-semibold">PayPal</span>
                  <svg className="w-16 md:w-20 h-5 md:h-6 ml-auto" viewBox="0 0 101 25" fill="none">
                    <path d="M12.017 0l.358-.002a5.888 5.888 0 0 1 6.09 5.023c.359 2.278-.2 4.167-1.492 5.729C15.696 12.235 13.779 13 11.547 13H9.86c-.424 0-.787.31-.858.734l-.91 5.769-.258 1.634a.5.5 0 0 1-.494.426H3.682a.294.294 0 0 1-.291-.338L6.47 1.61A.885.885 0 0 1 7.344.948l4.64.052h.033z" fill="#009cde" />
                    <path d="M39.252 9.632c0 2.152-.844 3.799-2.532 4.942-1.688 1.143-4.077 1.714-7.167 1.714s-5.529-.526-7.297-1.577c-1.768-1.052-2.652-2.523-2.652-4.413 0-.79.195-1.49.585-2.099.39-.61.936-1.109 1.637-1.497.702-.388 1.521-.678 2.457-.87.936-.193 1.954-.289 3.054-.289 1.039 0 1.988.089 2.847.266.858.178 1.594.423 2.207.735v-.266c0-.976-.364-1.685-1.091-2.128-.728-.442-1.832-.664-3.313-.664-1.182 0-2.227.133-3.133.399-.907.266-1.683.61-2.329 1.032l-1.273-3.059c.711-.487 1.683-.899 2.914-1.234C27.043.133 28.423 0 30.007 0c2.889 0 5.077.571 6.563 1.714 1.487 1.143 2.23 2.834 2.23 5.073v2.845zm-7.036 2.395c1.039 0 1.819-.2 2.34-.599.52-.399.781-.976.781-1.731v-.532c-.325-.178-.793-.333-1.403-.466-.611-.133-1.273-.2-1.988-.2-1.039 0-1.806.167-2.301.5-.494.333-.741.796-.741 1.387 0 .532.195.932.585 1.199.39.266.923.399 1.598.399h.129zm8.775 3.859V9.367c0-1.309.299-2.456.897-3.44.598-.985 1.448-1.748 2.551-2.29C45.542 3.196 46.776 2.975 48.14 2.975c1.182 0 2.207.155 3.074.466.868.31 1.526.707 1.975 1.188l-1.533 2.79c-.325-.31-.741-.565-1.247-.763-.507-.199-1.078-.299-1.715-.299-1.234 0-2.155.333-2.762.998-.608.665-.911 1.642-.911 2.93v6.601h-4.021zm20.405.111c-1.624 0-3.035-.255-4.234-.764-1.199-.51-2.129-1.232-2.79-2.168-.66-.936-.991-2.051-.991-3.346 0-1.298.331-2.415.994-3.35.663-.936 1.593-1.659 2.79-2.168 1.198-.51 2.603-.764 4.215-.764 1.624 0 3.042.254 4.253.764 1.212.509 2.149 1.232 2.812 2.168.663.935.994 2.052.994 3.35 0 1.295-.331 2.41-.994 3.346-.663.936-1.6 1.659-2.812 2.168-1.211.51-2.629.764-4.253.764h.016zm0-3.325c1.039 0 1.832-.277 2.379-.83.546-.554.819-1.332.819-2.335 0-1.003-.273-1.784-.819-2.345-.547-.56-1.34-.841-2.379-.841-1.052 0-1.851.28-2.398.841-.546.561-.819 1.342-.819 2.345 0 1.003.273 1.781.819 2.335.547.553 1.346.83 2.398.83zm8.775 3.214V0h4.021v15.886h-4.021zm" fill="#003087" />
                  </svg>
                </label>
              </div>

              {/* Error Display */}
              {(errorMessage || paypalError) && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm text-center">
                  <span>{errorMessage || paypalError}</span>
                </div>
              )}

              {/* Stripe Elements Card Form - Only show when Credit Card is selected */}
              {paymentMethod === "credit_card" && (
                <Elements stripe={stripePromise}>
                  <StripeCardForm
                    amount={totalAmount}
                    onSuccess={() => {
                      // Add project to Orders (localStorage cart) only after payment
                      if (projectData) {
                        const user = JSON.parse(localStorage.getItem('user'));
                        const cartKey = `cart_${user?.id || 'guest'}`;
                        const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
                        cart.push({ ...projectData, paid: true, paidAt: new Date().toISOString() });
                        localStorage.setItem(cartKey, JSON.stringify(cart));
                      }
                      router.push("/success");
                    }}
                    onError={(error) => setErrorMessage(error)}
                    disabled={!totalAmount || totalAmount <= 0}
                  />
                </Elements>
              )}

              {/* PayPal Info - Only show when PayPal is selected */}
              {paymentMethod === "paypal" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <h4 className="text-blue-800 font-semibold text-sm md:text-base">PayPal Checkout</h4>
                  </div>
                  <p className="text-xs md:text-sm text-blue-700">
                    You'll be redirected to PayPal to complete your payment securely.
                    After payment, you'll be redirected back to our site.
                  </p>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleEditClickCancel}
                className="w-full sm:w-1/2 py-3 bg-gray-200 text-black font-medium text-base rounded-full shadow hover:shadow-lg transition-all duration-200 border border-gray-300"
              >
                Cancel
              </button>
              <div className="w-full sm:w-1/2 flex items-center">
                {paymentMethod === "paypal" && (
                  <button
                    onClick={handlePayPalCheckout}
                    disabled={isPayPalLoading || !totalAmount || totalAmount <= 0}
                    className={`
                      w-full py-3 px-4 md:px-6 rounded-full font-semibold text-white transition-all duration-200 text-base
                      ${isPayPalLoading || !totalAmount || totalAmount <= 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#0070ba] hover:bg-[#005ea6] active:bg-[#004c87] shadow-md hover:shadow-lg'
                      }
                    `}
                  >
                    {isPayPalLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a9.124 9.124 0 0 1-.045.289c-1.07 5.455-4.665 7.314-9.244 7.314H9.942a.641.641 0 0 0-.633.74l-.678 4.299-.191 1.207a.33.33 0 0 0 .326.384h2.292c.459 0 .85-.334.924-.788l.038-.207.730-4.625.047-.253c.074-.454.465-.788.924-.788h.582c3.729 0 6.646-1.514 7.49-5.895.354-1.837.171-3.373-.645-4.483-.302-.412-.714-.744-1.202-.99z" />
                        </svg>
                        <span>Continue with PayPal</span>
                      </div>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Amount display for PayPal */}
            {paymentMethod === "paypal" && totalAmount > 0 && (
              <div className="text-center text-xs md:text-sm text-gray-600 mt-3">
                Total: ${totalAmount.toFixed(2)} USD
              </div>
            )}
          </div>

          {/* Right Section - Cart Summary */}
          <div className="w-full lg:w-[42%] flex items-stretch">
            <div className="w-full h-auto bg-gradient-to-br from-[#e0f3ff] via-white to-[#ffe4ec] rounded-2xl shadow-2xl p-6 flex flex-col justify-between min-h-[600px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#2A428C] text-lg md:text-xl font-semibold">Cart summary</h3>
                <div
                  className="flex items-center gap-1 md:gap-2 text-[#2A428C] font-semibold text-lg md:text-xl cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={handleEditClick}
                >
                  <span className="text-sm md:text-base">Edit</span>
                  <svg className="w-4 h-4 md:w-5 md:h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75l11-11.03-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
                  </svg>
                </div>
              </div>

              <div className="bg-[#E5FBFF] rounded-xl p-4 flex gap-4 mb-6 items-center">
                <div className="flex flex-col justify-center w-full">
                  <h4 className="text-[#2A428C] font-bold text-lg md:text-xl mb-1">
                    {projectData.projectTitle}
                  </h4>
                  <p className="text-black font-bold text-base md:text-lg mt-2">
                    ${bookPrice ? bookPrice.toFixed(2) : '0.00'}
                  </p>
                </div>
              </div>

              {/* Pricing */}
              <div className="text-xs md:text-sm space-y-2 md:space-y-3 mb-6">
                <div className="flex justify-between font-medium">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-[#2A428C] font-bold">
                    ${subtotal ? subtotal.toFixed(2) : '0.00'}
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-600">
                    Shipping {selectedService && `(${selectedService.courier_name})`}
                  </span>
                  <span className="text-gray-900 font-bold">
                    ${shippingRate ? shippingRate.toFixed(2) : '0.00'}
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-600">
                    Taxes {taxRate && taxRate !== "0.00%" && `(${taxRate})`}
                  </span>
                  <span className="text-gray-900 font-bold">
                    ${tax ? tax.toFixed(2) : '0.00'}
                  </span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between font-bold text-base md:text-lg">
                  <span className="text-[#2A428C]">Total</span>
                  <span className="text-[#2A428C]">
                    ${totalAmount ? totalAmount.toFixed(2) : '0.00'}
                  </span>
                </div>
              </div>

              {/* Payment Method Indicator */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mt-6">
                <p className="text-xs md:text-sm text-gray-700 text-center">
                  <strong>Payment Method:</strong> {paymentMethod === "credit_card" ? "Credit Card (Stripe)" : "PayPal"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
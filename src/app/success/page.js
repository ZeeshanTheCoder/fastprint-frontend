'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/services/baseUrl';
import { useEffect } from 'react';

const PaymentSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    const sendThankYouEmail = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          await axios.post(
            `${BASE_URL}api/send-thank-you-email/`,
            {},
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
          console.log('Thank you email sent successfully');
        }
      } catch (error) {
        console.error('Error sending thank you email:', error);
        // Don't show error to user - it's not critical
      }
    };

    sendThankYouEmail();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful! ✅</h1>
        <p className="text-lg text-gray-700 mb-6 text-center max-w-lg">
          Thank you for your purchase. Your payment has been completed successfully. <br />
          Feel free to contact us any time at <span className="text-blue-600 font-semibold">+1 469-277-7489</span> for assistance with your order.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition-colors"
        >
          Back to Home
        </button>
      </div>
    </>
  );
};

export default PaymentSuccess;
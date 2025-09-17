'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/services/baseUrl';

const AdminPaymentSettings = () => {
  const [settings, setSettings] = useState({
    stripe_enabled: true,
    paypal_enabled: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${BASE_URL}api/admin/payment-settings/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching payment settings:', error);
      setMessage('Error loading settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(
        `${BASE_URL}api/admin/payment-settings/`,
        settings,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setMessage('Settings saved successfully');
    } catch (error) {
      console.error('Error saving payment settings:', error);
      setMessage('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = (method) => {
    setSettings((prev) => ({
      ...prev,
      [method]: !prev[method]
    }));
  };

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  return (
    <>

      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Payment Settings</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Payment Methods</h2>

            <div className="space-y-4">
              {/* Stripe Toggle */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="mr-4 p-2 bg-blue-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Stripe (Credit Card)</h3>
                    <p className="text-sm text-gray-500">Accept payments via credit/debit cards</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.stripe_enabled}
                    onChange={() => handleToggle('stripe_enabled')}
                  />
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                  ></div>
                </label>
              </div>

              {/* PayPal Toggle */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="mr-4 p-2 bg-blue-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a9.124 9.124 0 0 1-.045.289c-1.07 5.455-4.665 7.314-9.244 7.314H9.942a.641.641 0 0 0-.633.74l-.678 4.299-.191 1.207a.33.33 0 0 0 .326.384h2.292c.459 0 .85-.334.924-.788l.038-.207.73-4.625.047-.253c.074-.454.465-.788.924-.788h.582c3.729 0 6.646-1.514 7.49-5.895.354-1.837.171-3.373-.645-4.483-.302-.412-.714-.744-1.202-.99z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">PayPal</h3>
                    <p className="text-sm text-gray-500">Accept payments via PayPal</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.paypal_enabled}
                    onChange={() => handleToggle('paypal_enabled')}
                  />
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                  ></div>
                </label>
              </div>
            </div>
          </div>

          {/* Status Message */}
          {message && (
            <div
              className={`p-4 rounded-lg mb-6 ${
                message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}
            >
              {message}
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className={`px-6 py-2 rounded-lg font-medium text-white transition-colors ${
                saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>

        {/* Status Information */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-lg ${
                settings.stripe_enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              <div className="flex items-center">
                <span className="font-semibold">Stripe:</span>
                <span className="ml-2">{settings.stripe_enabled ? 'Enabled' : 'Disabled'}</span>
              </div>
              <p className="text-sm mt-2">
                {settings.stripe_enabled
                  ? 'Users can pay with credit/debit cards'
                  : 'Users cannot pay with credit/debit cards'}
              </p>
            </div>
            <div
              className={`p-4 rounded-lg ${
                settings.paypal_enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              <div className="flex items-center">
                <span className="font-semibold">PayPal:</span>
                <span className="ml-2">{settings.paypal_enabled ? 'Enabled' : 'Disabled'}</span>
              </div>
              <p className="text-sm mt-2">
                {settings.paypal_enabled ? 'Users can pay with PayPal' : 'Users cannot pay with PayPal'}
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default AdminPaymentSettings;
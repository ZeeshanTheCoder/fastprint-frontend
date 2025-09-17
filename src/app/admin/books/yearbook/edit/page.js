'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, BookOpen, Layers, FileText, Palette } from 'lucide-react';
import { BASE_URL } from '@/services/baseUrl';

const YearBookEditSettings = () => {
  const [dropdowns, setDropdowns] = useState({});
  const [editedData, setEditedData] = useState({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchDropdowns = async () => {
    try {
      const res = await axios.get(`${BASE_URL}api/yearbook/dropdowns/`);
      setDropdowns(res.data);
    } catch (err) {
      alert('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDropdowns();
  }, []);

  const handleChange = (type, id, field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [`${type}-${id}`]: { id, type, field, value }
    }));
  };

  const saveChanges = async () => {
    setSaving(true);
    const updates = Object.values(editedData);

    try {
      for (let update of updates) {
        const urlMap = {
          interior: `interior-color/${update.id}/update/`,
          paper: `paper-type/${update.id}/update/`,
          cover: `cover-finish/${update.id}/update/`,
          binding: `binding-type/${update.id}/update/`
        };

        await axios.put(`${BASE_URL}api/yearbook/${urlMap[update.type]}`, {
          [update.field]: update.value
        });
      }
      alert('✅ All changes saved successfully');
      setEditedData({});
      fetchDropdowns();
    } catch (err) {
      alert('❌ Error while saving');
    } finally {
      setSaving(false);
    }
  };

  const renderTable = (title, items, type, field, icon) => (
    <section key={type} className="mb-8 transform transition-all duration-300 hover:scale-[1.01]">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg text-green-600">{icon}</div>
              {title}
              <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {items?.length || 0} items
              </span>
            </h2>
          </div>
        </div>

        <div className="p-6 animate-fadeIn">
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-gray-700">
                  <th className="px-6 py-4 text-left font-semibold">Name</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    {field === 'price_per_page' ? 'Price/Page ($)' : 'Price ($)'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items?.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-green-50/50 transition-all duration-200 group"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 group-hover:text-green-700 transition-colors duration-200">
                      {item.name}
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        step="0.01"
                        defaultValue={item[field]}
                        className="w-32 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white hover:border-green-300 group-hover:shadow-md"
                        onChange={(e) =>
                          handleChange(type, item.id, field, e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {(!items || items.length === 0) && (
              <div className="text-center py-12 text-gray-500">
                <p>No {title.toLowerCase()} found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );

  if (loading)
    return (
      <>
        
        <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg font-semibold">
          Loading settings...
        </div>
        
      </>
    );

  const changedCount = Object.keys(editedData).length;

  return (
    <>
      

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-lime-600 rounded-xl mb-4 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent mb-2">
              YearBook Settings
            </h1>
            <p className="text-gray-600 text-lg">
              Manage pricing and configurations easily
            </p>
          </div>

          {/* Tables */}
          {renderTable(
            'Interior Colors',
            dropdowns.interior_colors,
            'interior',
            'price_per_page',
            <Palette className="w-5 h-5" />
          )}
          {renderTable(
            'Paper Types',
            dropdowns.paper_types,
            'paper',
            'price_per_page',
            <FileText className="w-5 h-5" />
          )}
          {renderTable(
            'Cover Finishes',
            dropdowns.cover_finishes,
            'cover',
            'price',
            <Layers className="w-5 h-5" />
          )}
          {renderTable(
            'Binding Types',
            dropdowns.bindings,
            'binding',
            'price',
            <BookOpen className="w-5 h-5" />
          )}
        </div>

        {/* Save Button */}
        <div className="sticky bottom-8 flex justify-center">
          <div className="bg-white rounded-full p-2 shadow-lg border border-gray-100">
            <button
              onClick={saveChanges}
              disabled={saving || changedCount === 0}
              className={`px-8 py-4 rounded-full font-semibold flex items-center gap-3 transition-all duration-300 shadow-lg ${
                saving || changedCount === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-700 hover:to-lime-700 text-white transform hover:scale-105 hover:shadow-xl'
              }`}
            >
              <Save className="w-5 h-5" />
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving Changes...
                </>
              ) : (
                <>
                  Save Changes
                  {changedCount > 0 && (
                    <span className="bg-white/20 text-white px-2 py-1 rounded-full text-sm">
                      {changedCount}
                    </span>
                  )}
                </>
              )}
            </button>
          </div>
        </div>
        <div className='pt-10'></div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      
    </>
  );
};

export default YearBookEditSettings;
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Save,
  BookOpen,
  Layers,
  FileText,
  Palette,
  Archive,
  Brush,
  Droplet,
  ShieldCheck,
  Grid,
} from "lucide-react";
import { BASE_URL } from "@/services/baseUrl";

const ThesisEditSettings = () => {
  const [dropdowns, setDropdowns] = useState({});
  const [editedData, setEditedData] = useState({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchDropdowns = async () => {
    try {
      const res = await axios.get(`${BASE_URL}api/pricing/options/`);
      setDropdowns(res.data);
    } catch (err) {
      alert("Failed to load settings");
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
      [`${type}-${id}`]: { id, type, field, value },
    }));
  };

  const saveChanges = async () => {
    setSaving(true);
    const updates = Object.values(editedData);

    try {
      for (let update of updates) {
        await axios.put(
          `${BASE_URL}api/pricing/${update.type}/${update.id}/update/`,
          {
            [update.field]: update.value,
          }
        );
      }
      alert("✅ Changes saved");
      setEditedData({});
      fetchDropdowns();
    } catch (err) {
      alert("❌ Error while saving");
    } finally {
      setSaving(false);
    }
  };

  const renderTable = (title, items, type, field, icon) => (
    <section
      key={type}
      className="mb-8 transform transition-all duration-300 hover:scale-[1.01]"
    >
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              {icon}
            </div>
            {title}
            <span className="ml-auto text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {items?.length || 0} items
            </span>
          </h2>
        </div>
        <div className="p-6 animate-fadeIn">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-gray-700">
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">
                  {field === "price_per_page" ? "Price/Page ($)" : "Price ($)"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items?.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-blue-50/50 transition-all duration-200 group"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 group-hover:text-blue-700">
                    {item.name}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      step="0.01"
                      defaultValue={item[field]}
                      className="w-32 px-4 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:outline-none"
                      onChange={(e) =>
                        handleChange(type, item.id, field, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );

  const changedCount = Object.keys(editedData).length;

  if (loading)
    return (
      <>
        <div className="text-center py-10">Loading settings...</div>
      </>
    );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Thesis Settings
            </h1>
            <p className="text-gray-600">
              Configure thesis print pricing options
            </p>
          </div>

          {/* Tables */}
          {renderTable(
            "Binding Types",
            dropdowns.binding_types,
            "binding-type",
            "price",
            <Archive />
          )}
          {renderTable(
            "Spine Types",
            dropdowns.spine_types,
            "spine-type",
            "price",
            <Layers />
          )}
          {renderTable(
            "Exterior Colors",
            dropdowns.exterior_colors,
            "exterior-color",
            "price",
            <Droplet />
          )}
          {renderTable(
            "Foil Stampings",
            dropdowns.foil_stampings,
            "foil-stamping",
            "price",
            <Brush />
          )}
          {renderTable(
            "Screen Stampings",
            dropdowns.screen_stampings,
            "screen-stamping",
            "price",
            <Grid />
          )}
          {renderTable(
            "Corner Protectors",
            dropdowns.corner_protectors,
            "corner-protector",
            "price",
            <ShieldCheck />
          )}
          {renderTable(
            "Interior Colors",
            dropdowns.interior_colors,
            "interior-color",
            "price_per_page",
            <Palette />
          )}
          {renderTable(
            "Paper Types",
            dropdowns.paper_types,
            "paper-type",
            "price_per_page",
            <FileText />
          )}

          {/* Save Button */}
          <div className="sticky bottom-8 flex justify-center mt-10">
            <button
              onClick={saveChanges}
              disabled={saving || changedCount === 0}
              className={`px-8 py-4 rounded-full font-semibold flex items-center gap-3 transition-all duration-300 shadow-lg ${
                saving || changedCount === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-105"
              }`}
            >
              <Save className="w-5 h-5" />
              {saving ? "Saving..." : `Save Changes (${changedCount})`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThesisEditSettings;

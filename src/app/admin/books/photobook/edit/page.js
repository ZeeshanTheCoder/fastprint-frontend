"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Palette,
  FileText,
  Layers,
  BookOpen,
  Image,
  Brush,
  Sparkles,
  Search,
  DollarSign,
  Save,
  ChevronDown,
  X,
} from "lucide-react";
import { BASE_URL } from "@/services/baseUrl";

const EditPhotoBookSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editedData, setEditedData] = useState({});

  const [data, setData] = useState({
    bindings: [],
    interior_colors: [],
    paper_types: [],
    cover_finishes: [],
    spines: [],
    exterior_colors: [],
    foil_stampings: [],
    screen_stampings: [],
  });

  const [searchTerms, setSearchTerms] = useState({});
  const [expandedSections, setExpandedSections] = useState({});

  const keys = [
    {
      key: "bindings",
      label: "Binding Types",
      icon: <BookOpen className="w-5 h-5" />,
      priceKey: "price",
    },
    {
      key: "interior_colors",
      label: "Interior Colors",
      icon: <Palette className="w-5 h-5" />,
      priceKey: "price_per_page",
    },
    {
      key: "paper_types",
      label: "Paper Types",
      icon: <FileText className="w-5 h-5" />,
      priceKey: "price_per_page",
    },
    {
      key: "cover_finishes",
      label: "Cover Finishes",
      icon: <Layers className="w-5 h-5" />,
      priceKey: "price",
    },
    {
      key: "spines",
      label: "Spines",
      icon: <Image className="w-5 h-5" />,
      priceKey: "price",
    },
    {
      key: "exterior_colors",
      label: "Exterior Colors",
      icon: <Brush className="w-5 h-5" />,
      priceKey: "price",
    },
    {
      key: "foil_stampings",
      label: "Foil Stamping",
      icon: <Sparkles className="w-5 h-5" />,
      priceKey: "price",
    },
    {
      key: "screen_stampings",
      label: "Screen Stamping",
      icon: <Sparkles className="w-5 h-5" />,
      priceKey: "price",
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}api/photobook/dropdowns/`);
      setData(res.data);
    } catch (err) {
      alert("❌ Failed to load photobook settings.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const defaultSearch = {};
    const defaultExpanded = {};
    keys.forEach((k) => {
      defaultSearch[k.key] = "";
      defaultExpanded[k.key] = true;
    });
    setSearchTerms(defaultSearch);
    setExpandedSections(defaultExpanded);
  }, []);

  const handleInputChange = (type, id, field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [`${type}-${id}`]: { id, type, field, value },
    }));
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      const updates = Object.values(editedData);
      for (let update of updates) {
        const urlMap = {
          bindings: `binding-type/${update.id}/update/`,
          interior_colors: `interior-color/${update.id}/update/`,
          paper_types: `paper-type/${update.id}/update/`,
          cover_finishes: `cover-finish/${update.id}/update/`,
          spines: `spine/${update.id}/update/`,
          exterior_colors: `exterior-color/${update.id}/update/`,
          foil_stampings: `foil-stamping/${update.id}/update/`,
          screen_stampings: `screen-stamping/${update.id}/update/`,
        };

        await axios.put(`${BASE_URL}api/photobook/${urlMap[update.type]}`, {
          [update.field]: update.value,
        });
      }
      alert("✅ All changes saved successfully.");
      setEditedData({});
      fetchData();
    } catch (err) {
      alert("❌ Failed to save changes.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const renderSection = (key, label, items, priceField, icon) => {
    const filtered = (items || []).filter((item) =>
      item.name.toLowerCase().includes((searchTerms[key] || "").toLowerCase())
    );

    return (
      <section key={key} className="mb-8">
        <div className="bg-white border rounded-xl shadow-md">
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
              <span className="p-2 bg-blue-100 rounded-lg">{icon}</span>
              {label}{" "}
              <span className="text-sm text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">
                {filtered.length} items
              </span>
            </h2>
            <button
              onClick={() =>
                setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }))
              }
            >
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections[key] ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {expandedSections[key] && (
            <div className="p-6">
              {/* Search Bar */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder={`Search ${label.toLowerCase()}...`}
                  value={searchTerms[key]}
                  onChange={(e) =>
                    setSearchTerms((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                {searchTerms[key] && (
                  <button
                    onClick={() =>
                      setSearchTerms((prev) => ({ ...prev, [key]: "" }))
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full table-auto border">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2 flex items-center gap-1">
                        <DollarSign className="w-4 h-4" /> Price{" "}
                        {priceField === "price_per_page" ? "(Per Page)" : ""}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item, idx) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            step="0.01"
                            defaultValue={item[priceField]}
                            onChange={(e) =>
                              handleInputChange(
                                key,
                                item.id,
                                priceField,
                                e.target.value
                              )
                            }
                            className="border px-2 py-1 rounded w-28"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filtered.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <Search className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    No items found.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
          Loading PhotoBook Settings...
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-4 shadow-lg">
              <Image className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Photo Book Settings
            </h1>
            <p className="text-gray-600 text-lg">
              Manage pricing and customization for photobooks
            </p>
          </div>

          {/* Render all sections */}
          {keys.map((k) =>
            renderSection(k.key, k.label, data[k.key], k.priceKey, k.icon)
          )}

          {/* Save Button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={saveChanges}
              disabled={saving || Object.keys(editedData).length === 0}
              className={`flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg ${
                saving || Object.keys(editedData).length === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 hover:shadow-xl"
              }`}
            >
              <Save className="w-5 h-5" />
              {saving
                ? "Saving Changes..."
                : `Save Changes (${Object.keys(editedData).length})`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPhotoBookSettings;

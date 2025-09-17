"use client";

import React, { useEffect, useState } from "react";
import {
  Save,
  Pencil,
  Search,
  ChevronDown,
  BookOpen,
  Palette,
  FileText,
  Layers,
  X,
  DollarSign,
} from "lucide-react";
import { BASE_URL } from "@/services/baseUrl";

const EditComicBook = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changedValues, setChangedValues] = useState({});

  const [bindings, setBindings] = useState([]);
  const [interiorColors, setInteriorColors] = useState([]);
  const [paperTypes, setPaperTypes] = useState([]);
  const [coverFinishes, setCoverFinishes] = useState([]);

  // Search states
  const [searchTerms, setSearchTerms] = useState({
    interior: "",
    paper: "",
    cover: "",
    binding: "",
  });

  // Expanded sections
  const [expandedSections, setExpandedSections] = useState({
    interior: true,
    paper: true,
    cover: true,
    binding: true,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}api/comicbook/dropdowns/`);
      const dropdowns = await response.json();

      const bindingsResponse = await fetch(
        `${BASE_URL}api/comicbook/comic/all-bindings/`
      );
      const allBindings = await bindingsResponse.json();

      setBindings(allBindings || []);
      setInteriorColors(dropdowns.interior_colors || []);
      setPaperTypes(dropdowns.paper_types || []);
      setCoverFinishes(dropdowns.cover_finishes || []);
    } catch (error) {
      console.error("Error loading data", error);
      alert("❌ Failed to load comic book settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (type, id, field, value) => {
    setChangedValues((prev) => ({
      ...prev,
      [`${type}_${id}_${field}`]: { type, id, field, value },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const urlMap = {
      binding: "binding-type",
      interior: "interior-color",
      paper: "paper-type",
      cover: "cover-finish",
    };

    try {
      for (const key in changedValues) {
        const { type, id, field, value } = changedValues[key];
        const response = await fetch(
          `${BASE_URL}api/comicbook/${urlMap[type]}/${id}/update/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ [field]: value }),
          }
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("✅ All changes saved.");
      setChangedValues({});
      fetchData();
    } catch (err) {
      console.error("Save error:", err);
      alert("❌ Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const filterItems = (items, searchTerm) => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const clearSearch = (type) => {
    setSearchTerms((prev) => ({
      ...prev,
      [type]: "",
    }));
  };

  const getIcon = (type) => {
    switch (type) {
      case "interior":
        return <Palette className="w-5 h-5" />;
      case "paper":
        return <FileText className="w-5 h-5" />;
      case "cover":
        return <Layers className="w-5 h-5" />;
      case "binding":
        return <BookOpen className="w-5 h-5" />;
      default:
        return <Pencil className="w-5 h-5" />;
    }
  };

  const SearchBar = ({ type, placeholder, value, onChange }) => (
    <div className="relative mb-4 group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
      />
      {value && (
        <button
          onClick={() => clearSearch(type)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-500 transition-colors duration-200"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  const EditablePriceTable = ({ title, items, type, priceField, icon }) => {
    const filteredItems = filterItems(items, searchTerms[type]);

    return (
      <section className="mb-8 transform transition-all duration-300 hover:scale-[1.01]">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  {icon}
                </div>
                {title}
                <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {filteredItems.length} items
                </span>
              </h2>
              <button
                onClick={() => toggleSection(type)}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors duration-200"
              >
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    expandedSections[type] ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {expandedSections[type] && (
            <div className="p-6 animate-fadeIn">
              <SearchBar
                type={type}
                placeholder={`Search ${title.toLowerCase()}...`}
                value={searchTerms[type]}
                onChange={(value) =>
                  setSearchTerms((prev) => ({ ...prev, [type]: value }))
                }
              />

              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="text-gray-700">
                      <th className="px-6 py-4 text-left font-semibold">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left font-semibold flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Price{" "}
                        {priceField === "price_per_page" ? "Per Page" : ""} ($)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredItems.map((item, index) => (
                      <tr
                        key={item.id}
                        className="hover:bg-blue-50/50 transition-all duration-200 group"
                        style={{
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                            {item.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative">
                            <input
                              type="number"
                              step="0.01"
                              defaultValue={item[priceField]}
                              className="w-32 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-blue-300 group-hover:shadow-md"
                              onChange={(e) =>
                                handleChange(
                                  type,
                                  item.id,
                                  priceField,
                                  e.target.value
                                )
                              }
                            />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredItems.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No items found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  };

  const BindingTable = () => {
    const filteredItems = filterItems(bindings, searchTerms.binding);

    return (
      <section className="mb-8 transform transition-all duration-300 hover:scale-[1.01]">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                  <BookOpen className="w-5 h-5" />
                </div>
                Binding Types
                <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {filteredItems.length} items
                </span>
              </h2>
              <button
                onClick={() => toggleSection("binding")}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors duration-200"
              >
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    expandedSections.binding ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {expandedSections.binding && (
            <div className="p-6 animate-fadeIn">
              <SearchBar
                type="binding"
                placeholder="Search binding types..."
                value={searchTerms.binding}
                onChange={(value) =>
                  setSearchTerms((prev) => ({ ...prev, binding: value }))
                }
              />

              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="text-gray-700">
                      <th className="px-6 py-4 text-left font-semibold">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left font-semibold flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Price ($)
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">
                        Min Pages
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">
                        Max Pages
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredItems.map((binding, index) => (
                      <tr
                        key={binding.id}
                        className="hover:bg-purple-50/50 transition-all duration-200 group"
                        style={{
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors duration-200">
                            {binding.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative">
                            <input
                              type="number"
                              step="0.01"
                              defaultValue={binding.price}
                              className="w-32 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-purple-300 group-hover:shadow-md"
                              onChange={(e) =>
                                handleChange(
                                  "binding",
                                  binding.id,
                                  "price",
                                  e.target.value
                                )
                              }
                            />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {binding.min_pages}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {binding.max_pages !== null ? binding.max_pages : "∞"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredItems.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No binding types found matching your search.</p>
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
            </div>
            <p className="text-lg font-semibold text-gray-700 animate-pulse">
              Loading Comic Book Settings...
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Please wait while we fetch your data
            </p>
          </div>
        </div>
      </>
    );
  }

  const changedCount = Object.keys(changedValues).length;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-4 shadow-lg">
              <Pencil className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Comic Book Settings
            </h1>
            <p className="text-gray-600 text-lg">
              Manage pricing and configurations with ease
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Interior Colors
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {interiorColors.length}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Palette className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Paper Types
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {paperTypes.length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Cover Finishes
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {coverFinishes.length}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Layers className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Binding Types
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {bindings.length}
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Tables */}
          <EditablePriceTable
            title="Interior Colors"
            items={interiorColors}
            type="interior"
            priceField="price_per_page"
            icon={<Palette className="w-5 h-5" />}
          />

          <EditablePriceTable
            title="Paper Types"
            items={paperTypes}
            type="paper"
            priceField="price_per_page"
            icon={<FileText className="w-5 h-5" />}
          />

          <EditablePriceTable
            title="Cover Finishes"
            items={coverFinishes}
            type="cover"
            priceField="price"
            icon={<Layers className="w-5 h-5" />}
          />

          <BindingTable />
        </div>

        {/* Save Button */}
        <div className="sticky bottom-8 flex justify-center">
          <div className="bg-white rounded-full p-2 shadow-lg border border-gray-100">
            <button
              onClick={handleSave}
              disabled={saving || changedCount === 0}
              className={`px-8 py-4 rounded-full font-semibold flex items-center gap-3 transition-all duration-300 shadow-lg ${
                saving || changedCount === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-105 hover:shadow-xl"
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
        <div className="pt-10"> </div>
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
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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

export default EditComicBook;

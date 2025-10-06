"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaSearch,
  FaTimes,
  FaPlus,
  FaTrash,
  FaShoppingCart,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { BASE_URL } from "@/services/baseUrl";

const Orders = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [loading, setLoading] = useState(true);

  // Helper function to get user-specific cart key
  const getUserCartKey = () => {
    return `cart_${user?.id || "guest"}`;
  };

  // Helper function to get user-specific cart
  const getUserCart = () => {
    const cartKey = getUserCartKey();
    return JSON.parse(localStorage.getItem(cartKey)) || [];
  };

  // Helper function to save user-specific cart
  const saveUserCart = (cartData) => {
    const cartKey = getUserCartKey();
    localStorage.setItem(cartKey, JSON.stringify(cartData));
  };

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("accessToken");
      axios.get(`${BASE_URL}api/book/user-paid-orders/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setProjects(response.data.data);
          setFilteredProjects(response.data.data);
          setLoading(false);
        })
        .catch(() => {
          setProjects([]);
          setFilteredProjects([]);
          setLoading(false);
        });
      // Clean up old generic cart data if it exists
      const oldCart = localStorage.getItem("cart");
      if (oldCart) {
        localStorage.removeItem("cart");
      }
    }
  }, [user]);

  // Filter projects based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [searchTerm, projects]);

  // Sort filtered projects
  useEffect(() => {
    if (sortConfig.key) {
      const sorted = [...filteredProjects].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
      setFilteredProjects(sorted);
    }
  }, [sortConfig]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key === columnName) {
      return sortConfig.direction === "asc" ? (
        <FaSortUp className="text-[#016AB3]" />
      ) : (
        <FaSortDown className="text-[#016AB3]" />
      );
    }
    return (
      <FaSort className="opacity-40 group-hover:opacity-70 transition-opacity" />
    );
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleRemoveFromCart = (projectId) => {
    const updatedCart = projects.filter((project) => project.id !== projectId);
    setProjects(updatedCart);
    setFilteredProjects(updatedCart);
    saveUserCart(updatedCart);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] to-[#fef6fb] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#016AB3]/20 border-t-[#016AB3]" />
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
              style={{ animationDuration: "0.8s" }}
            />
          </div>
          <p className="text-xl font-semibold text-[#016AB3] mt-6">
            Loading your orders...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Please wait while we fetch your cart
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef4ff] to-[#fef6fb]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Please Login</h2>
          <p className="text-gray-600">
            You need to be logged in to view your orders.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-[#F8C20A] to-[#EE831E] text-white rounded-full shadow hover:scale-105 transition-all duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!projects.length) {
    return (
      <>
        <div className="min-h-screen w-full bg-gradient-to-br from-[#eef4ff] to-[#fef6fb] font-sans">
          <div className="w-full h-[60px] flex items-center px-4 md:px-8 bg-gradient-to-r from-[#016AB3] via-[#0096CD] to-[#00AEDC] shadow-xl">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <h1 className="text-white text-lg md:text-xl font-bold">
                Your Orders
              </h1>
            </div>
          </div>

          <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
            <div className="w-full max-w-lg bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-br from-[#016AB3] via-[#0096CD] to-[#00AEDC] px-4 md:px-6 py-8 md:py-10 text-center relative">
                <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-5 backdrop-blur-sm">
                    <FaShoppingCart className="text-white text-lg md:text-xl" />
                  </div>
                  <h1 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">
                    No Orders Yet
                  </h1>
                  <p className="text-blue-100 text-sm md:text-base mb-4 md:mb-5 leading-snug">
                    Hello {user?.name || "User"}, you haven't added any projects
                    to your cart yet.
                  </p>
                  <button
                    onClick={() => router.push("/userdashboard")}
                    className="inline-flex items-center px-5 py-2 md:px-6 md:py-3 bg-gradient-to-r from-[#F8C20A] to-[#EE831E] text-white text-sm font-semibold rounded-full shadow hover:shadow-md hover:scale-105 transition-all duration-300"
                  >
                    <FaArrowLeft className="text-sm mr-2" />
                    Back to Dashboard
                  </button>
                </div>
              </div>

              <div className="px-4 md:px-6 py-4 md:py-5 bg-gray-50">
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  <div className="text-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-[#016AB3]/10 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2">
                      <FaPlus className="text-[#016AB3] text-sm md:text-base" />
                    </div>
                    <p className="text-xs md:text-sm font-medium text-gray-700">
                      Add Projects
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-[#016AB3]/10 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2">
                      <FaShoppingCart className="text-[#016AB3] text-sm md:text-base" />
                    </div>
                    <p className="text-xs md:text-sm font-medium text-gray-700">
                      Review Cart
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-[#016AB3]/10 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2">
                      <FaCheckCircle className="text-[#016AB3] text-sm md:text-base" />
                    </div>
                    <p className="text-xs md:text-sm font-medium text-gray-700">
                      Place Order
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] to-[#fef6fb] py-6 md:py-8 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Items in Cart
                  </p>
                  <p className="text-2xl md:text-4xl font-bold text-[#016AB3] mt-1 md:mt-2">
                    {projects.length}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Ready to order</p>
                </div>
                <div className="bg-gradient-to-br from-[#016AB3] to-[#0096CD] p-3 md:p-4 rounded-xl md:rounded-2xl shadow-lg">
                  <FaShoppingCart className="text-white text-lg md:text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Main Table Card */}
          <div className="bg-white shadow-xl md:shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100">
            {/* Professional Header */}
            <div className="bg-gradient-to-r from-[#016AB3] via-[#0096CD] to-[#00AEDC] px-4 md:px-8 py-6 md:py-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-sm"></div>
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-white text-xl md:text-2xl font-bold mb-1 md:mb-2">
                    Your Orders
                  </h1>
                  <p className="text-blue-100 text-xs md:text-sm">
                    Review and manage your cart items
                  </p>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <button
                    onClick={() => router.push("/userdashboard")}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#F8C20A] to-[#EE831E] text-white px-4 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl font-semibold shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl text-sm md:text-base"
                  >
                    <FaArrowLeft className="text-xs md:text-sm" />
                    <span>Back to Dashboard</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Search Bar */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 md:px-6 py-4 md:py-5 border-b border-gray-200">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="relative w-full md:max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search orders by title or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 md:pl-12 pr-10 md:pr-12 py-2 md:py-3 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-[#016AB3] focus:border-transparent bg-white text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200 text-xs md:text-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute inset-y-0 right-0 pr-3 md:pr-4 flex items-center hover:text-gray-700 transition-colors duration-200"
                    >
                      <FaTimes className="h-4 w-4 md:h-5 md:w-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>

                {searchTerm && (
                  <div className="text-xs md:text-sm text-gray-600 bg-white px-3 md:px-4 py-1 md:py-2 rounded-lg shadow-sm">
                    <span className="font-semibold text-[#016AB3]">
                      {filteredProjects.length}
                    </span>{" "}
                    of {projects.length} items
                  </div>
                )}
              </div>
            </div>

            {/* Table for medium+ screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th
                      className="group px-6 md:px-8 py-4 md:py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200 select-none"
                      onClick={() => handleSort("title")}
                    >
                      <div className="flex items-center gap-2">
                        <span>Project Title</span>
                        {getSortIcon("title")}
                      </div>
                    </th>
                    <th
                      className="group px-6 md:px-8 py-4 md:py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200 select-none"
                      onClick={() => handleSort("category")}
                    >
                      <div className="flex items-center gap-2">
                        <span>Category</span>
                        {getSortIcon("category")}
                      </div>
                    </th>
                    <th className="px-6 md:px-8 py-4 md:py-6 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>

                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => (
                      <tr
                        key={project.id}
                        className={`hover:bg-gradient-to-r hover:from-[#F8FAFF] hover:to-[#F0F7FF] transition-all duration-300 group ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                          }`}
                      >
                        <td className="px-6 md:px-8 py-4 md:py-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 md:h-12 md:w-12 bg-gradient-to-br from-[#016AB3] to-[#0096CD] rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
                              <span className="text-white font-bold text-sm md:text-lg">
                                {project.title && project.title.length > 0
                                  ? project.title.charAt(0)
                                  : "P"}
                              </span>
                            </div>
                            <div className="ml-3 md:ml-4">
                              <div className="text-sm font-bold text-gray-900 group-hover:text-[#016AB3] transition-colors duration-200">
                                {project.title || "Untitled Project"}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Added to cart
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 md:px-8 py-4 md:py-6">
                          <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl text-xs font-semibold bg-gradient-to-r from-[#F0F7FF] to-[#E3F1FF] text-[#016AB3] border border-blue-200/50 shadow-sm">
                            {project.category || "General"}
                          </div>
                        </td>
                        <td className="px-6 md:px-8 py-4 md:py-6 text-center">
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border border-orange-200/50">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
                            In Cart
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 md:px-8 py-12 md:py-16 text-center"
                      >
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                            <FaSearch className="text-xl md:text-2xl text-gray-400" />
                          </div>
                          <p className="text-base md:text-lg font-semibold text-gray-700">
                            No orders found
                          </p>
                          <p className="text-xs md:text-sm mt-1 md:mt-2 text-gray-500">
                            {searchTerm
                              ? `No orders match "${searchTerm}"`
                              : "Try adjusting your search terms"}
                          </p>
                          {searchTerm && (
                            <button
                              onClick={clearSearch}
                              className="mt-3 md:mt-4 px-4 py-1 md:px-5 md:py-2 bg-[#016AB3] text-white rounded-lg hover:bg-[#0096CD] transition-colors duration-200 shadow-sm text-xs md:text-sm"
                            >
                              Clear Search
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden">
              {filteredProjects.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 hover:bg-gradient-to-r hover:from-[#F8FAFF] hover:to-[#F0F7FF] transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-[#016AB3] to-[#0096CD] rounded-lg flex items-center justify-center shadow-md mr-3">
                            <span className="text-white font-bold text-sm">
                              {project.title && project.title.length > 0
                                ? project.title.charAt(0)
                                : "P"}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900">
                              {project.title || "Untitled Project"}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Added to cart
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#F0F7FF] to-[#E3F1FF] text-[#016AB3] border border-blue-200/50 shadow-sm">
                          {project.category || "General"}
                        </div>

                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border border-orange-200/50">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
                          In Cart
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <FaSearch className="text-xl text-gray-400" />
                    </div>
                    <p className="text-base font-semibold text-gray-700">
                      No orders found
                    </p>
                    <p className="text-xs mt-1 text-gray-500">
                      {searchTerm
                        ? `No orders match "${searchTerm}"`
                        : "Try adjusting your search terms"}
                    </p>
                    {searchTerm && (
                      <button
                        onClick={clearSearch}
                        className="mt-3 px-4 py-1 bg-[#016AB3] text-white rounded-lg hover:bg-[#0096CD] transition-colors duration-200 shadow-sm text-xs"
                      >
                        Clear Search
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 md:px-6 py-3 md:py-4 border-t border-gray-200">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0">
                <div className="text-xs md:text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-semibold text-[#016AB3]">
                    {filteredProjects.length}
                  </span>{" "}
                  of <span className="font-semibold">{projects.length}</span>{" "}
                  items
                </div>
                <div className="flex items-center space-x-2 md:space-x-4 text-xs md:text-sm text-gray-500">
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full"></div>
                    <span>Last updated: {new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;

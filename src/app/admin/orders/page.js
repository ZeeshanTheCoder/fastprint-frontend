"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Replaces useNavigate
import {
  Search,
  X,
  FileText,
  ShoppingCart,
  User,
  Calendar,
  BookOpen,
  ChevronDown,
  TrendingUp,
  Package,
  ExternalLink,
} from "lucide-react";
// import { BASE_URL } from '@/services/baseURL';
import { BASE_URL } from "@/services/baseUrl";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedSection, setExpandedSection] = useState(true);
  const router = useRouter();

  // Fetch orders data from server
  const fetchOrders = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await axios.get(`${BASE_URL}api/book/all-orders/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter logic for search
  const filteredOrders = orders.filter(
    (order) =>
      order.title?.toLowerCase().includes(search.toLowerCase()) ||
      order.user_email?.toLowerCase().includes(search.toLowerCase())
  );

  const clearSearch = () => {
    setSearch("");
  };

  const toggleSection = () => {
    setExpandedSection((prev) => !prev);
  };

  // Handle title click to navigate to OrderInfo
  const handleTitleClick = (order) => {
    router.push("/admin/orders/order-info");
    localStorage.setItem("orderData", JSON.stringify(order));
  };

  // Get unique categories for stats
  const uniqueCategories = [
    ...new Set(orders.map((order) => order.category).filter(Boolean)),
  ];
  const totalOrders = orders.length;
  const totalPages = orders.reduce(
    (sum, order) => sum + (order.page_count || 0),
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <p className="text-lg font-semibold text-gray-700 animate-pulse">
            Loading Orders...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Please wait while we fetch your data
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-4 shadow-lg">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Order Management
            </h1>
            <p className="text-gray-600 text-lg">
              Track and manage all book orders with ease
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalOrders}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Categories
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {uniqueCategories.length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Pages
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalPages.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Orders
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredOrders.length}
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table Section */}
          <section className="mb-8 transform transition-all duration-300 hover:scale-[1.01]">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    All Orders
                    <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {filteredOrders.length} orders
                    </span>
                  </h2>
                  <button
                    onClick={toggleSection}
                    className="p-2 hover:bg-white/50 rounded-lg transition-colors duration-200"
                  >
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        expandedSection ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {expandedSection && (
                <div className="p-6 animate-fadeIn">
                  {/* Search Bar */}
                  <div className="relative mb-6 group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search orders by title or email..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                    />
                    {search && (
                      <button
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Orders Table */}
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr className="text-gray-700">
                          <th className="px-6 py-4 text-left font-semibold">
                            Book Title
                          </th>
                          <th className="px-6 py-4 text-left font-semibold">
                            Customer Email
                          </th>
                          <th className="px-6 py-4 text-left font-semibold">
                            Order Date
                          </th>
                          <th className="px-6 py-4 text-left font-semibold">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredOrders.length === 0 ? (
                          <tr>
                            <td
                              colSpan={4}
                              className="text-center py-12 text-gray-500"
                            >
                              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                              <p>No orders found matching your search.</p>
                            </td>
                          </tr>
                        ) : (
                          filteredOrders.map((order, index) => (
                            <tr
                              key={order.id}
                              className="hover:bg-blue-50/50 transition-all duration-200 group"
                              style={{
                                animationDelay: `${index * 50}ms`,
                              }}
                            >
                              {/* Title - Clickable */}
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => handleTitleClick(order)}
                                  className="text-left w-full group-hover:text-blue-600 transition-colors duration-200"
                                >
                                  <div className="font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 cursor-pointer">
                                    <BookOpen className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                                    <span
                                      className="hover:underline"
                                      title={order.title}
                                    >
                                      {order.title || "Untitled Book"}
                                    </span>
                                    <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                  </div>
                                </button>
                              </td>

                              {/* User Email */}
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-gray-400" />
                                  <span
                                    className="text-sm text-gray-600"
                                    title={order.user_email}
                                  >
                                    {order.user_email || "No email provided"}
                                  </span>
                                </div>
                              </td>

                              {/* Created At */}
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">
                                    {order.created_at
                                      ? new Date(
                                          order.created_at
                                        ).toLocaleDateString(undefined, {
                                          day: "numeric",
                                          month: "short",
                                          year: "numeric",
                                        })
                                      : "—"}
                                  </span>
                                </div>
                              </td>

                              {/* Action Button */}
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => handleTitleClick(order)}
                                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                                >
                                  View Details
                                  <ExternalLink className="w-3 h-3" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

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
      `}</style>
    </>
  );
};

export default ManageOrders;

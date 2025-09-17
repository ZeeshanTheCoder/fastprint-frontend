"use client";

import React, { useEffect, useState } from "react";
import {
  User,
  MapPin,
  Calendar,
  Search,
  Users,
  Grid,
  List,
  Eye,
  Mail,
  Clock,
  CreditCard,
} from "lucide-react";
import { BASE_URL } from "@/services/baseUrl";

const UserInfo = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("cards"); // "cards" or "table"
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}api/userprofiles/profiles/`)
      .then((response) => response.json())
      .then((data) => {
        setProfiles(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profiles:", err);
        setError("Error fetching profiles");
        setLoading(false);
      });
  }, []);

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.username?.toLowerCase().includes(search.toLowerCase()) ||
      profile.email?.toLowerCase().includes(search.toLowerCase()) ||
      `${profile.first_name} ${profile.last_name}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const getAccountTypeBadge = (type) => {
    const styles = {
      premium:
        "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg",
      basic: "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg",
      pro: "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg",
      standard:
        "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg",
    };
    return (
      styles[type?.toLowerCase()] ||
      "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg"
    );
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              <div
                className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-purple-400 rounded-full animate-spin mx-auto"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "0.8s",
                }}
              ></div>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-700">
                Loading Profiles
              </h3>
              <p className="text-gray-500 max-w-md">
                Fetching user data from the server. This won't take long...
              </p>
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div className="text-center space-y-6 p-8 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl max-w-md mx-4 border border-white/20">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <User className="w-10 h-10 text-red-600" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-800">
                Oops! Something went wrong
              </h3>
              <p className="text-red-600 font-medium">{error}</p>
              <p className="text-gray-500 text-sm">
                Please check your connection and try again
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Animated Header */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse">
                  User Profiles
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage and explore user accounts
                </p>
                <div className="flex items-center justify-center lg:justify-start space-x-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{profiles.length} Total Users</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Search className="w-4 h-4" />
                    <span>{filteredProfiles.length} Found</span>
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-3 w-72 bg-white/70 backdrop-blur border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg"
                  />
                </div>

                <div className="flex items-center bg-white/70 backdrop-blur rounded-2xl p-1 shadow-lg border border-white/30">
                  <button
                    onClick={() => setViewMode("cards")}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      viewMode === "cards"
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                        : "text-gray-600 hover:bg-white/50"
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("table")}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      viewMode === "table"
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                        : "text-gray-600 hover:bg-white/50"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {filteredProfiles.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No profiles found
              </h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </div>
          ) : (
            <>
              {viewMode === "cards" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProfiles.map((profile, index) => (
                    <div
                      key={profile.id}
                      className="group bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-white/40 transform hover:scale-105 animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {getInitials(profile.first_name, profile.last_name)}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">
                              {profile.first_name} {profile.last_name}
                            </h3>
                            <p className="text-gray-500 text-sm">
                              @{profile.username}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getAccountTypeBadge(
                            profile.account_type
                          )}`}
                        >
                          {profile.account_type}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-gray-600">
                          <Mail className="w-4 h-4 text-blue-500" />
                          <span className="text-sm truncate">
                            {profile.email}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                          <MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm truncate">
                            {profile.city}, {profile.country}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                          <Clock className="w-4 h-4 text-purple-500" />
                          <span className="text-sm">
                            Joined{" "}
                            {new Date(profile.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-200/50">
                        <button
                          onClick={() => setSelectedProfile(profile)}
                          className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                  <div className="overflow-auto max-h-[70vh]">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                            Location
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                            Account
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                            Dates
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200/50">
                        {filteredProfiles.map((profile, index) => (
                          <tr
                            key={profile.id}
                            className="hover:bg-blue-50/50 transition-all duration-300 group animate-fadeInUp"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                  {getInitials(
                                    profile.first_name,
                                    profile.last_name
                                  )}
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-800">
                                    {profile.first_name} {profile.last_name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    @{profile.username}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-800 font-medium">
                                {profile.email}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-800">
                                {profile.address}
                              </div>
                              <div className="text-sm text-gray-500">
                                {profile.city}, {profile.country} -{" "}
                                {profile.postal_code}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getAccountTypeBadge(
                                  profile.account_type
                                )}`}
                              >
                                {profile.account_type}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-800">
                                Created:{" "}
                                {new Date(
                                  profile.created_at
                                ).toLocaleDateString()}
                              </div>
                              <div className="text-sm text-gray-500">
                                Updated:{" "}
                                {new Date(
                                  profile.updated_at
                                ).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => setSelectedProfile(profile)}
                                className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Profile Detail Modal */}
          {selectedProfile && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
              <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {getInitials(
                        selectedProfile.first_name,
                        selectedProfile.last_name
                      )}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800">
                        {selectedProfile.first_name} {selectedProfile.last_name}
                      </h2>
                      <p className="text-gray-500">
                        @{selectedProfile.username}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProfile(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-2xl">
                      <div className="flex items-center space-x-3 mb-2">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-gray-700">
                          Email
                        </span>
                      </div>
                      <p className="text-gray-800">{selectedProfile.email}</p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-2xl">
                      <div className="flex items-center space-x-3 mb-2">
                        <MapPin className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-gray-700">
                          Location
                        </span>
                      </div>
                      <p className="text-gray-800">{selectedProfile.address}</p>
                      <p className="text-gray-600">
                        {selectedProfile.city}, {selectedProfile.country} -{" "}
                        {selectedProfile.postal_code}
                      </p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-2xl">
                      <div className="flex items-center space-x-3 mb-2">
                        <CreditCard className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold text-gray-700">
                          Account Type
                        </span>
                      </div>
                      <span
                        className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${getAccountTypeBadge(
                          selectedProfile.account_type
                        )}`}
                      >
                        {selectedProfile.account_type}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 rounded-2xl">
                      <div className="flex items-center space-x-3 mb-2">
                        <Calendar className="w-5 h-5 text-yellow-600" />
                        <span className="font-semibold text-gray-700">
                          Created
                        </span>
                      </div>
                      <p className="text-gray-800">
                        {new Date(selectedProfile.created_at).toLocaleString()}
                      </p>
                    </div>

                    <div className="p-4 bg-pink-50 rounded-2xl">
                      <div className="flex items-center space-x-3 mb-2">
                        <Clock className="w-5 h-5 text-pink-600" />
                        <span className="font-semibold text-gray-700">
                          Last Updated
                        </span>
                      </div>
                      <p className="text-gray-800">
                        {new Date(selectedProfile.updated_at).toLocaleString()}
                      </p>
                    </div>

                    <div className="p-4 bg-indigo-50 rounded-2xl">
                      <div className="flex items-center space-x-3 mb-2">
                        <User className="w-5 h-5 text-indigo-600" />
                        <span className="font-semibold text-gray-700">
                          User ID
                        </span>
                      </div>
                      <p className="text-gray-800">#{selectedProfile.id}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setSelectedProfile(null)}
                    className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
          .animate-scaleIn {
            animation: scaleIn 0.3s ease-out;
          }
        `}</style>
      </div>

    </>
  );
};

export default UserInfo;

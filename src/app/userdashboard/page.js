"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import UserBanner from "@/components/UserBanner";
import {
  FaEdit,
  FaPlus,
  FaTrash,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaSearch,
  FaTimes,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/services/baseUrl";

const UserDashboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const getUserCartKey = () => `cart_${user?.id || "guest"}`;

  const getUserCart = () => {
    const cartKey = getUserCartKey();
    const storedCart = localStorage.getItem(cartKey);
    if (!storedCart) return [];
    try {
      return JSON.parse(storedCart) || [];
    } catch (error) {
      console.warn("Failed to parse cart from localStorage. Resetting.", error);
      return [];
    }
  };

  const saveUserCart = (cartData) => {
    const cartKey = getUserCartKey();
    localStorage.setItem(cartKey, JSON.stringify(cartData));
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    const token = localStorage.getItem("accessToken");
    try {
      await axios.delete(`${BASE_URL}api/book/${projectId}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks((prev) => prev.filter((book) => book.id !== projectId));
      setFilteredBooks((prev) => prev.filter((book) => book.id !== projectId));
    } catch (error) {
      console.error("Failed to delete project:", error.response?.data || error.message);
      alert("Failed to delete project. Please try again.");
    }
  };

  const handleEdit = (project) => {
    const projectData = {
      projectId: project.id,
      projectTitle: project.title,
      language: project.language,
      category: project.category,
    };
    localStorage.setItem("projectData", JSON.stringify(projectData));
    router.push("/start-project?edit=true");
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/login");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // ✅ ONLY call the unpaid endpoint — backend already filters for order_status='draft'
        const response = await axios.get(`${BASE_URL}api/book/user-unpaid-projects/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!Array.isArray(response.data?.data)) {
          throw new Error("Invalid response format: expected data.data array");
        }

        // ✅ TRUST THE BACKEND — DO NOT FILTER AGAIN
        const unpaidBooks = response.data.data || [];
        setBooks(unpaidBooks);
        setFilteredBooks(unpaidBooks);
      } catch (error) {
        console.error("Failed to fetch unpaid projects:", error);
        setBooks([]);
        setFilteredBooks([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBooks();
    }
  }, [user, router]);

  // Clean up old cart
  useEffect(() => {
    if (user) {
      const oldCart = localStorage.getItem("cart");
      if (oldCart) localStorage.removeItem("cart");
    }
  }, [user]);

  // Search
  useEffect(() => {
    if (!searchTerm) {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(
        (book) =>
          (book.title?.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (book.category?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredBooks(filtered);
    }
  }, [searchTerm, books]);

  // Sorting
  useEffect(() => {
    if (sortConfig.key) {
      const sorted = [...filteredBooks].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
      setFilteredBooks(sorted);
    }
  }, [sortConfig, filteredBooks]);

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
    return <FaSort className="opacity-40 group-hover:opacity-70 transition-opacity" />;
  };

  const clearSearch = () => setSearchTerm("");

  const handleAddToCart = (book) => {
    const existingCart = getUserCart();
    if (!existingCart.some((item) => item.id === book.id)) {
      const updatedCart = [...existingCart, book];
      saveUserCart(updatedCart);
      setBooks((prev) => prev.filter((b) => b.id !== book.id));
      setFilteredBooks((prev) => prev.filter((b) => b.id !== book.id));
    }
    router.push("/orders");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] to-[#fef6fb] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#016AB3]/20 border-t-[#016AB3]" />
          </div>
          <p className="text-xl font-semibold text-[#016AB3] mt-6">Loading your projects...</p>
        </div>
      </div>
    );
  }

  if (!books.length) {
    return (
      <>
        <div className="min-h-screen w-full bg-gradient-to-br from-[#eef4ff] to-[#fef6fb] font-sans">
          <div className="w-full h-[60px] flex items-center px-4 md:px-8 bg-gradient-to-r from-[#016AB3] via-[#0096CD] to-[#00AEDC] shadow-xl">
            <h1 className="text-white text-lg md:text-xl font-bold">Project Dashboard</h1>
          </div>
          <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl">
              <div className="bg-gradient-to-br from-[#016AB3] via-[#0096CD] to-[#00AEDC] px-6 py-10 text-center relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-5 backdrop-blur-sm">
                    <FaPlus className="text-white text-xl" />
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-3">Welcome {user?.name || "User"}</h1>
                  <p className="text-blue-100 mb-5">You haven't created any projects yet. Start one now!</p>
                  <button
                    onClick={() => router.push("/start-project")}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#F8C20A] to-[#EE831E] text-white font-semibold rounded-full shadow hover:scale-105 transition"
                  >
                    <FaPlus className="mr-2" /> Start Project
                  </button>
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
      <UserBanner />
      <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] to-[#fef6fb] py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase">Total Projects</p>
                  <p className="text-3xl font-bold text-[#016AB3] mt-1">{books.length}</p>
                </div>
                <div className="bg-gradient-to-br from-[#016AB3] to-[#0096CD] p-4 rounded-2xl">
                  <FaPlus className="text-white text-xl" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase">In Cart</p>
                  <p className="text-3xl font-bold text-emerald-600 mt-1">{getUserCart().length}</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-2xl">
                  <FaChartLine className="text-white text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-[#016AB3] via-[#0096CD] to-[#00AEDC] px-8 py-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-white text-2xl font-bold mb-2">Project Management</h1>
                  <p className="text-blue-100">Monitor and manage all your projects from one place</p>
                </div>
                <button
                  onClick={() => router.push("/start-project")}
                  className="flex items-center gap-3 bg-gradient-to-r from-[#F8C20A] to-[#EE831E] text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
                >
                  <FaPlus /> <span>New Project</span>
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="bg-gray-50 px-6 py-5 border-b border-gray-200">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="relative w-full md:max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search projects by title or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#016AB3] bg-white text-gray-900 placeholder-gray-500 shadow-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <FaTimes className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
                {searchTerm && (
                  <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm">
                    <span className="font-semibold text-[#016AB3]">{filteredBooks.length}</span> of {books.length} projects
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="group px-8 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("title")}
                    >
                      <div className="flex items-center gap-2">
                        <span>Project Title</span>
                        {getSortIcon("title")}
                      </div>
                    </th>
                    <th
                      className="group px-8 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("category")}
                    >
                      <div className="flex items-center gap-2">
                        <span>Category</span>
                        {getSortIcon("category")}
                      </div>
                    </th>
                    <th className="px-8 py-6 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-[#F8FAFF] transition">
                      <td className="px-8 py-6">
                        <div className="flex items-center">
                          <div className="h-12 w-12 bg-gradient-to-br from-[#016AB3] to-[#0096CD] rounded-xl flex items-center justify-center shadow-lg mr-4">
                            <span className="text-white font-bold text-lg">
                              {book.title?.charAt(0) || "P"}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900">{book.title || "Untitled Project"}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              Created {book.created_at ? new Date(book.created_at).toLocaleDateString() : ""}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold bg-blue-50 text-[#016AB3] border border-blue-200">
                          {book.category || "General"}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                         
                          <button
                            onClick={() => handleEdit(book)}
                            className="p-3 text-[#016AB3] hover:text-[#0096CD] hover:bg-blue-50 rounded-xl transition hover:scale-110"
                          >
                            <FaEdit className="text-sm" />
                          </button>
                          <button
                            onClick={() => handleDelete(book.id)}
                            className="p-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition hover:scale-110"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
              {filteredBooks.map((book) => (
                <div key={book.id} className="p-4 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gradient-to-br from-[#016AB3] to-[#0096CD] rounded-lg flex items-center justify-center shadow-md mr-3">
                        <span className="text-white font-bold text-sm">{book.title?.charAt(0) || "P"}</span>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{book.title || "Untitled Project"}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Created {book.created_at ? new Date(book.created_at).toLocaleDateString() : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-[#016AB3] border border-blue-200">
                      {book.category || "General"}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAddToCart(book)}
                        className="px-3 py-1 bg-gradient-to-r from-[#016AB3] to-[#0096CD] text-white rounded-full text-xs font-semibold"
                      >
                        Add to Cart
                      </button>
                      <button onClick={() => handleEdit(book)} className="p-2 text-[#016AB3] hover:bg-blue-50 rounded-lg">
                        <FaEdit className="text-xs" />
                      </button>
                      <button onClick={() => handleDelete(book.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
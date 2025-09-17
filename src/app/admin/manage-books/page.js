"use client";

import React, { useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Next.js replacement for useNavigate

const ManageBooks = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const booksData = [
    { id: 1, title: "Comic Book", category: "Comic" },
    { id: 2, title: "Calendar", category: "Calendar" },
    { id: 3, title: "Photo Book", category: "Photo" },
    { id: 4, title: "Print Book", category: "Print" },
    { id: 5, title: "Year Book", category: "Year" },
    { id: 6, title: "Magazine", category: "Magazine" },
    { id: 7, title: "Thesis Binding", category: "Thesis" },
  ];

  const handleEdit = (title) => {
    const routeMap = {
      "Comic Book": "/admin/books/comic/edit",
      Calendar: "/admin/books/calendar/edit",
      "Photo Book": "/admin/books/photobook/edit",
      "Print Book": "/admin/books/printbook/edit",
      "Year Book": "/admin/books/yearbook/edit",
      Magazine: "/admin/books/magazine/edit",
      "Thesis Binding": "/admin/books/thesis/edit",
    };

    const route = routeMap[title] || "#";

    if (route === "#") {
      alert("Edit page not available yet for this book.");
    } else {
      router.push(route);
    }
  };

  const filteredBooks = booksData.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-10 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Manage Books
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Edit configuration for each book category
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search books..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white w-64"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Books Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
                <tr className="text-left text-gray-700 font-semibold">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-center">Edit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-blue-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {book.title}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {book.category}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleEdit(book.title)}
                          className="text-blue-600 hover:text-purple-700 transition"
                          title="Edit Book"
                          aria-label={`Edit ${book.title}`}
                        >
                          <FaEdit size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-gray-500 py-6">
                      No books found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageBooks;

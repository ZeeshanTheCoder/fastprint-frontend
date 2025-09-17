'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaSearch, FaTimes } from 'react-icons/fa';
import Sidebar from '@/components/Sidebar';
import { BASE_URL } from '@/services/baseUrl';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await axios.get(`${BASE_URL}api/users/admin/users/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data.data || []);
      setFilteredUsers(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch users:', error.response?.data || error.message);
      setUsers([]);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    const token = localStorage.getItem('accessToken');
    try {
      await axios.delete(`${BASE_URL}api/users/admin/users/${userId}/delete/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      setFilteredUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Failed to delete user:', error.response?.data || error.message);
      alert('Failed to delete user. Please try again.');
    }
  };

  const clearSearch = () => setSearchTerm('');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">

      {/* Main content area: sidebar + table */}
      <div className="flex flex-1 bg-gradient-to-br from-[#eef4ff] to-[#fef6fb]">
        {/* Sidebar */}

        {/* Table and controls on right */}
        <main className="flex-1 p-8 overflow-auto">
          <h1 className="text-3xl font-bold text-[#016AB3] mb-6">Manage Users</h1>

          {/* Search Bar */}
          <div className="relative max-w-md mb-6">
            <input
              type="text"
              placeholder="Search users by email or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#016AB3]"
              autoComplete="off"
            />
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow w-full">
            <table className="w-full table-fixed divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verified
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admin
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap">{user.name}</td>
                      <td className="px-4 py-4 max-w-[200px] truncate" title={user.email}>
                        {user.email}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`font-semibold ${
                            user.is_verified ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {user.is_verified ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`font-semibold ${
                            user.is_admin ? 'text-blue-600' : 'text-gray-600'
                          }`}
                        >
                          {user.is_admin ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => handleDelete(user.id)}
                          disabled={user.is_admin}
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-white ${
                            user.is_admin
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-red-600 hover:bg-red-700'
                          } transition-colors duration-200`}
                          title={
                            user.is_admin
                              ? 'Cannot delete admin user'
                              : 'Delete user'
                          }
                          aria-label={
                            user.is_admin
                              ? 'Cannot delete admin user'
                              : 'Delete user'
                          }
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

    </div>
  );
};

export default ManageUsers;
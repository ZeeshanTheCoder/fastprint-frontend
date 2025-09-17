'use client';

import { BASE_URL } from '@/services/baseUrl';
import React, { useState, useEffect } from 'react';

const ManageShipping = () => {
  const [shippingRequests, setShippingRequests] = useState([]);
  const [bookProjects, setBookProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');

  // Function to get authentication headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  };

  // Handle API responses with proper error handling
  const handleResponse = async (response) => {
    if (!response.ok) {
      if (response.status === 401) {
        // Token is invalid or expired
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        throw new Error('Authentication failed. Please login again.');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  };

  // Fetch shipping requests and book projects from your API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch shipping requests
        const shippingResponse = await fetch(`${BASE_URL}api/shipping-requests/`, {
          headers: getAuthHeaders(),
        });
        const shippingData = await handleResponse(shippingResponse);
        setShippingRequests(shippingData);

        // Fetch book projects
        const booksResponse = await fetch(`${BASE_URL}api/book/all-orders/`, {
          headers: getAuthHeaders(),
        });
        const booksData = await handleResponse(booksResponse);
        setBookProjects(booksData.data || []);

        // Debug info
        setDebugInfo(`
          Shipping requests: ${shippingData.length}
          Book projects: ${booksData.data?.length || 0}
          First shipping request: ${JSON.stringify(shippingData[0]?.user_address || {})}
          First book project: ${JSON.stringify(booksData.data?.[0] || {})}
        `);

        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Delete a shipping request
  const handleDeleteRequest = async (id) => {
    if (!window.confirm('Are you sure you want to delete this shipping request?')) return;

    try {
      const response = await fetch(`${BASE_URL}api/shipping-requests/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        // Remove the deleted request from the state
        setShippingRequests((prev) => prev.filter((request) => request.id !== id));
      } else {
        await handleResponse(response);
      }
    } catch (err) {
      console.error('Error deleting shipping request:', err);
      alert('Failed to delete shipping request');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Format address for display
  const formatAddress = (address) => {
    if (!address) return 'N/A';
    return `${address.city}, ${address.state}, ${address.country} ${address.postal_code}`;
  };

  // Extract user name from address data - fall back to email if name not available
  const getUserName = (address) => {
    if (!address) return 'N/A';

    if (address.name) return address.name;
    if (address.full_name) return address.full_name;
    if (address.recipient) return address.recipient;
    if (address.first_name && address.last_name) return `${address.first_name} ${address.last_name}`;
    if (address.email) return address.email;

    return 'N/A';
  };

  // Get user email from address data
  const getUserEmail = (address) => {
    if (!address) return null;
    return address.email || null;
  };

  // Find matching book projects for a shipping request
  const findMatchingBookProjects = (shippingRequest) => {
    const shippingEmail = getUserEmail(shippingRequest.user_address);
    const shippingName = getUserName(shippingRequest.user_address);

    if (!shippingEmail && !shippingName) return [];

    return bookProjects.filter((book) => {
      // Match by email if available
      if (shippingEmail && book.user_email) {
        return book.user_email.toLowerCase() === shippingEmail.toLowerCase();
      }

      // Match by name if email not available
      if (shippingName && book.user_email) {
        const emailName = book.user_email.split('@')[0].toLowerCase();
        const normalizedShippingName = shippingName.toLowerCase().replace(/\s+/g, '');
        const normalizedEmailName = emailName.toLowerCase().replace(/\s+/g, '');

        return normalizedShippingName.includes(normalizedEmailName) ||
               normalizedEmailName.includes(normalizedShippingName);
      }

      return false;
    });
  };

  // Toggle expanded row
  const toggleExpandedRow = (requestId) => {
    setExpandedRow(expandedRow === requestId ? null : requestId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
        <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded">
          <h3 className="font-bold">Debug Information:</h3>
          <pre className="whitespace-pre-wrap">{debugInfo}</pre>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Shipping Requests</h1>
        <p className="text-gray-600">Total requests: {shippingRequests.length}</p>
        <p className="text-gray-600">Total book projects: {bookProjects.length}</p>

        {/* Debug information */}
        <div className="mt-4 p-4 bg-blue-100 border border-blue-400 rounded hidden">
          <h3 className="font-bold">Debug Information:</h3>
          <pre className="whitespace-pre-wrap">{debugInfo}</pre>
          <div className="mt-2">
            <h4 className="font-semibold">Sample Shipping Request:</h4>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(shippingRequests[0] || {}, null, 2)}
            </pre>
          </div>
          <div className="mt-2">
            <h4 className="font-semibold">Sample Book Project:</h4>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(bookProjects[0] || {}, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      {shippingRequests.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No shipping requests found</h2>
          <p className="text-gray-500">Shipping requests will appear here once created.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shipping Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tax
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {shippingRequests.map((request) => {
                  const matchingBooks = findMatchingBookProjects(request);
                  const hasMatchingBooks = matchingBooks.length > 0;
                  const userEmail = getUserEmail(request.user_address);

                  // Debug log
                  if (matchingBooks.length > 0) {
                    console.log(`Found ${matchingBooks.length} matching books for request ${request.id}`, {
                      shippingEmail: userEmail,
                      shippingName: getUserName(request.user_address),
                      matchingBooks: matchingBooks.map((b) => ({ id: b.id, user_email: b.user_email })),
                    });
                  }

                  return (
                    <React.Fragment key={request.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{request.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getUserName(request.user_address)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {userEmail || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatAddress(request.user_address)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${request.shipping_rate?.toFixed(2) || '0.00'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${request.tax?.toFixed(2) || '0.00'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                          ${((request.shipping_rate || 0) + (request.tax || 0)).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(request.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {hasMatchingBooks && (
                            <button
                              onClick={() => toggleExpandedRow(request.id)}
                              className="text-indigo-600 hover:text-indigo-900 mr-3 px-3 py-1 border border-indigo-600 rounded"
                            >
                              {expandedRow === request.id ? 'Hide Books' : `View Books (${matchingBooks.length})`}
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteRequest(request.id)}
                            className="text-red-600 hover:text-red-900 px-3 py-1 border border-red-600 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>

                      {expandedRow === request.id && hasMatchingBooks && (
                        <tr>
                          <td colSpan="9" className="px-6 py-4 bg-gray-50">
                            <div className="mb-4">
                              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Book Projects for {getUserName(request.user_address)}
                                {userEmail && ` (${userEmail})`}
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {matchingBooks.map((book) => (
                                  <div key={book.id} className="bg-white p-4 rounded-lg shadow">
                                    <h4 className="font-semibold text-blue-600">{book.title}</h4>
                                    <div className="mt-2 text-sm text-gray-600">
                                      <p>
                                        <span className="font-medium">User Email:</span> {book.user_email}
                                      </p>
                                      <p>
                                        <span className="font-medium">Category:</span> {book.category}
                                      </p>
                                      <p>
                                        <span className="font-medium">Language:</span> {book.language}
                                      </p>
                                      <p>
                                        <span className="font-medium">Page Count:</span> {book.page_count}
                                      </p>
                                      <p>
                                        <span className="font-medium">Binding:</span> {book.binding_type}
                                      </p>
                                      <p>
                                        <span className="font-medium">Paper:</span> {book.paper_type}
                                      </p>
                                      <p>
                                        <span className="font-medium">Trim Size:</span> {book.trim_size}
                                      </p>
                                      {book.cover_description && (
                                        <p>
                                          <span className="font-medium">Cover Description:</span> {book.cover_description}
                                        </p>
                                      )}
                                      <p>
                                        <span className="font-medium">Uploaded:</span> {formatDate(book.created_at)}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageShipping;
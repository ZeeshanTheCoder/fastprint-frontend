"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Calendar,
  BookOpen,
  FileText,
  ImageIcon,
  Palette,
  Layers,
  Package,
  Globe,
  Download,
  Eye,
  Info,
} from "lucide-react";
import { BASE_URL } from "@/services/baseUrl";

const OrderInfo = () => {
  const router = useRouter();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("orderData");
      if (saved) {
        setOrderData(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load order data from localStorage", e);
    }
  }, []);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Order Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The requested order information could not be loaded.
          </p>
          <button
            onClick={() => router.push("/admin/orders")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const InfoCard = ({ title, icon, bgColor, children }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div
        className={`bg-gradient-to-r ${bgColor} px-6 py-4 border-b border-gray-100`}
      >
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
          <div
            className={`p-2 ${
              bgColor.includes("blue")
                ? "bg-blue-100 text-blue-600"
                : bgColor.includes("green")
                ? "bg-green-100 text-green-600"
                : "bg-purple-100 text-purple-600"
            } rounded-lg`}
          >
            {icon}
          </div>
          {title}
        </h2>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );

  const InfoItem = ({ icon, label, value, isCategory = false }) => (
    <div className="flex items-start gap-3">
      {React.cloneElement(icon, { className: "w-5 h-5 text-gray-400 mt-0.5" })}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        {isCategory ? (
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
            {value || "—"}
          </span>
        ) : (
          <p className="text-gray-900 font-semibold">{value || "—"}</p>
        )}
      </div>
    </div>
  );

  const FileCard = ({
    file,
    description,
    title,
    subtitle,
    iconBg,
    icon,
    isDescription = false,
  }) => {
    if (file) {
      return (
        <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 ${iconBg} rounded-lg`}>{icon}</div>
            <div>
              <p className="font-medium text-gray-900">{title}</p>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href={`${BASE_URL}${file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
            >
              <Eye className="w-4 h-4" /> View
            </a>
            <a
              href={`${BASE_URL}${file}`}
              download
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
            >
              <Download className="w-4 h-4" /> Download
            </a>
          </div>
          {description && (
            <p className="text-xs text-gray-600 mt-2">{description}</p>
          )}
        </div>
      );
    }

    if (isDescription && description) {
      return (
        <div className="border border-green-200 rounded-lg p-4 bg-green-50">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 ${iconBg} rounded-lg`}>{icon}</div>
            <div>
              <p className="font-medium text-gray-900">{title}</p>
              <p className="text-sm text-gray-500">No cover file uploaded</p>
            </div>
          </div>
          <p className="text-xs text-gray-700 mt-2 whitespace-pre-line">
            {description}
          </p>
        </div>
      );
    }

    return (
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            {React.cloneElement(icon, { className: "w-5 h-5 text-gray-400" })}
          </div>
          <div>
            <p className="font-medium text-gray-500">{title}</p>
            <p className="text-sm text-gray-400">{`No ${title.toLowerCase()} uploaded`}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <button
              onClick={() => router.push("/admin/orders")}
              className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Orders
            </button>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-4 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Order Details
              </h1>
              <p className="text-gray-600 text-lg">
                Complete information about this book order
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <InfoCard
              title="Basic Information"
              icon={<Info className="w-5 h-5" />}
              bgColor="from-blue-50 to-indigo-50"
            >
              <InfoItem
                icon={<BookOpen />}
                label="Book Title"
                value={orderData.title}
              />
              <InfoItem
                icon={<User />}
                label="Customer Email"
                value={orderData.user_email}
              />
              <InfoItem
                icon={<Package />}
                label="Category"
                value={orderData.category}
                isCategory
              />
              <InfoItem
                icon={<Globe />}
                label="Language"
                value={orderData.language}
              />
              <InfoItem
                icon={<Calendar />}
                label="Order Date"
                value={
                  orderData.created_at
                    ? new Date(orderData.created_at).toLocaleString(undefined, {
                        dateStyle: "full",
                        timeStyle: "short",
                      })
                    : "—"
                }
              />
            </InfoCard>

            <InfoCard
              title="Technical Specifications"
              icon={<Layers className="w-5 h-5" />}
              bgColor="from-green-50 to-emerald-50"
            >
              <InfoItem
                icon={<FileText />}
                label="Page Count"
                value={`${orderData.page_count || "—"} pages`}
              />
              <InfoItem
                icon={<BookOpen />}
                label="Binding Type"
                value={orderData.binding_type}
              />
              <InfoItem
                icon={<Layers />}
                label="Cover Finish"
                value={orderData.cover_finish}
              />
              <InfoItem
                icon={<Palette />}
                label="Interior Color"
                value={orderData.interior_color}
              />
              <InfoItem
                icon={<FileText />}
                label="Paper Type"
                value={orderData.paper_type}
              />
              <InfoItem
                icon={<Package />}
                label="Trim Size"
                value={orderData.trim_size}
              />
            </InfoCard>
          </div>

          <div className="mt-8">
            <InfoCard
              title="Uploaded Files"
              icon={<FileText className="w-5 h-5" />}
              bgColor="from-purple-50 to-pink-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileCard
                  file={orderData.pdf_file}
                  title="Book Content (PDF)"
                  subtitle="Main book file"
                  iconBg="bg-red-100"
                  icon={<FileText className="w-5 h-5 text-red-600" />}
                />
                <FileCard
                  file={orderData.cover_file}
                  description={orderData.cover_description}
                  title="Book Cover"
                  subtitle="Cover design file"
                  iconBg="bg-green-100"
                  icon={<ImageIcon className="w-5 h-5 text-green-600" />}
                  isDescription
                />
              </div>
            </InfoCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderInfo;

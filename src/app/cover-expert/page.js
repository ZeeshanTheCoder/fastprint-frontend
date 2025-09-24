"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/authContext";
import axios from "axios";
import { BASE_URL } from "@/services/baseUrl"; // Import centralized base URL

const CoverExpert = () => {
  const router = useRouter();
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookTitle: "",
    bookGenre: "",
    description: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [designForm, setDesignForm] = useState(null);
  // ✅ REMOVED: const [dropdowns, setDropdowns] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);

  // ✅ REMOVED: fetchDropdownData function

  useEffect(() => {
    const savedProject = localStorage.getItem("projectData");
    const savedForm = localStorage.getItem("designForm");
    if (savedProject && savedForm) {
      try {
        setProjectData(JSON.parse(savedProject));
        setDesignForm(JSON.parse(savedForm));
      } catch (error) {
        console.error("Error parsing saved data:", error);
        setErrors({
          general: "Error loading saved project data. Please start over.",
        });
      }
    }
    // ✅ REMOVED: if (token) fetchDropdownData();
  }, [token]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.bookTitle.trim())
      newErrors.bookTitle = "Book title is required";
    if (!formData.bookGenre.trim())
      newErrors.bookGenre = "Book genre is required";
    if (!formData.description.trim())
      newErrors.description = "Cover description is required";
    if (!selectedFile) newErrors.file = "PDF file is required";
    else if (selectedFile.type !== "application/pdf")
      newErrors.file = "Only PDF files are allowed";
    else if (selectedFile.size > 50 * 1024 * 1024)
      newErrors.file = "File size must be less than 50MB";
    if (!projectData || !designForm)
      newErrors.general =
        "Missing project data. Please complete previous steps first.";
    if (!token) newErrors.general = "Authentication required. Please log in.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
    if (errors.file) setErrors((prev) => ({ ...prev, file: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      const apiData = new FormData();

      // ✅ Retrieve all necessary data from localStorage
      const bindings = JSON.parse(localStorage.getItem("bindings") || "[]");
      const coverFinishes = JSON.parse(
        localStorage.getItem("cover_finishes") || "[]"
      );
      const interiorColors = JSON.parse(
        localStorage.getItem("interior_colors") || "[]"
      );
      const paperTypes = JSON.parse(
        localStorage.getItem("paper_types") || "[]"
      );
      const trimSizes = JSON.parse(localStorage.getItem("trim_sizes") || "[]");
      const designForm = JSON.parse(localStorage.getItem("designForm") || "{}");
      const projectData = JSON.parse(
        localStorage.getItem("projectData") || "{}"
      );

      // Helper to safely get name by ID
      const getNameById = (options, id) => {
        if (!id) return "";
        const opt = options.find((opt) => String(opt.id) === String(id));
        return opt ? opt.name : "";
      };

      // Map IDs to names
      const binding = getNameById(bindings, designForm.binding_id);
      const coverFinish = getNameById(
        coverFinishes,
        designForm.cover_finish_id
      );
      const interiorColor = getNameById(
        interiorColors,
        designForm.interior_color_id
      );
      const paperType = getNameById(paperTypes, designForm.paper_type_id);
      const trimSize = getNameById(trimSizes, designForm.trim_size_id);

      // Append book metadata
      apiData.append("title", projectData.projectTitle || "");
      apiData.append("category", projectData.category || "");
      apiData.append("language", projectData.language || "");
      apiData.append("page_count", designForm.page_count || "");
      apiData.append("binding_type", binding);
      apiData.append("cover_finish", coverFinish);
      apiData.append("interior_color", interiorColor);
      apiData.append("paper_type", paperType);
      apiData.append("trim_size", trimSize);
      apiData.append("pdf_file", selectedFile);

      // Append expert request data
      apiData.append("cover_description", formData.description || "");
      apiData.append("contact_name", formData.name || "");
      apiData.append("contact_email", formData.email || "");
      apiData.append("book_title", formData.bookTitle || "");
      apiData.append("book_genre", formData.bookGenre || "");
      apiData.append("is_cover_expert", "true");

      const response = await axios.post(
        `${BASE_URL}api/book/upload-book/`,
        apiData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response.data?.status === "success") {
        // Clear localStorage after success
        [
          "projectData",
          "designForm",
          "bindings",
          "cover_finishes",
          "interior_colors",
          "paper_types",
          "trim_sizes",
        ].forEach((key) => localStorage.removeItem(key));

        alert(
          "Project submitted successfully! Our cover design expert will contact you soon."
        );
        router.push("/shop");
      } else {
        throw new Error(response.data?.message || "Submission failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Upload failed. Please try again.";
      setErrors({ general: errorMessage });
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <>
      {/* Navigation Tabs */}
      <div className="w-full h-auto md:h-[51px] flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 px-4 md:px-6 py-2 md:py-0 bg-gradient-to-r from-[#016AB3] via-[#0096CD] to-[#00AEDC] font-sans">
        <span
          onClick={() => router.push("/start-project")}
          className="text-white text-base md:text-lg font-semibold cursor-pointer pb-1 border-b-2 md:border-b-4 border-transparent hover:border-yellow-400 transition-all text-center w-full md:w-auto"
        >
          Start Project
        </span>
        <span
          onClick={() => router.push("/design-project")}
          className="text-white text-base md:text-lg font-semibold cursor-pointer pb-1 border-b-2 md:border-b-4 border-transparent hover:border-yellow-400 transition-all text-center w-full md:w-auto"
        >
          Designs
        </span>
        <span className="text-white text-base md:text-lg font-semibold cursor-pointer pb-1 border-b-2 md:border-b-4 border-yellow-400 text-center w-full md:w-auto">
          Cover Expert
        </span>
      </div>

      {/* Main Content */}
      <div className="w-full min-h-screen px-4 md:px-6 py-6 md:py-10 bg-gradient-to-br from-[#eef4ff] to-[#fef6fb] font-sans">
        <div className="max-w-[909px] mx-auto p-4 md:p-8 lg:p-12 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl bg-gradient-to-r from-[#ffe4ec] via-[#fdfdfd] to-[#e0f3ff]">
          {/* Header */}
          <div className="relative flex justify-center items-center mb-6 md:mb-10">
            <div className="absolute left-0 right-0 h-[2px] md:h-[4px] bg-gradient-to-r from-[#D15D9E] to-[#5D4495] z-0" />
            <div className="h-[40px] md:h-[47px] w-full md:w-[440px] flex items-center justify-center text-white font-medium text-sm md:text-md z-10 bg-gradient-to-r from-[#D15D9E] to-[#5D4495] rounded-full">
              Contact Cover Design Expert
            </div>
          </div>

          {/* Project Summary */}
          {projectData && designForm && (
            <div className="mb-6 md:mb-8 p-4 md:p-6 bg-blue-50 rounded-lg md:rounded-xl border border-blue-200">
              <h3 className="text-[#2A428C] text-base md:text-lg font-semibold mb-2 md:mb-3">
                Project Summary
              </h3>
              <div className="grid grid-cols-1 gap-2 md:gap-4 text-xs md:text-sm">
                <div>
                  <strong>Title:</strong> {projectData.projectTitle}
                </div>
                <div>
                  <strong>Category:</strong> {projectData.category}
                </div>
                <div>
                  <strong>Language:</strong>{" "}
                  {projectData.language || "Not specified"}
                </div>
                <div>
                  <strong>Page Count:</strong> {designForm.page_count}
                </div>
              </div>
            </div>
          )}

          {/* General Error Message */}
          {errors.general && (
            <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center text-sm md:text-base">
              {errors.general}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 md:gap-6 max-w-full md:max-w-[700px] mx-auto bg-white p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-sm md:shadow-md"
          >
            <div>
              <label className="text-black font-semibold block mb-1 text-sm md:text-base">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full border rounded-md p-2 md:p-3 text-xs md:text-sm ${
                  errors.name ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs md:text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="text-black font-semibold block mb-1 text-sm md:text-base">
                Your Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full border rounded-md p-2 md:p-3 text-xs md:text-sm ${
                  errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-500 text-xs md:text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="text-black font-semibold block mb-1 text-sm md:text-base">
                Book Title *
              </label>
              <input
                type="text"
                name="bookTitle"
                value={formData.bookTitle}
                onChange={handleChange}
                required
                className={`w-full border rounded-md p-2 md:p-3 text-xs md:text-sm ${
                  errors.bookTitle
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Enter your book title"
              />
              {errors.bookTitle && (
                <p className="text-red-500 text-xs md:text-sm mt-1">
                  {errors.bookTitle}
                </p>
              )}
            </div>

            <div>
              <label className="text-black font-semibold block mb-1 text-sm md:text-base">
                Book Genre *
              </label>
              <input
                type="text"
                name="bookGenre"
                value={formData.bookGenre}
                onChange={handleChange}
                required
                className={`w-full border rounded-md p-2 md:p-3 text-xs md:text-sm ${
                  errors.bookGenre
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="e.g., Fiction, Non-fiction, Romance, Thriller"
              />
              {errors.bookGenre && (
                <p className="text-red-500 text-xs md:text-sm mt-1">
                  {errors.bookGenre}
                </p>
              )}
            </div>

            <div>
              <label className="text-black font-semibold block mb-1 text-sm md:text-base">
                Cover Design Requirements also mention your Binding Type*
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
                className={`w-full border rounded-md p-2 md:p-3 text-xs md:text-sm resize-none ${
                  errors.description
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Please describe the type of cover design you want. Include details about style, colors, themes, or any specific requirements..."
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs md:text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label className="text-black font-semibold block mb-1 text-sm md:text-base">
                Please Again Upload Your Book (PDF) *
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                required
                className={`w-full border rounded-md p-2 md:p-3 text-xs md:text-sm ${
                  errors.file ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.file && (
                <p className="text-red-500 text-xs md:text-sm mt-1">
                  {errors.file}
                </p>
              )}
              {selectedFile && (
                <p className="text-green-600 text-xs md:text-sm mt-1">
                  Selected: {selectedFile.name} (
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {/* Upload Progress */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[#F8C20A] to-[#EE831E] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
                <p className="text-center text-xs md:text-sm text-gray-600 mt-1">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 md:py-3 text-white text-sm md:text-[16px] font-medium rounded-full shadow-md transition-all ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#F8C20A] to-[#EE831E] hover:shadow-lg"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit to Cover Expert"}
            </button>
          </form>
        </div>
      </div>

      {/* Contact Section */}
      <section className="w-full min-h-screen px-4 md:px-6 py-6 md:py-10 bg-gradient-to-br from-[#eef4ff] to-[#fef6fb] font-sans">
        <div className="max-w-[909px] mx-auto text-center px-4 md:px-6">
          <div className="scroll-animate slide-in-up bg-white p-6 md:p-8 lg:p-12 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#2A428C] mb-4 md:mb-6 leading-tight">
              Contact with Cover Expert
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 max-w-2xl mx-auto">
              Our expert cover designers are ready to bring your book to life
              with a stunning cover. Get in touch with our cover design experts
              for a custom design that captures the essence of your book.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button className="px-6 py-3 md:px-10 md:py-4 bg-gradient-to-r from-[#016AB3] to-[#0096CD] text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 text-sm md:text-lg">
                Call +1 469-277-7489
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CoverExpert;

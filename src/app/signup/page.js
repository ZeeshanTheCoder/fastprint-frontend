"use client";

import React, { useState, useEffect } from "react";
import { register } from "@/services/authService";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/assets/images/fastlogo.svg";
import singup from "@/assets/images/signup.png";
import Image from "next/image";

const Signup = () => {
  const [form, setForm] = useState({ email: "", name: "", password: "" });
  const [message, setMessage] = useState("");
  const [formDisabled, setFormDisabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [errors, setErrors] = useState({ email: "", name: "", password: "" });

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateName = (name) => {
    return name.trim().length >= 3;
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return re.test(password);
  };

  const passwordErrorList = [
    "At least 8 characters",
    "Include uppercase letter",
    "Include lowercase letter",
    "Include number",
    "Include special character",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (message) setMessage("");

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (name === "email") {
        if (!value) {
          newErrors.email = "Email is required.";
        } else if (!validateEmail(value)) {
          newErrors.email = "Please Enter your email in the correct format";
        } else {
          newErrors.email = "";
        }
      } else if (name === "name") {
        if (!value) {
          newErrors.name = "Name is required.";
        } else if (!validateName(value)) {
          newErrors.name = "Name must be at least 3 characters.";
        } else {
          newErrors.name = "";
        }
      } else if (name === "password") {
        if (!value) {
          newErrors.password = "Password is required.";
        } else if (!validatePassword(value)) {
          newErrors.password = passwordErrorList.join("\n");
        } else {
          newErrors.password = "";
        }
      }
      return newErrors;
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFocusedField("");
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (name === "email") {
        if (!value) {
          newErrors.email = "Email is required.";
        } else if (!validateEmail(value)) {
          newErrors.email = "Please enter a valid email address.";
        } else {
          newErrors.email = "";
        }
      } else if (name === "name") {
        if (!value) {
          newErrors.name = "Name is required.";
        } else if (!validateName(value)) {
          newErrors.name = "Name must be at least 3 characters.";
        } else {
          newErrors.name = "";
        }
      } else if (name === "password") {
        if (!value) {
          newErrors.password = "Password is required.";
        } else if (!validatePassword(value)) {
          newErrors.password = passwordErrorList.join("\n");
        } else {
          newErrors.password = "";
        }
      }
      return newErrors;
    });
  };

  const isFormValid = () => {
    return (
      validateName(form.name) &&
      validateEmail(form.email) &&
      validatePassword(form.password) &&
      !formDisabled
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);

    const nameError = !form.name
      ? "Name is required."
      : validateName(form.name)
      ? ""
      : "Name must be at least 3 characters.";
    const emailError = !form.email
      ? "Email is required."
      : validateEmail(form.email)
      ? ""
      : "Please enter a valid email address.";
    const passwordError = !form.password
      ? "Password is required."
      : validatePassword(form.password)
      ? ""
      : passwordErrorList.join("\n");

    setErrors({ name: nameError, email: emailError, password: passwordError });

    if (nameError || emailError || passwordError) {
      return;
    }

    setFormDisabled(true);

    try {
      await register(form);
      setMessage(
        "Registered successfully! Please check your email to verify your account."
      );
      setIsSuccess(true);
      setFormDisabled(false); // ✅ Stop loader after success
    } catch (err) {
      const errorMsg =
        err.response?.data?.email?.[0] ||
        err.response?.data?.detail ||
        "Registration failed. Please try again.";
      setMessage(errorMsg);
      setFormDisabled(false);
    }
  };

  const renderPasswordErrors = (error) => {
    if (!error) return null;
    if (error === "Password is required.") {
      return <p className="mt-1 text-xs text-black">{error}</p>;
    } else {
      const lines = error.split("\n").filter((l) => l.trim() !== "");
      return (
        <ul
          id="password-error"
          className="mt-1 text-xs text-black list-disc list-inside space-y-0.5"
        >
          {lines.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-white">
      {/* Left Side */}
      <div
        className={`w-full lg:w-1/2 relative flex items-center justify-center h-56 sm:h-72 md:h-96 lg:h-auto transition-all duration-1000 ease-out ${
          mounted ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
        style={{ backgroundColor: "rgba(4, 22, 67, 1)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20 animate-pulse"></div>
        <div className="relative z-20 flex items-center justify-center w-full h-full">
          <Image
            src={singup}
            alt="Studying People Illustration"
            className="max-w-[180px] sm:max-w-[260px] md:max-w-[320px] lg:max-w-md object-contain animate-pulse-slow"
            style={{ animationTimingFunction: "ease-in-out" }}
          />
        </div>
        <div
          className={`absolute top-4 left-4 sm:left-6 z-30 transition-all duration-700 delay-300 ${
            mounted ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          <Image
            src={Logo}
            alt="Logo"
            className="w-14 sm:w-16 md:w-20 h-auto object-contain hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Right Side */}
      <div
        className={`w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-8 md:px-12 py-8 transition-all duration-1000 ease-out relative ${
          mounted ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
        style={{ backgroundColor: "rgba(229, 251, 255, 1)" }}
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-40 sm:h-40 md:w-64 md:h-64 bg-cyan-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 w-full">
          <div
            className={`flex flex-col items-center mb-8 transition-all duration-800 delay-300 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text">
              Join Us Today{" "}
              <span className="inline-block text-xl sm:text-2xl md:text-3xl animate-wave">
                🚀
              </span>
            </h1>
            <div className="relative">
              <div
                className={`h-[3px] rounded-full transition-all duration-1000 delay-500 ${
                  mounted ? "w-[100px] sm:w-[150px] md:w-[180px]" : "w-0"
                }`}
                style={{ backgroundColor: "rgba(1, 106, 179, 1)" }}
              ></div>
              <div
                className={`mt-2 h-[2px] rounded-full mx-auto transition-all duration-1000 delay-700 ${
                  mounted ? "w-[50px] sm:w-[75px] md:w-[90px]" : "w-0"
                }`}
                style={{ backgroundColor: "rgba(1, 106, 179, 1)" }}
              ></div>
            </div>
          </div>

          <div
            className={`max-w-xs sm:max-w-sm md:max-w-md mx-auto w-full transition-all duration-800 delay-500 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-8 text-center">
              Create Your Account
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-6"
              noValidate
            >
              {/* Name Input */}
              <div className="relative group">
                <h2>Username</h2>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={handleBlur}
                  placeholder="Username"
                  required
                  disabled={formDisabled}
                  className={`w-full h-12 rounded-xl border-2 px-4 text-base transition-all duration-300 bg-white/70 backdrop-blur-sm
                    ${
                      focusedField === "name" || form.name
                        ? "border-blue-400 shadow-lg shadow-blue-100 scale-[1.02]"
                        : "border-gray-200 hover:border-gray-300"
                    } 
                    ${
                      formDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-md"
                    }
                    focus:outline-none focus:ring-0`}
                  aria-invalid={!!errors.name}
                  aria-describedby="name-error"
                />
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-cyan-400/20 transition-opacity duration-300 pointer-events-none
                    ${focusedField === "name" ? "opacity-100" : "opacity-0"}`}
                ></div>
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-black">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="relative group">
                <h2>Email</h2>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={handleBlur}
                  placeholder="Email"
                  required
                  disabled={formDisabled}
                  className={`w-full h-12 rounded-xl border-2 px-4 text-base transition-all duration-300 bg-white/70 backdrop-blur-sm
                    ${
                      focusedField === "email" || form.email
                        ? "border-blue-400 shadow-lg shadow-blue-100 scale-[1.02]"
                        : "border-gray-200 hover:border-gray-300"
                    } 
                    ${
                      formDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-md"
                    }
                    focus:outline-none focus:ring-0`}
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                />
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-cyan-400/20 transition-opacity duration-300 pointer-events-none
                    ${focusedField === "email" ? "opacity-100" : "opacity-0"}`}
                ></div>
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-black">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative group">
                <h2>Password</h2>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={handleBlur}
                  placeholder="Password"
                  required
                  disabled={formDisabled}
                  className={`w-full h-12 rounded-xl border-2 px-4 text-base transition-all duration-300 bg-white/70 backdrop-blur-sm
                    ${
                      focusedField === "password" || form.password
                        ? "border-blue-400 shadow-lg shadow-blue-100 scale-[1.02]"
                        : "border-gray-200 hover:border-gray-300"
                    } 
                    ${
                      formDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-md"
                    }
                    focus:outline-none focus:ring-0`}
                  aria-invalid={!!errors.password}
                  aria-describedby="password-error"
                />
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-cyan-400/20 transition-opacity duration-300 pointer-events-none
                    ${
                      focusedField === "password" ? "opacity-100" : "opacity-0"
                    }`}
                ></div>
                {renderPasswordErrors(errors.password)}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formDisabled || !isFormValid()}
                className={`relative h-12 rounded-full text-base font-medium text-white overflow-hidden transition-all duration-300 transform
                  ${
                    formDisabled || !isFormValid()
                      ? "scale-95 opacity-80 cursor-not-allowed"
                      : "hover:scale-105 hover:shadow-xl hover:shadow-blue-200 active:scale-95"
                  }`}
                style={{ backgroundColor: "rgba(0, 150, 205, 1)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center">
                  {formDisabled ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </span>
              </button>
            </form>

            {/* Message Display */}
            {message && (
              <div
                className={`mt-6 p-3 border rounded-lg transition-all duration-300 ${
                  isSuccess
                    ? "bg-green-50 border-green-200 animate-bounce-gentle"
                    : "bg-red-50 border-red-200 animate-shake"
                }`}
              >
                <p
                  className={`text-sm text-center flex items-center justify-center ${
                    isSuccess ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isSuccess ? (
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {message}
                </p>
              </div>
            )}

            {/* Login Link */}
            <p className="mt-8 text-gray-700 text-sm text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold hover:underline transition-all duration-300 hover:scale-105 inline-block"
                style={{ color: "rgba(1, 106, 179, 1)" }}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

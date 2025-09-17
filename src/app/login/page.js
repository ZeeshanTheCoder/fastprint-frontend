"use client";

import React, { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/assets/images/fastlogo.svg";
import singup from "@/assets/images/signup.png";
import Image from "next/image";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (error) setError("");
    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: !value
          ? "Email is required."
          : validateEmail(value)
          ? ""
          : "Please enter a valid email address.",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFocusedField("");
    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: !value
          ? "Email is required."
          : validateEmail(value)
          ? ""
          : "Please enter a valid email address.",
      }));
    }
  };

  const isFormValid = () => validateEmail(form.email) && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const emailError = !form.email
      ? "Email is required."
      : validateEmail(form.email)
      ? ""
      : "Please enter a valid email address.";

    setErrors({ email: emailError });

    if (emailError) {
      setIsLoading(false);
      return;
    }

    try {
      const user = await login(form);
      if (user?.is_admin) router.push("/admin");
      else router.push("/account-settings");
    } catch {
      setError(
        "Invalid email or password. Please try with correct credentials"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
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
        className={`w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 py-8 transition-all duration-1000 ease-out relative ${
          mounted ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
        style={{ backgroundColor: "rgba(229, 251, 255, 1)" }}
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-sm mx-auto w-full">
          <div
            className={`flex flex-col items-center mb-8 transition-all duration-800 delay-300 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text">
              Welcome Back{" "}
              <span className="inline-block text-2xl sm:text-3xl animate-wave">
                👋
              </span>
            </h1>
            <div className="relative">
              <div
                className={`h-[3px] rounded-full transition-all duration-1000 delay-500 ${
                  mounted ? "w-[150px] sm:w-[180px]" : "w-0"
                }`}
                style={{ backgroundColor: "rgba(1, 106, 179, 1)" }}
              ></div>
              <div
                className={`mt-2 h-[2px] rounded-full mx-auto transition-all duration-1000 delay-700 ${
                  mounted ? "w-[75px] sm:w-[90px]" : "w-0"
                }`}
                style={{ backgroundColor: "rgba(1, 106, 179, 1)" }}
              ></div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-6"
            noValidate
          >
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
                disabled={isLoading}
                className={`w-full h-12 rounded-xl border-2 px-4 text-base transition-all duration-300 bg-white/70 backdrop-blur-sm
                  ${
                    focusedField === "email" || form.email
                      ? "border-blue-400 shadow-lg shadow-blue-100 scale-[1.02]"
                      : "border-gray-200 hover:border-gray-300"
                  }
                  ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-md"
                  }
                  focus:outline-none focus:ring-0`}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
              />
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-cyan-400/20 transition-opacity duration-300 pointer-events-none ${
                  focusedField === "email" ? "opacity-100" : "opacity-0"
                }`}
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
                onBlur={() => setFocusedField("")}
                placeholder="Password"
                required
                disabled={isLoading}
                className={`w-full h-12 rounded-xl border-2 px-4 text-base transition-all duration-300 bg-white/70 backdrop-blur-sm
                  ${
                    focusedField === "password" || form.password
                      ? "border-blue-400 shadow-lg shadow-blue-100 scale-[1.02]"
                      : "border-gray-200 hover:border-gray-300"
                  }
                  ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-md"
                  }
                  focus:outline-none focus:ring-0`}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`relative h-12 rounded-full text-base font-medium text-white overflow-hidden transition-all duration-300 transform
                ${
                  isLoading
                    ? "scale-95 opacity-80 cursor-not-allowed"
                    : "hover:scale-105 hover:shadow-xl hover:shadow-blue-200 active:scale-95"
                }`}
              style={{ backgroundColor: "rgba(0, 150, 205, 1)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
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
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </span>
            </button>
          </form>

          {error && (
            <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded-lg transition-all duration-300 animate-shake">
              <p className="text-red-600 text-sm text-center flex items-center justify-center">
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
                {error}
              </p>
            </div>
          )}

          <p className="mt-8 text-gray-700 text-sm text-center">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold hover:underline transition-all duration-300 hover:scale-105 inline-block"
              style={{ color: "rgba(1, 106, 179, 1)" }}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

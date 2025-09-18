"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function VerifyEmail() {
  const params = useParams();
  const { uidb64, token } = params;
  const [msg, setMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!uidb64 || !token) return;

    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    fetch(`${API_BASE_URL}/api/users/verify-email/${uidb64}/${token}/`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Verification failed");
        return res.json();
      })
      .then(() => {
        setMsg("Email verified! You can now log in.");
        setTimeout(() => router.push("/login"), 2000);
      })
      .catch(() => {
        setMsg("Invalid or expired verification link.");
      });
  }, [uidb64, token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Email Verification
        </h2>
        <p
          className={`text-sm ${
            msg.includes("verified") ? "text-green-600" : "text-red-600"
          }`}
        >
          {msg || "Verifying your email..."}
        </p>
      </div>
    </div>
  );
}

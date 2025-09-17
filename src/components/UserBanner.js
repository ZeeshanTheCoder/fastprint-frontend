"use client";

import React from "react";
import Image from "next/image";
import Book1 from "@/assets/images/book1.png";
import Book2 from "@/assets/images/Group.png";
import useAuth from "@/hooks/useAuth";

const UserBanner = () => {
  const { user } = useAuth(); // Assuming user object has 'name'

  return (
    <section
      className="relative w-full max-w-none h-auto rounded-[20px] border-[5px] border-white/50 backdrop-blur-xl px-4 sm:px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between shadow-lg"
      style={{
        background:
          "linear-gradient(90deg, #016AB3 16.41%, #0096CD 60.03%, #00AEDC 87.93%)",
      }}
    >
      {/* Left Content */}
      <div className="w-full md:w-1/2 text-white text-center md:text-left mb-6 md:mb-0">
        <h2 className="text-[26px] sm:text-[34px] md:text-[42px] font-bold leading-tight mb-2">
          Empower Your <span className="text-[#F8C20A]">Publishing Journey</span>
        </h2>
        <p className="text-sm sm:text-base leading-relaxed px-2 md:px-0">
          Create, manage, and track your book projects — all in one place. Let’s
          bring your story to life.
        </p>
      </div>

      {/* Right Images */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center relative">
        <div className="flex items-center relative">
          <Image
            src={Book1}
            alt="Book1"
            className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[260px] h-auto object-contain z-10"
            style={{ background: "transparent", marginRight: "-135px" }}
            priority
          />
          <Image
            src={Book2}
            alt="Book2"
            className="w-[170px] sm:w-[210px] md:w-[250px] lg:w-[270px] h-auto object-contain rotate-[4deg] z-0"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default UserBanner;

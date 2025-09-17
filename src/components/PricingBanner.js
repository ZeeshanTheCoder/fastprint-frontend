import React from "react";
import Book1 from "@/assets/images/book1.png"; // Adjust path as needed
import Book2 from "@/assets/images/Group.png"; // Adjust path as needed
import Image from "next/image";

const PricingBanner = () => {
  return (
    <section
      className="relative w-full max-w-none h-auto rounded-[20px] border-[5px] border-white/50 backdrop-blur-xl px-4 sm:px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between"
      style={{
        background:
          "linear-gradient(90deg, #016AB3 16.41%, #0096CD 60.03%, #00AEDC 87.93%)",
      }}
    >
      {/* Left Content */}
      <div className="w-full md:w-1/2 text-white text-center md:text-left mb-6 md:mb-0">
        <h2 className="text-[28px] sm:text-[36px] md:text-[50px] font-bold leading-tight mb-3">
          Pricing <span className="text-[#F8C20A]">Calculator</span>
        </h2>
        <p className="text-sm sm:text-base leading-relaxed px-2 md:px-0">
          Easily calculate the printing cost of your book using our simple book
          cost calculator.
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
          />
          <Image
            src={Book2}
            alt="Book2"
            className="w-[170px] sm:w-[210px] md:w-[250px] lg:w-[270px] h-auto object-contain rotate-[4deg] z-0"
          />
        </div>
      </div>
    </section>
  );
};

export default PricingBanner;

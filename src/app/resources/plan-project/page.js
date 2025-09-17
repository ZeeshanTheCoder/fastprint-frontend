"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import maskgroup from "@/assets/images/plan-mask-group.png";
import bannerimg from "@/assets/images/banner/plan-banner.png";
import ourBlogBGImg from "@/assets/images/our-blog-bg-img.png";

import img1 from "@/assets/images/image-2.png";
import img2 from "@/assets/images/image-3.png";
import img3 from "@/assets/images/image-4.png";
import img4 from "@/assets/images/image-5.png";
import img5 from "@/assets/images/image-6.png";
import img6 from "@/assets/images/image-7.png";
import img7 from "@/assets/images/image-8.png";
import img8 from "@/assets/images/image-9.png";

import mainBook from "@/assets/images/main-book.png";
import bookBinding1 from "@/assets/images/bookbinding1.png";
import bookBinding2 from "@/assets/images/bookbinding2.png";
import bookBinding3 from "@/assets/images/bookbinding3.png";
import bookBinding4 from "@/assets/images/bookbinding4.png";
import bookBinding5 from "@/assets/images/bookbinding5.png";

import interiorColor1 from "@/assets/images/interior-color-1.jpeg";
import interiorColor2 from "@/assets/images/interior-color-2.jpeg";
import interiorColor3 from "@/assets/images/interior-color-3.jpeg";
import interiorColor4 from "@/assets/images/interior-color-4.jpeg";

import paper1 from "@/assets/images/image-21-1.png";
import paper2 from "@/assets/images/image-22-1.png";
import paper3 from "@/assets/images/image-24-1.png";
import paper4 from "@/assets/images/image-20-1.png";

import coverFinish1 from "@/assets/images/image-26-1.png";
import coverFinish2 from "@/assets/images/image-27-1.png";

import pricing from "@/assets/images/Group 1261153902.png";

import { FaArrowRight, FaDownload } from "react-icons/fa";
import Faq from "@/components/Faq";

const services = [
  {
    title: "Print Book",
    description:
      "Personalized book printing for memoirs, novels, cookbooks, workbooks, children's books, and much more is our specialty.",
    image: img1,
    btn: "Publish a Print Book",
  },
  {
    title: "Photo Book",
    description:
      "A photo book beautifully captures cherished memories through carefully curated images, allowing you to tell your story.",
    image: img2,
    btn: "Design Your Photo Book",
  },
  {
    title: "E-Book",
    description:
      "Using our user-friendly platform, you can design, prepare, and publish your eBook in a few simple steps, therefore enabling anybody.",
    image: img3,
    btn: "Design Your E-Book",
  },
  {
    title: "Wall Calendar",
    description:
      "With our easy-to-use platform, you can design, customize, and print your perfect wall calendar in just a few simple steps.",
    image: img4,
    btn: "Design Your Wall Calendar",
  },
  {
    title: "Comic Book",
    description:
      "Expert Comic Book Printing Can Help You Realize Your Story Regarding narrative, comic books and graphic novels offer a unique mix of words and graphics that captivate readers.",
    image: img5,
    btn: "Design Your Comic Book",
  },
  {
    title: "Magazine",
    description:
      "Whether your book is just one copy or a big order, our professional book printing services let you design your own book in any volume.",
    image: img6,
    btn: "Design Your Magazine",
  },
  {
    title: "Cookbook",
    description:
      "Are you ready to compile a cookbook of expert caliber from your best recipes? Whether you are writing a personal recipe book for your family, a self-published cookbook.",
    image: img7,
    btn: "Design Your CookBook",
  },
  {
    title: "Yearbook",
    description:
      "Creating a yearbook that captures the memories of an entire academic year is an interesting project; yet, the complexity of managing significant.",
    image: img8,
    btn: "Design Your YearBook",
  },
];

const interior = [
  {
    title: "Standard Black & White",
    description:
      "Standard black & white printing for novels, memoirs, and other text-heavy books.",
    image: interiorColor1,
  },
  {
    title: "Premium Black & White",
    description:
      "Heavy ink coverage great for books with black & white images, graphs, or other graphics.",
    image: interiorColor2,
  },
  {
    title: "Standard Color",
    description:
      "If your book is predominantly text but has a few color images, standard color is the right option for you.",
    image: interiorColor3,
  },
  {
    title: "Premium Color",
    description:
      "The best color printing on every page with rich colors and heavy ink coverage.",
    image: interiorColor4,
  },
];

const paper = [
  {
    title: "60# Cream Uncoated",
    description:
      "Traditional cream paper most frequently used for black & white novels and workbooks.",
    image: paper1,
  },
  {
    title: "60# White Uncoated",
    description:
      "Versatile and economical white paper commonly found in a wide range of books.",
    image: paper2,
  },
  {
    title: "80# White Uncoated",
    description:
      "Ultra-smooth, high opacity bright white paper used for photo books, magazines, and comic books.",
    image: paper3,
  },
  {
    title: "100# White Uncoated",
    description:
      "The heaviest available stock, used to create durable, vibrant calendars.",
    image: paper4,
  },
];

const coverFinish = [
  {
    title: "Glossy",
    description:
      "Stiff cover stock with a glossy coating finish. Glossy covers withstand wear and tear well while emphasizing the cover imagery.",
    image: coverFinish1,
  },
  {
    title: "Matte",
    description:
      "A matte finish gives your cover a more subdued, natural look. Used most often with novels and notebooks.",
    image: coverFinish2,
  },
];

const GuideTemplate = () => {
  return (
    <>
      {/* Banner */}
      <div className="relative bg-[#2C0319] border-purple-500 overflow-hidden">
        <Image
          src={maskgroup}
          alt="Mask Group"
          fill
          style={{ objectFit: "cover" }}
          priority
        />

        <motion.div
          className="relative px-6 py-12 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="flex-1 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-yellow-400">Create</span>
              <span className="text-white"> Your Book,</span>
              <br />
              <span className="text-white">Your Way</span>
            </h1>
            <p className="text-white text-sm md:text-base leading-relaxed">
              offers custom book printing services with over 3,000 possible
              sizes, paper types, and binding option combinations
            </p>
          </motion.div>

          <motion.div
            className="flex-1 flex items-center justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="relative">
              <Image
                src={bannerimg}
                alt="Guide and Template Illustration"
                className="h-auto max-w-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Features */}
      <div className="relative bg-white overflow-hidden border-t-4 border-blue-600">
        <Image
          src={ourBlogBGImg}
          alt="Gradient Background"
          fill
          className="object-cover opacity-100"
          priority
        />

        <div className="relative z-10 max-w-7xl sm:mx-16 mx-5 px-4 py-16 space-y-16">
          {/* Feature 1 */}
          <div className="my-10">
            <h2 className="text-4xl font-bold text-center flex flex-col gap-5 mb-10">
              Book Types You Can Make On <br />
              <span className="custom-text-gradient "> Fast Print Guys</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className="w-full md:w-[48%] lg:w-[23%] bg-white rounded-xl hover:bg-[#346AB3] group shadow-md hover:shadow-2xl hover:shadow-blue-900 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="m-2 h-48 relative">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg group-hover:text-white font-bold text-black mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 group-hover:text-white text-sm">
                      {service.description}
                    </p>
                    <button className="text-[#016AB3] mt-2 flex justify-center items-center gap-2 text-sm group-hover:text-white">
                      {service.btn}
                      <FaArrowRight className="text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature 2 */}
          <div className="my-20">
            <h2 className="text-4xl font-bold text-center mb-10">
              Book
              <span className="custom-text-gradient "> Bindings</span>
            </h2>
            <div className="m-10 flex sm:flex-row flex-col">
              <div className="sm:w-1/2 flex justify-center">
                <Image src={mainBook} height={400} width={400} alt="" />
              </div>
              <div className="sm:w-1/2 flex flex-col gap-3">
                <h3 className="text-[#016AB3] text-lg font-bold">
                  Paperback Perfect Bound
                </h3>
                <p className="text-sm">32-800 pages</p>
                <hr />
                <p className="text-sm">
                  The industry term for traditional paperback binding, perfect
                  bound is the most cost-efficient and popular way to bind
                  on-demand products. Suitable for most projects.
                </p>
                <div>
                  <strong>Binding Options:</strong>
                </div>
                <div className="flex flex-wrap gap-y-2">
                  {[
                    bookBinding1,
                    bookBinding2,
                    bookBinding3,
                    bookBinding4,
                    bookBinding5,
                  ].map((img, idx) => (
                    <div key={idx} className="w-1/2 sm:w-1/3 lg:w-1/4">
                      <Image
                        src={img}
                        className="rounded-xl"
                        alt={`Binding option ${idx + 1}`}
                        width={120}
                        height={120}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-center mb-10">
              Interior Color
              <span className="custom-text-gradient "> Options</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
              {interior.map((interior, idx) => (
                <div
                  key={idx}
                  className="w-full md:w-[48%] lg:w-[23%] bg-white rounded-xl hover:bg-[#346AB3] group shadow-md hover:shadow-2xl hover:shadow-blue-900 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="m-2 h-48 relative">
                    <Image
                      src={interior.image}
                      alt={interior.title}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg group-hover:text-white font-bold text-black mb-2">
                      {interior.title}
                    </h3>
                    <p className="text-gray-700 group-hover:text-white text-sm">
                      {interior.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-center mb-10">
              Paper
              <span className="custom-text-gradient "> Types</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
              {paper.map((paper, idx) => (
                <div
                  key={idx}
                  className="w-full md:w-[48%] lg:w-[23%] bg-white rounded-xl hover:bg-[#346AB3] group shadow-md hover:shadow-2xl hover:shadow-blue-900 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="m-2 h-48 relative">
                    <Image
                      src={paper.image}
                      alt={paper.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg group-hover:text-white font-bold text-black mb-2">
                      {paper.title}
                    </h3>
                    <p className="text-gray-700 group-hover:text-white text-sm">
                      {paper.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-center mb-10">
              Cover
              <span className="custom-text-gradient "> Finish</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
              {coverFinish.map((coverFinish, idx) => (
                <div
                  key={idx}
                  className="w-full md:w-[48%] lg:w-[23%] bg-white rounded-xl hover:bg-[#346AB3] group shadow-md hover:shadow-2xl hover:shadow-blue-900 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="m-2 h-48 relative">
                    <Image
                      src={coverFinish.image}
                      alt={coverFinish.title}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg group-hover:text-white font-bold text-black mb-2">
                      {coverFinish.title}
                    </h3>
                    <p className="text-gray-700 group-hover:text-white text-sm">
                      {coverFinish.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row items-center sm:gap-10">
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-80 h-80 sm:w-150 sm:h-90">
                <Image
                  src={pricing}
                  alt="Free New User Guide"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4">
                Book Pricing <br />
                <span className="custom-text-gradient"> Calculator</span>
              </h3>
              <p className="text-gray-700 mb-6 text-sm">
                Quality book printing at a reasonable price. Check pricing,
                format variations, retail pricing, and shipping for custom books
                or calendars.
              </p>
              <button className="custom-btn-gradient text-white  font-semibold py-2 px-4 rounded-full">
                Price Your Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuideTemplate;

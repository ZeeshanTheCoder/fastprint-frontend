"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import maskgroup from "@/assets/images/hire-mask-group.png";
import bannerimg from "@/assets/images/banner/plan-banner.png";
import ourBlogBGImg from "@/assets/images/our-blog-bg-img.png";

import img1 from "@/assets/images/32984.jpg";
import img2 from "@/assets/images/2151019886.jpg";
import img3 from "@/assets/images/190.jpg";

import Faq from "@/components/Faq";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const services = [
  {
    title: "Tailored Solutions",
    description:
      "Every project is unique. That is why our services can be customized according to your particular requirements, whether self or traditional publishing is your chosen path.",
    image: img1,
    btn: "Publish a Print Book",
  },
  {
    title: "Full Service Support",
    description:
      "Our team can guide and assist in every aspect of writing, printing and distribution for a book - making the entire experience hassle free and painless for our authors!",
    image: img2,
    btn: "Design Your Photo Book",
  },
  {
    title: "Quality Results",
    description:
      "With top-of-the-line printing technology and experienced designers on our side, your book is certain to look exactly the way it was imagined - no matter if it is hardcover, paperback digital or both formats!",
    image: img3,
    btn: "Design Your E-Book",
  },
];

const HireProfessional = () => {
  return (
    <>
      {/* Banner */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative bg-[#2C0319] border-purple-500 overflow-hidden"
      >
        <Image
          src={maskgroup}
          alt="Mask Group"
          fill
          style={{ objectFit: "cover" }}
          priority
        />

        <motion.div
          className="relative px-6 py-12 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto"
          variants={fadeInUp}
        >
          <motion.div
            className="flex-1 mb-8 md:mb-0"
            variants={slideInFromLeft}
          >
            <motion.h1 
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-yellow-400">Find A Professional</span>
              <span className="text-white">
                {" "}
                to Assist You in Completing your Book
              </span>
            </motion.h1>
            <motion.p 
              className="text-white text-sm md:text-base leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              offers custom book printing services with over 3,000 possible
              sizes, paper types, and binding option combinations
            </motion.p>
          </motion.div>

          <motion.div
            className="flex-1 flex items-center justify-end"
            variants={slideInFromRight}
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={bannerimg}
                alt="Guide and Template Illustration"
                className="h-auto max-w-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Features */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        className="relative bg-white overflow-hidden border-t-4 border-blue-600"
      >
        <Image
          src={ourBlogBGImg}
          alt="Gradient Background"
          fill
          className="object-cover opacity-100"
          priority
        />

        <div className="relative z-10 ">
          <motion.div 
            className="max-w-7xl mx-5 sm:mx-16 px-4 py-16 space-y-16"
            variants={staggerContainer}
          >
            <motion.div 
              className="mb-20"
              variants={fadeInUp}
            >
              <motion.h2 
                className="sm:text-4xl text-2xl font-bold text-center mb-7"
                variants={fadeInUp}
              >
                <span className="custom-text-gradient">
                  Welcome to FastPrintGuys
                </span>{" "}
                <br />
                Your go-to place for printing books, designing publications
                and writing books!
              </motion.h2>

              <motion.p 
                className="text-center mb-7 sm:mx-16"
                variants={fadeInUp}
              >
                FastPrintGuys will assist in every stage of writing or
                publishing a novel or an existing author who wants to bring
                their book idea to fruition, from initial concepts all the way
                through publication and beyond. <br />
                Our experts offer printing for book designs, layout, writing
                services and publishing societies that guarantee rapid
                professional results that meet with visionary author-creators'
                visions of how their books should look like! We take great
                pride in giving results that adhere to vision-creators' goals!
              </motion.p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={fadeInUp}
            >
              <motion.h2 
                className="text-4xl font-bold text-center mb-7"
                variants={fadeInUp}
              >
                Why choose{" "}
                <span className="custom-text-gradient"> FastPrintGuys?</span>
              </motion.h2>
              <motion.p 
                className="text-center sm:mx-52 mb-7"
                variants={fadeInUp}
              >
                Expert Team Our team at FastPrintGuys comprises experienced
                publishing individuals. Their aim is to assist our clients
                every step of the way with their expertise in publishing.
              </motion.p>

              <motion.div 
                className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto"
                variants={staggerContainer}
              >
                {services.map((service, idx) => (
                  <motion.div
                    key={idx}
                    className="w-full md:w-[48%] lg:w-[30%] bg-white rounded-xl hover:bg-[#346AB3] group shadow-md hover:shadow-2xl hover:shadow-blue-900 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    variants={fadeInUp}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="m-2 h-48 relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover rounded-xl"
                      />
                    </motion.div>
                    <div className="p-5">
                      <h3 className="text-lg group-hover:text-white font-bold text-center text-black mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-700 group-hover:text-white text-center text-sm">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Process */}
          <motion.div 
            className="min-h-screen sm:mx-20 flex items-center justify-center p-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left Section */}
              <motion.div 
                className="space-y-6"
                variants={slideInFromLeft}
              >
                <motion.h2 
                  className="text-2xl md:text-3xl font-bold"
                  variants={fadeInUp}
                >
                  <span className="custom-text-gradient">
                    FastPrintGuys Process
                  </span>{" "}
                  : How to Transform Ideas Into Books
                </motion.h2>
                <motion.p 
                  className="font-semibold"
                  variants={fadeInUp}
                >
                  We make it simple and stress-free for you to acquire your
                  publication with us! Here's what to expect:
                </motion.p>
                <motion.p 
                  className="text-gray-700"
                  variants={fadeInUp}
                >
                  Consulting and planning services provided for projects. At
                  first, we want to get acquainted with you and your project.
                  Provide us with details regarding any specific needs or
                  specifications you might have and let's collaborate to
                  develop plans tailored just to you during a free meeting.
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                >
                  <h3 className="font-bold text-lg">Writing and Editing</h3>
                  <p className="text-gray-700">
                    Our skilled editors and writers collaborate closely with
                    you to produce, revise and edit your piece according to
                    industry-requirements for tone and caliber of writing. We
                    ensure the tone and caliber meet industry requirements for
                    publication.
                  </p>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                >
                  <h3 className="font-bold text-lg">Layout and Design</h3>
                  <p className="text-gray-700">
                    Once our book's manuscript has been finished, the design
                    team at our company begins focusing on designing both its
                    cover and interior to reflect both how its author intended
                    for it to function, as well as any special considerations
                    regarding function or layout that need be taken into
                    account.
                  </p>
                </motion.div>
              </motion.div>

              {/* Right Form Section */}
              <motion.div 
                className="bg-white shadow-lg rounded-xl p-6 space-y-4"
                variants={slideInFromRight}
              >
                <motion.input
                  type="text"
                  placeholder="Name"
                  className="w-full placeholder-[#868E96] bg-[#F7F8F9] border rounded-md p-3 border-[#dadbdd]"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full placeholder-[#868E96] bg-[#F7F8F9] border rounded-md p-3 border-[#dadbdd]"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.input
                  type="email"
                  placeholder="Email Address"
                  className="w-full placeholder-[#868E96] bg-[#F7F8F9] border rounded-md p-3 border-[#dadbdd]"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.select 
                  className="w-full text-[#868E96] bg-[#F7F8F9] border rounded-md p-3 border-[#dadbdd]"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <option>Do You Have a manuscript ready?</option>
                  <option>Yes</option>
                  <option>No</option>
                </motion.select>
                <motion.select 
                  className="w-full text-[#868E96] bg-[#F7F8F9] border rounded-md p-3 border-[#dadbdd]"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <option>Have you published before?</option>
                  <option>Yes</option>
                  <option>No</option>
                </motion.select>
                <motion.select 
                  className="w-full text-[#868E96] bg-[#F7F8F9] border rounded-md p-3 border-[#dadbdd]"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <option>
                    What type of book do you plan on publishing?
                  </option>
                  <option>Fiction</option>
                  <option>Non-fiction</option>
                  <option>Children's Book</option>
                  <option>Other</option>
                </motion.select>

                {/* Checkboxes */}
                <motion.div 
                  className="grid grid-cols-2 gap-2 text-gray-700"
                  variants={staggerContainer}
                >
                  <motion.label 
                    className="flex items-center space-x-2"
                    variants={fadeInUp}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input type="checkbox" /> <span>Self Publishing</span>
                  </motion.label>
                  <motion.label 
                    className="flex items-center space-x-2"
                    variants={fadeInUp}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input type="checkbox" /> <span>Illustration</span>
                  </motion.label>
                  <motion.label 
                    className="flex items-center space-x-2"
                    variants={fadeInUp}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input type="checkbox" /> <span>Formatting</span>
                  </motion.label>
                  <motion.label 
                    className="flex items-center space-x-2"
                    variants={fadeInUp}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input type="checkbox" /> <span>Cover Design</span>
                  </motion.label>
                  <motion.label 
                    className="flex items-center space-x-2"
                    variants={fadeInUp}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input type="checkbox" /> <span>Editing</span>
                  </motion.label>
                  <motion.label 
                    className="flex items-center space-x-2"
                    variants={fadeInUp}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input type="checkbox" /> <span>Book Marketing</span>
                  </motion.label>
                </motion.div>

                <motion.button 
                  className="p-5 custom-btn-gradient text-white py-3 rounded-md hover:bg-blue-700 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit Now
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Feature 3 */}

          <Faq />
        </div>
      </motion.div>
    </>
  );
};

export default HireProfessional;
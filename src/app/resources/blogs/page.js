"use client"; // For Next.js app directory or client-side rendering

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import blogbanner from "@/assets/images/banner/blogbanner.png";
import maskgroup from "@/assets/images/blog-mask-group.png";
import ourBlogBGImg from "@/assets/images/our-blog-bg-img.png";
import img1 from "@/assets/images/blog-card-1.jpg";
import img2 from "@/assets/images/blog-card-2.jpg";
import img3 from "@/assets/images/blog-card-3.jpg";
import readMoreArrow from "@/assets/images/read-more-arrow.png";

// Blog data
const blogs = [
  {
    id: 1,
    title: "Benefits of Book Writing Services",
    excerpt:
      "Inner Blogs Advantages of Book Writing Services Many who aspire to writing their book find it an unachievable goal in today's fast-paced society, particularly given the high workload associated with book production and publishing. Writing can be intimidating no matter",
    image: img1,
    slug: "benefits-of-book-writing-services",
    content: "Full blog content would go here...",
    date: "June 15, 2024",
    author: "Admin",
  },
  {
    id: 2,
    title: "Benefits of Book Publishing Services",
    excerpt:
      "Inner Blogs The Advantages of Book Publishing Services: Why Authors Need Professional Assistance Publishing a book can be an arduous journey, from initial concept to its arrival at an online retailer and beyond. One way to streamline this process is",
    image: img2,
    slug: "benefits-of-book-publishing-services",
    content: "Full blog content would go here...",
    date: "June 10, 2024",
    author: "Admin",
  },
  {
    id: 3,
    title: "Benefits of EDDM and DMM Services",
    excerpt:
      "Inner Blogs In today's digital era, many businesses have transitioned their marketing activities online. Our guide to EDDM and DMM services: How to Maximize Direct Mail Marketing is here to provide guidance in using direct mail marketing to its fullest",
    image: img3,
    slug: "benefits-of-eddm-and-dmm-services",
    content: "Full blog content would go here...",
    date: "June 5, 2024",
    author: "Admin",
  },
];

const BlogPage = () => {
  return (
    <>
      {/* Banner */}
      <div className="relative bg-[#101D2E] border-purple-500 overflow-hidden">
        <Image
          src={maskgroup}
          alt="Blog banner background"
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
              <span className="text-yellow-400">Our</span>
              <span className="text-white ml-2">Blogs</span>
            </h1>
            <p className="text-white text-sm md:text-base leading-relaxed">
              Welcome to the Fast Print Guys blog, where we share expert tips,
              design inspiration, and industry insights to help you create the
              perfect book cover. Stay updated with the latest trends and get
              valuable advice on making your book stand out!
            </p>
          </motion.div>

          <motion.div
            className="flex-1 flex items-center justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="relative">
              <img
                src="https://fastprintguys.com/wp-content/uploads/2025/06/Group-1261153892-1.png"
                alt="Blog illustration"
                className="h-auto max-w-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Our Latest Blogs */}
      <div className="relative bg-cover bg-center bg-no-repeat border-t-4 border-blue-600 overflow-hidden">
        <Image
          src={ourBlogBGImg}
          className="opacity-10"
          alt="Blog section background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-black opacity-10"></div>

        <div className="relative px-6 py-8 md:p-12 max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Latest
            <span className="text-[#0096CD]"> Blogs</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
              >
                <Link href={`/resources/blogs/${blog.slug}`} passHref>
                  <div className="block group cursor-pointer">
                    <div className="relative h-48 rounded-xl m-3 overflow-hidden">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </div>
                  </div>
                </Link>

                <div className="p-5">
                  <Link href={`/resources/blogs/${blog.slug}`} passHref>
                    <div className="block group cursor-pointer">
                      <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 hover:text-blue-600">
                        {blog.title}
                      </h3>
                    </div>
                  </Link>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-5">
                    {blog.excerpt}
                  </p>

                  <Link href={`/resources/blogs/${blog.slug}`} passHref>
                    <div className="text-blue-600 font-medium text-sm flex gap-2 items-center cursor-pointer hover:text-blue-800">
                      Read More
                      <span className="inline-block bottom-0">
                        <Image src={readMoreArrow} alt="Read More" />
                      </span>
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;

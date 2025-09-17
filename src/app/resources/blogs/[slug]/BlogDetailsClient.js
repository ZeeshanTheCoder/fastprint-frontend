import React from "react";
import Image from "next/image";
import Link from "next/link";

import blogbanner from "@/assets/images/banner/blogbanner.png";
import maskgroup from "@/assets/images/blog-mask-group.png";
import ourBlogBGImg from "@/assets/images/our-blog-bg-img.png";
import readMoreArrow from "@/assets/images/read-more-arrow.png";
import img1 from "@/assets/images/blog-card-1.jpg";
import img2 from "@/assets/images/blog-card-2.jpg";
import img3 from "@/assets/images/blog-card-3.jpg";

// Sample blog data (in a real app, this would come from an API or CMS)
const blogs = [
  // ... (blogs data remains the same)
];

// Generate static params for pre-rendering
export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// Add metadata for the page
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = blogs.find((blog) => blog.slug === slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post was not found.",
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
  };
}

export default async function BlogDetails({ params }) {
  // Await the params to fix the error
  const { slug } = await params;

  // Find the blog post with the matching slug
  const blog = blogs.find((blog) => blog.slug === slug);

  // If blog post not found
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Blog Post Not Found</h1>
          <Link
            href="/resources/blogs"
            className="text-blue-600 hover:underline mt-4 inline-block"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

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

        <div className="relative px-6 py-12 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
          <div className="flex-1 mb-8 md:mb-0">
            <Link href="/resources/blogs" passHref>
              <span className="text-white hover:text-yellow-400 cursor-pointer mb-4 inline-block transition-transform hover:-translate-x-1">
                &larr; Back to Blogs
              </span>
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              {blog.title}
            </h1>
            <div className="flex items-center text-white text-sm md:text-base">
              <span>{blog.date}</span>
              <span className="mx-2">•</span>
              <span>By {blog.author}</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-end">
            <div className="relative">
              <img
                src="https://fastprintguys.com/wp-content/uploads/2025/06/Group-1261153892-1.png"
                alt="Blog illustration"
                className="w-7xl h-auto max-w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
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

        <div className="relative px-6 py-8 md:p-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8 transition-all duration-300 hover:shadow-lg">
            <div className="relative h-64 md:h-96 rounded-xl mb-6 overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link href="/resources/blogs" passHref>
                <div className="text-blue-600 font-medium text-sm gap-2 items-center cursor-pointer hover:text-blue-800 inline-flex transition-transform hover:-translate-x-1">
                  <span className="transform rotate-180 animate-pulse">
                    <Image
                      src={readMoreArrow}
                      alt="Back to Blogs"
                      width={16}
                      height={16}
                    />
                  </span>
                  Back to Blogs
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
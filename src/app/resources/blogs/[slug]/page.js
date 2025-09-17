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
  {
    id: 1,
    title: "Benefits of Book Writing Services",
    excerpt:
      "Inner Blogs Advantages of Book Writing Services Many who aspire to writing their book find it an unachievable goal in today's fast-paced society, particularly given the high workload associated with book production and publishing. Writing can be intimidating no matter",
    image: img1,
    slug: "benefits-of-book-writing-services",
    content: `
       <header>
    <h1>Benefits of Book Writing Services: Turning Your Book Dream into Reality</h1>
  </header>

  <article>
    <section>
      <p>In today’s content-driven world, writing a book is one of the most powerful ways to establish credibility, share your expertise, and build your personal or professional brand. However, the process of writing a book can be overwhelming—especially if you lack the time, experience, or technical writing skills. That’s where <strong>book writing services</strong> come in. These professional services are designed to help aspiring authors bring their stories or ideas to life with expert support and precision.</p>
      <p>Below, we’ll explore the top <strong>benefits of book writing services</strong> and why hiring a professional writer or ghostwriter may be the smartest decision you make on your publishing journey.</p>
    </section>

    <section>
      <h2>1. Expert Guidance from Professional Book Writers</h2>
      <p>One of the biggest advantages of using <strong>professional book writing help</strong> is gaining access to seasoned writers who understand storytelling, structure, and market expectations. Whether you're writing a business book, a memoir, or a novel, <strong>expert book writers</strong> can guide you through:</p>
      <ul>
        <li>Structuring your book logically</li>
        <li>Developing compelling characters or case studies</li>
        <li>Crafting an engaging and authentic narrative voice</li>
        <li>Ensuring your message resonates with your target audience</li>
      </ul>
      <p>Working with a professional ensures that your book meets industry standards while remaining true to your unique voice.</p>
    </section>

    <section>
      <h2>2. Saves Time and Reduces Stress</h2>
      <p>Writing a book is time-consuming. It can take months—or even years—for an author to complete a manuscript on their own. <strong>Book writing services</strong> provide <strong>time-saving writing solutions</strong> by managing the workload for you. This allows you to focus on your career, business, or personal life while still achieving your goal of becoming a published author.</p>
      <p>For busy professionals, entrepreneurs, or thought leaders, the ability to <strong>hire a book writer</strong> means finally getting that book written without compromising quality or time.</p>
    </section>

    <section>
      <h2>3. High-Quality, Market-Ready Manuscripts</h2>
      <p><strong>Professional book writing services</strong> often include more than just writing. Many offer comprehensive packages that include <strong>editing, proofreading, formatting, and even publishing assistance</strong>. This ensures that your manuscript is not only polished and error-free but also ready for submission to publishers or self-publishing platforms.</p>
      <p>These services can also help with:</p>
      <ul>
        <li>Cover design and layout</li>
        <li>ISBN registration</li>
        <li>Distribution strategies</li>
        <li>Ebook and print formatting</li>
      </ul>
      <p>Such <strong>writing and publishing support</strong> significantly increases your chances of success in a competitive book market.</p>
    </section>

    <section>
      <h2>4. Custom-Tailored Ghostwriting Services</h2>
      <p>If you have a powerful story but lack the time or skill to write it yourself, <strong>ghostwriting services</strong> can be a perfect solution. Ghostwriters work closely with you to capture your ideas, tone, and goals—writing the book on your behalf while maintaining your authorship.</p>
      <p>This is especially useful for:</p>
      <ul>
        <li>Public figures or CEOs looking to publish thought leadership books</li>
        <li>Entrepreneurs who want to share business strategies or success stories</li>
        <li>Individuals with life experiences worth documenting in memoirs</li>
      </ul>
      <p>With professional ghostwriting, you get a high-quality book that sounds like <em>you</em> wrote it—without spending months in front of a blank page.</p>
    </section>

    <section>
      <h2>5. Increased Publishing and Marketing Success</h2>
      <p>Some <strong>book writing services</strong> go beyond the manuscript and offer <strong>marketing consultation, author branding, and book launch strategies</strong>. This kind of all-in-one service can drastically improve your book’s visibility and sales.</p>
      <p>From creating compelling book descriptions to crafting media pitches and building social proof, these services help authors build momentum before and after publication.</p>
    </section>

    <section>
      <h2>6. Confidentiality and Ownership</h2>
      <p>A reputable <strong>book writing service</strong> ensures <strong>full confidentiality</strong> and typically includes legal agreements that confirm you retain all rights to the finished work. Whether you're using a ghostwriter or a co-author, your name appears as the author, and you control the content's use and distribution.</p>
    </section>

    <section>
      <h2>Conclusion: Is a Book Writing Service Right for You?</h2>
      <p>If you've ever said, "I want to write a book, but I don’t know where to start," or "I just don’t have the time to finish this manuscript," a <strong>professional book writing service</strong> might be the perfect fit. From idea development to final publication, these services offer <strong>end-to-end support</strong> that transforms your vision into a published book—faster, smoother, and with higher quality.</p>
      <p>So whether you're looking to share your knowledge, tell your story, or grow your authority, consider hiring a professional to help you get there. The <strong>benefits of book writing services</strong> go far beyond convenience—they provide the expertise, support, and confidence you need to become a published author.</p>
    </section>
  </article>
    `,
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
    content: `
      <header>
    <h1>Benefits of Book Publishing Services: From Manuscript to Market Success</h1>
  </header>

  <article>
    <section>
      <p>Publishing a book is an exciting yet challenging milestone for any author. Whether you’ve written a novel, a memoir, or a non-fiction guide, navigating the publishing process can feel overwhelming. That’s where <strong>book publishing services</strong> come in. These professional services provide the expertise and support needed to bring your book to life and get it in front of the right audience.</p>
      <p>In this article, we’ll explore the key <strong>benefits of book publishing services</strong> and how they can help you maximize your book’s success in an increasingly competitive market.</p>
    </section>

    <section>
      <h2>1. Professional Editing and Formatting</h2>
      <p>One of the foundational steps in the publishing process is ensuring your manuscript is polished and professionally presented. <strong>Book publishing services</strong> typically include <strong>editing and formatting services</strong> to ensure your content meets industry standards.</p>
      <ul>
        <li>Developmental and copy editing for clarity, tone, and grammar</li>
        <li>Formatting for both print and digital platforms</li>
        <li>Consistency in font, layout, and chapter structure</li>
      </ul>
      <p>These services help your book look and read like a professionally published work—something that matters to readers, reviewers, and distributors alike.</p>
    </section>

    <section>
      <h2>2. Cover Design and Interior Layout</h2>
      <p>First impressions matter. A high-quality cover and well-structured interior can significantly impact your book’s appeal. <strong>Publishing services</strong> offer access to professional designers who specialize in book design, ensuring your cover grabs attention and aligns with your genre.</p>
      <p>Interior layout services ensure that the reading experience is smooth and visually pleasing, whether your book is consumed in print or digitally.</p>
    </section>

    <section>
      <h2>3. ISBN Registration and Copyright Assistance</h2>
      <p><strong>Self-publishing assistance</strong> through professional services often includes administrative tasks such as ISBN registration, barcode creation, and copyright support. These are essential for protecting your work and enabling it to be sold through major retailers and distributors.</p>
      <p>Without proper registration, your book may not be listed on platforms like Amazon, Barnes & Noble, or IngramSpark.</p>
    </section>

    <section>
      <h2>4. Distribution to Major Platforms</h2>
      <p>Getting your book into readers’ hands requires more than just publishing it—it needs to be accessible. <strong>Book publishing services</strong> handle distribution to major retailers and digital marketplaces including:</p>
      <ul>
        <li>Amazon (Kindle and paperback)</li>
        <li>Barnes & Noble</li>
        <li>Apple Books</li>
        <li>Google Play Books</li>
        <li>Kobo and more</li>
      </ul>
      <p>This wide-reaching distribution network increases your book’s visibility and accessibility to a global audience.</p>
    </section>

    <section>
      <h2>5. Book Marketing and Promotional Support</h2>
      <p>Writing and publishing your book is just the beginning. To truly succeed, authors need to promote their work effectively. Many <strong>book publishing services</strong> include <strong>book marketing and promotional support</strong>, such as:</p>
      <ul>
        <li>Press releases and media outreach</li>
        <li>Author website creation</li>
        <li>Email marketing and social media campaigns</li>
        <li>Book launch strategies and blog tours</li>
      </ul>
      <p>These services help generate buzz and boost sales, especially during the crucial launch window.</p>
    </section>

    <section>
      <h2>6. Strategic Publishing Guidance</h2>
      <p>Every author’s journey is different. Whether you’re pursuing traditional publishing, hybrid publishing, or going fully independent, a professional team can help you choose the best path forward. With a clear <strong>publishing strategy for authors</strong>, your book is more likely to achieve both creative and commercial success.</p>
      <p>Publishing professionals can also guide you through pricing, metadata, and audience targeting to optimize your reach.</p>
    </section>

    <section>
      <h2>7. Time and Cost Efficiency</h2>
      <p>While it might seem more affordable to handle publishing on your own, many first-time authors underestimate the time, tools, and expertise required. <strong>Publishing services</strong> bundle everything into a streamlined package, saving you time, stress, and often money in the long run.</p>
      <p>This approach helps avoid common mistakes that can delay your launch or hurt your book’s quality and reputation.</p>
    </section>

    <section>
      <h2>Conclusion: Why Book Publishing Services Matter</h2>
      <p>The path from manuscript to marketplace doesn’t have to be complicated. By investing in <strong>book publishing services</strong>, you gain access to a team of professionals who handle every step—from editing and formatting to marketing and distribution. This not only increases your book’s quality but also enhances its chances for success.</p>
      <p>Whether you're a first-time author or a seasoned writer, the <strong>benefits of book publishing services</strong> can make the difference between a book that simply exists and one that truly thrives.</p>
    </section>
  </article>
  `,
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
    content: `
      <header>
    <h1>Benefits of EDDM and DMM Services: Cost-Effective Mail Marketing for Businesses</h1>
  </header>

  <article>
    <section>
      <p>In today’s digital age, businesses often overlook the power of print marketing. However, <strong>Every Door Direct Mail (EDDM)</strong> and <strong>Direct Mail Marketing (DMM)</strong> continue to deliver strong results for local and national campaigns. These services provide a reliable way to connect with potential customers right at their doorstep. Whether you're promoting a grand opening, seasonal sale, or ongoing service, understanding the <strong>benefits of EDDM and DMM services</strong> can help you make smarter marketing decisions.</p>
    </section>

    <section>
      <h2>1. Wide Reach with Local Targeting</h2>
      <p><strong>EDDM services</strong>, offered through USPS, allow businesses to target specific ZIP codes or neighborhoods without needing a mailing list. This makes it easy to blanket entire communities with your marketing message.</p>
      <p><strong>Direct Mail Marketing</strong> (DMM), on the other hand, can use detailed customer data to deliver highly targeted mailers. Whether you're targeting new homeowners, specific income brackets, or past customers, DMM offers precision.</p>
    </section>

    <section>
      <h2>2. Cost-Effective Advertising</h2>
      <p>Compared to other advertising methods, EDDM and DMM offer a strong return on investment. With USPS EDDM, you can send postcards or flyers at discounted rates since no individual addresses are required. DMM campaigns may involve list purchases but can be more targeted, increasing conversion potential.</p>
      <p>This affordability makes these <strong>print marketing services</strong> ideal for small businesses, franchises, and service providers looking to reach customers without overspending on digital ads or media buys.</p>
    </section>

    <section>
      <h2>3. Tangible, High-Impact Format</h2>
      <p>Unlike digital ads that can be ignored or blocked, mail pieces are physical, making them harder to miss. A well-designed postcard or brochure can capture attention and stay in a home or office longer than an email or online banner ad.</p>
      <p>This tangible presence reinforces your brand and provides a memorable touchpoint for potential customers.</p>
    </section>

    <section>
      <h2>4. Easy Campaign Setup</h2>
      <p><strong>EDDM campaigns</strong> are simple to set up, even for first-time marketers. You can choose your mailing routes online, set your drop date, and deliver your printed materials to a local USPS facility for distribution. There’s no need to buy or manage mailing lists.</p>
      <p>For <strong>DMM services</strong>, professional mailing houses can handle everything—from list management and printing to postage and delivery tracking. This turnkey approach saves time and minimizes hassle.</p>
    </section>

    <section>
      <h2>5. High Personalization and Customization</h2>
      <p>One of the greatest <strong>direct mail marketing advantages</strong> is the ability to personalize each piece. With DMM, you can include customer names, purchase history, or even custom offers tailored to each recipient.</p>
      <p>Even EDDM allows for customization at the neighborhood or demographic level, helping you match the message to the community you’re targeting.</p>
    </section>

    <section>
      <h2>6. Trackable and Measurable Results</h2>
      <p>Modern direct mail campaigns can be integrated with digital tools to track performance. Adding QR codes, personalized URLs (PURLs), or call tracking numbers to your mailers helps you monitor engagement and calculate ROI.</p>
      <p>This data allows businesses to refine future mailings and improve their overall <strong>mail campaigns for businesses</strong>.</p>
    </section>

    <section>
      <h2>7. Complements Digital Marketing Strategies</h2>
      <p>Far from being outdated, direct mail enhances digital efforts. In fact, studies show that multichannel campaigns combining direct mail with email, social media, or PPC ads result in better response rates and customer engagement.</p>
      <p><strong>EDDM and DMM services</strong> give you an edge by covering both physical and digital touchpoints, boosting overall brand awareness.</p>
    </section>

    <section>
      <h2>Conclusion: Why Use EDDM and DMM for Your Business</h2>
      <p>If you're looking to grow your business, drive foot traffic, or improve brand recognition, <strong>Every Door Direct Mail</strong> and <strong>Direct Mail Marketing</strong> are proven, powerful tools. They offer affordability, reliability, and unmatched local reach—especially when used strategically.</p>
      <p>By leveraging the <strong>benefits of EDDM and DMM services</strong>, businesses can create meaningful, measurable marketing that drives real results—delivered directly to customers’ doors.</p>
    </section>
  </article>
    `,
    date: "June 5, 2024",
    author: "Admin",
  },
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
              <span className="text-white hover:text-yellow-400 cursor-pointer mb-4 inline-block">
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
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
            <div className="relative h-64 md:h-96 rounded-xl mb-6 overflow-hidden">
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
                <div className="text-blue-600 font-medium text-sm gap-2 items-center cursor-pointer hover:text-blue-800 inline-flex">
                  <span className="transform rotate-180">
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

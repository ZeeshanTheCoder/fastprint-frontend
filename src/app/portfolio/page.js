'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import portfolioImg from '@/assets/images/img75.png';
import Image from 'next/image';

const Portfolio = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'books', name: 'Books & Covers' },
    { id: 'banners', name: 'Banners & Signs' },
    { id: 'flyers', name: 'Flyers & Marketing' },
    { id: 'business', name: 'Business Materials' },
    { id: 'packaging', name: 'Packaging & Labels' },
  ];

  const portfolioItems = [
    {
      id: 1,
      category: 'books',
      title: 'Novel Book Cover Design',
      description: 'Custom book cover with premium matte finish',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center',
      size: '6x9 inches',
      material: 'Premium Matte Cover',
    },
    {
      id: 2,
      category: 'books',
      title: 'Academic Textbook',
      description: 'Perfect bound textbook with glossy cover',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop&crop=center',
      size: '8.5x11 inches',
      material: 'Perfect Binding',
    },
    {
      id: 3,
      category: 'books',
      title: "Children's Book",
      description: 'Colorful children\'s book with saddle stitching',
      image: 'https://i.pinimg.com/originals/62/0b/33/620b3334c1eed3de8b751a812506360e.jpg',
      size: '8x10 inches',
      material: 'Saddle Stitched',
    },
    {
      id: 4,
      category: 'books',
      title: 'Business Manual',
      description: 'Professional training manual with spiral binding',
      image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=300&fit=crop&crop=center',
      size: '8.5x11 inches',
      material: 'Spiral Bound',
    },
    {
      id: 5,
      category: 'books',
      title: 'Photography Portfolio Book',
      description: 'High-quality photo book with premium paper',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop&crop=center',
      size: '10x8 inches',
      material: 'Premium Photo Paper',
    },
    {
      id: 6,
      category: 'books',
      title: 'Magazine Design',
      description: 'Full-color magazine with perfect binding',
      image: 'https://i.pinimg.com/originals/38/b7/0d/38b70d083e110038939c9b84c7e43e6a.jpg',
      size: '8.5x11 inches',
      material: 'Perfect Bound Magazine',
    },
    {
      id: 7,
      category: 'banners',
      title: 'Grand Opening Banner',
      description: 'Large vinyl banner for restaurant grand opening',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center',
      size: '10x4 feet',
      material: 'Vinyl Banner',
    },
    {
      id: 8,
      category: 'banners',
      title: 'Trade Show Display',
      description: 'Retractable banner stand for exhibitions',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop&crop=center',
      size: '33x78 inches',
      material: 'Fabric Banner',
    },
    {
      id: 9,
      category: 'banners',
      title: 'Event Backdrop',
      description: 'Large format backdrop for corporate events',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center',
      size: '8x8 feet',
      material: 'Fabric Backdrop',
    },
    {
      id: 10,
      category: 'banners',
      title: 'Outdoor Signage',
      description: 'Weather-resistant outdoor business sign',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop&crop=center',
      size: '4x8 feet',
      material: 'Aluminum Composite',
    },
    {
      id: 11,
      category: 'flyers',
      title: 'Event Promotion Flyer',
      description: 'Colorful promotional flyers for music festival',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&crop=center',
      size: '8.5x11 inches',
      material: 'Glossy Paper',
    },
    {
      id: 12,
      category: 'flyers',
      title: 'Real Estate Flyer',
      description: 'Professional real estate marketing flyers',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center',
      size: '8.5x11 inches',
      material: 'Premium Paper',
    },
    {
      id: 13,
      category: 'flyers',
      title: 'Restaurant Menu',
      description: 'Full-color restaurant menu with lamination',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&crop=center',
      size: '8.5x14 inches',
      material: 'Laminated Paper',
    },
    {
      id: 14,
      category: 'flyers',
      title: 'Product Catalog',
      description: 'Multi-page product showcase catalog',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop&crop=center',
      size: '8.5x11 inches',
      material: 'Saddle Stitched',
    },
    {
      id: 15,
      category: 'flyers',
      title: 'Direct Mail Postcard',
      description: 'Eye-catching postcards for direct marketing',
      image: 'https://4over.com/media/catalog/product/cache/427dcc6f1c72ba2bca8eaa23d0254ccc/d/i/direct-mail-postcards.jpg',
      size: '6x4 inches',
      material: 'Cardstock',
    },
    {
      id: 16,
      category: 'business',
      title: 'Corporate Business Cards',
      description: 'Premium business cards with embossed logo',
      image: 'https://i.etsystatic.com/27562580/r/il/c5af55/3106328992/il_fullxfull.3106328992_7npd.jpg',
      size: '3.5x2 inches',
      material: 'Premium Cardstock',
    },
    {
      id: 17,
      category: 'business',
      title: 'Company Brochures',
      description: 'Tri-fold brochures with company information',
      image: 'https://designshack.net/wp-content/uploads/tips-ideas-tri-fold-brochure-design-368x245.jpg',
      size: '8.5x11 inches',
      material: 'Matte Finish',
    },
    {
      id: 18,
      category: 'business',
      title: 'Presentation Folders',
      description: 'Professional folders with business card slots',
      image: 'https://www.creativefabrica.com/wp-content/uploads/2023/05/30/eyecatching-presentation-folder-design-Graphics-70905966-1.jpg',
      size: '9x12 inches',
      material: 'Heavy Cardstock',
    },
    {
      id: 19,
      category: 'packaging',
      title: 'Product Packaging Boxes',
      description: 'Custom retail packaging with brand colors',
      image: 'https://i.pinimg.com/originals/d8/4b/25/d84b25af5945788a9603fb74648681ec.png',
      size: 'Custom Dimensions',
      material: 'Corrugated Cardboard',
    },
    {
      id: 20,
      category: 'packaging',
      title: 'Custom Stickers',
      description: 'Die-cut vinyl stickers with UV coating',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center',
      size: '2x2 inches',
      material: 'Vinyl with UV Coating',
    },
  ];

  const filteredItems = selectedCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: "Johnson's Restaurant",
      text: 'Fast Print Guys delivered our grand opening banners on time and exceeded our expectations. The quality was outstanding!',
    },
    {
      name: 'Mike Chen',
      company: 'TechStart Inc.',
      text: 'Professional business cards and brochures that perfectly represent our brand. Quick turnaround and excellent service.',
    },
    {
      name: 'Lisa Rodriguez',
      company: 'Event Masters',
      text: 'We trust Fast Print Guys for all our event materials. Consistent quality and reliable delivery every time.',
    },
  ];

  return (
    <div className="portfolio-container">

      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 text-white space-y-8">
            <div className="scroll-animate slide-in-left">
              <span className="inline-block px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium mb-4">
                Our Creative Work
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Explore the Portfolio of{' '}
                <span>Fast Print Guys</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                Discover our wide range of successful projects and creative printed materials. Each project showcases our commitment to quality and innovation.
              </p>
            </div>

            <div className="scroll-animate slide-in-left stagger-2 flex flex-wrap gap-4">
              <button
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-300 hover-lift pulse-hover"
                onClick={() => router.push('/services')}
              >
                Explore Services
              </button>
            </div>
          </div>

          <div className="flex-1 scroll-animate slide-in-right">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur opacity-30 float"></div>
              <Image
                src={portfolioImg}
                alt="Fast Print Guys Portfolio"
                className="relative w-full max-w-lg h-auto object-cover rounded-2xl shadow-2xl hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="w-full py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-6 animate-bounceIn leading-tight">
              <span className="text-gray-900">Our </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                Work Gallery
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Explore our diverse range of printing projects and see the quality that sets us apart
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map((item, index) => {
              const gradients = [
                'from-blue-500 to-blue-600',
                'from-purple-500 to-purple-600',
                'from-orange-500 to-orange-600',
                'from-teal-500 to-teal-600',
              ];
              const bgGradients = [
                'from-blue-50 to-blue-100',
                'from-purple-50 to-purple-100',
                'from-orange-50 to-orange-100',
                'from-teal-50 to-teal-100',
              ];
              const icons = ['📦', '🚀', '🖨️', '✉️'];

              const gradient = gradients[index % gradients.length];
              const bgGradient = bgGradients[index % bgGradients.length];
              const icon = icons[index % icons.length];

              return (
                <div
                  key={item.id}
                  className={`group relative bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200/50 transition-all duration-700 hover:shadow-2xl cursor-pointer flex flex-col hover:-translate-y-3 animate-rotateIn stagger-${index + 1} backdrop-blur-sm`}
                  style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
                  onClick={() => setSelectedImage(item)}
                >
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${bgGradient} rounded-full opacity-20 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700`}
                  ></div>

                  <div className="relative overflow-hidden rounded-t-3xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div
                      className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-200`}
                    >
                      {icon}
                    </div>

                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 transform -translate-y-24 group-hover:translate-y-0 transition-transform duration-500 delay-300">
                      Premium
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className={`text-xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent animate-zoomIn group-hover:scale-105 transition-transform duration-300`}
                      >
                        {item.title}
                      </h3>
                      <div
                        className={`w-8 h-8 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-200`}
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed flex-grow animate-fadeInUp group-hover:text-gray-700 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  ></div>
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-6 animate-bounceIn leading-tight">
              <span className="text-gray-900">What </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                We Print
              </span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              From small business cards to large format banners, we handle it all with precision and care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                title: 'Books & Binding',
                desc: 'Novels, textbooks, manuals, magazines, and professional binding services',
                details: ['Perfect binding & saddle stitch', 'Spiral & wire-o binding', 'Custom cover designs'],
                bg: 'from-blue-500 to-blue-600',
                bgGradient: 'from-blue-50 to-blue-100',
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4v10a2 2 0 002 2h8a2 2 0 002-2V8M7 8h10" />
                  </svg>
                ),
                title: 'Banners & Signs',
                desc: 'Large format banners, outdoor signs, trade show displays, and event backdrops',
                details: ['Weather-resistant materials', 'Retractable banner stands', 'Custom sizes available'],
                bg: 'from-yellow-500 to-yellow-600',
                bgGradient: 'from-yellow-50 to-yellow-100',
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: 'Flyers & Marketing',
                desc: 'Promotional flyers, postcards, menus, catalogs, and direct mail pieces',
                details: ['High-resolution printing', 'Variety of paper finishes', 'Bulk order discounts'],
                bg: 'from-green-500 to-green-600',
                bgGradient: 'from-green-50 to-green-100',
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                title: 'Business Materials',
                desc: 'Business cards, letterheads, brochures, and professional stationery',
                details: ['Premium cardstock options', 'Embossing & foil stamping', 'Multiple finishing options'],
                bg: 'from-purple-500 to-purple-600',
                bgGradient: 'from-purple-50 to-purple-100',
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
                title: 'Packaging & Labels',
                desc: 'Custom boxes, labels, stickers, and retail packaging solutions',
                details: ['Eco-friendly options', 'Die-cut shapes', 'Food-safe materials'],
                bg: 'from-red-500 to-red-600',
                bgGradient: 'from-red-50 to-red-100',
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                ),
                title: 'Design Services',
                desc: 'Custom graphic design, layout services, and creative consultation',
                details: ['Logo & brand design', 'Layout & typography', 'Creative consultation'],
                bg: 'from-indigo-500 to-indigo-600',
                bgGradient: 'from-indigo-50 to-indigo-100',
              },
            ].map(({ icon, title, desc, details, bg, bgGradient }, idx) => (
              <div
                key={idx}
                className={`group relative bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200/50 transition-all duration-700 hover:shadow-2xl cursor-pointer flex flex-col hover:-translate-y-3 animate-rotateIn stagger-${idx + 1} backdrop-blur-sm`}
                style={{ animationDelay: `${idx * 0.15}s`, animationFillMode: 'forwards' }}
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${bgGradient} rounded-full opacity-20 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700`}
                />

                <div className={`w-20 h-20 bg-gradient-to-br ${bg} rounded-full flex items-center justify-center mx-auto mt-10 mb-6 shadow-lg transform scale-100 transition-transform duration-500 group-hover:scale-110`}>
                  {icon}
                </div>

                <div className="px-8 pb-8 flex flex-col flex-grow relative z-10 text-center">
                  <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${bg} bg-clip-text text-transparent animate-zoomIn transition-transform duration-300 group-hover:scale-110`}>
                    {title}
                  </h3>
                  <p className="text-gray-600 mb-6">{desc}</p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    {details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 before:content-['•'] before:text-yellow-400 before:text-xl before:-translate-y-0.5 before:mr-1">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${bg} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />

                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${bg} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-6 animate-bounceIn leading-tight">
              <span className="text-gray-900">Our </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Don't just take our word for it - hear what our satisfied customers have to say
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-3xl shadow-lg p-8 transition-shadow duration-500 transform cursor-pointer hover:shadow-2xl hover:-translate-y-2 animate-rotateIn stagger-${index + 1} backdrop-blur-sm`}
                style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
              >
                <div className="flex items-center mb-6 justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-8 italic text-center leading-relaxed">"{testimonial.text}"</p>
                <div className="border-t border-gray-100 pt-6 text-center">
                  <p className="font-semibold text-gray-800 text-lg">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="w-full py-24"
        style={{
          background: 'linear-gradient(135deg, rgba(173, 216, 230, 0.3), rgba(255, 182, 193, 0.3))',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-6 animate-bounceIn leading-tight">
            <span className="text-gray-900">Why </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
              Choose Us
            </span>
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16 text-lg animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            At Fast Print Guys, we go beyond printing — delivering top-tier quality, speed, and personalized service that makes your ideas stand out.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {[
              {
                iconPath: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
                title: 'Exceptional Quality',
                desc: 'We use premium materials and advanced printing technology for stunning results every time.',
                colorFrom: 'from-yellow-400',
                colorTo: 'to-yellow-500',
                bgGradient: 'from-yellow-100 to-yellow-200',
              },
              {
                iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Fast Turnaround',
                desc: 'Quick processing without compromising quality — get your prints right when you need them.',
                colorFrom: 'from-yellow-400',
                colorTo: 'to-yellow-600',
                bgGradient: 'from-yellow-50 to-yellow-100',
              },
              {
                iconPath: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Nationwide Delivery',
                desc: 'We ship across the country, ensuring your prints reach you safely and on time.',
                colorFrom: 'from-yellow-400',
                colorTo: 'to-yellow-500',
                bgGradient: 'from-yellow-50 to-yellow-100',
              },
              {
                iconPath1: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
                iconPath2: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
                title: 'Custom Solutions',
                desc: 'From design to finishing, we tailor every order to match your exact needs.',
                colorFrom: 'from-yellow-400',
                colorTo: 'to-yellow-600',
                bgGradient: 'from-yellow-50 to-yellow-100',
              },
            ].map(({ iconPath, iconPath1, iconPath2, title, desc, colorFrom, colorTo, bgGradient }, idx) => (
              <div
                key={idx}
                className={`group relative bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center text-center transition-shadow duration-500 hover:shadow-2xl hover:-translate-y-3 animate-rotateIn stagger-${idx + 1} backdrop-blur-sm`}
                style={{ animationDelay: `${idx * 0.15}s`, animationFillMode: 'forwards' }}
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-gradient-to-br ${bgGradient} transition-transform duration-500 group-hover:scale-110 shadow-lg`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {iconPath && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />}
                    {iconPath1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath1} />}
                    {iconPath2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath2} />}
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
                <p className="text-gray-600 max-w-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          // onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute cursor-pointer top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-all duration-300"
            >
              ✕
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 rounded-b-lg">
              <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
              <p className="text-gray-300 mb-2">{selectedImage.description}</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{selectedImage.size}</span>
                <span>{selectedImage.material}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Portfolio;
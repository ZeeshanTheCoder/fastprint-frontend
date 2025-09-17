'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, PenTool, Palette, Globe, Star, ArrowRight, CheckCircle, Users, Award, Clock } from 'lucide-react';

const Services = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: BookOpen,
      title: 'Book Printing',
      description: 'Personalized book printing for memoirs, novels, cookbooks, workbooks, children\'s books, and much more.',
      features: ['Hardcover & Paperback', 'Coil Bound & Saddle Stitch', 'International Delivery', 'No Minimum Orders'],
      color: 'from-blue-500 to-blue-600',
      delay: '0s',
    },
    {
      icon: PenTool,
      title: 'Book Writing & Formatting',
      description: 'Professional writing services with clear structure, engaging content, and proper formatting for readability.',
      features: ['Content Development', 'Professional Formatting', 'Consistent Typography', 'Market-Ready Manuscripts'],
      color: 'from-purple-500 to-purple-600',
      delay: '0.2s',
    },
    {
      icon: Palette,
      title: 'Book Cover Design',
      description: 'Compelling book covers that grab readers\' attention and convey the essence of your story perfectly.',
      features: ['Striking Imagery', 'Clear Typography', 'Genre-Specific Design', 'Professional Polish'],
      color: 'from-orange-500 to-orange-600',
      delay: '0.4s',
    },
    {
      icon: Globe,
      title: 'Book Publishing Services',
      description: 'Complete publishing solutions for both traditional and self-publishing routes with expert guidance.',
      features: ['Traditional Publishing', 'Self-Publishing Routes', 'Market Analysis', 'Distribution Support'],
      color: 'from-green-500 to-green-600',
      delay: '0.6s',
    },
  ];

  const stats = [
    { icon: Users, number: '5000+', label: 'Happy Clients' },
    { icon: BookOpen, number: '15000+', label: 'Books Printed' },
    { icon: Award, number: '99%', label: 'Quality Rate' },
    { icon: Clock, number: '24/7', label: 'Support' },
  ];

  const features = [
    'International Delivery Worldwide',
    'No Minimum Order Requirements',
    'Professional Quality Guarantee',
    'Fast Turnaround Times',
    'Competitive Pricing',
    'Expert Customer Support',
  ];

  return (
    <div className="services-container">

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

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center text-white space-y-8">
            <div
              id="hero-content"
              data-animate
              className={`transition-all duration-1000 ${
                isVisible['hero-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="inline-block px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium mb-4">
                Services You Can Trust
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Our{' '}
                <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  Printing Services
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                From personalized book printing to professional publishing services, we offer comprehensive solutions tailored to authors, businesses, and creative professionals worldwide.
              </p>
            </div>

            <div
              id="hero-button"
              data-animate
              className={`transition-all duration-1000 delay-300 ${
                isVisible['hero-button'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <button
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                onClick={() => router.push('/calculator/printbook')}
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div
            id="stats"
            data-animate
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 ${
              isVisible['stats'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-orange-400/10 to-yellow-400/10 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: '4s' }}
          ></div>
        </div>

        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-4 h-4 bg-blue-500 transform rotate-45 animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div
            className="absolute top-40 right-32 w-3 h-3 bg-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="absolute bottom-32 left-1/4 w-5 h-5 bg-orange-500 transform rotate-45 animate-bounce"
            style={{ animationDelay: '3s' }}
          ></div>
          <div
            className="absolute bottom-20 right-20 w-4 h-4 bg-green-500 rounded-full animate-bounce"
            style={{ animationDelay: '4s' }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div
            id="services-header"
            data-animate
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible['services-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
              <Star className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-blue-700">Premium Services</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-6 leading-tight">
              <span className="text-gray-900">Comprehensive </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                Book Solutions
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to bring your book from concept to published reality with professional excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                id={`service-${index}`}
                data-animate
                className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-105 border border-white/50 ${
                  isVisible[`service-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: service.delay }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-3xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

                <div className="relative z-10">
                  <div className={`relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${service.color} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <service.icon className="w-10 h-10 text-white transform group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                    <div
                      className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"
                      style={{ animationDelay: '0.5s' }}
                    ></div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 group-hover:scale-105 transform">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {service.description}
                  </p>

                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-gray-700 transform hover:translate-x-2 transition-all duration-300"
                        style={{ animationDelay: `${featureIndex * 0.1}s` }}
                      >
                        <div className="relative mr-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-green-400 rounded-full opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
                        </div>
                        <span className="group-hover:font-medium transition-all duration-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-purple-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          <div
            id="services-cta"
            data-animate
            className={`text-center mt-16 transition-all duration-1000 ${
              isVisible['services-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          ></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              id="features-content"
              data-animate
              className={`transition-all duration-1000 ${
                isVisible['features-content'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-center lg:text-left">
                <span className="text-gray-900">Why Choose </span>
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                  Fast Print Guys
                </span>
              </h2>

              <p className="text-xl text-gray-600 mb-8">
                We're committed to delivering exceptional quality and service that exceeds your expectations every time.
              </p>

              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-700 transform hover:translate-x-2 transition-transform duration-300"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div
              id="features-visual"
              data-animate
              className={`transition-all duration-1000 ${
                isVisible['features-visual'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <Star className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold mb-1">5.0</div>
                      <div className="text-sm text-gray-300">Rating</div>
                    </div>
                    <div className="text-center">
                      <Globe className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold mb-1">50+</div>
                      <div className="text-sm text-gray-300">Countries</div>
                    </div>
                    <div className="text-center">
                      <BookOpen className="w-12 h-12 text-green-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold mb-1">15K+</div>
                      <div className="text-sm text-gray-300">Books Printed</div>
                    </div>
                    <div className="text-center">
                      <Award className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold mb-1">99%</div>
                      <div className="text-sm text-gray-300">Quality Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-200 to-purple-200">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <div
            id="cta"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible['cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-6 leading-tight">
              <span className="text-gray-900">Ready to Bring Your </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                Life to Book
              </span>
            </h2>
            <p className="text-xl text-black/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied authors who have trusted us with their publishing dreams. Get started today with a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-full hover:bg-purple-600 transition-all duration-300 transform hover:scale-105"
                onClick={() => router.push('/portfolio')}
              >
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
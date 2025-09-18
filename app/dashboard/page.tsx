'use client';

import React, { useState, useEffect } from 'react';
import { Carousel, Card } from '../../components/ui/apple-cards-carousel';
import Image from 'next/image';
import Link from 'next/link';

const DashboardPage = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Freelance', 'Small', 'Service', 'Creative'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] to-[#FFFFFF] relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 py-4 px-6 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="mr-3">
              <Image
                src="/frito-logo.png"
                alt="Frito Paws Professional Dog Walking Service Logo"
                width={40}
                height={40}
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <h1 className="text-2xl font-semibold text-[#143F3F]">FRITO PAWS</h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-[#6B7280] hover:text-[#143F3F] font-medium transition-colors">
              Home
            </Link>
            <Link href="/#services" className="text-[#6B7280] hover:text-[#143F3F] font-medium transition-colors">
              Services
            </Link>
            <Link href="#screenshots" className="text-[#6B7280] hover:text-[#143F3F] font-medium transition-colors">
              View Our Work
            </Link>
            <Link href="/#contact" className="px-6 py-2 bg-[#143F3F] text-white font-medium rounded-full hover:bg-[#0F2F2F] transition-colors">
              Contact Us for Your App
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-[#F0F9FF] text-[#0EA5E9] rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-[#0EA5E9] rounded-full mr-2"></span>
            Case Study: Created for Frito Paws, Will Be Available for Everyone
          </div>

          <h1 className="text-5xl md:text-7xl font-light text-[#1F2937] mb-8 leading-tight">
            Manage Your
            <span className="block font-semibold text-[#143F3F]">
              <span className="inline-block transition-all duration-500 ease-in-out">
                {words[currentWord]}
              </span>{' '}
              Business
            </span>
          </h1>

          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            A simple, elegant dashboard designed for freelance service providers.
            Track your services, manage clients, and grow your business with ease.
          </p>
        </div>
      </section>

      {/* Features Section - Minimalist */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-[#1F2937] mb-6">
              Everything you need to run your freelance business
            </h2>
            <div className="w-24 h-px bg-[#143F3F] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F0F9FF] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#1F2937] mb-4">Smart Scheduling</h3>
              <p className="text-[#6B7280] leading-relaxed">
                Effortlessly manage your calendar, book client appointments, and track availability.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#F0FDF4] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#1F2937] mb-4">Revenue Tracking</h3>
              <p className="text-[#6B7280] leading-relaxed">
                Monitor your earnings, track payments, and understand your business growth.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#FEF3F2] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#1F2937] mb-4">Client Management</h3>
              <p className="text-[#6B7280] leading-relaxed">
                Keep detailed records of your clients and their service preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Screenshots Carousel */}
      <section id="screenshots" className="py-20 px-6 bg-[#FAFBFC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-[#1F2937] mb-6">
              Beautiful, Intuitive Design
            </h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              Clean, intuitive interface that makes managing your freelance business a joy.
            </p>
          </div>

          <Carousel items={cards} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#143F3F]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
            Ready to streamline your freelance business?
          </h2>
          <p className="text-lg text-[#A1B5B5] mb-8 max-w-2xl mx-auto">
            We create custom dashboards for freelance service professionals to manage their daily operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/#contact" className="px-8 py-4 bg-white text-[#143F3F] font-medium rounded-full hover:bg-gray-100 transition-colors shadow-lg">
              Get Your Custom App
            </a>
            <a href="/" className="px-8 py-4 border border-[#5BA69E] text-[#5BA69E] font-medium rounded-full hover:bg-[#5BA69E] hover:text-white transition-colors">
              See Case Study
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Image
                src="/frito-logo.png"
                alt="Frito Paws Logo"
                width={32}
                height={32}
                style={{ objectFit: 'contain' }}
              />
              <span className="ml-3 text-[#143F3F] font-semibold">FRITO PAWS</span>
            </div>

            <div className="flex space-x-8 text-sm text-[#6B7280]">
              <Link href="/" className="hover:text-[#143F3F] transition-colors">Home</Link>
              <Link href="/#services" className="hover:text-[#143F3F] transition-colors">Services</Link>
              <Link href="/#contact" className="hover:text-[#143F3F] transition-colors">Contact</Link>
              <Link href="/privacy" className="hover:text-[#143F3F] transition-colors">Privacy</Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center text-sm text-[#6B7280]">
            © 2025 Frito Paws. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const data = [
  {
    category: "Dashboard Overview",
    title: "Your Business at a Glance",
    src: "/dashboard-app/dashboard.png",
    content: (
      <div className="bg-[#F8F9FA] p-8 rounded-xl">
        <h3 className="text-2xl font-semibold text-[#1F2937] mb-6">
          Comprehensive Dashboard
        </h3>
        <div className="space-y-4 text-[#6B7280]">
          <p className="leading-relaxed">
            Get a complete overview of your pet care business with our intuitive dashboard.
            Track your daily activities, upcoming appointments, and key metrics all in one place.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-[#1F2937] mb-2">Quick Stats</h4>
              <p className="text-sm">Revenue, bookings, and performance metrics</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-[#1F2937] mb-2">Today's Schedule</h4>
              <p className="text-sm">Upcoming walks and appointments</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    category: "Advanced Analytics",
    title: "Revenue & Performance Insights",
    src: "/dashboard-app/dashboard-2.png",
    content: (
      <div className="bg-[#F8F9FA] p-8 rounded-xl">
        <h3 className="text-2xl font-semibold text-[#1F2937] mb-6">
          Smart Analytics
        </h3>
        <div className="space-y-4 text-[#6B7280]">
          <p className="leading-relaxed">
            Make data-driven decisions with detailed analytics and insights.
            Track your revenue trends, identify your best clients, and optimize your pricing strategy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-[#1F2937] mb-2">Revenue Tracking</h4>
              <p className="text-sm">Monthly and weekly earnings</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-[#1F2937] mb-2">Client Analysis</h4>
              <p className="text-sm">Top clients and services</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-[#1F2937] mb-2">Growth Metrics</h4>
              <p className="text-sm">Business performance trends</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    category: "Client Management",
    title: "Organize Your Clients",
    src: "/dashboard-app/clients.png",
    content: (
      <div className="bg-[#F8F9FA] p-8 rounded-xl">
        <h3 className="text-2xl font-semibold text-[#1F2937] mb-6">
          Client Database
        </h3>
        <div className="space-y-4 text-[#6B7280]">
          <p className="leading-relaxed">
            Keep detailed records of all your clients and their pets. Store contact information,
            preferences, special instructions, and service history in one organized system.
          </p>
          <div className="space-y-3 mt-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-[#1F2937] mb-2">Complete Profiles</h4>
              <p className="text-sm">Client details, pet information, and emergency contacts</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-[#1F2937] mb-2">Service History</h4>
              <p className="text-sm">Track all past services and client interactions</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    category: "Pet Profiles",
    title: "Know Every Furry Friend",
    src: "/dashboard-app/dogs.png",
    content: (
      <div className="bg-[#F8F9FA] p-8 rounded-xl">
        <h3 className="text-2xl font-semibold text-[#1F2937] mb-6">
          Pet Management
        </h3>
        <div className="space-y-4 text-[#6B7280]">
          <p className="leading-relaxed">
            Create detailed profiles for every pet in your care. Keep track of their preferences,
            medical information, behavioral notes, and special requirements to provide the best possible care.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-[#1F2937] mb-2">Health Records</h4>
              <p className="text-sm">Vaccination status, medications, and vet info</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-[#1F2937] mb-2">Behavioral Notes</h4>
              <p className="text-sm">Personality traits and special instructions</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    category: "Smart Scheduling",
    title: "Effortless Calendar Management",
    src: "/dashboard-app/calendar.png",
    content: (
      <div className="bg-[#F8F9FA] p-8 rounded-xl">
        <h3 className="text-2xl font-semibold text-[#1F2937] mb-6">
          Calendar & Scheduling
        </h3>
        <div className="space-y-4 text-[#6B7280]">
          <p className="leading-relaxed">
            Manage your schedule with ease using our intuitive calendar system.
            Book appointments, set recurring services, and avoid double-bookings with smart scheduling features.
          </p>
          <div className="space-y-3 mt-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-[#1F2937] mb-2">Recurring Bookings</h4>
              <p className="text-sm">Set up regular walking schedules automatically</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-[#1F2937] mb-2">Availability Management</h4>
              <p className="text-sm">Block out times and manage your work schedule</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-[#1F2937] mb-2">Client Notifications</h4>
              <p className="text-sm">Automatic reminders and booking confirmations</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default DashboardPage;
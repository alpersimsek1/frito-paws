'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

export default function AppLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-2xl font-bold text-[#143F3F]">
            Frito Paws
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#143F3F] mb-4">
            Welcome to Your Pet Portal
          </h1>
          <p className="text-lg text-gray-600">
            Manage your dog's profile and schedule walks, onboarding, or sitting services
          </p>
        </div>

        {/* Option Cards */}
        <div className="space-y-8 mt-12">
          {/* First Row: Book Service and My Dog Profile */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Looking for Services Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/app/request">
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:border-[#5BA69E] hover:shadow-md transition-all cursor-pointer h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-[#5BA69E] rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#143F3F] mb-4">
                      Book a Service
                    </h2>
                    <p className="text-gray-600">
                      Schedule a walk, onboarding session, or pet sitting service
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* My Dog Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/app/my-dog">
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:border-[#5BA69E] hover:shadow-md transition-all cursor-pointer h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-[#5BA69E] rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#143F3F] mb-4">
                      My Dog's Profile
                    </h2>
                    <p className="text-gray-600">
                      View and manage your dog's information and health details
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Second Row: Calendar */}
          <div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/app/calendar">
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:border-[#5BA69E] hover:shadow-md transition-all cursor-pointer h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-[#5BA69E] rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#143F3F] mb-4">
                      View Calendar
                    </h2>
                    <p className="text-gray-600">
                      See all upcoming and past appointments at a glance
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

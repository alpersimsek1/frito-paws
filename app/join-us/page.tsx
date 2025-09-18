'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function JoinUsPage() {
  return (
    <div className="min-h-screen bg-[#FEF2E4]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-[#143F3F]/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Image
                src="/frito-logo.png"
                alt="Frito Paws Logo"
                width={45}
                height={45}
                className="rounded-full transition-transform group-hover:scale-105"
              />
            </div>
            <span className="text-2xl font-bold text-[#143F3F] group-hover:text-[#5BA69E] transition-colors">
              Frito Paws
            </span>
          </Link>
          <Link
            href="/"
            className="text-[#143F3F] hover:text-[#5BA69E] font-medium transition-colors flex items-center space-x-2 group"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-light text-[#143F3F] mb-6 leading-tight">
              Join Our
              <span className="block font-bold text-[#5BA69E]">Pack</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#143F3F]/80 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
              Become part of a passionate team dedicated to making tails wag across Chiswick, Richmond, Hammersmith, and Twickenham
            </p>

            {/* Audience callout */}
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-lg text-[#143F3F]/70 mb-6 font-light">
                Whether you're a university student looking for flexible work, seeking extra income in your free time,
                or wanting to build a professional career in pet care — we'd love to hear from you!
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-white/60 text-[#143F3F] px-4 py-2 rounded-full border border-[#5BA69E]/20">
                  🎓 University Students
                </span>
                <span className="bg-white/60 text-[#143F3F] px-4 py-2 rounded-full border border-[#5BA69E]/20">
                  💼 Side Income
                </span>
                <span className="bg-white/60 text-[#143F3F] px-4 py-2 rounded-full border border-[#5BA69E]/20">
                  🚀 Professional Career
                </span>
              </div>
            </div>
          </div>

          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-[#5BA69E]/10 blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-[#143F3F]/5 blur-2xl"></div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-light text-[#143F3F] mb-16 text-center">
            Why Choose <span className="font-bold text-[#5BA69E]">Us?</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: "💚", title: "Meaningful Work", desc: "Make a real difference in pets' and owners' lives every day" },
              { icon: "⚡", title: "Flexible Hours", desc: "Create your own schedule that fits your lifestyle perfectly" },
              { icon: "🌿", title: "Active Lifestyle", desc: "Stay healthy while exploring beautiful outdoor spaces" },
              { icon: "🎯", title: "Fair Compensation", desc: "Competitive rates that reflect the value you bring" },
              { icon: "👥", title: "Supportive Team", desc: "Join a close-knit community of fellow dog enthusiasts" },
              { icon: "📱", title: "Modern Tools", desc: "Use cutting-edge apps and technology for seamless service" }
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="bg-[#FEF2E4] p-8 rounded-3xl border border-[#143F3F]/5 group-hover:border-[#5BA69E]/20 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-[#143F3F] mb-3">{item.title}</h3>
                  <p className="text-[#143F3F]/70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Look For */}
      <section className="py-20 bg-[#FEF2E4]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-light text-[#143F3F] mb-16 text-center">
            What We're <span className="font-bold text-[#5BA69E]">Looking For</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="bg-white p-10 rounded-3xl shadow-sm">
              <h3 className="text-2xl font-semibold text-[#143F3F] mb-8 flex items-center">
                <span className="w-3 h-3 bg-[#5BA69E] rounded-full mr-4"></span>
                Essential
              </h3>
              <ul className="space-y-4">
                {[
                  "Genuine passion for dogs of all shapes and sizes",
                  "Reliability and punctuality you can count on",
                  "Physical fitness for active outdoor adventures",
                  "Clear communication and people skills",
                  "Can come to West London easily or already in West London"
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-[#143F3F]/80">
                    <svg className="w-5 h-5 text-[#5BA69E] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm">
              <h3 className="text-2xl font-semibold text-[#143F3F] mb-8 flex items-center">
                <span className="w-3 h-3 bg-[#143F3F] rounded-full mr-4"></span>
                Preferred
              </h3>
              <ul className="space-y-4">
                {[
                  "Previous experience with dogs or pet care",
                  "Pet first aid or relevant certifications",
                  "Weekend and flexible availability",
                  "Own reliable transportation",
                  "Professional references available"
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-[#143F3F]/80">
                    <svg className="w-5 h-5 text-[#143F3F]/40 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-[#143F3F] mb-8">
            Ready to <span className="font-bold text-[#5BA69E]">Start?</span>
          </h2>
          <p className="text-xl text-[#143F3F]/70 mb-12 max-w-2xl mx-auto font-light">
            Reach out through your preferred channel and let's discuss how you can join our pack
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
            <a
              href="https://wa.me/447534148093?text=Hi!%20I%27m%20interested%20in%20becoming%20a%20dog%20walker%20with%20Frito%20Paws.%20Could%20you%20tell%20me%20more%20about%20the%20opportunities%20available?"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center space-x-3 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-medium hover:bg-[#1da851] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>WhatsApp</span>
            </a>

            <a
              href="mailto:hello@fritopaws.co.uk?subject=Dog%20Walker%20Application&body=Hi%20there!%0A%0AI%27m%20interested%20in%20becoming%20a%20dog%20walker%20with%20Frito%20Paws.%20Here%20are%20my%20details%3A%0A%0AName%3A%20%0APhone%3A%20%0AExperience%20with%20dogs%3A%20%0AAvailability%3A%20%0A%0ALooking%20forward%20to%20hearing%20from%20you!"
              className="group flex items-center justify-center space-x-3 bg-[#5BA69E] text-white px-8 py-4 rounded-2xl font-medium hover:bg-[#4a8f88] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Email</span>
            </a>
          </div>

          <p className="text-sm text-[#143F3F]/50 mt-8 font-light">
            We typically respond within 24 hours
          </p>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-[#143F3F] text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-8 md:mb-0">
              <Image
                src="/frito-logo.png"
                alt="Frito Paws Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <span className="text-xl font-bold">Frito Paws</span>
                <p className="text-white/70 text-sm">Professional Dog Care across West London</p>
              </div>
            </div>

            <div className="flex items-center space-x-8">
              <a
                href="https://www.instagram.com/fritopaws.london"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors hover:scale-110 transform"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61576673940743"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors hover:scale-110 transform"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <Link href="/privacy" className="text-white/70 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
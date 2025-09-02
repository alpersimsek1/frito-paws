'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#FEF2E4]">
      {/* Header */}
      <header className="bg-[#143F3F] py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center text-[#FEF2E4] hover:text-[#8BAEAE] transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <div className="flex items-center mt-4">
            <Image 
              src="/frito-logo.png" 
              alt="Frito Paws Logo"
              width={48}
              height={48}
              style={{ objectFit: 'contain' }}
              className="mr-3"
            />
            <h1 className="text-3xl font-bold text-[#FEF2E4]" style={{ fontFamily: 'Alfa Slab One, cursive' }}>
              Privacy Policy
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-[#666666] mb-8">
              <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-GB')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#143F3F] mb-4">1. Introduction</h2>
              <p className="text-[#666666] mb-4">
                Welcome to Frito Paws. We are committed to protecting your privacy and handling your personal information responsibly. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our dog walking and pet sitting services in Chiswick, London, and surrounding areas.
              </p>
              <p className="text-[#666666]">
                By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#143F3F] mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-[#143F3F] mb-3">Personal Information</h3>
              <p className="text-[#666666] mb-4">We collect the following personal information:</p>
              <ul className="list-disc pl-6 text-[#666666] mb-4 space-y-2">
                <li>Your name and contact details (phone number, email address)</li>
                <li>Home address and any specific location instructions</li>
                <li>Emergency contact information</li>
                <li>Pet information (name, breed, age, medical conditions, dietary requirements)</li>
                <li>Veterinary contact details</li>
                <li>Service preferences and special instructions</li>
                <li>Payment information (processed securely through third-party providers)</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#143F3F] mb-3">Service Information</h3>
              <ul className="list-disc pl-6 text-[#666666] mb-4 space-y-2">
                <li>Photos and videos of your pet during walks and care sessions</li>
                <li>GPS location data during walks (shared via WhatsApp live location)</li>
                <li>Notes about your pet's behavior, activities, and wellbeing</li>
                <li>Service dates, times, and duration</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#143F3F] mb-4">3. How We Use Your Information</h2>
              <p className="text-[#666666] mb-4">We use your personal information for the following purposes:</p>
              <ul className="list-disc pl-6 text-[#666666] mb-4 space-y-2">
                <li>Providing dog walking and pet sitting services</li>
                <li>Communicating with you about service bookings and updates</li>
                <li>Ensuring your pet's safety and wellbeing</li>
                <li>Sending real-time updates, photos, and location sharing during services</li>
                <li>Emergency contact in case of incidents involving your pet</li>
                <li>Processing payments for services</li>
                <li>Improving our services based on feedback</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#143F3F] mb-4">4. Information Sharing</h2>
              <p className="text-[#666666] mb-4">We do not sell, rent, or share your personal information with third parties except in the following circumstances:</p>
              <ul className="list-disc pl-6 text-[#666666] mb-4 space-y-2">
                <li><strong>Emergency Situations:</strong> We may share your information with veterinarians, emergency services, or your designated emergency contacts if your pet requires immediate medical attention</li>
                <li><strong>Service Providers:</strong> We may use third-party services for payment processing, scheduling, or communication (such as WhatsApp for updates)</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#143F3F] mb-4">5. Data Security</h2>
              <p className="text-[#666666] mb-4">We take the security of your personal information seriously and implement appropriate measures to protect it:</p>
              <ul className="list-disc pl-6 text-[#666666] mb-4 space-y-2">
                <li>Secure storage of physical and digital records</li>
                <li>Access to information limited to authorized personnel only</li>
                <li>Regular deletion of outdated information</li>
                <li>Secure communication channels for sensitive information</li>
                <li>Password protection and encryption where applicable</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#143F3F] mb-4">6. Data Retention</h2>
              <p className="text-[#666666] mb-4">We retain your personal information for as long as necessary to:</p>
              <ul className="list-disc pl-6 text-[#666666] mb-4 space-y-2">
                <li>Provide ongoing services to you</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes or enforce agreements</li>
              </ul>
              <p className="text-[#666666]">
                Generally, we retain client information for up to 7 years after the last service provision, unless you request earlier deletion or we are required to retain it longer for legal purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#143F3F] mb-4">7. Your Rights</h2>
              <p className="text-[#666666] mb-4">Under UK data protection law (UK GDPR), you have the following rights:</p>
              <ul className="list-disc pl-6 text-[#666666] mb-4 space-y-2">
                <li><strong>Right of Access:</strong> Request copies of your personal information</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate information</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal information</li>
                <li><strong>Right to Restrict Processing:</strong> Request limitation of how we use your information</li>
                <li><strong>Right to Data Portability:</strong> Request transfer of your information</li>
                <li><strong>Right to Object:</strong> Object to processing of your information</li>
              </ul>
              <p className="text-[#666666]">
                To exercise any of these rights, please contact us using the details provided below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#143F3F] mb-4">8. Photos and Videos</h2>
              <p className="text-[#666666] mb-4">
                As part of our service, we take photos and videos of your pet during walks and care sessions. These are shared with you via WhatsApp or other agreed communication methods. By using our services, you consent to:
              </p>
              <ul className="list-disc pl-6 text-[#666666] mb-4 space-y-2">
                <li>Taking photos and videos of your pet for service updates</li>
                <li>Sharing these with you via our communication channels</li>
                <li>Temporary storage of these images for service delivery</li>
              </ul>
              <p className="text-[#666666]">
                We may occasionally request permission to use photos of your pet for our website or social media marketing. This will always require your explicit consent and you can withdraw this consent at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#143F3F] mb-4">9. Third-Party Services</h2>
              <p className="text-[#666666] mb-4">We use several third-party services that may process your information:</p>
              <ul className="list-disc pl-6 text-[#666666] mb-4 space-y-2">
                <li><strong>WhatsApp:</strong> For communication and live location sharing</li>
                <li><strong>Payment Processors:</strong> For secure payment processing</li>
                <li><strong>Web3Forms:</strong> For contact form submissions on our website</li>
              </ul>
              <p className="text-[#666666]">
                These third parties have their own privacy policies governing how they handle your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#143F3F] mb-4">10. Changes to This Policy</h2>
              <p className="text-[#666666] mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by email or through our website. The updated policy will be effective from the date posted.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#143F3F] mb-4">11. Contact Information</h2>
              <p className="text-[#666666] mb-4">
                If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <div className="bg-[#F2F9F9] p-6 rounded-lg">
                <p className="text-[#143F3F] mb-2"><strong>Frito Paws</strong></p>
                <p className="text-[#666666] mb-2">Email: info@fritopaws.com</p>
                <p className="text-[#666666] mb-2">Phone: 07534148093</p>
                <p className="text-[#666666] mb-2">Service Areas: Chiswick, W4, and surrounding London areas</p>
                <p className="text-[#666666]">
                  <a 
                    href="https://wa.me/447534148093?text=Hi,%20I%20have%20a%20question%20about%20your%20privacy%20policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5BA69E] hover:underline"
                  >
                    WhatsApp us with privacy questions
                  </a>
                </p>
              </div>
            </section>

  
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#143F3F] py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Image 
              src="/frito-logo.png" 
              alt="Frito Paws Logo"
              width={60}
              height={60}
              style={{ objectFit: 'contain' }}
              className="mr-3"
            />
            <h3 className="text-xl text-[#FEF2E4]" style={{ fontFamily: 'Alfa Slab One, cursive' }}>
              FRITO PAWS
            </h3>
          </div>
          <p className="text-[#8BAEAE] text-sm">
            Professional Dog Walking & Pet Sitting Services in Chiswick, London
          </p>
        </div>
      </footer>
    </div>
  );
}
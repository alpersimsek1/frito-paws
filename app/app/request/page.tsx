'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ServiceRequest, DogProfile } from '../types';

export default function RequestPage() {
  const router = useRouter();
  const [dogProfile, setDogProfile] = useState<DogProfile | null>(null);
  const [formData, setFormData] = useState<Partial<ServiceRequest>>({
    serviceType: 'walk',
    urgent: false,
    walkType: 'no-preference',
    duration: 30,
  });

  useEffect(() => {
    // Load dog profile
    const savedProfile = localStorage.getItem('dogProfile');
    if (savedProfile) {
      setDogProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!dogProfile) {
      alert('Please create a dog profile first!');
      router.push('/app/my-dog');
      return;
    }

    const request: ServiceRequest = {
      id: crypto.randomUUID(),
      dogId: dogProfile.id,
      serviceType: formData.serviceType || 'walk',
      urgent: formData.urgent || false,
      walkType: formData.walkType,
      preferredDate: formData.preferredDate || new Date(),
      preferredTime: formData.preferredTime || '',
      duration: formData.duration || 30,
      additionalRequirements: formData.additionalRequirements,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save to localStorage
    const existingRequests = localStorage.getItem('serviceRequests');
    const requests = existingRequests ? JSON.parse(existingRequests) : [];
    requests.push(request);
    localStorage.setItem('serviceRequests', JSON.stringify(requests));

    alert('Request submitted successfully! We will contact you soon.');
    router.push('/app');
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/app" className="text-2xl font-bold text-[#143F3F]">
            Frito Paws
          </Link>
          <Link href="/app" className="text-[#5BA69E] hover:text-[#143F3F]">
            ← Back
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-[#143F3F] mb-8">Book a Service</h1>

        {!dogProfile && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-6 shadow-sm">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">No dog profile found</h3>
                <p className="text-yellow-800 mb-3">Please create a dog profile before booking a service.</p>
                <Link
                  href="/app/my-dog"
                  className="inline-block px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Create Dog Profile
                </Link>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Type */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#143F3F] mb-4">What do you need?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  name="serviceType"
                  value="walk"
                  checked={formData.serviceType === 'walk'}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as any })}
                  className="peer sr-only"
                />
                <div className="p-6 border-2 border-gray-200 rounded-xl peer-checked:border-[#5BA69E] peer-checked:bg-[#5BA69E]/5 transition-all text-center">
                  <div className="text-3xl mb-2">🐕</div>
                  <div className="font-semibold text-gray-900">Dog Walk</div>
                  <div className="text-sm text-gray-600 mt-1">Daily exercise</div>
                </div>
              </label>

              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  name="serviceType"
                  value="onboarding"
                  checked={formData.serviceType === 'onboarding'}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as any })}
                  className="peer sr-only"
                />
                <div className="p-6 border-2 border-gray-200 rounded-xl peer-checked:border-[#5BA69E] peer-checked:bg-[#5BA69E]/5 transition-all text-center">
                  <div className="text-3xl mb-2">📋</div>
                  <div className="font-semibold text-gray-900">Onboarding</div>
                  <div className="text-sm text-gray-600 mt-1">Meet & greet</div>
                </div>
              </label>

              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  name="serviceType"
                  value="sitting"
                  checked={formData.serviceType === 'sitting'}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as any })}
                  className="peer sr-only"
                />
                <div className="p-6 border-2 border-gray-200 rounded-xl peer-checked:border-[#5BA69E] peer-checked:bg-[#5BA69E]/5 transition-all text-center">
                  <div className="text-3xl mb-2">🏠</div>
                  <div className="font-semibold text-gray-900">Pet Sitting</div>
                  <div className="text-sm text-gray-600 mt-1">Home care</div>
                </div>
              </label>
            </div>
          </div>

          {/* Urgency */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#143F3F] mb-4">Is this urgent?</h2>
            <div className="grid grid-cols-2 gap-4">
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  name="urgent"
                  checked={!formData.urgent}
                  onChange={() => setFormData({ ...formData, urgent: false })}
                  className="peer sr-only"
                />
                <div className="p-4 border-2 border-gray-200 rounded-xl peer-checked:border-[#5BA69E] peer-checked:bg-[#5BA69E]/5 transition-all text-center">
                  <div className="font-semibold text-gray-900">Regular</div>
                  <div className="text-sm text-gray-600 mt-1">Normal scheduling</div>
                </div>
              </label>

              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  name="urgent"
                  checked={formData.urgent}
                  onChange={() => setFormData({ ...formData, urgent: true })}
                  className="peer sr-only"
                />
                <div className="p-4 border-2 border-gray-200 rounded-xl peer-checked:border-[#5BA69E] peer-checked:bg-[#5BA69E]/5 transition-all text-center">
                  <div className="font-semibold text-gray-900">Urgent</div>
                  <div className="text-sm text-gray-600 mt-1">ASAP</div>
                </div>
              </label>
            </div>
          </div>

          {/* Walk Type (only for walks) */}
          {formData.serviceType === 'walk' && (
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-[#143F3F] mb-4">Walk Preference</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="walkType"
                    value="group"
                    checked={formData.walkType === 'group'}
                    onChange={(e) => setFormData({ ...formData, walkType: e.target.value as any })}
                    className="peer sr-only"
                  />
                  <div className="p-4 border-2 border-gray-200 rounded-xl peer-checked:border-[#5BA69E] peer-checked:bg-[#5BA69E]/5 transition-all text-center">
                    <div className="font-semibold text-gray-900">Group Walk</div>
                    <div className="text-sm text-gray-600 mt-1">Social time</div>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="walkType"
                    value="private"
                    checked={formData.walkType === 'private'}
                    onChange={(e) => setFormData({ ...formData, walkType: e.target.value as any })}
                    className="peer sr-only"
                  />
                  <div className="p-4 border-2 border-gray-200 rounded-xl peer-checked:border-[#5BA69E] peer-checked:bg-[#5BA69E]/5 transition-all text-center">
                    <div className="font-semibold text-gray-900">Private Walk</div>
                    <div className="text-sm text-gray-600 mt-1">One-on-one</div>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="walkType"
                    value="no-preference"
                    checked={formData.walkType === 'no-preference'}
                    onChange={(e) => setFormData({ ...formData, walkType: e.target.value as any })}
                    className="peer sr-only"
                  />
                  <div className="p-4 border-2 border-gray-200 rounded-xl peer-checked:border-[#5BA69E] peer-checked:bg-[#5BA69E]/5 transition-all text-center">
                    <div className="font-semibold text-gray-900">No Preference</div>
                    <div className="text-sm text-gray-600 mt-1">Either works</div>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Date and Time */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#143F3F] mb-4">When do you need this?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setFormData({ ...formData, preferredDate: new Date(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BA69E] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <input
                  type="time"
                  required
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BA69E] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#143F3F] mb-4">How long?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[30, 60, 90, 120].map((minutes) => (
                <label key={minutes} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="duration"
                    value={minutes}
                    checked={formData.duration === minutes}
                    onChange={() => setFormData({ ...formData, duration: minutes })}
                    className="peer sr-only"
                  />
                  <div className="p-4 border-2 border-gray-200 rounded-xl peer-checked:border-[#5BA69E] peer-checked:bg-[#5BA69E]/5 transition-all text-center">
                    <div className="font-semibold text-gray-900">{minutes} min</div>
                    {minutes === 30 && <div className="text-xs text-gray-600 mt-1">Quick walk</div>}
                    {minutes === 60 && <div className="text-xs text-gray-600 mt-1">Standard</div>}
                    {minutes === 90 && <div className="text-xs text-gray-600 mt-1">Extended</div>}
                    {minutes === 120 && <div className="text-xs text-gray-600 mt-1">Long walk</div>}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Requirements */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#143F3F] mb-4">Additional Requirements</h2>
            <textarea
              value={formData.additionalRequirements || ''}
              onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5BA69E] focus:border-transparent"
              rows={4}
              placeholder="Any special instructions or requirements we should know about..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={!dogProfile}
              className="flex-1 px-6 py-3 bg-[#5BA69E] text-white rounded-full hover:bg-[#143F3F] transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit Request
            </button>
            <Link
              href="/app"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors font-semibold text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}

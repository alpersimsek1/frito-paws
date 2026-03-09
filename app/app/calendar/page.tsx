'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ServiceRequest, DogProfile } from '../types';
import Calendar from '../components/Calendar';

export default function CalendarPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [dogProfile, setDogProfile] = useState<DogProfile | null>(null);

  useEffect(() => {
    // Load requests
    const savedRequests = localStorage.getItem('serviceRequests');
    if (savedRequests) {
      const parsed = JSON.parse(savedRequests);
      // Convert date strings back to Date objects
      const withDates = parsed.map((req: any) => ({
        ...req,
        preferredDate: new Date(req.preferredDate),
        createdAt: new Date(req.createdAt),
        updatedAt: new Date(req.updatedAt),
      }));
      setRequests(withDates);
    }

    // Load dog profile
    const savedProfile = localStorage.getItem('dogProfile');
    if (savedProfile) {
      setDogProfile(JSON.parse(savedProfile));
    }
  }, []);

  const upcomingRequests = requests
    .filter((req) => new Date(req.preferredDate) >= new Date())
    .sort((a, b) => new Date(a.preferredDate).getTime() - new Date(b.preferredDate).getTime());

  const pastRequests = requests
    .filter((req) => new Date(req.preferredDate) < new Date())
    .sort((a, b) => new Date(b.preferredDate).getTime() - new Date(a.preferredDate).getTime());

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-[#143F3F] mb-8">
          {dogProfile ? `${dogProfile.name}'s Schedule` : 'Your Schedule'}
        </h1>

        {requests.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-6">Book your first service to see it here!</p>
            <Link
              href="/app/request"
              className="inline-block px-6 py-3 bg-[#5BA69E] text-white rounded-full hover:bg-[#143F3F] transition-colors font-semibold"
            >
              Book a Service
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Calendar requests={requests} />
            </div>

            {/* Upcoming Requests */}
            <div className="space-y-6">
              {/* Upcoming */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-[#143F3F] mb-4">Upcoming</h2>
                {upcomingRequests.length === 0 ? (
                  <p className="text-gray-600 text-sm">No upcoming bookings</p>
                ) : (
                  <div className="space-y-3">
                    {upcomingRequests.slice(0, 5).map((req) => (
                      <RequestCard key={req.id} request={req} />
                    ))}
                  </div>
                )}
              </div>

              {/* Past */}
              {pastRequests.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h2 className="text-xl font-bold text-[#143F3F] mb-4">Past</h2>
                  <div className="space-y-3">
                    {pastRequests.slice(0, 3).map((req) => (
                      <RequestCard key={req.id} request={req} />
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-[#143F3F] mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  <Link
                    href="/app/request"
                    className="block w-full px-4 py-3 bg-[#5BA69E] text-white rounded-lg hover:bg-[#143F3F] transition-colors text-center font-semibold"
                  >
                    Book New Service
                  </Link>
                  <Link
                    href="/app/my-dog"
                    className="block w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center font-semibold"
                  >
                    View Dog Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function RequestCard({ request }: { request: ServiceRequest }) {
  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  const getServiceIcon = (type: string) => {
    return type === 'walk' ? '🐕' : type === 'onboarding' ? '📋' : '🏠';
  };

  return (
    <div className="p-3 border border-gray-200 rounded-lg hover:border-[#5BA69E] transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{getServiceIcon(request.serviceType)}</span>
          <div>
            <div className="font-semibold text-gray-900 capitalize">
              {request.serviceType}
            </div>
            <div className="text-sm text-gray-600">
              {formatDate(request.preferredDate)} at {request.preferredTime}
            </div>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(request.status)}`}>
          {request.status}
        </span>
      </div>
      <div className="text-xs text-gray-600">
        Duration: {request.duration} minutes
        {request.walkType && request.walkType !== 'no-preference' && (
          <> • {request.walkType} walk</>
        )}
      </div>
    </div>
  );
}

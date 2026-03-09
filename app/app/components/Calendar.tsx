'use client';

import { useState } from 'react';
import { ServiceRequest } from '../types';

interface CalendarProps {
  requests: ServiceRequest[];
}

export default function Calendar({ requests }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getRequestsForDate = (day: number) => {
    return requests.filter((req) => {
      const reqDate = new Date(req.preferredDate);
      return (
        reqDate.getDate() === day &&
        reqDate.getMonth() === currentDate.getMonth() &&
        reqDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const today = new Date();
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#143F3F]">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: startingDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Days of the month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dayRequests = getRequestsForDate(day);
          const hasRequests = dayRequests.length > 0;

          return (
            <div
              key={day}
              className={`aspect-square p-2 border rounded-lg relative ${
                isToday(day)
                  ? 'border-[#5BA69E] bg-[#5BA69E]/5'
                  : 'border-gray-100'
              } ${hasRequests ? 'bg-gray-50' : 'bg-white'}`}
            >
              <div className={`text-sm font-semibold ${isToday(day) ? 'text-[#5BA69E]' : 'text-gray-700'}`}>
                {day}
              </div>
              {hasRequests && (
                <div className="mt-1 space-y-0.5">
                  {dayRequests.slice(0, 2).map((req, idx) => (
                    <div
                      key={idx}
                      className={`text-xs px-1 py-0.5 rounded ${
                        req.serviceType === 'walk'
                          ? 'bg-blue-100 text-blue-800'
                          : req.serviceType === 'onboarding'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {req.serviceType === 'walk' ? '🐕' : req.serviceType === 'onboarding' ? '📋' : '🏠'}
                    </div>
                  ))}
                  {dayRequests.length > 2 && (
                    <div className="text-xs text-gray-600">+{dayRequests.length - 2}</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="text-sm font-semibold text-gray-700 mb-2">Service Types:</div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 rounded"></div>
            <span className="text-sm text-gray-600">Walk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-100 rounded"></div>
            <span className="text-sm text-gray-600">Onboarding</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 rounded"></div>
            <span className="text-sm text-gray-600">Pet Sitting</span>
          </div>
        </div>
      </div>
    </div>
  );
}

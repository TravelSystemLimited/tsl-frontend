import { Search, Calendar, Users, MapPin } from 'lucide-react';
import React, { useState } from 'react';

const HotelSearchBar: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [hotelClass, setHotelClass] = useState<string>('All');
  const [guests, setGuests] = useState<number>(1);
  const [rooms, setRooms] = useState<number>(1);

  const formatDateForInput = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setCheckIn(newDate);
    if (checkOut && newDate >= checkOut) {
      const newCheckOut = new Date(newDate);
      newCheckOut.setDate(newCheckOut.getDate() + 1);
      setCheckOut(newCheckOut);
    }
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckOut(new Date(e.target.value));
  };

  const handleSearch = () => {
    console.log('Searching with:', {
      location,
      checkIn,
      checkOut,
      hotelClass,
      guests,
      rooms
    });
  };

  return (
    <div className="w-full">
      {/* Mobile Layout */}
      <div className="block md:hidden">
        {/* Header with Logo and Menu */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <div className="text-xl font-bold">
              <span className="text-black">TRA</span>
              <span className="text-red-500">V</span>
              <span className="text-black">EL SYSTEMS</span>
            </div>
            <div className="ml-2 text-xs text-gray-500">LIMITED</div>
          </div>
          <button className="p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-white border-b border-gray-200">
          <button className="flex-1 px-4 py-3 text-center text-gray-500 border-b-2 border-transparent">
            Flights
          </button>
          <button className="flex-1 px-4 py-3 text-center text-gray-900 border-b-2 border-red-500 font-medium">
            Hotels
          </button>
          <button className="flex-1 px-4 py-3 text-center text-gray-500 border-b-2 border-transparent">
            Cabs
          </button>
        </div>

        {/* Search Form */}
        <div className="p-4 bg-gray-50 min-h-screen">
          {/* Location Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search for places"
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Check-in and Check-out */}
          <div className="flex gap-3 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
            <input
              type="date"
              value={formatDateForInput(checkIn)}
              onChange={handleCheckInChange}
              min={formatDateForInput(new Date())}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent date-input-custom"
              style={{
                colorScheme: 'light'
              }}
            />
            <div className="absolute top-2 left-10 text-xs text-gray-500 pointer-events-none">Check-In</div>
          </div>
        </div>
        <div className="flex-1">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
            <input
              type="date"
              value={formatDateForInput(checkOut)}
              onChange={handleCheckOutChange}
              min={formatDateForInput(checkIn) || formatDateForInput(new Date())}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent date-input-custom"
              style={{
                colorScheme: 'light'
              }}
            />
            <div className="absolute top-2 left-10 text-xs text-gray-500 pointer-events-none">Check-Out</div>
          </div>
        </div>
      </div>
      
          {/* Hotel Class Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-100 rounded mr-3 flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-400 rounded"></div>
                </div>
                <span className="text-base text-gray-900">Hotel Class</span>
              </div>
              <select
                value={hotelClass}
                onChange={(e) => setHotelClass(e.target.value)}
                className="text-base text-gray-600 bg-transparent border-none outline-none"
              >
                <option value="All">All</option>
                <option value="3 Star">3 Star</option>
                <option value="4 Star">4 Star</option>
                <option value="5 Star">5 Star</option>
              </select>
            </div>
          </div>

          {/* Explore Button */}
          <button
            onClick={handleSearch}
            className="w-full bg-[#8b6b70] text-white py-4 rounded-lg font-medium text-base flex items-center justify-center gap-2 hover:bg-[#7a5d62] transition-colors"
          >
            <Search className="w-5 h-5" />
            Explore
          </button>

          {/* Find Hotels Section */}
          <div className="mt-16 text-center">
            <div className="w-24 h-24 mx-auto mb-4 opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full text-gray-300">
                <rect x="20" y="30" width="60" height="40" fill="none" stroke="currentColor" strokeWidth="2"/>
                <rect x="15" y="35" width="70" height="30" fill="none" stroke="currentColor" strokeWidth="2"/>
                <rect x="10" y="40" width="80" height="20" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="30" cy="50" r="2" fill="currentColor"/>
                <circle cx="40" cy="50" r="2" fill="currentColor"/>
                <circle cx="60" cy="50" r="2" fill="currentColor"/>
                <circle cx="70" cy="50" r="2" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-400 mb-2">Find Hotels</h3>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="bg-white shadow-sm rounded-lg p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Find Hotels</h2>
            <div className="flex bg-gray-100 rounded-full p-1">
              <button className="px-4 py-2 rounded-full text-gray-600 font-medium text-sm">
                Flights
              </button>
              <button className="px-4 py-2 rounded-full bg-white text-gray-900 font-medium text-sm shadow-sm">
                Hotels
              </button>
              <button className="px-4 py-2 rounded-full text-gray-600 font-medium text-sm">
                Cabs
              </button>
            </div>
          </div>

          {/* Search Form */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            {/* Location */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where are you going?"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Check-in */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={formatDateForInput(checkIn)}
                  onChange={handleCheckInChange}
                  min={formatDateForInput(new Date())}
                  placeholder="Select date"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Check-out */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={formatDateForInput(checkOut)}
                  onChange={handleCheckOutChange}
                  min={formatDateForInput(checkIn) || formatDateForInput(new Date())}
                  placeholder="Select date"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Guests & Rooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Guests & Rooms</label>
              <div className="flex gap-2">
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-gray-400 mr-1" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num}>{num} Guest{num !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-1">•</span>
                  <select
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    {[1,2,3,4].map(num => (
                      <option key={num} value={num}>{num} Room{num !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Hotel Class */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Class</label>
              <select
                value={hotelClass}
                onChange={(e) => setHotelClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Classes</option>
                <option value="3 Star">3 Star</option>
                <option value="4 Star">4 Star</option>
                <option value="5 Star">5 Star</option>
              </select>
            </div>

            {/* Search Button Container */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-[#8b6b70] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#8b6b70] transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search Hotels
              </button>
            </div>
          </div>
        </div>
      </div>
     <style>{`
        .date-input-custom::-webkit-calendar-picker-indicator {
          opacity: 0;
          position: absolute;
          right: 10px;
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
        
        .date-input-custom::-webkit-datetime-edit-text {
          opacity: 0;
        }
        
        .date-input-custom::-webkit-datetime-edit-month-field {
          opacity: 0;
        }
        
        .date-input-custom::-webkit-datetime-edit-day-field {
          opacity: 0;
        }
        
        .date-input-custom::-webkit-datetime-edit-year-field {
          opacity: 0;
        }
        
        .date-input-custom::before {
          content: attr(data-placeholder);
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          padding-left: 2.5rem;
          color: #6b7280;
          pointer-events: none;
        }
        
        /* Firefox */
        .date-input-custom::-moz-placeholder {
          opacity: 0;
        }
        
        /* Alternative approach for better cross-browser support */
        .date-input-custom {
          color: transparent;
          background: white;
        }
        
        .date-input-custom:focus {
          color: #374151;
        }
        
        .date-input-custom:not(:focus):not(:placeholder-shown) {
          color: transparent;
        }
        
        .date-input-custom:focus::-webkit-datetime-edit-text,
        .date-input-custom:focus::-webkit-datetime-edit-month-field,
        .date-input-custom:focus::-webkit-datetime-edit-day-field,
        .date-input-custom:focus::-webkit-datetime-edit-year-field {
          opacity: 1;
          color: #374151;
        }
      `}</style>
    </div>
  );
};

export default HotelSearchBar;
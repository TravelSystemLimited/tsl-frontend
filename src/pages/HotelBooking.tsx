'use client';

import React, { useState } from 'react';
import { MdOutlineFlight, MdOutlineHotel } from 'react-icons/md';
import FlightSearchBar from '@/components/FlightSearchBar';
import Header from '@/components/ui/header';
import FlightCard from '@/components/flightDetails';
import TravelProgressBar from '@/components/travelProgressbar';
import HotelCard from '@/components/HotelCard';
import { useNavigate } from 'react-router-dom';
import HotelSearchBar from '@/components/HotelSearchBar';

const mockHotels = [
  {
    name: 'CENTRAL PARK B&B',
    address: 'Street 1 Jumeirah Village, Dubai 215373, United Arab Emirates',
    price: 23000,
    imageUrl: '/hotel1.png', // Replace with your actual path
  },
  {
    name: 'OSTELLO MILANO',
    address: 'Al Barsha South Dubai Science Park, Dubai United Arab Emirates',
    price: 29700,
    imageUrl: '/hotel2.png',
  },
  {
    name: 'Five Jumeirah Village',
    address: 'District 14, Street 1, Dubai 118561, United Arab Emirates',
    price: 18000,
    imageUrl: '/hotel3.png',
  },
  {
    name: 'Radisson Hotel Dubai Damac Hills',
    address: 'Hessa Street, dubailand Dubailand, Dubai, United Arab Emirates',
    price: 23000,
    imageUrl: '/hotel4.png',
  },
];

type PlaceOption = {
  label: string;
  value: {
    description: string;
    place_id: string;
    structured_formatting: {
      main_text: string;
      secondary_text: string;
    };
  };
};
const HotelBooking = () => {
 interface HotelSearchParams {
  location: string;
  checkIn: Date | null;
  checkOut: Date | null;
  hotelClass: string;
  guests: number;
  rooms: number;
}
  const [hasSearched, setHasSearched] = useState(false);
  const [searchParams, setSearchParams] = useState<HotelSearchParams>({
    location: '',
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    hotelClass: 'All',
    guests: 1,
    rooms: 1
  });

  const handleSearch = (params:HotelSearchParams) => {
    setHasSearched(true);
    setSearchParams(params);
  };
const navigate=useNavigate();
  return (
     <div>
      <Header username="Employee" />
      <TravelProgressBar currentStep="hotels" />
      <HotelSearchBar onSearch={handleSearch} />
        <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Show hotels only after search */}
     {hasSearched ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-700">
                Hotels in {searchParams.location || 'your destination'}
              </h3>
              <div className="flex gap-4 items-center text-sm">
                <button 
                  className="text-gray-500 hover:underline" 
                  onClick={() => navigate('/cabs')}
                >
                  Skip
                </button>
                <button 
                  className="flex items-center gap-2 bg-[#7d5c65] text-white px-4 py-1.5 rounded-md hover:bg-[#6a4d56] transition-colors"
                  onClick={() => navigate('/cabs')}
                >
                  <span>Cabs</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
              {mockHotels.map((hotel, index) => (
                <HotelCard 
                  key={index} 
                  {...hotel} 
                  imageUrl={hotel.imageUrl || '/hotel-placeholder.png'} // Fallback to placeholder
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-gray-200 p-8 rounded-full mb-4">
              <MdOutlineHotel className="text-4xl text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Search for hotels to see results
            </h3>
            <p className="text-gray-500 max-w-md">
              Enter your destination, travel dates, and preferences to find available hotels.
            </p>
          </div>
        )}
    </div>
    </div>
  );
};

export default HotelBooking;  
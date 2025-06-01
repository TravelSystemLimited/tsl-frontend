'use client';

import React, { useState } from 'react';
import { MdOutlineFlight } from 'react-icons/md';
import FlightSearchBar from '@/components/FlightSearchBar';
import Header from '@/components/ui/header';
import FlightCard from '@/components/flightDetails';
import TravelProgressBar from '@/components/travelProgressbar';
import HotelCard from '@/components/HotelCard';
import { useNavigate } from 'react-router-dom';

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
  const [hasSearched, setHasSearched] = useState(false);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departDate: null as Date | null,
    returnDate: null as Date | null,
    flightClass: 'Economy',
  });

  const handleSearch = (params: {
    source: PlaceOption | null;
    destination: PlaceOption | null;
    departDate: Date | null;
    returnDate: Date | null;
    flightClass: string;
  }) => {
    setHasSearched(true);
    setSearchParams({
      from: params.source?.value.structured_formatting.main_text || '',
      to: params.destination?.value.structured_formatting.main_text || '',
      departDate: params.departDate,
      returnDate: params.returnDate,
      flightClass: params.flightClass,
    });
  };
const navigate=useNavigate();
  return (
    <div>
      {/* Header */}
    
      <Header username="Employee" />
        <TravelProgressBar currentStep="hotels" />

      {/* Flight search bar */}
      {/* <FlightSearchBar onSearch={handleSearch} /> */}

    <div className="mt-8 pb-9">
 
  <div className="mt-8 pb-9">
  <div className="flex justify-end items-end px-4 mb-4">
  
    <div className="flex gap-4 items-center text-sm">
      <button className="text-gray-500 hover:underline" onClick={()=>{navigate('/cabs')}} >Skip</button>
      <button className="flex items-center gap-2 bg-[#7d5c65] text-white px-4 py-1.5 rounded-md" onClick={()=>{navigate('/cabs')}}>
        <span>Cabs</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>

  <div className="grid gap-6 px-4 sm:grid-cols-2 lg:grid-cols-2">
    {mockHotels.map((hotel, index) => (
      <HotelCard key={index} {...hotel} />
    ))}
  </div>
</div>

</div>

    </div>
  );
};

export default HotelBooking;
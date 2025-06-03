'use client';

import React, { useState } from 'react';
import { MdOutlineFlight } from 'react-icons/md';
import FlightSearchBar from '@/components/FlightSearchBar';
import Header from '@/components/ui/header';
import FlightCard from '@/components/flightDetails';
import TravelProgressBar from '@/components/travelProgressbar';
import HotelCard from '@/components/HotelCard';
import CabCard from '@/components/cabCard';
import CabBookingForm from '@/components/cabBookingForm';
import { useNavigate } from 'react-router-dom';

const cabs = [
  {
    name:"Indica, Swift",
        seats:4,
        ac:true,
        fuel:"CNG with refill breaks",
        extraFare:"₹11/km after 156 kms",
        cancellation:"Cancellation",
        freeTime:"Free till 1 hour of departure",
        price:1000,
        rating:"4.5",
        reviews:135,
        imageUrl:"/cab1.png "
  },
  {
    name:"TATA, Swift",
        seats:4,
        ac:true,
        fuel:"CNG with refill breaks",
        extraFare:"₹11/km after 156 kms",
        cancellation:"Cancellation",
        freeTime:"Free till 1 hour of departure",
        price:1500,
        rating:"4.2",
        reviews:135,
        imageUrl:"/cab2.png "
  },
  {
   name:"swift",
        seats:4,
        ac:true,
        fuel:"CNG with refill breaks",
        extraFare:"₹11/km after 156 kms",
        cancellation:"Cancellation",
        freeTime:"Free till 1 hour of departure",
        price:2000,
        rating:"4.2",
        reviews:135,
        imageUrl:"/cab3.png "
  },
   {
   name:"Eon",
        seats:4,
        ac:true,
        fuel:"CNG with refill breaks",
        extraFare:"₹11/km after 156 kms",
        cancellation:"Cancellation",
        freeTime:"Free till 1 hour of departure",
        price:2200,
        rating:"4.2",
        reviews:135,
        imageUrl:"/cab4.png "
  },
  // Add more cabs if needed
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
const CabBooking = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departDate: null as Date | null,
    returnDate: null as Date | null,
    flightClass: 'Economy',
  });
  const navigate=useNavigate();

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

  return (
    <div>
      {/* Header */}
    
      <Header username="Employee" />
        <TravelProgressBar currentStep="transport" />
        <CabBookingForm/>

      {/* Flight search bar */}
      {/* <FlightSearchBar onSearch={handleSearch} /> */}

    <div className="mt-12 px-4 pb-10">
       <h2 className="text-md text-[#6c6c6c] font-semibold mb-5">Cabs from Dubai Airport to Miracle Garden</h2>
      <div className="flex justify-end items-center mb-4">
       
        <div className="flex gap-4 items-center justify-end text-sm">
          <button className="text-gray-500 hover:underline" onClick={()=>navigate('/checkout')}>Skip</button>
          <button className="flex items-center gap-2 bg-[#7d5c65] text-white px-4 py-1.5 rounded-md" onClick={()=>navigate('/checkout')}>
            <span>Book</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

     <div className="grid grid-cols-1 mt-12  sm:grid-cols-2 lg:grid-cols-2 gap-4 ">
      {cabs.map((cab, index) => (
        <CabCard key={index} {...cab} />
      ))}
    </div>
    </div>

    </div>
  );
};

export default CabBooking;
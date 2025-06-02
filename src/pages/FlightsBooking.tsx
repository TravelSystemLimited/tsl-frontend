'use client';

import React, { useEffect, useState } from 'react';
import { MdOutlineFlight } from 'react-icons/md';
import FlightSearchBar from '@/components/FlightSearchBar';
import Header from '@/components/ui/header';
import FlightCard from '@/components/flightDetails';
import TravelProgressBar from '@/components/travelProgressbar';

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

type Flight = {
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  departureDate: string | null;
  arrivalDate: string | null;
  price: number;
  flightType: string;
  travelClass: string;
};
const mockEmployees = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com' },
];

const FlightBooking = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departDate: null as Date | null,
    returnDate: null as Date | null,
    flightClass: 'Economy',
  });
  

  useEffect(() => {
    // Clear other selections
    sessionStorage.removeItem('selectedCab');
    sessionStorage.removeItem('selectedFlight');
    sessionStorage.removeItem('selectedHotel');

    // Initialize flights with current sessionStorage values
    const from = sessionStorage.getItem('source') || '';
    const to = sessionStorage.getItem('destination') || '';
    const departureDate = sessionStorage.getItem('departureDate');
    const returnDate = sessionStorage.getItem('returnDate');

    setFlights([
      {
        airline: 'Air Arabia',
        from: from,
        to: to,
        departureTime: '15:25',
        arrivalTime: '21:15',
        departureDate: departureDate,
        arrivalDate: returnDate,
        price: 10400,
        flightType: 'Direct Flight',
        travelClass: 'Economy',
      },
      {
        airline: 'Air Arabia',
        from: from,
        to: to,
        departureTime: '15:55',
        arrivalTime: '22:15',
        departureDate: departureDate,
        arrivalDate: returnDate,
        price: 15478,
        flightType: 'Direct Flight',
        travelClass: 'Economy',
      },
      {
        airline: 'Air Arabia',
        from: from,
        to: to,
        departureTime: '16:23',
        arrivalTime: '20:15',
        departureDate: departureDate,
        arrivalDate: returnDate,
        price: 16540,
        flightType: 'Direct Flight',
        travelClass: 'Economy',
      },
      {
        airline: 'Air Arabia',
        from: 'Bengaluru',
        to: 'Dubai',
        departureTime: '17:25',
        arrivalTime: '12:15',
        departureDate: '14 Aug',
        arrivalDate: '15 Aug',
        price: 17247,
        flightType: 'Direct Flight',
        travelClass: 'Economy',
      },
    ]);
  }, []);

  const handleSearch = (params: {
    source: PlaceOption | null;
    destination: PlaceOption | null;
    departDate: Date | null;
    returnDate: Date | null;
    flightClass: string;
  }) => {
      if (!params.source || !params.destination || !params.departDate) return;
    setHasSearched(true);
    
    setSearchParams({
      from: params.source?.value.structured_formatting.main_text || '',
      to: params.destination?.value.structured_formatting.main_text || '',
      departDate: params.departDate,
      returnDate: params.returnDate,
      flightClass: params.flightClass,
    });

    // Update flights with new search parameters
    const from = params.source?.value.structured_formatting.main_text || '';
    const to = params.destination?.value.structured_formatting.main_text || '';
    const departureDate = params.departDate?.toLocaleDateString() || null;
    const returnDate = params.returnDate?.toLocaleDateString() || null;

    setFlights([
      {
        airline: 'Air Arabia',
        from: from,
        to: to,
        departureTime: '15:25',
        arrivalTime: '21:15',
        departureDate: departureDate,
        arrivalDate: returnDate,
        price:  10400,
        flightType: 'Direct Flight',
        travelClass: params.flightClass,
      },
      {
        airline: 'Air Arabia',
        from: from,
        to: to,
        departureTime: '15:55',
        arrivalTime: '22:15',
        departureDate: departureDate,
        arrivalDate: returnDate,
        price: 15478,
        flightType: 'Direct Flight',
        travelClass: params.flightClass,
      },
      {
        airline: 'Air Arabia',
        from: from,
        to: to,
        departureTime: '16:23',
        arrivalTime: '20:15',
        departureDate: departureDate,
        arrivalDate: returnDate,
        price: 16540,
        flightType: 'Direct Flight',
        travelClass: params.flightClass,
      },
      {
        airline: 'Air Arabia',
        from: 'Bengaluru',
        to: 'Dubai',
        departureTime: '17:25',
        arrivalTime: '12:15',
        departureDate: '14 Aug',
        arrivalDate: '15 Aug',
        price: 17247,
        flightType: 'Direct Flight',
        travelClass: params.flightClass,
      },
    ]);
  };


  return (
    <div>
      {/* Header */}
      <Header username="Employee" />
      
      <TravelProgressBar currentStep="flights" />

      {/* Flight search bar */}
      <FlightSearchBar onSearch={handleSearch} />

      {hasSearched  ? (
        /* Flight results */
        <div className="mt-8 pb-9">
          <h2 className="text-sm md:text-lg text-gray-700 font-semibold mb-4 ml-4">
            Flights from {searchParams.from || flights[0]?.from} to {searchParams.to || flights[0]?.to}
          </h2>
          <div className="grid gap-6 p-3 sm:grid-cols-2 lg:grid-cols-2 text-center">
            {flights.map((flight, index) => (
              <FlightCard key={index} {...flight} />
            ))}
          </div>
        </div>
      ) : (
        /* Centered icon and title - shown only when no search has been performed */
        <div className="flex flex-col items-center gap-2 mt-10">
          <MdOutlineFlight className="w-24 h-24 md:w-64 md:h-64 text-[#3b3b3b]" />
          <h1 className="text-2xl md:text-3xl text-gray-500">Search for Flights</h1>
        </div>
      )}
    </div>
  );
};

export default FlightBooking;
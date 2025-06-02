'use client';

import { useFlightStore } from '@/store/useFlightStore';
import { Plane } from 'lucide-react';
import { MdFlightLand, MdFlightTakeoff } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface FlightCardProps {
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  departureDate: string;
  arrivalDate: string;
  price: number;
  flightType: string;
  travelClass: string;
  onSelect?: () => void;
}

const FlightCard = ({
  airline,
  from,
  to,
  departureTime,
  arrivalTime,
  departureDate,
  arrivalDate,
  price,
  flightType,
  travelClass,
  onSelect,
}: FlightCardProps) => {
    const { setSelectedDestination } = useFlightStore();
  const navigate=useNavigate();

  const handleSelect = () => {
    // Create flight object to store
    const selectedFlight = {
      airline,
      from,
      to,
      departureTime,
      arrivalTime,
      departureDate,
      arrivalDate,
      price,
      flightType,
      travelClass
    };

    // Store in sessionStorage
    sessionStorage.setItem('selectedFlight', JSON.stringify(selectedFlight));
    
    setSelectedDestination(to); // Save destination to store
    navigate('/hotels'); 
  };
  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-md transition hover:shadow-lg md:ml-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/air.png"
            alt="Airline Logo"
            className="w-6 h-6 object-contain rounded-md"
          />
          <span className="font-semibold text-gray-800">{airline}</span>
        </div>

        <div className="flex gap-2">
          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
            {flightType}
          </span>
          <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full">
            {travelClass}
          </span>
        </div>
      </div>

      {/* Flight Details */}
      <div className="flex  flex-row justify-between items-center mt-4 gap-2 sm:gap-4">
        {/* From */}
        <div className="text-left">
          <p className="text-lg font-semibold">{departureTime}</p>
          <p className="text-xs text-gray-600">{departureDate}</p>
          <p className="text-sm font-medium text-gray-700">{from}</p>
        </div>

        {/* Flight Icon */}
        <div className="flex gap-2 items-center">
          <MdFlightTakeoff className="w-5 h-5 text-gray-500  mb-1" />
          <div className="w-32 border-t border-gray-300" />
          <MdFlightLand className="w-5 h-5 text-gray-500  mb-1"/>
        </div>

        {/* To */}
        <div className="text-right">
          <p className="text-lg font-semibold">{arrivalTime}</p>
          <p className="text-xs text-gray-600">{arrivalDate}</p>
          <p className="text-sm font-medium text-gray-700">{to}</p>
        </div>
      </div>

      {/* Price & Button */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-800">₹ {price.toLocaleString()}</p>
        <button
          onClick={handleSelect}
          className="bg-[#8c6d73] hover:bg-[#937878] text-white text-sm font-medium px-4 py-1.5 rounded"
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default FlightCard;

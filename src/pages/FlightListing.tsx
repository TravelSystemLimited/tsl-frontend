import React from 'react';
import { Clock, CreditCard, Plane } from 'lucide-react';

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  direct: boolean;
}

interface FlightListingProps {
  flights: Flight[];
  onSelectFlight: (flight: Flight) => void;
}

const FlightListing: React.FC<FlightListingProps> = ({ flights, onSelectFlight }) => {
  return (
    <div className="mt-8 w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Available Flights</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock size={16} className="text-[#8C6D73]" />
          <span>Showing fastest routes first</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} onSelect={() => onSelectFlight(flight)} />
        ))}
      </div>
    </div>
  );
};

interface FlightCardProps {
  flight: Flight;
  onSelect: () => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-[#8C6D73] bg-opacity-10 rounded-full flex items-center justify-center">
            <Plane size={20} className="text-[#8C6D73]" />
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-gray-800">{flight.airline}</h3>
            <p className="text-sm text-gray-500">{flight.flightNumber}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          flight.direct 
            ? 'bg-green-100 text-green-700' 
            : 'bg-orange-100 text-orange-700'
        }`}>
          {flight.direct ? 'Direct' : 'Connecting'}
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-center flex-1">
          <p className="text-lg font-bold text-gray-800">{flight.departureTime}</p>
          <p className="text-xs text-gray-500">Departure</p>
        </div>

        <div className="flex flex-col items-center px-4 flex-1">
          <div className="relative w-full">
            <div className="w-full h-[2px] bg-[#8C6D73] bg-opacity-20"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#8C6D73]"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#8C6D73]"></div>
            <Plane 
              size={14} 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#8C6D73]" 
            />
          </div>
          <div className="flex items-center mt-1">
            <Clock size={12} className="text-gray-400 mr-1" />
            <span className="text-xs text-gray-500">{flight.duration}</span>
          </div>
        </div>

        <div className="text-center flex-1">
          <p className="text-lg font-bold text-gray-800">{flight.arrivalTime}</p>
          <p className="text-xs text-gray-500">Arrival</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <p className="text-xl font-bold text-[#8C6D73]">${flight.price}</p>
        <button 
          onClick={onSelect} 
          className="bg-[#8C6D73] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center hover:bg-[#7a5f64] transition-colors duration-200"
        >
          <CreditCard size={16} className="mr-2" />
          Select
        </button>
      </div>
    </div>
  );
};

export default FlightListing;
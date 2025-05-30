import React, { useState } from 'react';
import { Car, Clock, MapPin } from 'lucide-react';

export interface Cab {
  id: string;
  type: string;
  capacity: number;
  price: number;
  image: string;
}

interface CabBookingProps {
  cabs: Cab[];
  onSelectCab: (cab: Cab | null) => void;
  onSkip: () => void;
}

const CabBooking: React.FC<CabBookingProps> = ({ cabs, onSelectCab, onSkip }) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupTime, setPickupTime] = useState('');

  return (
    <div className="mt-8 w-full max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Add Transportation</h2>
        <button 
          onClick={onSkip}
          className="text-[#8C6D73] font-medium hover:underline"
        >
          Skip this step
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Hotel or Address"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C6D73] focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dropoff Location</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Airport or Address"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C6D73] focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Time</label>
            <div className="relative">
              <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C6D73] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cabs.map((cab) => (
          <CabCard key={cab.id} cab={cab} onSelect={() => onSelectCab(cab)} />
        ))}
      </div>
    </div>
  );
};

interface CabCardProps {
  cab: Cab;
  onSelect: () => void;
}

const CabCard: React.FC<CabCardProps> = ({ cab, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="h-40 overflow-hidden">
        <img 
          src={cab.image} 
          alt={cab.type} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-800">{cab.type}</h3>
          <div className="flex items-center text-gray-600">
            <Car size={16} className="mr-1" />
            <span className="text-sm">{cab.capacity} seats</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <p className="text-xl font-bold text-[#8C6D73]">${cab.price}</p>
          <button 
            onClick={onSelect} 
            className="bg-[#8C6D73] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#7a5f64] transition-colors duration-200"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default CabBooking;
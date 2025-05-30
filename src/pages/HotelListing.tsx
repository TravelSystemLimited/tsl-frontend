import React from 'react';
import { MapPin, Star, CreditCard } from 'lucide-react';

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  image: string;
  amenities: string[];
}

interface HotelListingProps {
  hotels: Hotel[];
  onSelectHotel: (hotel: Hotel) => void;
}

const HotelListing: React.FC<HotelListingProps> = ({ hotels, onSelectHotel }) => {
  return (
    <div className="mt-8 w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Hotels</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} onSelect={() => onSelectHotel(hotel)} />
        ))}
      </div>
    </div>
  );
};

interface HotelCardProps {
  hotel: Hotel;
  onSelect: () => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="h-48 overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-gray-800">{hotel.name}</h3>
          <div className="flex items-center bg-[#8C6D73] text-white px-2 py-1 rounded-md">
            <Star size={14} className="mr-1 fill-white" />
            <span className="text-sm font-medium">{hotel.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center mt-2 text-sm text-gray-600">
          <MapPin size={14} className="mr-1" />
          <span>{hotel.location}</span>
        </div>
        
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {hotel.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Per night</p>
            <p className="text-xl font-bold text-[#8C6D73]">${hotel.price}</p>
          </div>
          <button 
            onClick={onSelect} 
            className="bg-[#8C6D73] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center hover:bg-[#7a5f64] transition-colors duration-200"
          >
            <CreditCard size={16} className="mr-2" />
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelListing;
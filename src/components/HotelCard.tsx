'use client';

import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


interface HotelCardProps {
  name: string;
  address: string;
  price: number;
  imageUrl: string;
}

const HotelCard = ({ name, address, price, imageUrl }: HotelCardProps) => {
  const navigate=useNavigate();
   const handleSelect = () => {
   const hotelDetails = {
      name,
      location: address,
      price,
      image: imageUrl,
      amenities: ["Free WiFi", "Swimming Pool", "Restaurant"] // Add more as needed
    };

    // Save to sessionStorage
    sessionStorage.setItem('selectedHotel', JSON.stringify(hotelDetails));

    // Navigate to next page
    navigate('/cabs');
  };

  return (
    <div className="flex w-full max-w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <img
        src={imageUrl}
        alt={name}
        width={150}
        height={150}
        className="w-1/3 object-cover h-full"
      />
      <div className="flex flex-col justify-between p-4 w-2/3 text-left">
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-1">{name}</h3>
          <div className="flex items-start text-sm text-gray-600">
            <MapPin className="h-4 w-4 mt-1 mr-1 text-gray-500" />
            <p className="leading-tight">{address}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-base font-medium text-gray-800">₹ {price.toLocaleString()}</p>
          <button className="bg-[#7d5c65] text-white px-4 py-1.5 rounded-md hover:bg-[#6c4f58] text-sm"   onClick={handleSelect}>
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;

'use client';


import { CheckCircle2, Fuel } from 'lucide-react';
import { IoLocationSharp } from "react-icons/io5";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { TbClockCancel } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

interface CabCardProps {
  name: string;
  seats: number;
  ac: boolean;
  fuel: string;
  extraFare: string;
  cancellation: string;
  freeTime: string;
  price: number;
  rating: string;
  reviews: number;
  imageUrl: string;
}

const CabCard = ({
  name,
  seats,
  ac,
  fuel,
  extraFare,
  cancellation,
  freeTime,
  price,
  rating,
  reviews,
  imageUrl,
}: CabCardProps) => {
    const navigate=useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md p-4 gap-4 w-full">
      {/* Top: Image + Info */}
      <div className="flex items-center gap-4">
        <img
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          className="w-36 h-36 object-contain"
        />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">{name}</h3>
            <div className="flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">
              ★ {rating}
              <span className="text-gray-500 ml-1">({reviews})</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Hatchback, {ac ? 'AC' : 'Non-AC'}, {seats} seats included
          </p>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-4 text-sm text-gray-700">
        <div className="flex items-start gap-2">
          <IoLocationSharp className="w-4 h-4 text-green-600 mt-0.5" />
         Extra Kilometer Fare
        </div>
         <div className="flex items-start gap-2">
         
          {extraFare}
        </div>
        <div className="flex items-start gap-2">
          <BsFillFuelPumpFill className="w-4 h-4 text-green-600 mt-0.5" />
         Fuel Type
        </div>
        
       
        <div className="flex items-start gap-2">
         
          {fuel}
        </div>
          <div className="flex items-start gap-2">
          <TbClockCancel className="w-4 h-4 text-green-600 mt-0.5" />
         Cancellation
        </div>
        
       
        <div className="flex items-start gap-2">
         
          {cancellation}
        </div>
      </div>
      <div className="flex items-center justify-end gap-5 mt-4">
        <p className="text-base font-semibold text-gray-800">₹{price.toLocaleString()}</p>
        <button className="bg-[#7d5c65] text-white text-sm px-4 py-1.5 rounded-md hover:bg-[#68474f]"  onClick={() => {
    const cabDetails = {
      type: name,
      capacity: seats,
      price,
      image: imageUrl,
      fuel,
      extraFare,
      cancellation,
      freeTime,
      ac,
      rating,
      reviews
    };
    sessionStorage.setItem('selectedCab', JSON.stringify(cabDetails));
    navigate('/checkout');
  }}>
          Select
        </button>
      </div>
        </div>
    
      

      {/* Features in 2 columns */}
      

      {/* Bottom: Price and Button */}
      
    </div>
  );
};

export default CabCard;

import React from "react";
import { Button } from "@/components/ui/button";
import { FaCarAlt } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import { MdOutlineFlight } from "react-icons/md";

const FlightSelectionPage = () => {
  const travelOptions = [
    {
      icon: <MdOutlineFlight size={18} />,
      alt: "Flight icon",
      active: true,
    },
    {
      icon: <FaHotel size={18} />,
      alt: "Hotel icon",
      active: true,
    },
    {
      icon: <FaCarAlt size={18} />,
      alt: "Cab icon",
      active: false,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
     
      
      {/* Rest of your component remains the same */}
      <div className="flex items-center space-x-6 mb-6">
        <div className="px-4 py-2 bg-white rounded shadow">Select Flight</div>
        <div className="w-5 h-5 bg-gray-400 rounded-full" />
        <div className="w-5 h-5 bg-gray-200 rounded-full" />
      </div>

      {/* Search Form */}
      <div className="bg-white p-4 rounded shadow mb-6 flex items-end gap-4 flex-wrap">
        <div>
          <label className="block text-sm font-medium">From</label>
          <input type="text" defaultValue="Bengaluru, India" className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium">To</label>
          <input type="text" defaultValue="Dubai, United Arab Emirates" className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium">Depart</label>
          <input type="date" defaultValue="2025-08-14" className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium">Return</label>
          <input type="date" defaultValue="2025-08-20" className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium">Class</label>
          <select className="input">
            <option>Economy</option>
          </select>
        </div>
        <Button className="bg-[#7C5D5D] text-white">SEARCH</Button>
      </div>

      {/* Flight Results */}
      <h2 className="text-lg font-semibold mb-4">Flights from Bengaluru to Dubai</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((flight, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <img src="/air-arabia.png" alt="Air Arabia" className="w-6 h-6" />
                <span className="font-semibold">Air Arabia</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">Direct Flight</span>
                <span className="text-xs bg-green-100 px-2 py-1 rounded">Economy</span>
              </div>
              <div className="flex gap-6">
                <div>
                  <p className="font-medium text-lg">15:25</p>
                  <p className="text-xs text-gray-500">Bengaluru</p>
                </div>
                <div className="mt-3 text-gray-400">→</div>
                <div>
                  <p className="font-medium text-lg">21:15</p>
                  <p className="text-xs text-gray-500">Dubai</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg text-gray-700">₹ {idx === 1 ? '24,440' : idx === 3 ? '26,249' : idx === 2 ? '19,249' : '26,440'}</p>
              <Button className="mt-2 bg-[#7C5D5D] text-white">Select</Button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default FlightSelectionPage;
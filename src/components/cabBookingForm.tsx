'use client';

import { useFlightStore } from '@/store/useFlightStore';
import React, { useEffect, useState } from 'react';

const CabBookingForm: React.FC = () => {
     const { selectedDestination } = useFlightStore();
  const [from, setFrom] = useState(selectedDestination);
  useEffect(() => {
    if (selectedDestination) {
      setFrom(selectedDestination);
    }
  }, [selectedDestination]);
  const [to, setTo] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ from, to, pickupDate, pickupTime });
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full p-4 bg-white shadow-md rounded-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        {/* From */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 mb-1">FROM</label>
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Dubai, United Arab Emirates"
            className="border border-gray-400 rounded-lg px-4 py-2 w-full"
            required
          />
        </div>

        {/* To */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 mb-1">TO</label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Five Jumeirah Village"
            className="border border-gray-400 rounded-lg px-4 py-2 w-full"
            required
          />
        </div>

        {/* Pick-up Date */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 mb-1">PICK-UP DATE</label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 w-full"
            required
          />
        </div>

        {/* Pick-up Time */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 mb-1">PICK-UP TIME</label>
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="border border-gray-400 rounded-lg px-4 py-2 w-full"
            required
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-[#7f6365] hover:bg-[#6d5556] text-white px-6 py-3 rounded-full text-sm"
        >
          SEARCH
        </button>
      </div>
    </form>
  );
};

export default CabBookingForm;
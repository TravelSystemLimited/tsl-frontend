'use client';

import { useFlightStore } from '@/store/useFlightStore';
import React, { useEffect, useState } from 'react';

const CabBookingForm: React.FC = () => {
     const { selectedDestination } = useFlightStore();
     const addOneHour = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours + 1);
  date.setMinutes(minutes);
  return date.toTimeString().slice(0, 5); // Return in "HH:MM" format
};

const storedHotel = sessionStorage.getItem("selectedHotel");
const storedFlight = sessionStorage.getItem("selectedFlight");

const parsedHotel = storedHotel ? JSON.parse(storedHotel) : null;
const parsedFlight = storedFlight ? JSON.parse(storedFlight) : null;

// Setup state
const [from, setFrom] = useState("");
const [to, setTo] = useState("");
const [pickupDate, setPickupDate] = useState("");
const [pickupTime, setPickupTime] = useState("");
const formatDepartureDate = (dateStr: string): string => {
  const [day, monthShort] = dateStr.split(" ");
  const monthMap: { [key: string]: string } = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const year = new Date().getFullYear(); // or use selected year if available
  const formattedDate = `${day.padStart(2, "0")}-${monthMap[monthShort]}-${year}`;
  return formattedDate;
};

useEffect(() => {
  if (parsedFlight && parsedHotel) {
    setFrom(parsedFlight.to);
    setTo(parsedHotel.name);

    // Format the departure date to yyyy-mm-dd (HTML date input format)
    const formatDateForInput = (dateStr: string) => {
      try {
        const [month, day, year] = dateStr.split('/').map(Number);
        // Create a Date object in local time
        const date = new Date(year, month - 1, day);
        // Add one day (instead of adding 1 to the day component)
        date.setDate(date.getDate() + 1);
        
        // Check if the date is valid
        if (isNaN(date.getTime())) {
          console.error('Invalid date created from:', dateStr);
          return ''; // Return empty string or handle error appropriately
        }
        
        // Get local date parts to avoid timezone issues
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        
        return `${yyyy}-${mm}-${dd}`;
      } catch (error) {
        console.error('Error formatting date:', error);
        return ''; // Return empty string or handle error appropriately
      }
    };

    setPickupDate(formatDateForInput(parsedFlight.departureDate));
    setPickupTime(addOneHour(parsedFlight.arrivalTime));
  }
}, [parsedFlight, parsedHotel]);

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
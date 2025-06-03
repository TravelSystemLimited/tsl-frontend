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
const formatDateForInput = (date: string | Date | null) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().split('T')[0];
};
const parseMMDDYYYY = (str: string): Date => {
  const [month, day, year] = str.split('/').map(Number);
  return new Date(year, month - 1, day+1); // JS months are 0-indexed
};
useEffect(() => {
  if (parsedFlight ) {
    setFrom(parsedFlight.to);
    if(parsedHotel){
    setTo(parsedHotel.name);
    }else{
      setTo("Airport Bus stop")
    }

    // Format the departure date to yyyy-mm-dd (HTML date input format)
  

   setPickupDate(formatDateForInput(parseMMDDYYYY(parsedFlight.departureDate)));

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
        <style>{`
        /* Custom date input styling */
        input[type="date"] {
          -webkit-appearance: none;
          -moz-appearance: textfield;
          appearance: none;
          background-color: white;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23666'%3e%3cpath fill-rule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clip-rule='evenodd'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1rem;
          padding-right: 2.5rem;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0;
          position: absolute;
          right: 0;
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        /* Ensure consistent font size on mobile to prevent zoom */
        @media (max-width: 768px) {
          input[type="date"] {
            font-size: 16px;
          }
        }
      `}</style>
      
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
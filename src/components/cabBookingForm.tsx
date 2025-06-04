'use client';

import { useFlightStore } from '@/store/useFlightStore';
import React, { useEffect, useState } from 'react';

const CabBookingForm: React.FC = () => {
     const { selectedDestination } = useFlightStore();
   

const storedHotel = sessionStorage.getItem("selectedHotel");
const storedFlight = sessionStorage.getItem("selectedFlight");

const parsedHotel = storedHotel ? JSON.parse(storedHotel) : null;
const parsedFlight = storedFlight ? JSON.parse(storedFlight) : null;

// Setup state
const [from, setFrom] = useState("");
const [to, setTo] = useState("");
const [pickupDate, setPickupDate] = useState("");
const [pickupTime, setPickupTime] = useState("");
const [initialValuesSet, setInitialValuesSet] = useState(false);
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
  
  let dateObj;
  if (typeof date === 'string') {
    // For string dates, parse directly to local date components
    const [month, day, year] = date.split('/').map(Number);
    dateObj = new Date(year, month - 1, day);
  } else {
    dateObj = date;
  }
  
  // Format as yyyy-mm-dd using local date components
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

 const addOneHour = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours + 1);
    date.setMinutes(minutes);
    return date.toTimeString().slice(0, 5); // Return in "HH:MM" format
  };

useEffect(() => {
  if (parsedFlight && !initialValuesSet) {
    setFrom(parsedFlight.to);
    setTo(parsedHotel ? parsedHotel.name : "Airport Bus stop");

    // Handle departure date parsing
    if (parsedFlight.departureDate) {
      // Bulletproof date parser
      const parseFlightDate = (dateString: string) => {
        // First normalize all separators to slashes
        const normalized = dateString.replace(/[-/]/g, '/');
        
        // Split and ensure we have exactly 3 parts
        const parts = normalized.split('/');
        if (parts.length !== 3) return null;
        
        // Convert all parts to numbers
        const [part1, part2, part3] = parts.map(Number);
        
        // Determine format - we know flight dates are typically DD/MM/YYYY or MM/DD/YYYY
        const isDayFirst = part1 <= 31 && part2 <= 12;  // DD/MM
        const isMonthFirst = part1 <= 12 && part2 <= 31;  // MM/DD
        
        let day, month, year;
        
        if (isDayFirst && !isMonthFirst) {
          // Definitely DD/MM/YYYY
          [day, month, year] = [part1, part2, part3];
        } else if (!isDayFirst && isMonthFirst) {
          // Definitely MM/DD/YYYY
          [month, day, year] = [part1, part2, part3];
        } else {
          // Ambiguous case (like 01/01/2025) - assume DD/MM/YYYY for flights
          [day, month, year] = [part1, part2, part3];
        }
        
        // Handle 2-digit years
        if (year < 100) {
          year = 2000 + year;
        }
        
        // Create date in local time (no timezone conversion)
        return new Date(year, month - 1, day);
      };

      const parsedDate = parseFlightDate(parsedFlight.departureDate);
      
      if (parsedDate && !isNaN(parsedDate.getTime())) {
        // Format for input (YYYY-MM-DD)
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
        const day = String(parsedDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        
        setPickupDate(formattedDate);
        
        console.log('Original flight date:', parsedFlight.departureDate);
        console.log('Parsed date:', parsedDate);
        console.log('Formatted for input:', formattedDate);
      } else {
        console.error('Failed to parse flight date:', parsedFlight.departureDate);
      }
    }

    // Handle arrival time
    setPickupTime(addOneHour(parsedFlight.arrivalTime));
  }
}, [ ]);

// If you still need the Date object for other purposes, use this version:

// Debug function to test consistency



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
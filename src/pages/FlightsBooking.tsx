import React, { useEffect, useState } from 'react';
import { MdOutlineFlight } from 'react-icons/md';
import FlightSearchBar from '@/components/FlightSearchBar';
import Header from '@/components/ui/header';
import FlightCard from '@/components/flightDetails';
import TravelProgressBar from '@/components/travelProgressbar';
import { useLocation } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarTrigger } from '@/components/ui/sidebar';

type PlaceOption = {
  label: string;
  value: {
    description: string;
    place_id: string;
    structured_formatting: {
      main_text: string;
      secondary_text: string;
    };
  };
};

type Flight = {
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  departureDate: string | null;
  arrivalDate: string | null;
  price: number;
  flightType: string;
  travelClass: string;
};

const mockEmployees = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com' },
];

const FlightBooking = () => {
  const location = useLocation();
  const isEmployeeBookingRoute = location.pathname.includes('employee-booking');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departDate: null as Date | null,
    returnDate: null as Date | null,
    flightClass: 'Economy',
  });

  useEffect(() => {
    // Clear other selections
    sessionStorage.removeItem('selectedCab');
    sessionStorage.removeItem('selectedFlight');
    sessionStorage.removeItem('selectedHotel');

    // Initialize flights with current sessionStorage values
    const from = sessionStorage.getItem('source') || '';
    const to = sessionStorage.getItem('destination') || '';
    const departureDate = sessionStorage.getItem('departureDate');
    const returnDate = sessionStorage.getItem('returnDate');

    setFlights([
      {
        airline: 'Air Arabia',
        from: from,
        to: to,
        departureTime: '15:25',
        arrivalTime: '21:15',
        departureDate: departureDate,
        arrivalDate: returnDate,
        price: 10400,
        flightType: 'Direct Flight',
        travelClass: 'Economy',
      },
      {
        airline: 'Air Arabia',
        from: from,
        to: to,
        departureTime: '15:55',
        arrivalTime: '22:15',
        departureDate: departureDate,
        arrivalDate: returnDate,
        price: 15478,
        flightType: 'Direct Flight',
        travelClass: 'Economy',
      },
      {
        airline: 'Air Arabia',
        from: from,
        to: to,
        departureTime: '16:23',
        arrivalTime: '20:15',
        departureDate: departureDate,
        arrivalDate: returnDate,
        price: 16540,
        flightType: 'Direct Flight',
        travelClass: 'Economy',
      },
      {
        airline: 'Air Arabia',
        from: 'Bengaluru',
        to: 'Dubai',
        departureTime: '17:25',
        arrivalTime: '12:15',
        departureDate: '14 Aug',
        arrivalDate: '15 Aug',
        price: 17247,
        flightType: 'Direct Flight',
        travelClass: 'Economy',
      },
    ]);
  }, []);
  // Add this to your main component
useEffect(() => {
  const logStorageChanges = (e: StorageEvent) => {
    if (e.key === 'selectedEmployee') {
      console.log('Storage changed:', {
        oldValue: e.oldValue,
        newValue: e.newValue,
        url: e.url,
      });
    }
  };
  window.addEventListener('storage', logStorageChanges);
  return () => window.removeEventListener('storage', logStorageChanges);
}, []);

const handleEmployeeChange = (value: string) => {
  console.log('Selected value:', value);
  const employee = mockEmployees.find(emp => emp.id.toString() === value);
  
  if (employee) {
    const storageData = {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      timestamp: Date.now() // Add unique identifier
    };
    
    console.log('Storing:', storageData);
    sessionStorage.setItem('selectedEmployee', JSON.stringify(storageData));
    
    // Verify immediately
    const stored = sessionStorage.getItem('selectedEmployee');
    console.log('Verified stored:', stored);
    
    setSelectedEmployee(value);
  }
};
  const handleSearch = (params: {
    source: PlaceOption | null;
    destination: PlaceOption | null;
    departDate: Date | null;
    returnDate: Date | null;
    flightClass: string;
  }) => {
    if (!params.source || !params.destination || !params.departDate) return;
    setHasSearched(true);
    
    setSearchParams({
      from: params.source?.value.structured_formatting.main_text || '',
      to: params.destination?.value.structured_formatting.main_text || '',
      departDate: params.departDate,
      returnDate: params.returnDate,
      flightClass: params.flightClass,
    });

    // Update flights with new search parameters
    const from = params.source?.value.structured_formatting.main_text || '';
    const to = params.destination?.value.structured_formatting.main_text || '';
    const departureDate = params.departDate?.toLocaleDateString() || null;
    const returnDate = params.returnDate?.toLocaleDateString() || null;

    setFlights([
      {
        airline: 'Air Arabia',
        from: from,
        to: to,
        departureTime: '15:25',
        arrivalTime: '21:15',
        departureDate: departureDate,
        arrivalDate: returnDate,
        price:  10400,
        flightType: 'Direct Flight',
        travelClass: params.flightClass,
      },
      {
        airline: 'Air Arabia',
        from: from,
        to: to,
        departureTime: '15:55',
        arrivalTime: '22:15',
        departureDate: departureDate,
        arrivalDate: returnDate,
        price: 15478,
        flightType: 'Direct Flight',
        travelClass: params.flightClass,
      },
      {
        airline: 'Air Arabia',
        from: from,
        to: to,
        departureTime: '16:23',
        arrivalTime: '20:15',
        departureDate: departureDate,
        arrivalDate: returnDate,
        price: 16540,
        flightType: 'Direct Flight',
        travelClass: params.flightClass,
      },
      {
        airline: 'Air Arabia',
        from: 'Bengaluru',
        to: 'Dubai',
        departureTime: '17:25',
        arrivalTime: '12:15',
        departureDate: '14 Aug',
        arrivalDate: '15 Aug',
        price: 17247,
        flightType: 'Direct Flight',
        travelClass: params.flightClass,
      },
    ]);
  };


  return (
    <div>
      {/* Header - only show if not on employee-booking route */}
      {!isEmployeeBookingRoute && <Header username="Employee" />}
      {isEmployeeBookingRoute && (
        <div className="px-4 pt-4 pb-2"> {/* Adjusted padding */}
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-[#8C6D73] h-8 w-8" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-[#3b3b3b]">Employee Flight Booking</h1>
              <p className="text-gray-600 text-sm md:text-base">Book flights for employees</p>
            </div>
          </div>
        </div>
      )}
      
      <TravelProgressBar currentStep="flights" />

      {/* Employee dropdown - only show on employee-booking route */}
      {isEmployeeBookingRoute && (
  <div className="  flex justify-end ">
    <Select onValueChange={handleEmployeeChange}>  {/* Use handleEmployeeChange here */}
      <SelectTrigger className="w-full pl-7 rounded-none border-b-1 shadow-inner border-t-0 border-l-0 border-r-0 border-gray-200 ">
        <SelectValue placeholder="Select an employee" />
      </SelectTrigger>
      <SelectContent>
        {mockEmployees.map((employee) => (
          <SelectItem key={employee.id} value={employee.id.toString()}>
            {employee.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)}
      {/* Flight search bar */}
      <FlightSearchBar onSearch={handleSearch} />

      {hasSearched ? (
        /* Flight results */
        <div className="mt-8 pb-9">
          <h2 className="text-sm md:text-lg text-gray-700 font-semibold mb-4 ml-4">
            Flights from {searchParams.from || flights[0]?.from } to {searchParams.to || flights[0]?.to}
          </h2>
          <div className="grid gap-6 p-3 sm:grid-cols-2 lg:grid-cols-2 text-center">
            {flights.map((flight, index) => (
              <FlightCard key={index} {...flight} />
            ))}
          </div>
        </div>
      ) : (
        /* Centered icon and title - shown only when no search has been performed */
        <div className="flex flex-col items-center gap-2 mt-10">
          <MdOutlineFlight className="w-24 h-24 md:w-64 md:h-64 text-[#3b3b3b]" />
          <h1 className="text-2xl md:text-3xl text-gray-500">Search for Flights</h1>
        </div>
      )}
    </div>
  );
};

export default FlightBooking;
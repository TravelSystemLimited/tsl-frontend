import React, { useState, useRef, useEffect } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";

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

interface FlightSearchBarProps {
  onSearch: (params: {
    source: PlaceOption | null;
    destination: PlaceOption | null;
    departDate: Date | null;
    returnDate: Date | null;
    flightClass: string;
  }) => void;
}

const FlightSearchBar: React.FC<FlightSearchBarProps> = ({ onSearch }) => {
  const [source, setSource] = useState<PlaceOption | null>(null);
  const [destination, setDestination] = useState<PlaceOption | null>(null);
  const [departDate, setDepartDate] = useState<Date | null>(new Date());
  const [returnDate, setReturnDate] = useState<Date | null>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  });
  const [flightClass, setFlightClass] = useState<string>('Economy');
  const [tripType, setTripType] = useState<"roundTrip" | "oneWay">("roundTrip");
  const [showTripDropdown, setShowTripDropdown] = useState(false);

  // Mobile overlay states
  const [showSourceOverlay, setShowSourceOverlay] = useState(false);
  const [showDestinationOverlay, setShowDestinationOverlay] = useState(false);
  const [sourceSearchInput, setSourceSearchInput] = useState('');
  const [destinationSearchInput, setDestinationSearchInput] = useState('');

  const tripOptions = [
    { label: "Round Trip", value: "roundTrip" },
    { label: "One Way", value: "oneWay" }
  ];

  const isSearchDisabled = () => {
    return !source || !destination || !departDate || 
           (tripType === "roundTrip" && !returnDate);
  };

  const handleDepartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setDepartDate(newDate);
    sessionStorage.setItem("departureDate", e.target.value);
    
    if (returnDate && newDate > returnDate) {
      const newReturnDate = new Date(newDate);
      newReturnDate.setDate(newReturnDate.getDate() + 1);
      setReturnDate(newReturnDate);
      sessionStorage.setItem("returnDate", formatDateForInput(newReturnDate));
    }
  };

  const handleReturnDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setReturnDate(newDate);
    sessionStorage.setItem("returnDate", e.target.value);
  };
  useEffect(() => {
    // Load saved values from sessionStorage
    const savedSource = sessionStorage.getItem('source');
    const savedDestination = sessionStorage.getItem('destination');
    const savedDepartDate = sessionStorage.getItem('departureDate');
    const savedReturnDate = sessionStorage.getItem('returnDate');
    
    if (savedSource) {
      setSourceInput(savedSource);
      const sourceData = sessionStorage.getItem('sourceData');
      if (sourceData) {
        setSource(JSON.parse(sourceData));
      }
    }
    
    if (savedDestination) {
      setDestinationInput(savedDestination);
      const destinationData = sessionStorage.getItem('destinationData');
      if (destinationData) {
        setDestination(JSON.parse(destinationData));
      }
    }
    
    if (savedDepartDate) {
      setDepartDate(new Date(savedDepartDate));
    }
    
    if (savedReturnDate) {
      setReturnDate(new Date(savedReturnDate));
    } else if (savedDepartDate) {
      // If no return date but we have depart date, set return date to 7 days later
      const date = new Date(savedDepartDate);
      date.setDate(date.getDate() + 7);
      setReturnDate(date);
    }
  }, []);
  const handleSearch = () => {
    onSearch({
      source,
      destination,
      departDate,
      returnDate,
      flightClass,
    });
  };
  const handleClearSource = () => {
    setSource(null);
    setSourceInput('');
    sessionStorage.removeItem('source');
    sessionStorage.removeItem('sourceData');
  };
  
  const handleClearDestination = () => {
    setDestination(null);
    setDestinationInput('');
    sessionStorage.removeItem('destination');
    sessionStorage.removeItem('destinationData');
  };
  

  const formatDateForInput = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  // Mock places data
  const mockPlaces = [
    { name: "Mumbai", fullName: "Mumbai, Maharashtra, India", code: "BOM" },
    { name: "Delhi", fullName: "New Delhi, Delhi, India", code: "DEL" },
    { name: "Bangalore", fullName: "Bangalore, Karnataka, India", code: "BLR" },
    { name: "Chennai", fullName: "Chennai, Tamil Nadu, India", code: "MAA" },
    { name: "Kolkata", fullName: "Kolkata, West Bengal, India", code: "CCU" },
    { name: "Hyderabad", fullName: "Hyderabad, Telangana, India", code: "HYD" },
    { name: "Pune", fullName: "Pune, Maharashtra, India", code: "PNQ" },
    { name: "Ahmedabad", fullName: "Ahmedabad, Gujarat, India", code: "AMD" },
    { name: "Mangalore", fullName: "Mangalore, Karnataka, India", code: "IXE" }
  ];

  const [sourceInput, setSourceInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [showSourceSuggestions, setShowSourceSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);

  const handleSourceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setSourceInput(value);
  setShowSourceSuggestions(value.length > 0);
  if (!value) setSource(null);
  // Removed the sessionStorage.setItem from here
};

const handleDestinationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setDestinationInput(value);
  setShowDestinationSuggestions(value.length > 0);
  if (!value) setDestination(null);
  // Removed the sessionStorage.setItem from here
};

  const selectSource = (place: typeof mockPlaces[0]) => {
    const selectedOption = {
      label: place.fullName,
      value: {
        description: place.fullName,
        place_id: place.name.toLowerCase(),
        structured_formatting: {
          main_text: place.name,
          secondary_text: place.fullName.replace(`${place.name}, `, '')
        }
      }
    };
    setSource(selectedOption);
    setShowSourceOverlay(false);
    setSourceSearchInput('');
  };

  const selectDestination = (place: typeof mockPlaces[0]) => {
    const selectedOption = {
      label: place.fullName,
      value: {
        description: place.fullName,
        place_id: place.name.toLowerCase(),
        structured_formatting: {
          main_text: place.name,
          secondary_text: place.fullName.replace(`${place.name}, `, '')
        }
      }
    };
    setDestination(selectedOption);
    setShowDestinationOverlay(false);
    setDestinationSearchInput('');
  };

  const filteredSourcePlaces = mockPlaces.filter(place => 
    sourceSearchInput === '' || 
    place.name.toLowerCase().includes(sourceSearchInput.toLowerCase()) ||
    place.fullName.toLowerCase().includes(sourceSearchInput.toLowerCase()) ||
    place.code.toLowerCase().includes(sourceSearchInput.toLowerCase())
  );

  const filteredDestinationPlaces = mockPlaces.filter(place => 
    destinationSearchInput === '' || 
    place.name.toLowerCase().includes(destinationSearchInput.toLowerCase()) ||
    place.fullName.toLowerCase().includes(destinationSearchInput.toLowerCase()) ||
    place.code.toLowerCase().includes(destinationSearchInput.toLowerCase())
  );

  // Mobile Overlay Component
  const MobileOverlay = ({ 
    isVisible, 
    onClose, 
    title, 
    searchValue, 
    onSearchChange, 
    places, 
    onPlaceSelect 
  }: {
    isVisible: boolean;
    onClose: () => void;
    title: string;
    searchValue: string;
    onSearchChange: (value: string) => void;
    places: typeof mockPlaces;
    onPlaceSelect: (place: typeof mockPlaces[0]) => void;
  }) => {
    if (!isVisible) return null;

    return (
      <div className="fixed inset-0 bg-white z-50 md:hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center px-4 py-3 border-b border-gray-200">
            <button 
              onClick={onClose}
              className="mr-3 p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-1">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={title}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                autoFocus
              />
            </div>
            <button 
              onClick={() => onSearchChange('')}
              className="ml-2 p-1"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto">
            {places.map((place, index) => (
              <div
                key={index}
                className="px-4 py-4 border-b border-gray-100 active:bg-gray-50"
                onClick={() => onPlaceSelect(place)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-gray-600">{place.code}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{place.name}, {place.fullName.split(', ').slice(1).join(', ')}</div>
                    <div className="text-sm text-gray-500">{place.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-3 p-4 bg-white shadow w-full mx-auto">
        {/* Mobile Layout */}
        <div className="md:hidden w-full space-y-3">
          {/* Source and Destination Row */}
          <div className="flex gap-5 relative">
            <div className="flex-1 relative">
              <div className="relative">
                <button
                  onClick={() => setShowSourceOverlay(true)}
                  className="p-3 border rounded w-full text-sm text-left"
                  style={{
                    minHeight: '48px',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    boxShadow: 'none'
                  }}
                >
                  <span className={source ? 'text-gray-900' : 'text-gray-500'}>
                    {source ? source.value.structured_formatting.main_text : 'Source'}
                  </span>
                </button>
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-10 h-10 bg-white border-l-2 border-r-2 border-gray-200 border-t-none border-b-none rounded-full flex items-center justify-center">
                <span className="text-xs">⇌</span>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="relative">
                <button
                  onClick={() => setShowDestinationOverlay(true)}
                  className="p-3 border rounded w-full text-sm text-left"
                  style={{
                    minHeight: '48px',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    boxShadow: 'none'
                  }}
                >
                  <span className={destination ? 'text-gray-900' : 'text-gray-500'}>
                    {destination ? destination.value.structured_formatting.main_text : 'Destination'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Date Inputs */}
        {/* Date Input */}
       {/* Date Inputs - Updated to show both depart and return dates */}
<div className="flex gap-2">
  <div className="flex-1">
    <input
      type="date"
      value={formatDateForInput(departDate)}
      onChange={handleDepartDateChange}
      min={formatDateForInput(new Date())}
      className="p-3 border rounded w-full text-sm"
      style={{
        minHeight: '48px',
        border: '1px solid #d1d5db',
        borderRadius: '0.375rem'
      }}
    />
  </div>
  
  <div className="flex-1">
    <input
      type="date"
      value={formatDateForInput(returnDate)}
      onChange={handleReturnDateChange}
      min={formatDateForInput(departDate) || formatDateForInput(new Date())}
      className="p-3 border rounded w-full text-sm"
      style={{
        minHeight: '48px',
        border: '1px solid #d1d5db',
        borderRadius: '0.375rem'
      }}
    />
  </div>
</div>

          {/* Bottom Row with Trip Type, Passengers, Class */}
          <div className="flex gap-2">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <button
                  className="p-3 w-full rounded text-sm flex items-center justify-between"
                  style={{
                    minHeight: '48px',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                  }}
                  onClick={() => setShowTripDropdown(prev => !prev)}
                >
                  <span>{tripOptions.find(option => option.value === tripType)?.label}</span>
                  <span className="text-gray-900"><RiArrowDropDownLine className='text-2xl'/></span>
                </button>

                {showTripDropdown && (
                  <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow z-10">
                    {tripOptions.map(option => (
                      <div
                        key={option.value}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                          option.value === tripType ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => {
                          setTripType(option.value as "roundTrip" | "oneWay");
                          setShowTripDropdown(false);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="p-3 border rounded text-sm flex items-center justify-between"
                   style={{
                     minHeight: '48px',
                     border: '1px solid #d1d5db',
                     borderRadius: '0.375rem'
                   }}>
                <span>1</span>
                <span className="text-gray-900"><RiArrowDropDownLine className='text-2xl'/></span>
              </div>
            </div>
            
            <div className="flex-1">
              <select
                value={flightClass}
                onChange={(e) => setFlightClass(e.target.value)}
                className="p-3 border rounded w-full text-sm appearance-none"
                style={{
                  minHeight: '48px',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem'
                }}
              >
                <option>Economy</option>
                <option>Business</option>
                <option>First</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={isSearchDisabled()}
            className={`w-full bg-[#8c6d73] text-white py-3 rounded-md hover:bg-[#8a767a] transition-colors font-medium ${
              isSearchDisabled() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Explore
          </button>
        </div>

        {/* Desktop Layout (unchanged from original) */}
        <div className="hidden md:flex flex-col md:flex-row items-center gap-3 w-full">
          {/* Source and Destination */}
          <div className="flex flex-col sm:flex-row w-full gap-3">
            <div className="w-full sm:w-1/2 relative">
              <label className="block text-xs text-gray-500 mb-1">FROM</label>
              <div className="relative">
                <input
                  type="text"
                  value={source?.value.structured_formatting.main_text || ''}
                  placeholder="City or Airport"
                  className="p-2 border rounded w-full text-sm sm:text-base"
                  readOnly
                  style={{
                    minHeight: '40px',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    boxShadow: 'none'
                  }}
                />
              </div>
            </div>

            <div className="hidden sm:flex items-center justify-center text-2xl mt-6">⇌</div>

            <div className="w-full sm:w-1/2 relative">
              <label className="block text-xs text-gray-500 mb-1">TO</label>
              <div className="relative">
                <input
                  type="text"
                  value={destination?.value.structured_formatting.main_text || ''}
                  placeholder="City or Airport"
                  className="p-2 border rounded w-full text-sm sm:text-base"
                  readOnly
                  style={{
                    minHeight: '40px',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    boxShadow: 'none'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Dates and Class */}
          <div className="flex flex-col sm:flex-row w-full gap-3">
          <div className="w-full sm:w-1/3">
            <label className="block text-xs text-gray-500 mb-1">DEPART</label>
            <input
              type="date"
              value={formatDateForInput(departDate)}
              onChange={handleDepartDateChange}
              min={formatDateForInput(new Date())}
              className="p-2 border rounded w-full text-sm sm:text-base"
              style={{
                minHeight: '40px',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem'
              }}
            />
          </div>

          <div className="w-full sm:w-1/3">
            <label className="block text-xs text-gray-500 mb-1">RETURN</label>
            <input
              type="date"
              value={formatDateForInput(returnDate)}
              onChange={handleReturnDateChange}
              min={formatDateForInput(departDate) || formatDateForInput(new Date())}
              className="p-2 border rounded w-full text-sm sm:text-base"
              style={{
                minHeight: '40px',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem'
              }}
            />
          </div>

          <div className="w-full sm:w-1/3">
            <label className="block text-xs text-gray-500 mb-1">CLASS</label>
            <select
              value={flightClass}
              onChange={(e) => setFlightClass(e.target.value)}
              className="p-2 border rounded w-full text-sm sm:text-base"
              style={{
                minHeight: '40px',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem'
              }}
            >
              <option>Economy</option>
              <option>Business</option>
              <option>First</option>
            </select>
          </div>
        </div>
          <button
            onClick={handleSearch}
            className="mt-2 sm:mt-4 bg-[#8c6d73] text-white px-6 py-2 rounded-full hover:bg-[#8a767a] w-full sm:w-auto transition-colors"
          >
            Search 
          </button>
        </div>
      </div>

      {/* Mobile Overlays */}
      <MobileOverlay
        isVisible={showSourceOverlay}
        onClose={() => setShowSourceOverlay(false)}
        title="Source city/airport code"
        searchValue={sourceSearchInput}
        onSearchChange={setSourceSearchInput}
        places={filteredSourcePlaces}
        onPlaceSelect={selectSource}
      />

      <MobileOverlay
        isVisible={showDestinationOverlay}
        onClose={() => setShowDestinationOverlay(false)}
        title="Destination city/airport code"
        searchValue={destinationSearchInput}
        onSearchChange={setDestinationSearchInput}
        places={filteredDestinationPlaces}
        onPlaceSelect={selectDestination}
      />
    </>
  );
};

export default FlightSearchBar;
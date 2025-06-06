import React, { useState, useRef, useEffect } from 'react';

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
  const [departDate, setDepartDate] = useState<Date | null>();
  const [returnDate, setReturnDate] = useState<Date | null>();
  const [flightClass, setFlightClass] = useState<string>('Economy');

  const isSearchDisabled = () => {
    return !source || !destination || !departDate;
  };
  
  const from = sessionStorage.getItem('source') || '';
    const to = sessionStorage.getItem('destination') || '';
    const departureDate = sessionStorage.getItem('departureDate');

  const handleDepartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setDepartDate(newDate);
    
    // If return date is before the new depart date, update return date too
    if (returnDate && newDate > returnDate) {
      const newReturnDate = new Date(newDate);
      newReturnDate.setDate(newReturnDate.getDate() + 1);
      setReturnDate(newReturnDate);
    }
  };

  const [tripType, setTripType] = useState<"oneWay">("oneWay");
  const tripOptions = [
    { label: "One Way", value: "oneWay" }
  ];

  const handleReturnDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setReturnDate(newDate);
  };

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
  };

  const handleClearDestination = () => {
    setDestination(null);
    setDestinationInput('');
  };

  const formatDateForInput = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const formatDateForDisplay = (date: Date | null) => {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Mock autocomplete functionality for demo
  const mockPlaces = [
    { name: "Mumbai", fullName: "Mumbai, Maharashtra, India" },
    { name: "Delhi", fullName: "New Delhi, Delhi, India" },
    { name: "Bangalore", fullName: "Bangalore, Karnataka, India" },
    { name: "Chennai", fullName: "Chennai, Tamil Nadu, India" },
    { name: "Kolkata", fullName: "Kolkata, West Bengal, India" },
    { name: "Hyderabad", fullName: "Hyderabad, Telangana, India" },
    { name: "Pune", fullName: "Pune, Maharashtra, India" },
    { name: "Ahmedabad", fullName: "Ahmedabad, Gujarat, India" }
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
  };

  const handleDestinationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDestinationInput(value);
    setShowDestinationSuggestions(value.length > 0);
    if (!value) setDestination(null);
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
    setSourceInput(place.fullName);
    setShowSourceSuggestions(false);
  };

  const [showTripDropdown, setShowTripDropdown] = useState(false);

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
    setDestinationInput(place.fullName);
    setShowDestinationSuggestions(false);
  };

  const filteredSourcePlaces = mockPlaces.filter(place => 
    place.name.toLowerCase().includes(sourceInput.toLowerCase()) ||
    place.fullName.toLowerCase().includes(sourceInput.toLowerCase())
  );

  const filteredDestinationPlaces = mockPlaces.filter(place => 
    place.name.toLowerCase().includes(destinationInput.toLowerCase()) ||
    place.fullName.toLowerCase().includes(destinationInput.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 p-4 bg-white shadow w-full mx-auto">
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

      {/* Mobile Layout */}
      <div className="md:hidden w-full space-y-3">
        {/* Source and Destination Row */}
        <div className="flex gap-5 relative">
          <div className="flex-1 relative">
            <div className="relative">
              <input
                type="text"
                value={sourceInput}
                onChange={handleSourceInputChange}
                onFocus={() => setShowSourceSuggestions(sourceInput.length > 0)}
                onBlur={() => setTimeout(() => setShowSourceSuggestions(false), 150)}
                placeholder="Source"
                className="p-3 border rounded w-full text-sm pr-4"
                style={{
                  minHeight: '48px',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  boxShadow: 'none',
                  fontSize: '16px' // Prevent zoom on iOS
                }}
              />
              {showSourceSuggestions && filteredSourcePlaces.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1">
                  {filteredSourcePlaces.map((place, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {selectSource(place);sessionStorage.setItem('source',place.name)}}
                    >
                      <div className="font-medium">{place.name}</div>
                      <div className="text-sm text-gray-500">{place.fullName}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-10 h-10 bg-white border-l-2 border-r-2 border-gray-200 border-t-none border-b-none rounded-full flex items-center justify-center">
              <span className="text-xs">⇌</span>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative">
              <input
                type="text"
                value={destinationInput}
                onChange={handleDestinationInputChange}
                onFocus={() => setShowDestinationSuggestions(destinationInput.length > 0)}
                onBlur={() => setTimeout(() => setShowDestinationSuggestions(false), 150)}
                placeholder="Destination"
                className="p-3 border rounded w-full text-sm pl-4"
                style={{
                  minHeight: '48px',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  boxShadow: 'none',
                  fontSize: '16px' // Prevent zoom on iOS
                }}
              />
              {showDestinationSuggestions && filteredDestinationPlaces.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1">
                  {filteredDestinationPlaces.map((place, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {selectDestination(place);sessionStorage.setItem('destination',place.name)}}
                    >
                      <div className="font-medium">{place.name}</div>
                      <div className="text-sm text-gray-500">{place.fullName}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Date Input */}
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
                <span className="text-gray-900"></span>
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
                        setTripType(option.value as "oneWay");
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
              <span className="text-gray-900">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
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
                borderRadius: '0.375rem',
                fontSize: '16px' // Prevent zoom on iOS
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

      {/* Desktop Layout (unchanged) */}
      <div className="hidden md:flex flex-col md:flex-row items-center gap-3 w-full">
        {/* Source and Destination */}
        <div className="flex flex-col sm:flex-row w-full gap-3">
          <div className="w-full sm:w-1/2 relative">
            <label className="block text-xs text-gray-500 mb-1">FROM</label>
            <div className="relative">
              <input
                type="text"
                value={sourceInput}
                onChange={handleSourceInputChange}
                onFocus={() => setShowSourceSuggestions(sourceInput.length > 0)}
                onBlur={() => setTimeout(() => setShowSourceSuggestions(false), 150)}
                placeholder="City or Airport"
                className="p-2 border rounded w-full text-sm sm:text-base"
                style={{
                  minHeight: '40px',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  boxShadow: 'none'
                }}
              />
              {source && (
                <button
                  onClick={() => {
                    handleClearSource();
                    setSourceInput('');
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
              {showSourceSuggestions && filteredSourcePlaces.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1">
                  {filteredSourcePlaces.map((place, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => selectSource(place)}
                    >
                      <div className="font-medium">{place.name}</div>
                      <div className="text-sm text-gray-500">{place.fullName}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hidden sm:flex items-center justify-center text-2xl mt-6">⇌</div>

          <div className="w-full sm:w-1/2 relative">
            <label className="block text-xs text-gray-500 mb-1">TO</label>
            <div className="relative">
              <input
                type="text"
                value={destinationInput}
                onChange={handleDestinationInputChange}
                onFocus={() => setShowDestinationSuggestions(destinationInput.length > 0)}
                onBlur={() => setTimeout(() => setShowDestinationSuggestions(false), 150)}
                placeholder="City or Airport"
                className="p-2 border rounded w-full text-sm sm:text-base"
                style={{
                  minHeight: '40px',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  boxShadow: 'none'
                }}
              />
              {destination && (
                <button
                  onClick={() => {
                    handleClearDestination();
                    setDestinationInput('');
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
              {showDestinationSuggestions && filteredDestinationPlaces.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1">
                  {filteredDestinationPlaces.map((place, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => selectDestination(place)}
                    >
                      <div className="font-medium">{place.name}</div>
                      <div className="text-sm text-gray-500">{place.fullName}</div>
                    </div>
                  ))}
                </div>
              )}
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
  );
};

export default FlightSearchBar;
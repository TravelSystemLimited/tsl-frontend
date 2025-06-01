import React, { useState, useRef } from 'react';

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

  const handleReturnDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReturnDate(new Date(e.target.value));
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
  };

  const handleClearDestination = () => {
    setDestination(null);
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
    setSource({
      label: place.fullName,
      value: {
        description: place.fullName,
        place_id: place.name.toLowerCase(),
        structured_formatting: {
          main_text: place.name,
          secondary_text: place.fullName.replace(`${place.name}, `, '')
        }
      }
    });
    setSourceInput(place.fullName);
    setShowSourceSuggestions(false);
  };

  const selectDestination = (place: typeof mockPlaces[0]) => {
    setDestination({
      label: place.fullName,
      value: {
        description: place.fullName,
        place_id: place.name.toLowerCase(),
        structured_formatting: {
          main_text: place.name,
          secondary_text: place.fullName.replace(`${place.name}, `, '')
        }
      }
    });
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
    <div className="flex flex-col md:flex-row items-center gap-3 p-4 bg-white shadow  w-full  mx-auto">
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
                    onMouseDown={(e) => e.preventDefault()} // Prevent blur from firing
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
                    onMouseDown={(e) => e.preventDefault()} // Prevent blur from firing
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
  );
};

export default FlightSearchBar;
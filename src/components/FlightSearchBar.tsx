import { Search } from 'lucide-react';
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
  const [departDate, setDepartDate] = useState<Date | null>(new Date());
  const [returnDate, setReturnDate] = useState<Date | null>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  });
  const [flightClass, setFlightClass] = useState<string>('Economy');

  // Mobile modal states
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [modalType, setModalType] = useState<'source' | 'destination'>('source');
  const [mobileSearchInput, setMobileSearchInput] = useState('');

  const handleDepartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setDepartDate(newDate);
    // Note: Removed sessionStorage usage as it's not supported in Claude artifacts
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
    { name: "Mumbai", fullName: "Mumbai, Maharashtra, India", code: "BOM" },
    { name: "Delhi", fullName: "New Delhi, Delhi, India", code: "DEL" },
    { name: "Bangalore", fullName: "Bangalore, Karnataka, India", code: "BLR" },
    { name: "Chennai", fullName: "Chennai, Tamil Nadu, India", code: "MAA" },
    { name: "Kolkata", fullName: "Kolkata, West Bengal, India", code: "CCU" },
    { name: "Hyderabad", fullName: "Hyderabad, Telangana, India", code: "HYD" },
    { name: "Pune", fullName: "Pune, Maharashtra, India", code: "PNQ" },
    { name: "Ahmedabad", fullName: "Ahmedabad, Gujarat, India", code: "AMD" }
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

  // Mobile modal functions
  const openMobileModal = (type: 'source' | 'destination') => {
    setModalType(type);
    setMobileSearchInput(type === 'source' ? sourceInput : destinationInput);
    setShowMobileModal(true);
  };

  const closeMobileModal = () => {
    setShowMobileModal(false);
    setMobileSearchInput('');
  };

  const handleMobileSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobileSearchInput(e.target.value);
  };

  const selectMobilePlace = (place: typeof mockPlaces[0]) => {
    if (modalType === 'source') {
      selectSource(place);
    } else {
      selectDestination(place);
    }
    closeMobileModal();
  };

  const filteredMobilePlaces = mockPlaces.filter(place => 
    place.name.toLowerCase().includes(mobileSearchInput.toLowerCase()) ||
    place.fullName.toLowerCase().includes(mobileSearchInput.toLowerCase()) ||
    place.code.toLowerCase().includes(mobileSearchInput.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-3 p-4 bg-white shadow w-full mx-auto">
        {/* Mobile Layout */}
        <div className="block md:hidden w-full">
          {/* Top Navigation Tabs */}
          <div className="flex bg-white border-b border-gray-200">
          <button className="flex-1 px-4 py-3 text-center text-gray-900 border-b-2 border-red-500 font-medium">
            Flights
          </button>
          <button className="flex-1 px-4 py-3 text-center text-gray-500 border-b-2 border-transparent">
            Hotels
          </button>
          <button className="flex-1 px-4 py-3 text-center text-gray-500 border-b-2 border-transparent">
            Cabs
          </button>
        </div>

          {/* Origin and Destination - Mobile Stack */}
          <div className="bg-white rounded-lg border border-gray-200 mt-4 mb-4 relative">
            {/* Origin */}
            <div className="relative border-b border-gray-200">
              <div className="flex items-center p-4" onClick={() => openMobileModal('source')}>
                <div className="w-3 h-3 rounded-full bg-gray-400 mr-3 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">Origin</div>
                  <div className="text-base font-medium text-gray-900">
                    {source ? source.value.structured_formatting.main_text : 'Origin'}
                  </div>
                </div>
                {source && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearSource();
                      setSourceInput('');
                    }}
                    className="text-gray-400 hover:text-gray-600 ml-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Swap Icon */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
              <button className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
                  <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
                </svg>
              </button>
            </div>

            {/* Destination */}
            <div className="relative">
              <div className="flex items-center p-4" onClick={() => openMobileModal('destination')}>
                <div className="w-3 h-3 rounded-full bg-gray-400 mr-3 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">Destination</div>
                  <div className="text-base font-medium text-gray-900">
                    {destination ? destination.value.structured_formatting.main_text : 'Destination'}
                  </div>
                </div>
                {destination && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearDestination();
                      setDestinationInput('');
                    }}
                    className="text-gray-400 hover:text-gray-600 ml-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Dates Row - Mobile */}
          <div className="flex gap-2 mb-4">
            <div className="flex-1 bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-xs text-gray-500 mb-1">Departure</div>
              <input
                type="date"
                value={formatDateForInput(departDate)}
                onChange={handleDepartDateChange}
                min={formatDateForInput(new Date())}
                className="w-full text-base font-medium text-gray-900 bg-transparent border-none outline-none p-0"
              />
            </div>
            <div className="flex-1 bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-xs text-gray-500 mb-1">Return</div>
              <input
                type="date"
                value={formatDateForInput(returnDate)}
                onChange={handleReturnDateChange}
                min={formatDateForInput(departDate) || formatDateForInput(new Date())}
                className="w-full text-base font-medium text-gray-900 bg-transparent border-none outline-none p-0"
              />
            </div>
          </div>

          {/* Bottom Row - Mobile */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2">Round trip</span>
              <span className="text-sm text-gray-500 mr-4">👤 1</span>
              <select
                value={flightClass}
                onChange={(e) => setFlightClass(e.target.value)}
                className="text-sm text-gray-700 bg-transparent border-none outline-none"
              >
                <option>Economy</option>
                <option>Business</option>
                <option>First</option>
              </select>
            </div>
          </div>

          {/* Explore Button - Mobile */}
          <button
            onClick={handleSearch}
            className="w-full bg-[#8c6d73] text-white py-3 rounded-lg font-medium text-base flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Explore
          </button>

        </div>

        {/* Desktop Layout - Unchanged */}
        <div className="hidden md:flex md:flex-row items-center gap-3 w-full">
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

      {/* Mobile Modal Overlay */}
      {showMobileModal && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button onClick={closeMobileModal} className="text-gray-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <h2 className="text-lg font-medium text-gray-900">
              {modalType === 'source' ? 'Select Origin' : 'Select Destination'}
            </h2>
            <button onClick={closeMobileModal} className="text-gray-600">
              ✕
            </button>
          </div>

          {/* Search Input */}
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              value={mobileSearchInput}
              onChange={handleMobileSearchChange}
              placeholder={modalType === 'source' ? 'Origin city/airport code' : 'Destination city/airport code'}
              className="w-full p-3 border border-gray-300 rounded-lg text-base"
              autoFocus
            />
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto">
            {filteredMobilePlaces.map((place, index) => (
              <div
                key={index}
                className="flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
                onClick={() => selectMobilePlace(place)}
              >
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-sm font-medium text-gray-600">{place.code}</span>
                </div>
                <div className="flex-1">
                  <div className="text-base font-medium text-gray-900">{place.name}</div>
                  <div className="text-sm text-gray-500">{place.fullName}</div>
                </div>
              </div>
            ))}
            
            {filteredMobilePlaces.length === 0 && mobileSearchInput && (
              <div className="p-4 text-center text-gray-500">
                No results found for "{mobileSearchInput}"
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FlightSearchBar;
// src/pages/RequestDetailsPage.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from 'lucide-react';
import { Plane, Hotel, Car, MapPin, User, Calendar } from 'lucide-react';
import { MdFlightLand, MdFlightTakeoff } from 'react-icons/md';
import { IoLocationSharp } from 'react-icons/io5';
import { TbClockCancel } from 'react-icons/tb';
import Header from '../ui/header';

interface BookingDetails {
  flight?: {
    airline: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    departureDate: string;
    price: number;
  };
  hotel?: {
    name: string;
    location: string;
    amenities: string[];
    address: string;
    price: number;
    checkInDate: string;
    checkOutDate: string;
  };
  cab?: {
    type: string;
    capacity: number;
    price: number;
    pickupLocation: string;
    dropLocation: string;
    pickupTime: string;
    pickupDate: string;
  };
}

interface PendingRequest {
  id: string;
  employeeName: string;
  employeeEmail: string;
  requestType: 'flight' | 'hotel' | 'taxi' | 'package';
  destination: string;
  departureDate: string;
  returnDate: string;
  cost: number;
  priority: 'low' | 'medium' | 'high';
  details: string;
  bookingDetails: BookingDetails;
}

const RequestDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialRequest = location.state?.request as PendingRequest;
  
  // State for current request and alternatives
  const [currentRequest, setCurrentRequest] = useState<PendingRequest>(initialRequest);
  const [alternativeFlights, setAlternativeFlights] = useState<BookingDetails['flight'][]>([]);
  const [alternativeHotels, setAlternativeHotels] = useState<BookingDetails['hotel'][]>([]);
  const [alternativeCabs, setAlternativeCabs] = useState<BookingDetails['cab'][]>([]);

  // Initialize alternatives
  useEffect(() => {
    if (currentRequest.bookingDetails.flight) {
      setAlternativeFlights([
        {
          airline: "IndiGo",
          from: currentRequest.bookingDetails.flight.from,
          to: currentRequest.bookingDetails.flight.to,
          departureTime: "10:15 AM",
          arrivalTime: "1:00 PM",
          departureDate: currentRequest.bookingDetails.flight.departureDate,
          price: currentRequest.bookingDetails.flight.price - 2000
        },
        {
          airline: "SpiceJet",
          from: currentRequest.bookingDetails.flight.from,
          to: currentRequest.bookingDetails.flight.to,
          departureTime: "12:30 PM",
          arrivalTime: "3:15 PM",
          departureDate: currentRequest.bookingDetails.flight.departureDate,
          price: currentRequest.bookingDetails.flight.price - 1500
        }
      ]);
    }

    if (currentRequest.bookingDetails.hotel) {
      setAlternativeHotels([
        {
          name: "Taj Hotel",
          location: currentRequest.bookingDetails.hotel.location,
          address: "12-15/a,kilamnah street, near taj hotel,back space",
          amenities: ["Free WiFi", "Breakfast", "Gym"],
          price: currentRequest.bookingDetails.hotel.price - 3000,
          checkInDate: currentRequest.bookingDetails.hotel.checkInDate,
          checkOutDate: currentRequest.bookingDetails.hotel.checkOutDate
        },
        {
          name: "Radisson Blu",
          location: currentRequest.bookingDetails.hotel.location,
          amenities: ["Free WiFi", "Pool", "Spa"],
          address: "12-15/a,kilamnah street, near taj hotel,back space",
          price: currentRequest.bookingDetails.hotel.price - 2000,
          checkInDate: currentRequest.bookingDetails.hotel.checkInDate,
          checkOutDate: currentRequest.bookingDetails.hotel.checkOutDate
        }
      ]);
    }

    if (currentRequest.bookingDetails.cab) {
      setAlternativeCabs([
        {
          type: "Standard Sedan",
          capacity: 4,
          price: currentRequest.bookingDetails.cab.price - 500,
          pickupLocation: currentRequest.bookingDetails.cab.pickupLocation,
          dropLocation: currentRequest.bookingDetails.cab.dropLocation,
          pickupTime: currentRequest.bookingDetails.cab.pickupTime,
          pickupDate: currentRequest.bookingDetails.cab.pickupDate
        },
        {
          type: "Compact Car",
          capacity: 4,
          price: currentRequest.bookingDetails.cab.price - 800,
          pickupLocation: currentRequest.bookingDetails.cab.pickupLocation,
          dropLocation: currentRequest.bookingDetails.cab.dropLocation,
          pickupTime: currentRequest.bookingDetails.cab.pickupTime,
          pickupDate: currentRequest.bookingDetails.cab.pickupDate
        }
      ]);
    }
  }, [currentRequest]);

const handleSelectFlight = (selectedFlight: BookingDetails['flight']) => {
  if (!currentRequest.bookingDetails.flight || !selectedFlight) return;

  // Get current flight details (this will be moved to alternatives)
  const currentFlight = { ...currentRequest.bookingDetails.flight };
  
  // Remove the selected flight from alternatives
  const filteredAlternatives = alternativeFlights.filter(f => 
    !(f.airline === selectedFlight.airline && 
      f.departureTime === selectedFlight.departureTime &&
      f.arrivalTime === selectedFlight.arrivalTime &&
      f.price === selectedFlight.price)
  );

  // Add the current flight to alternatives
  const newAlternatives = [...filteredAlternatives, currentFlight];

  // Calculate new total cost
  const newTotalCost = 
    selectedFlight.price +
    (currentRequest.bookingDetails?.hotel?.price || 0) +
    (currentRequest.bookingDetails?.cab?.price || 0);

  // Update current request with selected flight
  setCurrentRequest({
    ...currentRequest,
    cost: newTotalCost, // Update the total cost
    bookingDetails: {
      ...currentRequest.bookingDetails,
      flight: { ...selectedFlight } // Ensure we copy all properties
    }
  });
  
  // Update alternatives
  setAlternativeFlights(newAlternatives);
};

const handleSelectHotel = (selectedHotel: BookingDetails['hotel']) => {
  if (!currentRequest.bookingDetails.hotel || !selectedHotel) return;

  const currentHotel = { ...currentRequest.bookingDetails.hotel };
  
  const filteredAlternatives = alternativeHotels.filter(h => 
    !(h.name === selectedHotel.name && 
      h.location === selectedHotel.location &&
      h.price === selectedHotel.price)
  );

  const newAlternatives = [...filteredAlternatives, currentHotel];

  // Calculate new total cost
  const newTotalCost = 
    (currentRequest.bookingDetails?.flight?.price || 0) +
    selectedHotel.price +
    (currentRequest.bookingDetails?.cab?.price || 0);

  setCurrentRequest({
    ...currentRequest,
    cost: newTotalCost,
    bookingDetails: {
      ...currentRequest.bookingDetails,
      hotel: { ...selectedHotel } // Ensure we copy all properties
    }
  });
  
  setAlternativeHotels(newAlternatives);
};

const handleSelectCab = (selectedCab: BookingDetails['cab']) => {
  if (!currentRequest.bookingDetails.cab || !selectedCab) return;

  const currentCab = { ...currentRequest.bookingDetails.cab };
  
  const filteredAlternatives = alternativeCabs.filter(c => 
    !(c.type === selectedCab.type && 
      c.pickupTime === selectedCab.pickupTime &&
      c.pickupLocation === selectedCab.pickupLocation &&
      c.price === selectedCab.price)
  );

  const newAlternatives = [...filteredAlternatives, currentCab];

  // Calculate new total cost
  const newTotalCost = 
    (currentRequest.bookingDetails?.flight?.price || 0) +
    (currentRequest.bookingDetails?.hotel?.price || 0) +
    selectedCab.price;

  setCurrentRequest({
    ...currentRequest,
    cost: newTotalCost,
    bookingDetails: {
      ...currentRequest.bookingDetails,
      cab: { ...selectedCab } // Ensure we copy all properties
    }
  });
  
  setAlternativeCabs(newAlternatives);
};
 useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleApprove = () => {
    // Store the approved request data for the pending requests component
    const approvalData = {
      requestId: currentRequest.id,
      action: 'approved',
      timestamp: Date.now()
    };
    
    // Set multiple storage keys to ensure the message gets through
    sessionStorage.setItem('requestAction', JSON.stringify(approvalData));
    sessionStorage.setItem('approvedRequestId', currentRequest.id);
    sessionStorage.setItem('lastActionTimestamp', Date.now().toString());
    
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('requestStatusChanged', {
      detail: approvalData
    }));
    
    console.log("Approved request:", currentRequest);
    navigate('/dashboard/requests');
  };

  const handleReject = () => {
    // Store the rejected request data for the pending requests component
    const rejectionData = {
      requestId: currentRequest.id,
      action: 'rejected',
      timestamp: Date.now()
    };
    
    // Set multiple storage keys to ensure the message gets through
    sessionStorage.setItem('requestAction', JSON.stringify(rejectionData));
    sessionStorage.setItem('rejectedRequestId', currentRequest.id);
    sessionStorage.setItem('lastActionTimestamp', Date.now().toString());
    
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('requestStatusChanged', {
      detail: rejectionData
    }));
    
    console.log("Rejected request:", currentRequest.id);
    navigate('/dashboard/requests');
  };

  return (
    <>
    <Header username='Manager'/>
    <div className="container mx-auto p-4 ">

      <h1 className="text-xl font-bold mb-6 text-[#3b3b3b]">Travel Request Details</h1>
      
      {/* Employee Info */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text- font-semibold mb-2">{currentRequest.employeeName}</h2>
        <p className="text-gray-600">{currentRequest.employeeEmail}</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Trip Dates</p>
            <p>{currentRequest.departureDate} to {currentRequest.returnDate}</p>
          </div>
          <div>
            <p className="font-medium">Destination</p>
            <p>{currentRequest.destination}</p>
          </div>
        </div>
      </div>

      {/* Flight Section */}
   
{currentRequest.bookingDetails.flight && (
  <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
              <Plane className="h-5 w-5 text-[#8C6D73]" />
              <h2 className="text-xl font-semibold">Selected Flight</h2>
            </div>
    {/* Selected Flight */}
    <div className="bg-white shadow-md rounded-xl p-4 w-full mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Plane className="h-5 w-5 text-[#8C6D73]" />
          <span className="font-semibold text-gray-800">
            Selected Flight - {currentRequest.bookingDetails.flight.airline}
          </span>
        </div>
        <div className="bg-gray-200 text-gray-700 text-xs px-2 py-1 text-nowrap rounded-full">
          Current Selection
        </div>
      </div>

      <div className="flex flex-row justify-between items-center mt-4 gap-2 sm:gap-4">
        <div className="text-left">
          <p className="text-lg font-semibold">{currentRequest.bookingDetails.flight.departureTime}</p>
          <p className="text-xs text-gray-600">{currentRequest.bookingDetails.flight.departureDate}</p>
          <p className="text-sm font-medium text-gray-700">{currentRequest.bookingDetails.flight.from}</p>
        </div>

        <div className="flex gap-2 items-center">
          <MdFlightTakeoff className="w-5 h-5 text-gray-500 mb-1" />
          <div className="w-16 md:w-32 border-t border-gray-300" />
          <MdFlightLand className="w-5 h-5 text-gray-500 mb-1" />
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold">{currentRequest.bookingDetails.flight.arrivalTime}</p>
          <p className="text-xs text-gray-600">
            {currentRequest.bookingDetails.flight.departureDate} {/* Assuming same day arrival */}
          </p>
          <p className="text-sm font-medium text-gray-700">{currentRequest.bookingDetails.flight.to}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-800">
          ₹ {currentRequest.bookingDetails.flight.price.toLocaleString()}
        </p>
      </div>
    </div>

    {/* Alternative Flights */}
    <h3 className="text-lg font-semibold mb-4">Alternative Flight Options</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {alternativeFlights.map((flight, index) => (
        <div key={`${flight.airline}-${index}`} className="bg-white shadow-md rounded-xl p-4 transition hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-[#8C6D73]" />
              <span className="font-semibold text-gray-800">{flight.airline}</span>
            </div>
            <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full">
              Save ₹{(currentRequest.bookingDetails.flight.price - flight.price).toLocaleString()}
            </span>
          </div>

          <div className="flex flex-row justify-between items-center mt-4 gap-2 sm:gap-4">
            <div className="text-left">
              <p className="text-lg font-semibold">{flight.departureTime}</p>
              <p className="text-xs text-gray-600">{flight.departureDate}</p>
              <p className="text-sm font-medium text-gray-700">{flight.from}</p>
            </div>

            <div className="flex gap-2 items-center">
              <MdFlightTakeoff className="w-5 h-5 text-gray-500 mb-1" />
              <div className="w-16 md:w-32 border-t border-gray-300" />
              <MdFlightLand className="w-5 h-5 text-gray-500 mb-1" />
            </div>

            <div className="text-right">
              <p className="text-lg font-semibold">{flight.arrivalTime}</p>
              <p className="text-xs text-gray-600">{flight.departureDate}</p>
              <p className="text-sm font-medium text-gray-700">{flight.to}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-800">
              ₹ {flight.price.toLocaleString()}
            </p>
            <Button 
              onClick={() => handleSelectFlight(flight)}
              className="bg-[#8C6D73] hover:bg-[#937878] text-white"
            >
              Select
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

      {/* Hotel Section */}
   
{currentRequest.bookingDetails.hotel && (
  <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
              <Hotel className="h-5 w-5 text-[#8C6D73]" />
              <h2 className="text-xl font-semibold">Selected Hotel</h2>
            </div>

    {/* Selected Hotel */}
    <div className="flex flex-col md:flex-row w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mb-6">
    
      <div className="flex flex-col justify-between p-4 w-full md:w-2/3 text-left">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-md font-semibold text-gray-800 mb-1">
              {currentRequest.bookingDetails.hotel.name}
            </h3>
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
              Current Selection
            </span>
          </div>
          <div className="flex items-start text-sm text-gray-600">
            <MapPin className="h-4 w-4 mt-1 mr-1 text-gray-500" />
            <p className="leading-tight">{currentRequest.bookingDetails.hotel.address}</p>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">Amenities</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {currentRequest.bookingDetails.hotel.amenities.map((amenity, index) => (
                <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-gray-500">Check-in</p>
              <p className="font-medium text-sm">{currentRequest.bookingDetails.hotel.checkInDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Check-out</p>
              <p className="font-medium text-sm">{currentRequest.bookingDetails.hotel.checkOutDate}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-base font-medium text-gray-800">
            ₹ {currentRequest.bookingDetails.hotel.price.toLocaleString()}
          </p>
        </div>
      </div>
    </div>

    {/* Alternative Hotels */}
    <h3 className="text-lg font-semibold mb-4">Alternative Hotel Options</h3>
    <div className="grid grid-cols-1 gap-4">
      {alternativeHotels.map((hotel, index) => (
        <div key={`${hotel.name}-${index}`} className="flex flex-col md:flex-row w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg">
        
          <div className="flex flex-col justify-between p-4 w-full md:w-2/3 text-left">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-md font-semibold text-gray-800 mb-1">{hotel.name}</h3>
                <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full">
                  Save ₹{(currentRequest.bookingDetails.hotel.price - hotel.price).toLocaleString()}
                </span>
              </div>
              <div className="flex items-start text-sm text-gray-600">
                <MapPin className="h-4 w-4 mt-1 mr-1 text-gray-500" />
                <p className="leading-tight">{hotel.address}</p>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Amenities</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {hotel.amenities.map((amenity, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-500">Check-in</p>
                  <p className="font-medium text-sm">{hotel.checkInDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Check-out</p>
                  <p className="font-medium text-sm">{hotel.checkOutDate}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className="text-base font-medium text-gray-800">
                ₹ {hotel.price.toLocaleString()}
              </p>
              <Button 
                onClick={() => handleSelectHotel(hotel)}
                className="bg-[#8C6D73] hover:bg-[#937878] text-white"
              >
                Select
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
      {/* Cab Section */}
     
{currentRequest.bookingDetails.cab && (
  <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
              <Car className="h-5 w-5 text-[#8C6D73]" />
              <h2 className="text-xl font-semibold">Selected Transportation</h2>
            </div>
    {/* Selected Cab */}
    <div className="flex flex-col md:flex-row items-start bg-white rounded-lg shadow-md p-4 gap-4 w-full mb-6">
      
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">
            {currentRequest.bookingDetails.cab.type}
          </h3>
          <div className="flex  items-center gap-1 bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded">
            Current Selection
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {currentRequest.bookingDetails.cab.type}, {currentRequest.bookingDetails.cab.capacity} seats
        </p>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-4 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <IoLocationSharp className="w-4 h-4 text-green-600 mt-0.5" />
            Pickup Location
          </div>
          <div className="flex items-start gap-2">
            {currentRequest.bookingDetails.cab.pickupLocation}
          </div>
          <div className="flex items-start gap-2">
            <IoLocationSharp className="w-4 h-4 text-green-600 mt-0.5" />
            Drop Location
          </div>
          <div className="flex items-start gap-2">
            {currentRequest.bookingDetails.cab.dropLocation}
          </div>
          <div className="flex items-start gap-2">
            <TbClockCancel className="w-4 h-4 text-green-600 mt-0.5" />
            Pickup Time
          </div>
          <div className="flex items-start gap-2">
            {currentRequest.bookingDetails.cab.pickupTime}
          </div>
        </div>
        <div className="flex items-center justify-end gap-5 mt-4 ml-52">
          <p className="text-base font-semibold text-gray-800">
            ₹{currentRequest.bookingDetails.cab.price.toLocaleString()}
          </p>
        </div>
      </div>
    </div>

    {/* Alternative Cabs */}
    <h3 className="text-lg font-semibold mb-4">Alternative Cab Options</h3>
    <div className="space-y-4">
      {alternativeCabs.map((cab, index) => (
        <div key={`${cab.type}-${index}`} className="flex flex-col md:flex-row items-start bg-white rounded-lg shadow-md p-4 gap-4 w-full hover:shadow-lg">
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-semibold text-gray-800">{cab.type}</h3>
              <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded">
                Save ₹{(currentRequest.bookingDetails.cab.price - cab.price).toLocaleString()}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {cab.type}, {cab.capacity} seats
            </p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-4 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <IoLocationSharp className="w-4 h-4 text-green-600 mt-0.5" />
                Pickup Location
              </div>
              <div className="flex items-start gap-2">
                {cab.pickupLocation}
              </div>
              <div className="flex items-start gap-2">
                <IoLocationSharp className="w-4 h-4 text-green-600 mt-0.5" />
                Drop Location
              </div>
              <div className="flex items-start gap-2">
                {cab.dropLocation}
              </div>
              <div className="flex items-start gap-2">
                <TbClockCancel className="w-4 h-4 text-green-600 mt-0.5" />
                Pickup Time
              </div>
              <div className="flex items-start gap-2">
                {cab.pickupTime}
              </div>
            </div>
            <div className="flex items-center ml-40 justify-end gap-5 mt-4">
              <p className="text-base font-semibold text-gray-800">
                ₹{cab.price.toLocaleString()}
              </p>
              <Button 
                onClick={() => handleSelectCab(cab)}
                className="bg-[#8C6D73] hover:bg-[#937878] text-white"
              >
                Select
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

      {/* Additional Notes */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">Additional Notes</h3>
        <p>{currentRequest.details}</p>
      </div>

      {/* Total Cost */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Total Estimated Cost</h3>
          <p className="text-2xl font-bold text-[#8C6D73]">
            ₹{
              (currentRequest.bookingDetails?.flight?.price || 0) +
              (currentRequest.bookingDetails?.hotel?.price || 0) +
              (currentRequest.bookingDetails?.cab?.price || 0)
            }
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <Button
          onClick={handleReject}
          variant="destructive"
          className="flex items-center gap-2"
        >
          <XCircle className="h-4 w-4" />
          Reject Request
        </Button>
        <Button
          onClick={handleApprove}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
        >
          <CheckCircle className="h-4 w-4" />
          Approve Request
        </Button>
      </div>
    </div>
    </>
  );
};

export default RequestDetailsPage;
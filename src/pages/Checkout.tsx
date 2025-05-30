import React from 'react';
import { CreditCard, Check, Clock, Calendar, MapPin, User, Plane, Hotel, Car } from 'lucide-react';
import Header from '@/components/ui/header';

const Checkout: React.FC = () => {
  // Hardcoded flight data
  const selectedFlight = {
    airline: "Delta Airlines",
    flightNumber: "DL 1234",
    duration: "2h 45m",
    departureTime: "08:30 AM",
    arrivalTime: "11:15 AM",
    price: 349
  };

  // Hardcoded hotel data
  const selectedHotel = {
    name: "Grand Hyatt",
    location: "New York, NY",
    amenities: ["Free WiFi", "Swimming Pool", "Fitness Center", "Restaurant", "Spa"],
    price: 275,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  };

  // Hardcoded cab data
  const selectedCab = {
    type: "Premium Sedan",
    capacity: 4,
    price: 45,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  };

  const totalPrice = selectedFlight.price + selectedHotel.price + (selectedCab ? selectedCab.price : 0);

  const onCompleteBooking = () => {
    alert("Booking completed successfully!");
    // Here you would typically redirect to a confirmation page or similar
  };

  return (
    <>
    <Header username='Employee' />
    <div className="mt-8 w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Review & Checkout</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center mb-4">
              <Plane size={20} className="text-[#8C6D73] mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Flight Details</h3>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <p className="font-medium text-gray-700">{selectedFlight.airline} - {selectedFlight.flightNumber}</p>
                  <div className="flex items-center mt-2">
                    <Clock size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">{selectedFlight.duration}</span>
                  </div>
                </div>
                <div className="flex items-center mt-3 md:mt-0 space-x-6">
                  <div className="text-center">
                    <p className="font-bold">{selectedFlight.departureTime}</p>
                    <p className="text-sm text-gray-500">Departure</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">{selectedFlight.arrivalTime}</p>
                    <p className="text-sm text-gray-500">Arrival</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center mb-4">
              <Hotel size={20} className="text-[#8C6D73] mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Hotel Details</h3>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/4 h-24 rounded-md overflow-hidden mr-4 mb-3 md:mb-0">
                  <img 
                    src={selectedHotel.image} 
                    alt={selectedHotel.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-700">{selectedHotel.name}</p>
                  <div className="flex items-center mt-1">
                    <MapPin size={16} className="text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">{selectedHotel.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedHotel.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {selectedCab && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <Car size={20} className="text-[#8C6D73] mr-2" />
                <h3 className="text-lg font-bold text-gray-800">Transportation Details</h3>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/4 h-24 rounded-md overflow-hidden mr-4 mb-3 md:mb-0">
                    <img 
                      src={selectedCab.image} 
                      alt={selectedCab.type} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-700">{selectedCab.type}</p>
                    <div className="flex items-center mt-1">
                      <User size={16} className="text-gray-500 mr-1" />
                      <span className="text-sm text-gray-600">{selectedCab.capacity} seats</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Booking Summary</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Flight</span>
                <span className="font-medium">${selectedFlight.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hotel</span>
                <span className="font-medium">${selectedHotel.price}</span>
              </div>
              {selectedCab && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Transportation</span>
                  <span className="font-medium">${selectedCab.price}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-[#8C6D73]">${totalPrice}</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={onCompleteBooking}
              className="w-full bg-[#8C6D73] text-white py-3 rounded-md font-medium flex items-center justify-center hover:bg-[#7a5f64] transition-colors duration-200 mt-4"
            >
              <CreditCard size={18} className="mr-2" />
              Complete Booking
            </button>
            
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Check size={16} className="text-green-500 mr-2" />
                <span>Free cancellation up to 24 hours before</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Check size={16} className="text-green-500 mr-2" />
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default Checkout;
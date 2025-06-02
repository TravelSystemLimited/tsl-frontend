
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BookingDetails } from '../components/dashboard/BookingDetails';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Hotel, Car, Calendar } from 'lucide-react';

const Bookings = () => {
  const bookingStats = [
    { label: "Active Bookings", value: "12", icon: Plane, color: "text-blue-600" },
    { label: "Hotel Reservations", value: "8", icon: Hotel, color: "text-green-600" },
    { label: "Car Rentals", value: "5", icon: Car, color: "text-purple-600" },
    { label: "Upcoming Trips", value: "15", icon: Calendar, color: "text-[#8C6D73]" }
  ];

  return (
    <div className="min-h-screen bg-[#f8f7f7] p-[10px] md:p-6 mt-16">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-[#3b3b3b]" />
          <div>
            <h1 className="text-3xl font-bold text-[#3b3b3b]">All Bookings</h1>
            <p className="text-gray-600 mt-1">View and manage all travel bookings</p>
          </div>
        </div>

  {/* Booking Stats */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
  {bookingStats.map((stat, index) => (
    <Card key={index} className="bg-white border-none shadow-sm">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-gray-600 ">{stat.label}</p>
            <p className={`text-xl md:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
          <div className="flex-shrink-0">
            <stat.icon className={`h-4 w-4 md:h-8 md:w-8 ${stat.color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  ))}
</div>


        {/* Booking Management Section */}
        <div className="bg-white rounded-lg shadow-sm p-[0px] md:p-6">
          <div className="mb-6 p-6">
            <h2 className="text-xl font-semibold text-[#3b3b3b] mb-2">Booking Management</h2>
            <p className="text-gray-600">Comprehensive view of all travel bookings with search and filter capabilities</p>
          </div>
          <BookingDetails />
        </div>
      </div>
    </div>
  );
};

export default Bookings;

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plane, Hotel, Car, Search, Eye, Download, PlaneIcon } from 'lucide-react';

interface Booking {
  id: string;
  bookingReference: string;
  employeeName: string;
  type: 'flight' | 'hotel' | 'taxi';
  destination: string;
  date: string;
  cost: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  details: {
    airline?: string;
    flightNumber?: string;
    hotelName?: string;
    taxiCompany?: string;
    duration?: string;
  };
}

const bookings: Booking[] = [
  {
    id: '1',
    bookingReference: 'TSL001234',
    employeeName: 'Sarah Johnson',
    type: 'flight',
    destination: 'New York, NY',
    date: '2024-06-15',
    cost: 850,
    status: 'confirmed',
    details: {
      airline: 'American Airlines',
      flightNumber: 'AA1234',
      duration: '3h 45m'
    }
  },
  {
    id: '2',
    bookingReference: 'TSL001235',
    employeeName: 'Michael Chen',
    type: 'hotel',
    destination: 'London, UK',
    date: '2024-06-20',
    cost: 1200,
    status: 'confirmed',
    details: {
      hotelName: 'Hilton London',
      duration: '5 nights'
    }
  },
  {
    id: '3',
    bookingReference: 'TSL001236',
    employeeName: 'Emily Rodriguez',
    type: 'taxi',
    destination: 'Chicago, IL',
    date: '2024-06-12',
    cost: 75,
    status: 'pending',
    details: {
      taxiCompany: 'Chicago Cab Co',
      duration: '45 minutes'
    }
  }
];

export const BookingDetails: React.FC = () => {
  const [filteredBookings, setFilteredBookings] = useState(bookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = bookings.filter(
      booking =>
        booking.employeeName.toLowerCase().includes(term.toLowerCase()) ||
        booking.bookingReference.toLowerCase().includes(term.toLowerCase()) ||
        booking.destination.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBookings(filtered);
  };

  const getBookingIcon = (type: string) => {
    switch (type) {
      case 'flight': return <Plane className="h-4 w-4" />;
      case 'hotel': return <Hotel className="h-4 w-4" />;
      case 'taxi': return <Car className="h-4 w-4" />;
      default: return <Plane className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-white border-none shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#3b3b3b]">
          <Plane className="h-5 w-5" />
          <span className="text-lg sm:text-xl">All Booking Details</span>
        </CardTitle>
        <CardDescription>Comprehensive view of all travel bookings</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by employee, reference, or destination..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        {/* Bookings Table */}
        <div className="overflow-x-auto">
          {/* Desktop Table */}
          <table className="w-full hidden md:table">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Reference</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Employee</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Destination</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Cost</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-mono">{booking.bookingReference}</td>
                  <td className="py-3 px-4 text-sm">{booking.employeeName}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {getBookingIcon(booking.type)}
                      <span className="text-sm capitalize">{booking.type}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{booking.destination}</td>
                  <td className="py-3 px-4 text-sm">{booking.date}</td>
                  <td className="py-3 px-4 text-sm font-medium">${booking.cost}</td>
                  <td className="py-3 px-4">
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <DialogHeader>
                            <DialogTitle>Booking Details</DialogTitle>
                            <DialogDescription>
                              Complete information for booking {booking.bookingReference}
                            </DialogDescription>
                          </DialogHeader>

                          {selectedBooking && (
                            <div className="space-y-6 border rounded-xl p-4 shadow-sm">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="bg-muted p-2 rounded-full">
                                    <PlaneIcon className="w-6 h-6 text-primary" />
                                  </div>
                                  <div>
                                    <p className="font-semibold">{selectedBooking.details.airline || "Airline"}</p>
                                    <p className="text-sm text-gray-500">{selectedBooking.details.flightNumber || "Flight Number"}</p>
                                  </div>
                                </div>
                                <Badge className="bg-green-100 text-green-700 text-sm">Direct</Badge>
                              </div>

                              <div className="flex items-center justify-between px-2">
                                <div className="text-center">
                                  <p className="text-lg font-bold">{"06:30 AM"}</p>
                                  <p className="text-xs text-gray-500">Departure</p>
                                </div>

                                <div className="flex flex-col items-center text-xs text-gray-500">
                                  <PlaneIcon className="w-5 h-5 text-gray-400" />
                                  <p>{selectedBooking.details.duration || "2h 30m"}</p>
                                </div>

                                <div className="text-center">
                                  <p className="text-lg font-bold">{"09:00 AM"}</p>
                                  <p className="text-xs text-gray-500">Arrival</p>
                                </div>
                              </div>

                              <div className="border-t pt-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-500">Reference</span>
                                    <p className="font-mono">{selectedBooking.bookingReference}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Employee</span>
                                    <p>{selectedBooking.employeeName}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Type</span>
                                    <p className="capitalize">{selectedBooking.type}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Status</span>
                                    <Badge className={getStatusColor(selectedBooking.status)}>
                                      {selectedBooking.status}
                                    </Badge>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Destination</span>
                                    <p>{selectedBooking.destination}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Date</span>
                                    <p>{selectedBooking.date}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Cost</span>
                                    <p className="font-medium">₹{selectedBooking.cost}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-sm font-mono">{booking.bookingReference}</CardTitle>
                      <CardDescription className="text-sm mt-1">{booking.employeeName}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      {getBookingIcon(booking.type)}
                      <span className="capitalize">{booking.type}</span>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Destination</p>
                      <p>{booking.destination}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Date</p>
                      <p>{booking.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Cost</p>
                      <p className="font-medium">${booking.cost}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          <span className="sr-only">View</span>
                          <span className="md:hidden">View</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                          <DialogTitle>Booking Details</DialogTitle>
                          <DialogDescription>
                            Complete information for booking {booking.bookingReference}
                          </DialogDescription>
                        </DialogHeader>

                        {selectedBooking && (
                          <div className="space-y-6 border rounded-xl p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="bg-muted p-2 rounded-full">
                                  <PlaneIcon className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <p className="font-semibold">{selectedBooking.details.airline || "Airline"}</p>
                                  <p className="text-sm text-gray-500">{selectedBooking.details.flightNumber || "Flight Number"}</p>
                                </div>
                              </div>
                              <Badge className="bg-green-100 text-green-700 text-sm">Direct</Badge>
                            </div>

                            <div className="flex items-center justify-between px-2">
                              <div className="text-center">
                                <p className="text-lg font-bold">{"06:30 AM"}</p>
                                <p className="text-xs text-gray-500">Departure</p>
                              </div>

                              <div className="flex flex-col items-center text-xs text-gray-500">
                                <PlaneIcon className="w-5 h-5 text-gray-400" />
                                <p>{selectedBooking.details.duration || "2h 30m"}</p>
                              </div>

                              <div className="text-center">
                                <p className="text-lg font-bold">{"09:00 AM"}</p>
                                <p className="text-xs text-gray-500">Arrival</p>
                              </div>
                            </div>

                            <div className="border-t pt-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Reference</span>
                                  <p className="font-mono">{selectedBooking.bookingReference}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Employee</span>
                                  <p>{selectedBooking.employeeName}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Type</span>
                                  <p className="capitalize">{selectedBooking.type}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Status</span>
                                  <Badge className={getStatusColor(selectedBooking.status)}>
                                    {selectedBooking.status}
                                  </Badge>
                                </div>
                                <div>
                                  <span className="text-gray-500">Destination</span>
                                  <p>{selectedBooking.destination}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Date</span>
                                  <p>{selectedBooking.date}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Cost</span>
                                  <p className="font-medium">₹{selectedBooking.cost}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      <span className="sr-only">Download</span>
                      <span className="md:hidden">Download</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No bookings found matching your search criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
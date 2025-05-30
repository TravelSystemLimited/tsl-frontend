import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, User, Filter, Search } from 'lucide-react';

interface TravelRecord {
  id: string;
  employeeName: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  cost: number;
  status: 'completed' | 'upcoming' | 'cancelled';
  type: 'flight' | 'hotel' | 'taxi';
}

const travelHistory: TravelRecord[] = [
  {
    id: '1',
    employeeName: 'Sarah Johnson',
    destination: 'New York, NY',
    departureDate: '2024-05-15',
    returnDate: '2024-05-18',
    cost: 850,
    status: 'completed',
    type: 'flight'
  },
  {
    id: '2',
    employeeName: 'Michael Chen',
    destination: 'London, UK',
    departureDate: '2024-06-20',
    returnDate: '2024-06-25',
    cost: 1200,
    status: 'upcoming',
    type: 'hotel'
  },
  {
    id: '3',
    employeeName: 'Emily Rodriguez',
    destination: 'Chicago, IL',
    departureDate: '2024-04-10',
    returnDate: '2024-04-12',
    cost: 650,
    status: 'completed',
    type: 'flight'
  },
  {
    id: '4',
    employeeName: 'David Park',
    destination: 'San Francisco, CA',
    departureDate: '2024-03-22',
    returnDate: '2024-03-25',
    cost: 950,
    status: 'cancelled',
    type: 'flight'
  },
  {
    id: '5',
    employeeName: 'Lisa Wang',
    destination: 'Tokyo, Japan',
    departureDate: '2024-07-01',
    returnDate: '2024-07-07',
    cost: 2100,
    status: 'upcoming',
    type: 'flight'
  }
];

export const TravelHistory: React.FC = () => {
  const [filteredHistory, setFilteredHistory] = useState(travelHistory);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterHistory(term, statusFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterHistory(searchTerm, status);
  };

  const filterHistory = (search: string, status: string) => {
    let filtered = travelHistory;

    if (search) {
      filtered = filtered.filter(
        record =>
          record.employeeName.toLowerCase().includes(search.toLowerCase()) ||
          record.destination.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(record => record.status === status);
    }

    setFilteredHistory(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-white border-none shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#3b3b3b]">
          <Calendar className="h-5 w-5" />
          Travel History
        </CardTitle>
        <CardDescription>Complete record of all travel bookings</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by employee or destination..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Travel Records */}
        <div className="space-y-4">
          {filteredHistory.map((record) => (
            <div
              key={record.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors gap-4"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="p-2 bg-[#8C6D73] bg-opacity-10 rounded-full flex-shrink-0">
                  <User className="h-4 w-4 text-[#8C6D73]" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{record.employeeName}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{record.destination}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:items-end gap-2">
                <Badge className={`${getStatusColor(record.status)} w-fit`}>
                  {record.status}
                </Badge>
                <p className="text-sm text-gray-500">
                  {record.departureDate} - {record.returnDate}
                </p>
                <p className="font-medium text-gray-900">${record.cost}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No travel records found matching your criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
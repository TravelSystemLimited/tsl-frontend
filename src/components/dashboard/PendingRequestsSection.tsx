import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Edit, Clock, Plane, Hotel, Car, MapPin, User, Calendar } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

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

interface PendingRequestsSectionProps {
  expanded?: boolean;
}

const mockRequests: PendingRequest[] = [
  {
    id: '1',
    employeeName: 'Sarah Johnson',
    employeeEmail: 'sarah.johnson@tsl.com',
    requestType: 'package',
    destination: 'New York, NY',
    departureDate: '2024-06-15',
    returnDate: '2024-06-18',
    cost: 33500,
    priority: 'high',
    details: 'Client meeting with potential partner. Business class requested due to long flight duration.',
    bookingDetails: {
      flight: {
        airline: "Air India",
        from: "Bengaluru",
        to: "New York",
        departureTime: "08:30 AM",
        arrivalTime: "11:15 AM",
        departureDate: "2024-06-15",
        price: 18500
      },
      hotel: {
        name: "Grand Hyatt",
        location: "New York, NY",
        amenities: ["Free WiFi", "Swimming Pool", "Fitness Center"],
        address: "12th cross, doddbalapura, nandi cross, 1-15/4",
        price: 12000,
        checkInDate: "2024-06-15",
        checkOutDate: "2024-06-18"
      },
      cab: {
        type: "Premium Sedan",
        capacity: 4,
        price: 3000,
        pickupLocation: "New York Airport",
        dropLocation: "Grand Hyatt",
        pickupTime: "11:30 AM",
        pickupDate: "2024-06-15"
      }
    }
  },
  {
    id: '2',
    employeeName: 'John Cruise',
    employeeEmail: 'john.cruise@tsl.com',
    requestType: 'package',
    destination: 'Bangalore, KA',
    departureDate: '2024-06-20',
    returnDate: '2024-06-21',
    cost: 30500,
    priority: 'medium',
    details: 'Regional conference attendance. Standard accommodations requested.',
    bookingDetails: {
      flight: {
        airline: "Air India",
        from: "Dubai",
        to: "Bangalore",
        departureTime: "08:30 AM",
        arrivalTime: "11:15 AM",
        departureDate: "2024-06-20",
        price: 18500
      },
      hotel: {
        name: "Grand Hyatt",
        address: "12th cross, doddbalapura, nandi cross, 1-15/4",
        location: "Bangalore",
        amenities: ["Free WiFi", "Swimming Pool", "Fitness Center"],
        price: 12000,
        checkInDate: "2024-06-20",
        checkOutDate: "2024-06-21"
      }
    }
  },
  {
    id: '3',
    employeeName: 'Emily Rodriguez',
    employeeEmail: 'emily.rodriguez@tsl.com',
    requestType: 'flight',
    destination: 'Chicago, IL',
    departureDate: '2024-06-12',
    returnDate: '2024-06-15',
    cost: 18500,
    priority: 'low',
    details: 'Training session attendance. Economy class acceptable.',
    bookingDetails: {
      flight: {
        airline: "Air India",
        from: "Mumbai",
        to: "Chicago",
        departureTime: "08:30 AM",
        arrivalTime: "11:15 AM",
        departureDate: "2024-06-12",
        price: 18500
      }
    }
  },
  {
    id: '4',
    employeeName: 'Michael Chen',
    employeeEmail: 'michael.chen@tsl.com',
    requestType: 'hotel',
    destination: 'Los Angeles, CA',
    departureDate: '2024-06-25',
    returnDate: '2024-06-28',
    cost: 15000,
    priority: 'medium',
    details: 'Product launch event. Central location preferred.',
    bookingDetails: {
      hotel: {
        name: "Beverly Hills Hotel",
        location: "Los Angeles, CA",
        amenities: ["Free WiFi", "Pool", "Business Center", "Spa"],
        address: "9641 Sunset Boulevard, Beverly Hills, CA 90210",
        price: 15000,
        checkInDate: "2024-06-25",
        checkOutDate: "2024-06-28"
      }
    }
  },
  {
    id: '5',
    employeeName: 'Lisa Wang',
    employeeEmail: 'lisa.wang@tsl.com',
    requestType: 'taxi',
    destination: 'San Francisco, CA',
    departureDate: '2024-06-30',
    returnDate: '2024-06-30',
    cost: 2500,
    priority: 'low',
    details: 'Airport transfer for same-day business meeting.',
    bookingDetails: {
      cab: {
        type: "Standard Sedan",
        capacity: 4,
        price: 2500,
        pickupLocation: "San Francisco Airport",
        dropLocation: "Downtown Conference Center",
        pickupTime: "09:30 AM",
        pickupDate: "2024-06-30"
      }
    }
  }
];

export const PendingRequestsSection: React.FC<PendingRequestsSectionProps> = ({ expanded = false }) => {
  const [requests, setRequests] = useState<PendingRequest[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<PendingRequest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
useEffect(() => {
  sessionStorage.setItem('pendingRequestsCount', requests.length.toString());
}, [requests]);

  // Listen for request status changes from the details page
  useEffect(() => {
    const handleRequestStatusChange = (event: CustomEvent) => {
      const { requestId, action } = event.detail;
      if (action === 'approved' || action === 'rejected') {
        setRequests(prev => prev.filter(req => req.id !== requestId));
        
        toast({
          title: action === 'approved' ? "Request Approved" : "Request Rejected",
          description: `The travel request has been ${action} successfully.`,
          variant: action === 'rejected' ? "destructive" : "default",
        });
      }
    };

    // Check sessionStorage for any recent actions
    const checkForRecentActions = () => {
      const approvedId = sessionStorage.getItem('approvedRequestId');
      const rejectedId = sessionStorage.getItem('rejectedRequestId');
      const lastActionTimestamp = sessionStorage.getItem('lastActionTimestamp');
      
      // Only process if the action happened recently (within 5 seconds)
      if (lastActionTimestamp && Date.now() - parseInt(lastActionTimestamp) < 5000) {
        if (approvedId) {
          setRequests(prev => prev.filter(req => req.id !== approvedId));
          sessionStorage.removeItem('approvedRequestId');
          toast({
            title: "Request Approved",
            description: "The travel request has been approved successfully.",
          });
        }
        
        if (rejectedId) {
          setRequests(prev => prev.filter(req => req.id !== rejectedId));
          sessionStorage.removeItem('rejectedRequestId');
          toast({
            title: "Request Rejected",
            description: "The travel request has been rejected.",
            variant: "destructive",
          });
        }
        
        sessionStorage.removeItem('lastActionTimestamp');
        sessionStorage.removeItem('requestAction');
      }
    };

    // Check immediately and then listen for events
    checkForRecentActions();
    window.addEventListener('requestStatusChanged', handleRequestStatusChange as EventListener);
    
    // Also check periodically in case we missed the event
    const interval = setInterval(checkForRecentActions, 1000);

    return () => {
      window.removeEventListener('requestStatusChanged', handleRequestStatusChange as EventListener);
      clearInterval(interval);
    };
  }, []);

  // Listen for updated requests from modification pages
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedRequestStr = sessionStorage.getItem('updatedRequest');
      if (updatedRequestStr) {
        try {
          const updatedRequest = JSON.parse(updatedRequestStr);
          handleUpdateRequest(updatedRequest);
          sessionStorage.removeItem('updatedRequest');
          
          // Clear modification data
          sessionStorage.removeItem('hotelToModify');
          sessionStorage.removeItem('originalHotel');
          sessionStorage.removeItem('cabToModify');
          sessionStorage.removeItem('originalCab');
          sessionStorage.removeItem('requestToModify');
          sessionStorage.removeItem('employeeToModify');
        } catch (error) {
          console.error('Error parsing updated request:', error);
        }
      }
    };

    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleUpdateRequest = (updatedRequest: PendingRequest) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === updatedRequest.id ? updatedRequest : req
      )
    );
    toast({
      title: "Request Updated",
      description: "The travel request has been modified successfully.",
    });
  };

  const handleApprove = (requestId: string) => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
    toast({
      title: "Request Approved",
      description: "The travel request has been approved successfully.",
    });
    setDialogOpen(false);
  };

  const handleReject = (requestId: string) => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
    toast({
      title: "Request Rejected",
      description: "The travel request has been rejected.",
      variant: "destructive",
    });
    setDialogOpen(false);
  };

  const handleRequestClick = (request: PendingRequest) => {
    navigate('/request-details', { state: { request } });
  };

  const handleViewDetails = (request: PendingRequest) => {
    setSelectedRequest(request);
    setDialogOpen(true);
  };

  const handleModify = (request: PendingRequest) => {
    if (request.bookingDetails.flight) {
      sessionStorage.setItem('source', request.bookingDetails.flight.from);
      sessionStorage.setItem('destination', request.bookingDetails.flight.to);
      sessionStorage.setItem('departureDate', request.bookingDetails.flight.departureDate);
      if (request.returnDate) {
        sessionStorage.setItem('returnDate', request.returnDate);
      }
      sessionStorage.setItem('originalFlight', JSON.stringify(request.bookingDetails.flight));
    }
    
    sessionStorage.setItem('requestToModify', JSON.stringify(request));
    sessionStorage.setItem('employeeToModify', JSON.stringify({
      id: request.id,
      name: request.employeeName,
    }));
    
    navigate('/modify-booking');
  };

  const handleModifyHotel = (request: PendingRequest) => {
    if (request.bookingDetails.hotel) {
      sessionStorage.setItem('hotelToModify', JSON.stringify(request.bookingDetails.hotel));
      sessionStorage.setItem('originalHotel', JSON.stringify(request.bookingDetails.hotel));
      sessionStorage.setItem('employeeToModify', JSON.stringify({
        id: request.id,
        name: request.employeeName,
      }));
      
      sessionStorage.setItem('requestToModify', JSON.stringify(request));
      navigate('/modify-hotel-booking');
    }
  };

  const handleModifyCabs = (request: PendingRequest) => {
    if (request.bookingDetails.cab) {
      sessionStorage.setItem('cabToModify', JSON.stringify(request.bookingDetails.cab));
      sessionStorage.setItem('originalCab', JSON.stringify(request.bookingDetails.cab));
      sessionStorage.setItem('employeeToModify', JSON.stringify({
        id: request.id,
        name: request.employeeName,
      }));
      
      sessionStorage.setItem('requestToModify', JSON.stringify(request));
      navigate('/modify-cab-booking');
    }
  };

  const getRequestIcon = (type: string) => {
    switch (type) {
      case 'flight': return <Plane className="h-4 w-4" />;
      case 'hotel': return <Hotel className="h-4 w-4" />;
      case 'taxi': return <Car className="h-4 w-4" />;
      case 'package': return (
        <div className="flex">
          <Plane className="h-4 w-4" />
          <Hotel className="h-4 w-4 -ml-1" />
          <Car className="h-4 w-4 -ml-1" />
        </div>
      );
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateTotalCost = (bookingDetails: BookingDetails) => {
    return (
      (bookingDetails?.flight?.price ?? 0) +
      (bookingDetails?.hotel?.price ?? 0) +
      (bookingDetails?.cab?.price ?? 0)
    );
  };

  const displayRequests = expanded ? requests : requests.slice(0, 3);

  return (
    <>
<Card className="bg-white border-none shadow-md">
  <CardHeader>
    <CardTitle className="flex items-center gap-2 text-xl text-[#8C6D73]">
      <Clock className="h-5 w-5" />
      Pending Requests
    </CardTitle>
    <CardDescription>
      {requests.length} requests awaiting your approval
    </CardDescription>
  </CardHeader>
  <CardContent className="p-2">
    <div className="space-y-4">
      {displayRequests.map((request) => (
        <div
          key={request.id}
          onClick={() => { handleRequestClick(request) }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors relative"
        >
          {/* Priority Badge - Top Right in Mobile */}
          <div className="absolute top-3 right-3 sm:relative sm:top-auto sm:right-auto sm:ml-2 sm:mb-1">
            <Badge className={getPriorityColor(request.priority)}>
              {request.priority}
            </Badge>
          </div>

          <div className="flex items-start gap-3 w-full sm:w-auto mt-1 sm:mt-0">
            <div className="p-2 bg-[#8C6D73] bg-opacity-10 rounded-full">
              {getRequestIcon(request.requestType)}
            </div>
            <div className="flex-1 sm:flex-none pr-6 sm:pr-0">
              <h4 className="font-medium text-gray-900">{request.employeeName}</h4>
              <p className="text-sm text-gray-500 line-clamp-1">{request.destination}</p>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1">
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {request.departureDate}
                </span>
                <span className="text-xs text-gray-400">-</span>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {request.returnDate}
                </span>
              </div>
            </div>
          </div>
          {/* Price - Right aligned in both mobile and desktop */}
          <div className="self-end sm:self-auto mt-2 sm:mt-0">
            <p className="text-sm font-medium text-gray-900">
              ₹
              {
                (request.bookingDetails?.flight?.price ?? 0) +
                (request.bookingDetails?.hotel?.price ?? 0) +
                (request.bookingDetails?.cab?.price ?? 0)
              }
            </p>
          </div>
        </div>
      ))}
      {!expanded && requests.length > 3 && (
        <p className="text-center text-sm text-gray-500 mt-4">
          +{requests.length - 3} more requests
        </p>
      )}
    </div>
  </CardContent>
</Card>


   
    </>
  );
};
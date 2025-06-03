import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Edit, Clock, Plane, Hotel, Car } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface PendingRequest {
  id: string;
  employeeName: string;
  employeeEmail: string;
  requestType: 'flight' | 'hotel' | 'taxi';
  destination: string;
  departureDate: string;
  returnDate: string;
  cost: number;
  priority: 'low' | 'medium' | 'high';
  details: string;
}

interface PendingRequestsSectionProps {
  expanded?: boolean;
}

const mockRequests: PendingRequest[] = [
  {
    id: '1',
    employeeName: 'Sarah Johnson',
    employeeEmail: 'sarah.johnson@tsl.com',
    requestType: 'flight',
    destination: 'New York, NY',
    departureDate: '2024-06-15',
    returnDate: '2024-06-18',
    cost: 850,
    priority: 'high',
    details: 'Client meeting with potential partner. Business class requested due to long flight duration.'
  },
  {
    id: '2',
    employeeName: 'Michael Chen',
    employeeEmail: 'michael.chen@tsl.com',
    requestType: 'hotel',
    destination: 'London, UK',
    departureDate: '2024-06-20',
    returnDate: '2024-06-25',
    cost: 1200,
    priority: 'medium',
    details: 'Conference attendance. 5-star hotel requested near conference venue.'
  },
  {
    id: '3',
    employeeName: 'Emily Rodriguez',
    employeeEmail: 'emily.rodriguez@tsl.com',
    requestType: 'taxi',
    destination: 'Chicago, IL',
    departureDate: '2024-06-12',
    returnDate: '2024-06-12',
    cost: 75,
    priority: 'low',
    details: 'Airport transfer for same-day business meeting.'
  }
];

export const PendingRequestsSection: React.FC<PendingRequestsSectionProps> = ({ expanded = false }) => {
  const [requests, setRequests] = useState<PendingRequest[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<PendingRequest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleModify = (requestId: string) => {
    toast({
      title: "Modification Request",
      description: "Employee will be notified to modify their request.",
    });
    setDialogOpen(false);
  };

  const getRequestIcon = (type: string) => {
    switch (type) {
      case 'flight': return <Plane className="h-4 w-4" />;
      case 'hotel': return <Hotel className="h-4 w-4" />;
      case 'taxi': return <Car className="h-4 w-4" />;
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

  const displayRequests = expanded ? requests : requests.slice(0, 3);

  return (
    <>
      <Card className="bg-white border-none shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#8C6D73]">
            <Clock className="h-5 w-5" />
            Pending Requests
          </CardTitle>
          <CardDescription>
            {requests.length} requests awaiting your approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {displayRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedRequest(request);
                  setDialogOpen(true);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#3b3b3b] bg-opacity-10 rounded-full">
                    {getRequestIcon(request.requestType)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{request.employeeName}</h4>
                    <p className="text-sm text-gray-500">{request.destination}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getPriorityColor(request.priority)}>
                    {request.priority}
                  </Badge>
                  <p className="text-sm font-medium text-gray-900 mt-1">${request.cost}</p>
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
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
  <DialogContent className="sm:max-w-2xl max-w-[95vw] rounded-lg">
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
        {selectedRequest && getRequestIcon(selectedRequest.requestType)}
        Request Details
      </DialogTitle>
      <DialogDescription className="text-sm sm:text-base">
        Review and take action on this travel request
      </DialogDescription>
    </DialogHeader>
    {selectedRequest && (
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Employee</label>
            <p className="text-gray-900 text-sm sm:text-base">{selectedRequest.employeeName}</p>
            <p className="text-xs sm:text-sm text-gray-500">{selectedRequest.employeeEmail}</p>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Type</label>
            <p className="text-gray-900 text-sm sm:text-base capitalize">{selectedRequest.requestType}</p>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Destination</label>
            <p className="text-gray-900 text-sm sm:text-base">{selectedRequest.destination}</p>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Cost</label>
            <p className="text-gray-900 font-medium text-sm sm:text-base">₹{selectedRequest.cost}</p>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Departure</label>
            <p className="text-gray-900 text-sm sm:text-base">{selectedRequest.departureDate}</p>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Return</label>
            <p className="text-gray-900 text-sm sm:text-base">{selectedRequest.returnDate}</p>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Details</label>
          <p className="text-gray-900 mt-1 text-sm sm:text-base">{selectedRequest.details}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
          <Button
            onClick={() => handleApprove(selectedRequest.id)}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 text-sm sm:text-base"
            size="sm"
          >
            <CheckCircle className="h-4 w-4" />
            Approve
          </Button>
          <Button
            onClick={() => handleReject(selectedRequest.id)}
            variant="destructive"
            className="flex items-center gap-2 text-sm sm:text-base"
            size="sm"
          >
            <XCircle className="h-4 w-4" />
            Reject
          </Button>
          <Button
            onClick={() => handleModify(selectedRequest.id)}
            variant="outline"
            className="flex items-center gap-2 text-sm sm:text-base"
            size="sm"
          >
            <Edit className="h-4 w-4" />
            Request Modification
          </Button>
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>
    </>
  );
};

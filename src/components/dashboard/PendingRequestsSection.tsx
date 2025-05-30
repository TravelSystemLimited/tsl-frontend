
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Edit, Clock, Plane, Hotel, Car, Info, Calendar, MapPin, DollarSign } from 'lucide-react';
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
          <CardTitle className="flex items-center gap-2 text-[#3b3b3b]">
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
                  <div className="p-2 bg-[#8C6D73] bg-opacity-10 rounded-full">
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
  <DialogContent className="max-w-2xl rounded-lg">
    <DialogHeader className="border-b pb-4">
      <div className="flex items-center gap-3">
        {selectedRequest && (
          <div className="p-2 rounded-full bg-blue-50 text-blue-600">
            {getRequestIcon(selectedRequest.requestType)}
          </div>
        )}
        <div>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Travel Request Details
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-sm">
            Review request from {selectedRequest?.employeeName}
          </DialogDescription>
        </div>
      </div>
    </DialogHeader>

    {selectedRequest && (
      <div className="space-y-6 py-4">
        {/* Key Details Card */}
        <div className="bg-gray-50/50 p-4 rounded-lg border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <DetailCard 
              label="Destination" 
              value={selectedRequest.destination} 
              icon={<MapPin className="h-4 w-4" />}
            />
            <DetailCard 
              label="Cost" 
              value={`$${selectedRequest.cost}`} 
              icon={<DollarSign className="h-4 w-4" />}
              highlight
            />
            <DetailCard 
              label="Departure" 
              value={selectedRequest.departureDate} 
              icon={<Calendar className="h-4 w-4" />}
            />
            <DetailCard 
              label="Return" 
              value={selectedRequest.returnDate} 
              icon={<Calendar className="h-4 w-4" />}
            />
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Info className="h-4 w-4 text-gray-500" />
            Additional Information
          </h3>
          <div className="bg-white p-3 rounded-md border text-gray-700">
            {selectedRequest.details || "No additional details provided"}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t justify-end">
          <Button
            variant="outline"
            onClick={() => handleModify(selectedRequest.id)}
            className="flex items-center gap-2 border-gray-300"
          >
            <Edit className="h-4 w-4" />
            Request Changes
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleReject(selectedRequest.id)}
            className="flex items-center gap-2"
          >
            <XCircle className="h-4 w-4" />
            Reject
          </Button>
          <Button
            onClick={() => handleApprove(selectedRequest.id)}
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            Approve
          </Button>
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>


    </>
  );
};
// Reusable DetailCard component
function DetailCard({ label, value, icon, highlight = false }) {
  return (
    <div className={`p-2 ${highlight ? 'bg-blue-50 rounded-md' : ''}`}>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
        {icon}
        <span>{label}</span>
      </div>
      <p className={`text-sm ${highlight ? 'font-medium text-blue-700' : 'text-gray-900'}`}>
        {value}
      </p>
    </div>
  );
}
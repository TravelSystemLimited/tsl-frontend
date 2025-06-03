
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PendingRequestsSection } from '../components/dashboard/PendingRequestsSection';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const Requests = () => {
  const requestStats = [
    { label: "Pending Requests", value: "8", icon: Clock, color: "text-orange-600" },
    { label: "Approved Today", value: "15", icon: CheckCircle, color: "text-green-600" },
    { label: "Rejected", value: "2", icon: XCircle, color: "text-red-600" },
    { label: "Urgent Reviews", value: "3", icon: AlertTriangle, color: "text-[#8C6D73]" }
  ];

  return (
    <div className="min-h-screen bg-[#f8f7f7] mt-8  p-[10px] md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
           {/* Pending Requests Section */}
    
      <div className="flex items-center gap-4">
  <SidebarTrigger className="text-[#8C6D73] h-8 w-8" /> {/* Added fixed size */}
  <div>
    <h1 className="text-2xl md:text-2xl font-bold text-[#3b3b3b]">Pending Requests</h1>
    <p className="text-gray-600 text-sm md:text-base">Review and manage employee travel requests</p>
  </div>
</div>
  <Card className="bg-white border-none shadow-sm">
  <CardHeader>
    <CardTitle className="text-[#3b3b3b] text-xl">Approval Workflow</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Desktop View (grid) */}
    <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
      <div className="p-4 border rounded-lg">
        <div className="text-2xl mb-2">📋</div>
        <h3 className="font-semibold text-[#8C6D73]">Review Request</h3>
        <p className="text-sm text-gray-600">Check employee details and travel requirements</p>
      </div>
      <div className="p-4 border rounded-lg">
        <div className="text-2xl mb-2">💰</div>
        <h3 className="font-semibold text-[#8C6D73]">Budget Check</h3>
        <p className="text-sm text-gray-600">Verify budget allocation and cost estimates</p>
      </div>
      <div className="p-4 border rounded-lg">
        <div className="text-2xl mb-2">✅</div>
        <h3 className="font-semibold text-[#8C6D73]">Make Decision</h3>
        <p className="text-sm text-gray-600">Approve, reject, or modify the request</p>
      </div>
      <div className="p-4 border rounded-lg">
        <div className="text-2xl mb-2">📧</div>
        <h3 className="font-semibold text-[#8C6D73]">Notify Employee</h3>
        <p className="text-sm text-gray-600">Send approval status and next steps</p>
      </div>
    </div>

    {/* Mobile View (horizontal with circles) */}
    <div className="md:hidden">
      <div className="flex items-center justify-between relative">
        {/* Line connecting the steps */}
        <div className="absolute h-[1px] bg-[#8c6d73] top-5 left-10 right-10 z-0"></div>
        
        {/* Steps */}
         <div className="flex flex-col items-center z-10">
          <div className="w-10 h-10 rounded-full border-2 border-[#8C6D73] bg-white flex items-center justify-center text-[#8C6D73] mb-2">
            📋
          </div>
          <h3 className="font-semibold text-[#8C6D73] text-xs text-center">Review</h3>
        </div>
        
        <div className="flex flex-col items-center z-10">
          <div className="w-10 h-10 rounded-full border-2 border-[#8C6D73] bg-white  flex items-center justify-center text-white mb-2">
            💰
          </div>
          <h3 className="font-semibold text-[#8C6D73] text-xs text-center">Budget</h3>
        </div>
        
        <div className="flex flex-col items-center z-10">
          <div className="w-10 h-10 rounded-full border-2 border-[#8C6D73] bg-white  flex items-center justify-center text-white mb-2">
            ✅
          </div>
          <h3 className="font-semibold text-[#8C6D73] text-xs text-center">Decision</h3>
        </div>
        
        <div className="flex flex-col items-center z-10">
          <div className="w-10 h-10 rounded-full border-2 border-[#8C6D73] bg-white flex items-center justify-center text-white mb-2">
            📧
          </div>
          <h3 className="font-semibold text-[#8C6D73] text-xs text-center">Notify</h3>
        </div>
      </div>
      
      {/* Descriptions - can be shown on click or as a separate row */}
     
    </div>
  </CardContent>
</Card>
    <div className="bg-white rounded-lg shadow-sm p-3 md:p-6">
          
          <PendingRequestsSection expanded={true} />
        </div>
 {/* Request Stats */}



        {/* Approval Workflow Info */}
    

     
      </div>
    </div>
  );
};

export default Requests;
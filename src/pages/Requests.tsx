
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
    <div className="min-h-screen bg-[#f8f7f7] mt-8 w-[343px] md:w-full p-[10px] md:p-6">
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
    <div className="absolute h-[1px] bg-gray-300 top-5 left-10 right-10 z-0"></div>
    
    {/* Steps */}
    <div className="flex flex-col items-center z-10">
      <div className="w-10 h-10 rounded-full border-2 border-[#6D8C73] bg-white flex items-center justify-center text-[#6D8C73] mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="font-semibold text-[#6D8C73] text-xs text-center">Review</h3>
    </div>
    
    <div className="flex flex-col items-center z-10">
      <div className="w-10 h-10 rounded-full border-2 border-[#8C6D7A] bg-white flex items-center justify-center text-[#8C6D7A] mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="font-semibold text-[#8C6D7A] text-xs text-center">Budget</h3>
    </div>
    
    <div className="flex flex-col items-center z-10">
      <div className="w-10 h-10 rounded-full border-2 border-[#6D738C] bg-white flex items-center justify-center text-[#6D738C] mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="font-semibold text-[#6D738C] text-xs text-center">Decision</h3>
    </div>
    
    <div className="flex flex-col items-center z-10">
      <div className="w-10 h-10 rounded-full border-2 border-[#8C7A6D] bg-white flex items-center justify-center text-[#8C7A6D] mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 className="font-semibold text-[#8C7A6D] text-xs text-center">Notify</h3>
    </div>
  </div>
  
  {/* Optional: Active state example */}
  <style >{`
    .active-step {
      border-color: #4CAF50;
      color: #4CAF50;
    }
    .completed-step {
      border-color: #4CAF50;
      background-color: #E8F5E9;
    }
  `}</style>
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
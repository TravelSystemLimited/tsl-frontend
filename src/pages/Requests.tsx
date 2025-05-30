
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
    <div className="min-h-screen bg-[#f8f7f7] p-6 mt-16">
      <div className="max-w-7xl mx-auto space-y-6 s">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-[#8C6D73]" />
          <div>
            <h1 className="text-3xl font-bold text-[#3b3b3b]">Pending Requests</h1>
            <p className="text-gray-600 mt-1">Review and manage employee travel requests</p>
          </div>
        </div>

        {/* Request Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {requestStats.map((stat, index) => (
            <Card key={index} className="bg-white border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Approval Workflow Info */}
       <Card className="bg-white border-none shadow-sm">
  <CardHeader>
    <CardTitle className="text-[#3b3b3b] text-lg md:text-xl font-bold text-center">
      Approval Workflow
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="relative w-full">
      {/* Desktop: horizontal dotted line with better alignment */}
      <div className="hidden md:flex absolute top-8 left-16 right-16 h-0 border-t-2 border-dotted border-gray-300 z-0"></div>

      {/* Mobile: vertical dotted line with better spacing */}
      {/* <div className="md:hidden absolute top-12 bottom-4 left-1/2 -translate-x-1/2 w-0 border-l-2 border-dotted border-gray-300 z-0"></div> */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
        {[
          { icon: "📋", title: "Review Request", desc: "Check employee details and travel requirements" },
          { icon: "💰", title: "Budget Check", desc: "Verify budget allocation and cost estimates" },
          { icon: "✅", title: "Make Decision", desc: "Approve, reject, or modify the request" },
          { icon: "📧", title: "Notify Employee", desc: "Send approval status and next steps" },
        ].map((step, index) => (
          <div key={index} className="flex flex-col items-center relative">
            {/* Step indicator with better styling */}
            <div className="w-16 h-16 rounded-full bg-[#F8F1F2] flex items-center justify-center text-2xl text-[#8C6D73] border-2 border-[#8C6D73] z-10 mb-3">
              {step.icon}
            </div>

            {/* Desktop: connector dots between steps (except last one) */}
            {/* {index < 3 && (
              <div className="hidden md:block absolute top-8 left-full -ml-2 w-8 h-1">
                <div className="w-full h-full flex items-center justify-between">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Mobile: connector dots between steps (except last one) */}
            {/* {index < 3 && (
              <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 w-1 h-8">
                <div className="w-full h-full flex flex-col items-center justify-between">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                  ))}
                </div>
              </div>
            )} */}

            <div className="text-center px-2 max-w-[180px]">
              <h3 className="font-semibold text-[#8C6D73] text-sm md:text-base">{step.title}</h3>
              <p className="text-xs text-gray-600 mt-1 leading-tight">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </CardContent>
</Card>

        {/* Pending Requests Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#3b3b3b] mb-2">Request Management</h2>
            <p className="text-gray-600">Review pending travel requests and make approval decisions</p>
          </div> 
          <PendingRequestsSection expanded={true} />
        </div>
      </div>
    </div>
  );
};

export default Requests;

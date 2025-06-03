
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
      <div className="flex items-center gap-4">
  <SidebarTrigger className="text-[#8C6D73] h-8 w-8" /> {/* Added fixed size */}
  <div>
    <h1 className="text-xl md:text-2xl font-bold text-[#3b3b3b]">Pending Requests</h1>
    <p className="text-gray-600 text-sm md:text-base">Review and manage employee travel requests</p>
  </div>
</div>

 {/* Request Stats */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {requestStats.map((stat, index) => (
    <Card key={index} className="bg-white border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
          <div className="flex items-center justify-center h-10 w-10">
            <stat.icon className={`h-6 w-6 ${stat.color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  ))}
</div>


        {/* Approval Workflow Info */}
        <Card className="bg-white border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#3b3b3b] text-xl">Approval Workflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
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
          </CardContent>
        </Card>

        {/* Pending Requests Section */}
        <div className="bg-white rounded-lg shadow-sm p-[0px] md:p-6">
          <div className="mb-6 p-6">
            <h2 className="text-xl font-semibold text-[#8C6D73] mb-2">Request Management</h2>
            <p className="text-gray-600">Review pending travel requests and make approval decisions</p>
          </div>
          <PendingRequestsSection expanded={true} />
        </div>
      </div>
    </div>
  );
};

export default Requests;
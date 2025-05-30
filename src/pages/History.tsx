
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { TravelHistory } from '../components/dashboard/TravelHistory';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock, IndianRupee } from 'lucide-react';

const History = () => {
  const recentStats = [
    { label: "Total Trips", value: "47", icon: Calendar, color: "text-blue-600" },
    { label: "Cities Visited", value: "23", icon: MapPin, color: "text-green-600" },
    { label: "Travel Hours", value: "156", icon: Clock, color: "text-purple-600" },
    { label: "Total Spent", value: "₹2,45,000", icon: IndianRupee, color: "text-[#8C6D73]" }
  ];

  return (
    <div className="min-h-screen bg-[#f8f7f7] p-[10px] mt-16">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-[#8C6D73]" />
          <div>
            <h1 className="text-3xl font-bold text-[#3b3b3b]">Travel History</h1>
            <p className="text-gray-600 mt-1">View past trips and travel records</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {recentStats.map((stat, index) => (
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

        {/* Travel History Component */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#3b3b3b] mb-2">Complete Travel Records</h2>
            <p className="text-gray-600">Track and review all employee travel history with detailed information</p>
          </div>
          <TravelHistory />
        </div>
      </div>
    </div>
  );
};

export default History;

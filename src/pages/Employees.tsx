
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { EmployeeFilter } from '../components/dashboard/EmployeeFilter';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, Briefcase } from 'lucide-react';

const Employees = () => {
  const employeeStats = [
    { label: "Total Employees", value: "45", icon: Users, color: "text-blue-600" },
    { label: "Active Travelers", value: "32", icon: UserCheck, color: "text-green-600" },
    { label: "On Leave", value: "5", icon: UserX, color: "text-red-600" },
    { label: "Department Heads", value: "8", icon: Briefcase, color: "text-[#8C6D73]" }
  ];

  return (
    <div className="min-h-screen bg-[#f8f7f7] p-6 mt-16">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-[#8C6D73]" />
          <div>
            <h1 className="text-3xl font-bold text-[#3b3b3b]">Employee Management</h1>
            <p className="text-gray-600 mt-1">Filter and manage employee travel profiles</p>
          </div>
        </div>

        {/* Employee Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {employeeStats.map((stat, index) => (
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

        {/* Employee Management Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#3b3b3b] mb-2">Employee Directory</h2>
            <p className="text-gray-600">Search, filter and manage employee travel authorizations and profiles</p>
          </div>
          <EmployeeFilter onFilterChange={() => {}} />
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#3b3b3b]">Travel Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage and review company travel policies for different employee levels</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Executive Level: Business class flights, 5-star hotels</li>
                <li>• Senior Level: Premium economy, 4-star hotels</li>
                <li>• Standard Level: Economy class, 3-star hotels</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#3b3b3b]">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Latest employee travel activities and updates</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Rahul Sharma submitted new travel request</li>
                <li>• Priya Patel's trip to Mumbai approved</li>
                <li>• Travel policy updated for consultants</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Employees;


import React from 'react';
import { Calendar, DollarSign, Users, Plane, Clock, CheckCircle, XCircle, AlertTriangle, IndianRupee, FileText, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock data for demonstration
  const stats = {
    totalSpending: 1254000,
    pendingRequests: 8,
    upcomingTrips: 12,
    totalEmployees: 45
  };

  return (
    <div className="min-h-screen bg-[#fff] p-6 mt-16">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-[#3b3b3b] block md:hidden" />
            <div>
              <h1 className="text-3xl font-bold text-[#3b3b3b]">Dashboard Overview</h1>
              <p className="text-gray-600 mt-1">Welcome back, Manager. Here's your travel management overview.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[#8C6D73] bg-white px-4 py-2 rounded-lg shadow-sm">
            <IndianRupee className="h-5 w-5" />
            <span className="font-medium">INR</span>
          </div>
        </div>

        {/* Hero Image Banner */}
        <Card className="bg-[#e5e5e5] border-none  overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="text-[#3b3b3b]">
                <h2 className="text-2xl font-bold mb-2">Streamline Your Corporate Travel</h2>
                <p className="text-[#3b3b3b] mb-4">Manage bookings, track expenses, and approve requests efficiently</p>
                <Link to="/dashboard/requests">
                  <Button variant="secondary" className="bg-[#8c6d73] text-[#fff] hover:bg-gray-100">
                    View Pending Requests
                  </Button>
                </Link>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=200&fit=crop" 
                  alt="Business Travel"
                  className="rounded-lg shadow-lg w-64 h-32 object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/dashboard/analytics">
            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Spending</CardTitle>
                <IndianRupee className="h-4 w-4 text-[#8C6D73]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#636363]">₹{stats.totalSpending.toLocaleString()}</div>
                <p className="text-xs text-green-600">+12% from last month</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard/requests">
            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Pending Requests</CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-500">{stats.pendingRequests}</div>
                <p className="text-xs text-gray-500">Awaiting approval</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard/history">
            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Upcoming Trips</CardTitle>
                <Plane className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-500">{stats.upcomingTrips}</div>
                <p className="text-xs text-gray-500">Next 30 days</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard/employees">
            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Employees</CardTitle>
                <Users className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">{stats.totalEmployees}</div>
                <p className="text-xs text-gray-500">Travel authorized</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/dashboard/requests">
            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#3b3b3b]">
                  <FileText className="h-5 w-5" />
                  Review Requests
                </CardTitle>
                <CardDescription>Approve or modify employee travel requests</CardDescription>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=150&fit=crop" 
                  alt="Review Requests"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard/analytics">
            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#3b3b3b]">
                  <BarChart3 className="h-5 w-5" />
                  View Analytics
                </CardTitle>
                <CardDescription>Track spending patterns and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=150&fit=crop" 
                  alt="Analytics"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard/bookings">
            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#3b3b3b]">
                  <Plane className="h-5 w-5" />
                  Manage Bookings
                </CardTitle>
                <CardDescription>View and manage all travel bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=150&fit=crop" 
                  alt="Manage Bookings"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

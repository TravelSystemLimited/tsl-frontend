
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SpendingAnalytics } from '../components/dashboard/SpendingAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';

const Analytics = () => {
  const analyticsStats = [
    { label: "Monthly Budget", value: "₹5,00,000", icon: Target, color: "text-blue-600", trend: "+5%" },
    { label: "Current Spending", value: "₹3,25,000", icon: DollarSign, color: "text-green-600", trend: "+12%" },
    { label: "Budget Remaining", value: "₹1,75,000", icon: TrendingUp, color: "text-purple-600", trend: "-8%" },
    { label: "Cost Per Trip", value: "₹27,083", icon: TrendingDown, color: "text-[#8C6D73]", trend: "-3%" }
  ];

  return (
    <div className="min-h-screen bg-[#f8f7f7] p-[10px] md:p-6 mt-16">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-[#8C6D73]" />
          <div>
            <h1 className="text-2xl font-bold text-[#3b3b3b]">Spending Analytics</h1>
            <p className="text-gray-600 text-[14px] mt-1">Track expenses and analyze spending patterns</p>
          </div>
        </div>

    {/* Analytics Stats */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {analyticsStats.map((stat, index) => (
    <Card key={index} className="bg-white border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className={`text-1xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.trend} from last month</p>
          </div>
          <div className="flex-shrink-0 ml-2">
    <stat.icon className={`h-5 w-5 ${stat.color}`} />
  </div>        </div>
      </CardContent>
    </Card>
  ))}
</div>


        {/* Analytics Dashboard */}
        <div className="bg-white rounded-lg shadow-sm p-[5px] md:p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#3b3b3b] mb-2">Detailed Analytics</h2>
            <p className="text-gray-600">Comprehensive spending analysis with charts and trends</p>
          </div>
          <SpendingAnalytics expanded={true} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;

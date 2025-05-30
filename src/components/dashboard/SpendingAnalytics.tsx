
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, IndianRupee, Calendar } from 'lucide-react';

interface SpendingAnalyticsProps {
  expanded?: boolean;
}

const monthlyData = [
  { name: 'Jan', flights: 120000, hotels: 80000, ground: 20000 },
  { name: 'Feb', flights: 150000, hotels: 95000, ground: 25000 },
  { name: 'Mar', flights: 180000, hotels: 110000, ground: 30000 },
  { name: 'Apr', flights: 140000, hotels: 85000, ground: 22000 },
  { name: 'May', flights: 200000, hotels: 120000, ground: 35000 },
  { name: 'Jun', flights: 160000, hotels: 98000, ground: 28000 }
];

const categoryData = [
  { name: 'Flights', value: 65, color: '#8C6D73' },
  { name: 'Hotels', value: 25, color: '#A17B81' },
  { name: 'Ground Transport', value: 10, color: '#B68A8F' }
];

const trendData = [
  { month: 'Jan', total: 220000 },
  { month: 'Feb', total: 270000 },
  { month: 'Mar', total: 320000 },
  { month: 'Apr', total: 247000 },
  { month: 'May', total: 355000 },
  { month: 'Jun', total: 286000 }
];

export const SpendingAnalytics: React.FC<SpendingAnalyticsProps> = ({ expanded = false }) => {
  const formatCurrency = (value: number) => `₹${value.toLocaleString()}`;

  return (
    <div className={expanded ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : ""}>
      <Card className="bg-white border-none shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#3b3b3b]">
            <TrendingUp className="h-5 w-5" />
            Spending Overview
          </CardTitle>
          <CardDescription>Monthly travel expenses breakdown in Indian Rupees</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={expanded ? 300 : 200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" tickFormatter={formatCurrency} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => [formatCurrency(value), '']}
              />
              <Bar dataKey="flights" stackId="a" fill="#8C6D73" />
              <Bar dataKey="hotels" stackId="a" fill="#A17B81" />
              <Bar dataKey="ground" stackId="a" fill="#B68A8F" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {expanded && (
        <>
          <Card className="bg-white border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#3b3b3b]">
                <IndianRupee className="h-5 w-5" />
                Expense Categories
              </CardTitle>
              <CardDescription>Distribution of travel costs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {categoryData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">
                      {item.name} ({item.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-md lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#8C6D73]">
                <Calendar className="h-5 w-5" />
                Spending Trend
              </CardTitle>
              <CardDescription>Total monthly spending over time in INR</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" tickFormatter={formatCurrency} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [formatCurrency(value), 'Total Spending']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#8C6D73" 
                    strokeWidth={3}
                    dot={{ fill: '#8C6D73', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

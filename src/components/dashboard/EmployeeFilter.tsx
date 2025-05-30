
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Search, Filter, Mail, Phone, Building } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  totalSpent: number;
  trips: number;
  status: 'active' | 'inactive';
  avatar?: string;
}

interface EmployeeFilterProps {
  onFilterChange: (employeeId: string) => void;
}

const employees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@tsl.com',
    department: 'Sales',
    position: 'Sales Manager',
    totalSpent: 8500,
    trips: 12,
    status: 'active'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@tsl.com',
    department: 'Engineering',
    position: 'Senior Developer',
    totalSpent: 6200,
    trips: 8,
    status: 'active'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@tsl.com',
    department: 'Marketing',
    position: 'Marketing Director',
    totalSpent: 9800,
    trips: 15,
    status: 'active'
  },
  {
    id: '4',
    name: 'David Park',
    email: 'david.park@tsl.com',
    department: 'Operations',
    position: 'Operations Manager',
    totalSpent: 4300,
    trips: 6,
    status: 'inactive'
  },
  {
    id: '5',
    name: 'Lisa Wang',
    email: 'lisa.wang@tsl.com',
    department: 'Finance',
    position: 'Financial Analyst',
    totalSpent: 7600,
    trips: 10,
    status: 'active'
  }
];

export const EmployeeFilter: React.FC<EmployeeFilterProps> = ({ onFilterChange }) => {
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const departments = Array.from(new Set(employees.map(emp => emp.department)));

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterEmployees(term, departmentFilter, statusFilter);
  };

  const handleDepartmentFilter = (dept: string) => {
    setDepartmentFilter(dept);
    filterEmployees(searchTerm, dept, statusFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterEmployees(searchTerm, departmentFilter, status);
  };

  const filterEmployees = (search: string, dept: string, status: string) => {
    let filtered = employees;

    if (search) {
      filtered = filtered.filter(
        emp =>
          emp.name.toLowerCase().includes(search.toLowerCase()) ||
          emp.email.toLowerCase().includes(search.toLowerCase()) ||
          emp.position.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (dept !== 'all') {
      filtered = filtered.filter(emp => emp.department === dept);
    }

    if (status !== 'all') {
      filtered = filtered.filter(emp => emp.status === status);
    }

    setFilteredEmployees(filtered);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="bg-white border-none shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#3b3b3b]">
          <Users className="h-5 w-5" />
          Employee Management
        </CardTitle>
        <CardDescription>Filter and manage employee travel records</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={departmentFilter} onValueChange={handleDepartmentFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Building className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Employee List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((employee) => (
            <Card
              key={employee.id}
              className="p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onFilterChange(employee.id)}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={employee.avatar} />
                  <AvatarFallback className="bg-[#8C6D73] text-white">
                    {getInitials(employee.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{employee.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{employee.position}</p>
                  <Badge className={`mt-1 ${getStatusColor(employee.status)}`}>
                    {employee.status}
                  </Badge>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building className="h-3 w-3" />
                  {employee.department}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-3 w-3" />
                  {employee.email}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Spent:</span>
                  <span className="font-medium">${employee.totalSpent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Trips:</span>
                  <span className="font-medium">{employee.trips}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No employees found matching your criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

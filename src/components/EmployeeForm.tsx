// EmployeeForm.js
import React, { useState, useEffect } from 'react';

interface Policy {
    name: string;
    level: string;
    maxBudgetAirline?: string;
    maxBudgetHotel?: string;
    maxBudgetCab?: string;
    dailyAllowance?: string;
    maxStarHotel?: string;
    airlineClass?: string;
    applicableVendors: string[];
}

interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    department: string;
    designation: string;
    selectedPolicy: string;
    policyDetails?: Policy;
}

interface Designations {
    [key: string]: string[];
}

const EmployeeForm: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        department: '',
        designation: '',
        selectedPolicy: ''
    });

    const [policies, setPolicies] = useState<Policy[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const departments = [
        'HR', 'Finance', 'Engineering', 'Marketing', 'Operations', 'Sales'
    ];

    const designations: Designations = {
        HR: ['HR Manager', 'HR Associate', 'Recruiter'],
        Finance: ['Finance Manager', 'Accountant', 'Financial Analyst'],
        Engineering: ['Software Engineer', 'Senior Engineer', 'Tech Lead'],
        Marketing: ['Marketing Manager', 'Content Specialist', 'SEO Analyst'],
        Operations: ['Operations Manager', 'Logistics Coordinator'],
        Sales: ['Sales Manager', 'Account Executive', 'Sales Representative']
    };

    useEffect(() => {
        // Load policies from localStorage when component mounts
        const savedPolicies = localStorage.getItem('travelPolicies');
        if (savedPolicies) {
            setPolicies(JSON.parse(savedPolicies));
        } else {
            // Add dummy travel policies if none exist
            const dummyPolicies: Policy[] = [
                {
                    name: 'Executive Policy',
                    level: 'Senior',
                    maxBudgetAirline: '$2000',
                    maxBudgetHotel: '$300/night',
                    maxBudgetCab: '$100/day',
                    dailyAllowance: '$150',
                    maxStarHotel: '5 Star',
                    airlineClass: 'Business',
                    applicableVendors: ['Premium Airlines', 'Luxury Hotels', 'Executive Cabs']
                },
                {
                    name: 'Manager Policy',
                    level: 'Mid-Level',
                    maxBudgetAirline: '$1200',
                    maxBudgetHotel: '$200/night',
                    maxBudgetCab: '$75/day',
                    dailyAllowance: '$100',
                    maxStarHotel: '4 Star',
                    airlineClass: 'Premium Economy',
                    applicableVendors: ['Standard Airlines', 'Business Hotels', 'Regular Cabs']
                },
                {
                    name: 'Employee Policy',
                    level: 'Junior',
                    maxBudgetAirline: '$800',
                    maxBudgetHotel: '$120/night',
                    maxBudgetCab: '$50/day',
                    dailyAllowance: '$75',
                    maxStarHotel: '3 Star',
                    airlineClass: 'Economy',
                    applicableVendors: ['Budget Airlines', 'Standard Hotels', 'Economy Cabs']
                },
                {
                    name: 'Intern Policy',
                    level: 'Entry',
                    maxBudgetAirline: '$500',
                    maxBudgetHotel: '$80/night',
                    maxBudgetCab: '$30/day',
                    dailyAllowance: '$50',
                    maxStarHotel: '2 Star',
                    airlineClass: 'Economy',
                    applicableVendors: ['Budget Airlines', 'Budget Hotels', 'Public Transport']
                }
            ];
            setPolicies(dummyPolicies);
        }
        setIsLoading(false);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Get the selected policy details
        const selectedPolicyDetails = policies.find(policy => policy.name === formData.selectedPolicy);

        // Create employee data
        const employeeData: Employee = {
            id: Date.now().toString(), // Simple unique ID
            ...formData,
            policyDetails: selectedPolicyDetails
        };

        // Get existing employees from localStorage
        const existingEmployeesString = localStorage.getItem('employees');
        const existingEmployees = existingEmployeesString ? JSON.parse(existingEmployeesString) : [];

        // Check if email already exists
        const emailExists = existingEmployees.some((emp: Employee) => emp.email === formData.email);
        if (emailExists) {
            alert('An employee with this email already exists!');
            return;
        }

        // Add new employee
        const updatedEmployees = [...existingEmployees, employeeData];

        // Save back to localStorage
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));

        // Clear form
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            department: '',
            designation: '',
            selectedPolicy: ''
        });

        alert('Employee added successfully!');
    };

    useEffect(() => {
        setFormData(prev => ({ ...prev, designation: '' }));
    }, [formData.department]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-[393px] mt-1">
            <h1 className="text-2xl font-bold mb-6 md:block hidden">Add New Employee</h1>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:block hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">First Name*</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Last Name*</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email*</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password*</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Department*</label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Department</option>
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Designation*</label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            required
                            disabled={!formData.department}
                        >
                            <option value="">Select Designation</option>
                            {formData.department && designations[formData.department].map(desig => (
                                <option key={desig} value={desig}>{desig}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Travel Policy</label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="selectedPolicy"
                            value={formData.selectedPolicy}
                            onChange={handleChange}
                        >
                            <option value="">Select Policy</option>
                            {policies.map(policy => (
                                <option key={policy.name} value={policy.name}>
                                    {policy.name} ({policy.level})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        className="bg-[#8C6D73] hover:bg-[#8C6D73]/90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Add Employee
                    </button>
                </div>
            </form>

            {/* Mobile View */}
            <div className="md:hidden bg-gray-50 min-h-screen">
                <form onSubmit={handleSubmit} className="p-4 space-y-6">
                    {/* Personal Information Section */}
                    <div className="bg-white rounded-lg">
                        <div className="px-4 py-3 border-b border-gray-200">
                            <h2 className="text-sm font-medium text-gray-600 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                                Personal Information
                            </h2>
                        </div>
                        <div className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                                <input
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <input
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                                <input
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Department Information Section */}
                    <div className="bg-white rounded-lg">
                        <div className="px-4 py-3 border-b border-gray-200">
                            <h2 className="text-sm font-medium text-gray-600 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                                    <path fillRule="evenodd" d="M3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                                Department Information
                            </h2>
                        </div>
                        <div className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    required
                                    disabled={!formData.department}
                                >
                                    <option value="">Select Designation</option>
                                    {formData.department && designations[formData.department].map(desig => (
                                        <option key={desig} value={desig}>{desig}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Travel Policy Section */}
                    <div className="bg-white rounded-lg">
                        <div className="px-4 py-3 border-b border-gray-200">
                            <h2 className="text-sm font-medium text-gray-600 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Travel Policy
                            </h2>
                        </div>
                        <div className="p-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Travel Policy *</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    name="selectedPolicy"
                                    value={formData.selectedPolicy}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Policy</option>
                                    {policies.map(policy => (
                                        <option key={policy.name} value={policy.name}>
                                            {policy.name} ({policy.level})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="px-4 pb-6">
                        <button
                            className="w-full bg-[#8C6D73] hover:bg-[#8C6D73]/90 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C6D73] focus:ring-offset-2 transition-colors duration-200"
                            type="submit"
                        >
                            Add Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;
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
        <div className="container mx-auto p-4 max-w-4xl mt-10">
            <h1 className="text-2xl font-bold mb-6">Add New Employee</h1>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
        </div>
    );
};

export default EmployeeForm;
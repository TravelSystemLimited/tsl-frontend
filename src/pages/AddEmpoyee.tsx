import React, { useState, useEffect } from 'react';

const EmployeeForm = () => {
    // State for form data
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        department: '',
        designation: '',
        underPolicy: false,
        policyName: '',
        policyLevel: '',
        selectedVendors: [],
        airlineClass: '',
        maxBudgetAirline: '',
        maxBudgetHotel: '',
        maxBudgetCab: '',
        dailyAllowance: '',
        maxStarHotel: ''
    });

    // Department options
    const departments = [
        'HR', 'Finance', 'Engineering', 'Marketing', 'Operations', 'Sales'
    ];

    // Designation options mapped to departments
    const designations = {
        HR: ['HR Manager', 'HR Associate', 'Recruiter'],
        Finance: ['Finance Manager', 'Accountant', 'Financial Analyst'],
        Engineering: ['Software Engineer', 'Senior Engineer', 'Tech Lead'],
        Marketing: ['Marketing Manager', 'Content Specialist', 'SEO Analyst'],
        Operations: ['Operations Manager', 'Logistics Coordinator'],
        Sales: ['Sales Manager', 'Account Executive', 'Sales Representative']
    };

    // Policy level options
    const policyLevels = ['Basic', 'Standard', 'Premium', 'Executive'];

    // Vendor types
    const vendorTypes = ['Hotel', 'Airline', 'Cab'];

    // Airline classes
    const airlineClasses = ['Economy', 'Premium Economy', 'Business', 'First'];

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle vendor selection changes
    const handleVendorChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            if (checked) {
                return {
                    ...prev,
                    selectedVendors: [...prev.selectedVendors, value]
                };
            } else {
                return {
                    ...prev,
                    selectedVendors: prev.selectedVendors.filter(vendor => vendor !== value)
                };
            }
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Here you would typically send the data to your backend
        alert('Employee added successfully!');
    };

    // Reset designation when department changes
    useEffect(() => {
        setFormData(prev => ({ ...prev, designation: '' }));
    }, [formData.department]);

    return (
        <div 
        className=" w-[393px]">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                {/* Form Header */}
                <div className="bg-[#e5e5e5] px-6 py-4">
                    <h1 className="text-2xl font-bold text-black">Add New Employee</h1>
                    <p className="text-gray-700 text-sm mt-1">Fill in the details below to register a new employee</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    {/* Personal Information Section */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                            <span className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Personal Information
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">
                                    First Name*
                                </label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">
                                    Last Name*
                                </label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                    Email*
                                </label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                         
                        </div>
                    </div>

                    {/* Department Information Section */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                            <span className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Department Information
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="department">
                                    Department*
                                </label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    id="department"
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
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="designation">
                                    Designation*
                                </label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50"
                                    id="designation"
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
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                            <span className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Travel Policy
                            </span>
                        </h2>

                        <div className="flex items-center mb-6">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-600 transition"
                                    id="underPolicy"
                                    name="underPolicy"
                                    checked={formData.underPolicy}
                                    onChange={handleChange}
                                />
                                <span className="ml-2 text-gray-700 font-medium">Under Policy</span>
                            </label>
                        </div>

                        {formData.underPolicy && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="policyName">
                                            Policy Name
                                        </label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                            id="policyName"
                                            name="policyName"
                                            type="text"
                                            value={formData.policyName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="policyLevel">
                                            Policy Level
                                        </label>
                                        <select
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                            id="policyLevel"
                                            name="policyLevel"
                                            value={formData.policyLevel}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Policy Level</option>
                                            {policyLevels.map(level => (
                                                <option key={level} value={level}>{level}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Vendor Selection - Multiple Checkboxes */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Vendor Types*
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {vendorTypes.map(vendor => (
                                            <div key={vendor} className="flex items-center">
                                                <input
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    id={`vendor-${vendor}`}
                                                    type="checkbox"
                                                    value={vendor}
                                                    checked={formData.selectedVendors.includes(vendor)}
                                                    onChange={handleVendorChange}
                                                />
                                                <label htmlFor={`vendor-${vendor}`} className="ml-2 text-sm text-gray-700">
                                                    {vendor}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Vendor-specific fields */}
                                <div className="space-y-6">
                                    {formData.selectedVendors.includes('Airline') && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="airlineClass">
                                                    Airline Class
                                                </label>
                                                <select
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                                    id="airlineClass"
                                                    name="airlineClass"
                                                    value={formData.airlineClass}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select Airline Class</option>
                                                    {airlineClasses.map(cls => (
                                                        <option key={cls} value={cls}>{cls}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="maxBudgetAirline">
                                                    Max Budget for Airline (USD)
                                                </label>
                                                <div className="relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className="text-gray-500 sm:text-sm">$</span>
                                                    </div>
                                                    <input
                                                        className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                                        id="maxBudgetAirline"
                                                        name="maxBudgetAirline"
                                                        type="number"
                                                        value={formData.maxBudgetAirline}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {formData.selectedVendors.includes('Hotel') && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="maxStarHotel">
                                                    Max Star Rating for Hotel
                                                </label>
                                                <select
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                                    id="maxStarHotel"
                                                    name="maxStarHotel"
                                                    value={formData.maxStarHotel}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select Max Star Rating</option>
                                                    <option value="3">3 Star</option>
                                                    <option value="4">4 Star</option>
                                                    <option value="5">5 Star</option>
                                                    <option value="7">7 Star (Luxury)</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="maxBudgetHotel">
                                                    Max Budget for Hotel (USD)
                                                </label>
                                                <div className="relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className="text-gray-500 sm:text-sm">$</span>
                                                    </div>
                                                    <input
                                                        className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                                        id="maxBudgetHotel"
                                                        name="maxBudgetHotel"
                                                        type="number"
                                                        value={formData.maxBudgetHotel}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {formData.selectedVendors.includes('Cab') && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="maxBudgetCab">
                                                Max Budget for Cab (USD)
                                            </label>
                                            <div className="relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="text-gray-500 sm:text-sm">$</span>
                                                </div>
                                                <input
                                                    className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                                    id="maxBudgetCab"
                                                    name="maxBudgetCab"
                                                    type="number"
                                                    value={formData.maxBudgetCab}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="dailyAllowance">
                                            Daily Allowance (USD)
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm">$</span>
                                            </div>
                                            <input
                                                className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                                id="dailyAllowance"
                                                name="dailyAllowance"
                                                type="number"
                                                value={formData.dailyAllowance}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Form Footer */}
                    <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#3b3b3b] hover:bg-[#3b3b3b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                            >
                                Add Employee
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;
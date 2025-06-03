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
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-2xl font-bold mb-6 text-blue-800">Add New Employee</h1>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {/* Personal Information Section */}
                <fieldset className="mb-6 border border-gray-300 rounded-md p-4">
                    <legend className="px-2 font-semibold text-lg">Personal Information</legend>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                First Name*
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                Last Name*
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email*
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password*
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Department Information Section */}
                <fieldset className="mb-6 border border-gray-300 rounded-md p-4">
                    <legend className="px-2 font-semibold text-lg">Department Information</legend>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                                Department*
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designation">
                                Designation*
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                </fieldset>

                {/* Travel Policy Section */}
                <fieldset className="mb-6 border border-gray-300 rounded-md p-4">
                    <legend className="px-2 font-semibold text-lg">Travel Policy</legend>

                    <div className="mb-4 flex items-center">
                        <input
                            className="mr-2 leading-tight"
                            id="underPolicy"
                            name="underPolicy"
                            type="checkbox"
                            checked={formData.underPolicy}
                            onChange={handleChange}
                        />
                        <label className="text-gray-700 text-sm font-bold" htmlFor="underPolicy">
                            Under Policy
                        </label>
                    </div>

                    {formData.underPolicy && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="policyName">
                                        Policy Name
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="policyName"
                                        name="policyName"
                                        type="text"
                                        value={formData.policyName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="policyLevel">
                                        Policy Level
                                    </label>
                                    <select
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Vendor Types*
                                </label>
                                <div className="flex flex-wrap gap-4">
                                    {vendorTypes.map(vendor => (
                                        <div key={vendor} className="flex items-center">
                                            <input
                                                className="mr-2"
                                                id={`vendor-${vendor}`}
                                                type="checkbox"
                                                value={vendor}
                                                checked={formData.selectedVendors.includes(vendor)}
                                                onChange={handleVendorChange}
                                            />
                                            <label htmlFor={`vendor-${vendor}`}>{vendor}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Vendor-specific fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {formData.selectedVendors.includes('Airline') && (
                                    <>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="airlineClass">
                                                Airline Class
                                            </label>
                                            <select
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxBudgetAirline">
                                                Max Budget for Airline (USD)
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="maxBudgetAirline"
                                                name="maxBudgetAirline"
                                                type="number"
                                                value={formData.maxBudgetAirline}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </>
                                )}

                                {formData.selectedVendors.includes('Hotel') && (
                                    <>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxStarHotel">
                                                Max Star Rating for Hotel
                                            </label>
                                            <select
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxBudgetHotel">
                                                Max Budget for Hotel (USD)
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="maxBudgetHotel"
                                                name="maxBudgetHotel"
                                                type="number"
                                                value={formData.maxBudgetHotel}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </>
                                )}

                                {formData.selectedVendors.includes('Cab') && (
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxBudgetCab">
                                            Max Budget for Cab (USD)
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="maxBudgetCab"
                                            name="maxBudgetCab"
                                            type="number"
                                            value={formData.maxBudgetCab}
                                            onChange={handleChange}
                                        />
                                    </div>
                                )}

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dailyAllowance">
                                        Daily Allowance (USD)
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="dailyAllowance"
                                        name="dailyAllowance"
                                        type="number"
                                        value={formData.dailyAllowance}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </fieldset>

                <div className="flex items-center justify-end">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
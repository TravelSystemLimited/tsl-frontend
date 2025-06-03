// PolicyForm.js
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

interface PolicyFormProps {
    onPolicyAdded?: (policy: Policy) => void;
}

const PolicyForm: React.FC<PolicyFormProps> = ({ onPolicyAdded }) => {
    const [policyData, setPolicyData] = useState<Policy>({
        name: '',
        level: '',
        maxBudgetAirline: '',
        maxBudgetHotel: '',
        maxBudgetCab: '',
        // dailyAllowance: '',
        maxStarHotel: '',
        airlineClass: '',
        applicableVendors: []
    });

    const vendorTypes = ['Hotel', 'Airline', 'Cab'];
    const policyLevels = ['Basic', 'Standard', 'Premium', 'Executive'];
    const airlineClasses = ['Economy', 'Premium Economy', 'Business', 'First'];

    useEffect(() => {
        // Load policies from localStorage when component mounts
        const savedPolicies = localStorage.getItem('travelPolicies');
        if (savedPolicies) {
            // You can use this if you need to do something with existing policies
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setPolicyData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleVendorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setPolicyData(prev => {
            if (checked) {
                return {
                    ...prev,
                    applicableVendors: [...prev.applicableVendors, value]
                };
            } else {
                return {
                    ...prev,
                    applicableVendors: prev.applicableVendors.filter(vendor => vendor !== value)
                };
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Get existing policies from localStorage
        const existingPoliciesString = localStorage.getItem('travelPolicies');
        const existingPolicies = existingPoliciesString ? JSON.parse(existingPoliciesString) : [];

        // Add new policy
        const updatedPolicies = [...existingPolicies, policyData];

        // Save back to localStorage
        localStorage.setItem('travelPolicies', JSON.stringify(updatedPolicies));

        // Clear form
        setPolicyData({
            name: '',
            level: '',
            maxBudgetAirline: '',
            maxBudgetHotel: '',
            maxBudgetCab: '',
            dailyAllowance: '',
            maxStarHotel: '',
            airlineClass: '',
            applicableVendors: []
        });

        // Notify parent component if needed
        if (onPolicyAdded) {
            onPolicyAdded(policyData);
        }

        alert('Policy saved successfully!');
    };

    return (
        <div className="container mx-auto p-4 max-w-4xl mt-10">
            <h2 className="text-xl font-bold mb-4">Create New Travel Policy</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Policy Name*</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="name"
                            value={policyData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Policy Level*</label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="level"
                            value={policyData.level}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Level</option>
                            {policyLevels.map(level => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Applicable Vendors*</label>
                    <div className="flex flex-wrap gap-4">
                        {vendorTypes.map(vendor => (
                            <div key={vendor} className="flex items-center">
                                <input
                                    className="mr-2"
                                    type="checkbox"
                                    value={vendor}
                                    checked={policyData.applicableVendors.includes(vendor)}
                                    onChange={handleVendorChange}
                                />
                                <label>{vendor}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {policyData.applicableVendors.includes('Airline') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Airline Class</label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="airlineClass"
                                value={policyData.airlineClass}
                                onChange={handleChange}
                            >
                                <option value="">Select Class</option>
                                {airlineClasses.map(cls => (
                                    <option key={cls} value={cls}>{cls}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Max Budget for Airline</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number"
                                name="maxBudgetAirline"
                                value={policyData.maxBudgetAirline}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                )}

                {policyData.applicableVendors.includes('Hotel') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Max Star Rating for Hotel</label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="maxStarHotel"
                                value={policyData.maxStarHotel}
                                onChange={handleChange}
                            >
                                <option value="">Select Rating</option>
                                <option value="3">3 Star</option>
                                <option value="4">4 Star</option>
                                <option value="5">5 Star</option>
                                <option value="7">7 Star (Luxury)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Max Budget for Hotel</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number"
                                name="maxBudgetHotel"
                                value={policyData.maxBudgetHotel}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                )}

                {policyData.applicableVendors.includes('Cab') && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Max Budget for Cab (USD)</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            name="maxBudgetCab"
                            value={policyData.maxBudgetCab}
                            onChange={handleChange}
                        />
                    </div>
                )}

                {/* <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Daily Allowance (USD)</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name="dailyAllowance"
                        value={policyData.dailyAllowance}
                        onChange={handleChange}
                    />
                </div> */}

                <div className="flex justify-end">
                    <button
                        className="bg-[#8C6D73] hover:bg-[#8C6D73]/90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Save Policy
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PolicyForm;
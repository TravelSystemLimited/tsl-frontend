// App.js
import PolicyForm from '@/components/PolicyForm';
import React, { useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';



const Employee = () => {
    const [policies, setPolicies] = useState([]);
    const [activeTab, setActiveTab] = useState('policy');

    const handlePolicyAdded = (newPolicy) => {
        setPolicies([...policies, newPolicy]);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex border-b mb-4">
                <button
                    className={`py-2 px-4 ${activeTab === 'policy' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
                    onClick={() => setActiveTab('policy')}
                >
                    Manage Policies
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'employee' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
                    onClick={() => setActiveTab('employee')}
                >
                    Manage Employees
                </button>
            </div>

            {activeTab === 'policy' ? (
                <PolicyForm onPolicyAdded={handlePolicyAdded} />
            ) : (
                <EmployeeForm policies={policies} />
            )}
        </div>
    );
};

export default Employee;